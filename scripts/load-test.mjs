const TARGET_HOST = process.env.TARGET_HOST || 'sticdanang.web.app';
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '800', 10);
const PATHS = ['/', '/join', '/banner.png', '/logo.png'];

console.log('='.repeat(65));
console.log(`🚀 KHỞI ĐỘNG LOAD TEST: 800 BOTS CONCURRENT BENCHMARK`);
console.log(`🎯 Mục tiêu kiểm thử: https://${TARGET_HOST}`);
console.log(`👥 Số lượng bot đồng thời (Concurrency): ${CONCURRENCY}`);
console.log(`📄 Phân bổ tải trên các endpoint: ${PATHS.join(', ')}`);
console.log('='.repeat(65));

async function simulateBot(botId) {
  const targetPath = PATHS[botId % PATHS.length];
  const url = `https://${TARGET_HOST}${targetPath}`;
  const startTime = performance.now();

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': `STIC-StressBot/1.0 (Bot #${botId}; Concurrency ${CONCURRENCY})`,
        'Accept': 'text/html,application/xhtml+xml,application/xml,image/png,*/*;q=0.9',
      },
      signal: AbortSignal.timeout(30000),
    });

    const bodyBuffer = await res.arrayBuffer();
    const latency = performance.now() - startTime;

    return {
      botId,
      path: targetPath,
      statusCode: res.status,
      latency,
      bytes: bodyBuffer.byteLength,
      cacheControl: res.headers.get('cache-control') || 'none',
      contentEncoding: res.headers.get('content-encoding') || 'identity',
      servedBy: res.headers.get('x-served-by') || res.headers.get('server') || 'Google Cloud CDN',
    };
  } catch (err) {
    const latency = performance.now() - startTime;
    return {
      botId,
      path: targetPath,
      statusCode: 0,
      error: err.message,
      latency,
      bytes: 0,
    };
  }
}

async function runBenchmark() {
  const testStartTime = performance.now();
  console.log(`\n⏳ Đang thả đồng loạt ${CONCURRENCY} bot vào máy chủ Firebase CDN...`);

  // Launch all 800 bot requests concurrently
  const botPromises = [];
  for (let i = 1; i <= CONCURRENCY; i++) {
    botPromises.push(simulateBot(i));
  }

  const results = await Promise.all(botPromises);
  const totalTestDuration = performance.now() - testStartTime;

  // Process statistics
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
  const p90 = latencies[Math.floor(latencies.length * 0.90)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;
  const rps = (results.length / (totalTestDuration / 1000)).toFixed(2);
  const throughputMB = (totalBytes / (1024 * 1024)).toFixed(2);

  console.log('\n' + '='.repeat(65));
  console.log('📊 KẾT QUẢ KIỂM THỬ TẢI 800 BOT CONCURRENT:');
  console.log('='.repeat(65));
  console.log(`- Tổng số bot (requests):          ${results.length}`);
  console.log(`- Thành công (2xx/3xx):            ${successfulRequests} / ${results.length} (${((successfulRequests/results.length)*100).toFixed(1)}%)`);
  console.log(`- Phân bố mã HTTP:                 ${JSON.stringify(statusCodes)}`);
  console.log(`- Tổng thời gian hoàn thành:       ${(totalTestDuration / 1000).toFixed(2)}s`);
  console.log(`- Thông lượng (Requests/giây):     ${rps} req/sec`);
  console.log(`- Tổng dữ liệu tải về:             ${throughputMB} MB`);
  console.log('-'.repeat(65));
  console.log('⏱️ ĐỘ TRỄ PHẢN HỒI (LATENCY):');
  console.log(`- Nhỏ nhất (Min):                  ${minLatency.toFixed(1)} ms`);
  console.log(`- Trung bình (Average):            ${avgLatency.toFixed(1)} ms`);
  console.log(`- Trung vị (p50):                  ${p50.toFixed(1)} ms`);
  console.log(`- 90th percentile (p90):           ${p90.toFixed(1)} ms`);
  console.log(`- 95th percentile (p95):           ${p95.toFixed(1)} ms`);
  console.log(`- 99th percentile (p99):           ${p99.toFixed(1)} ms`);
  console.log(`- Lớn nhất (Max):                  ${maxLatency.toFixed(1)} ms`);
  console.log('='.repeat(65));

  // CDN Header Sample
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
