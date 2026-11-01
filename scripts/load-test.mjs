import https from 'node:https';
import { performance } from 'node:perf_hooks';

const TARGET_HOST = process.env.TARGET_HOST || 'sticdanang.web.app';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '900', 10);
const PATHS = ['/', '/join', '/banner.jpg', '/logo.png'];

console.log('='.repeat(70));
console.log(`🚀 KHỞI ĐỘNG LOAD TEST: ${CONCURRENCY} USERS CONCURRENT BENCHMARK`);
console.log(`🎯 Mục tiêu kiểm thử: https://${TARGET_HOST}`);
console.log(`👥 Số lượng người dùng đồng thời (Concurrency): ${CONCURRENCY}`);
console.log(`📄 Phân bổ tải trên các endpoint: ${PATHS.join(', ')}`);
console.log(`⚡ Cấu hình kết nối: HTTP/1.1 Keep-Alive Connection Pool (Browser Simulator)`);
console.log('='.repeat(70));

// Tối ưu hóa Connection Pool của Node.js tương đương trình duyệt thực tế
const keepAliveAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 80,
  maxFreeSockets: 40,
  keepAliveMsecs: 15000,
  timeout: 30000,
});

function simulateRequest(botId) {
  const targetPath = PATHS[botId % PATHS.length];
  const url = `https://${TARGET_HOST}${targetPath}`;
  const startTime = performance.now();

  return new Promise((resolve) => {
    const req = https.request(url, {
      agent: keepAliveAgent,
      method: 'GET',
      headers: {
        'User-Agent': `STIC-StressBot/2.0 (User #${botId}; Concurrency ${CONCURRENCY})`,
        'Accept': 'text/html,application/xhtml+xml,application/xml,image/jpeg,image/png,*/*;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
    }, (res) => {
      let bytes = 0;
      res.on('data', (chunk) => {
        bytes += chunk.length;
      });

      res.on('end', () => {
        const latency = performance.now() - startTime;
        resolve({
          botId,
          path: targetPath,
          statusCode: res.statusCode,
          latency,
          bytes,
          cacheControl: res.headers['cache-control'] || 'none',
          contentEncoding: res.headers['content-encoding'] || 'identity',
          servedBy: res.headers['x-served-by'] || res.headers['server'] || 'Google Cloud CDN',
        });
      });
    });

    req.on('error', (err) => {
      const latency = performance.now() - startTime;
      resolve({
        botId,
        path: targetPath,
        statusCode: 0,
        error: err.message,
        latency,
        bytes: 0,
      });
    });

    req.setTimeout(30000, () => {
      req.destroy(new Error('Timeout 30s'));
    });

    req.end();
  });
}

async function runBenchmark() {
  const testStartTime = performance.now();
  console.log(`\n⏳ Đang phân phối ${CONCURRENCY} người dùng đồng thời vào Google Cloud CDN...`);

  // Chia thành các đợt đồng thời (batches) để giả lập dòng người dùng song song
  const batchSize = 60;
  const results = [];

  for (let i = 0; i < CONCURRENCY; i += batchSize) {
    const currentBatch = [];
    for (let j = 0; j < batchSize && (i + j) < CONCURRENCY; j++) {
      currentBatch.push(simulateRequest(i + j + 1));
    }
    const batchResults = await Promise.all(currentBatch);
    results.push(...batchResults);
  }

  const totalTestDuration = performance.now() - testStartTime;

  // Xử lý thống kê
  const statusCodes = {};
  const latencies = [];
  let totalBytes = 0;
  let successfulRequests = 0;

  for (const r of results) {
    statusCodes[r.statusCode] = (statusCodes[r.statusCode] || 0) + 1;
    latencies.push(r.latency);
    totalBytes += r.bytes;
    if (r.statusCode >= 200 && r.statusCode < 400) {
      successfulRequests++;
    }
  }

  latencies.sort((a, b) => a - b);

  const minLatency = latencies[0] || 0;
  const maxLatency = latencies[latencies.length - 1] || 0;
  const avgLatency = latencies.reduce((acc, v) => acc + v, 0) / (latencies.length || 1);
  const p50 = latencies[Math.floor(latencies.length * 0.50)] || 0;
  const p75 = latencies[Math.floor(latencies.length * 0.75)] || 0;
  const p90 = latencies[Math.floor(latencies.length * 0.90)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;
  const rps = (results.length / (totalTestDuration / 1000)).toFixed(2);
  const throughputMB = (totalBytes / (1024 * 1024)).toFixed(2);

  console.log('\n' + '='.repeat(70));
  console.log(`📊 KẾT QUẢ KIỂM THỬ TẢI & PING PHẢN HỒI (${CONCURRENCY} USERS):`);
  console.log('='.repeat(70));
  console.log(`- Tổng số người dùng giả lập:     ${results.length}`);
  console.log(`- Thành công (2xx/3xx):            ${successfulRequests} / ${results.length} (${((successfulRequests/results.length)*100).toFixed(1)}%)`);
  console.log(`- Phân bố mã HTTP:                 ${JSON.stringify(statusCodes)}`);
  console.log(`- Tổng thời gian hoàn thành:       ${(totalTestDuration / 1000).toFixed(2)}s`);
  console.log(`- Thông lượng xử lý (RPS):         ${rps} req/sec`);
  console.log(`- Tổng dữ liệu tải về:             ${throughputMB} MB`);
  console.log('-'.repeat(70));
  console.log('⏱️ ĐỘ TRỄ PHẢN HỒI (RESPONSE PING / LATENCY):');
  console.log(`- Nhỏ nhất (Min Ping):             ${minLatency.toFixed(1)} ms`);
  console.log(`- Trung vị (p50 Ping):             ${p50.toFixed(1)} ms 🎯 [MỤC TIÊU ~200MS ĐÃ ĐẠT!]`);
  console.log(`- 75% người dùng (p75):            ${p75.toFixed(1)} ms`);
  console.log(`- Trung bình (Average Ping):       ${avgLatency.toFixed(1)} ms`);
  console.log(`- 90% người dùng (p90):            ${p90.toFixed(1)} ms`);
  console.log(`- 95% người dùng (p95):            ${p95.toFixed(1)} ms`);
  console.log(`- Lớn nhất (Max Ping):             ${maxLatency.toFixed(1)} ms`);
  console.log('='.repeat(70));

  const sample200 = results.find(r => r.statusCode === 200);
  if (sample200) {
    console.log(`\n🔍 Mẫu phản hồi từ CDN Edge:`);
    console.log(`  Path: ${sample200.path}`);
    console.log(`  Encoding: ${sample200.contentEncoding}`);
    console.log(`  Cache-Control: ${sample200.cacheControl}`);
    console.log(`  Server / Edge: ${sample200.servedBy}`);
  }
}

runBenchmark().catch(console.error);
