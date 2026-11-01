import https from 'node:https';
import fs from 'node:fs';
import { performance } from 'node:perf_hooks';

const TARGET_HOST = process.env.TARGET_HOST || 'stic.web.app';
const TIERS = [200, 400, 600, 800, 1000, 1500, 2000];

const USER_AGENTS = [
  // iPhone Safari
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  // Android Chrome
  'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.179 Mobile Safari/537.36',
  // Windows Chrome
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  // macOS Safari
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15'
];

const keepAliveAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 50,
  keepAliveMsecs: 15000,
  timeout: 30000,
});

function httpGet(path, ua) {
  const url = `https://${TARGET_HOST}${path}`;
  const t0 = performance.now();

  return new Promise((resolve) => {
    const req = https.request(url, {
      agent: keepAliveAgent,
      method: 'GET',
      headers: {
        'User-Agent': ua,
        'Accept': path.endsWith('.jpg') || path.endsWith('.png') 
          ? 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
    }, (res) => {
      let bytes = 0;
      res.on('data', chunk => { bytes += chunk.length; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          latency: performance.now() - t0,
          bytes,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 0,
        latency: performance.now() - t0,
        bytes: 0,
        error: err.message,
      });
    });

    req.setTimeout(25000, () => {
      req.destroy(new Error('Timeout'));
    });

    req.end();
  });
}

// Giả lập hành vi 1 người dùng thật:
// 1. Vào trang chủ (/)
// 2. Trình duyệt tự tải Banner (/banner.jpg) và Logo (/logo.png)
// 3. Người dùng đọc lướt rồi bấm vào trang tuyển quân (/join)
async function simulateRealUserSession(userId) {
  const ua = USER_AGENTS[userId % USER_AGENTS.length];
  const sessionStart = performance.now();
  const stepResults = [];

  // Bước 1: Tải HTML Trang chủ
  const step1 = await httpGet('/', ua);
  stepResults.push({ step: 'home', ...step1 });

  // Bước 2: Tải đồng thời tài nguyên chính (Banner + Logo)
  const [bannerRes, logoRes] = await Promise.all([
    httpGet('/banner.jpg', ua),
    httpGet('/logo.png', ua)
  ]);
  stepResults.push({ step: 'banner', ...bannerRes });
  stepResults.push({ step: 'logo', ...logoRes });

  // Bước 3: Người dùng chuyển sang trang tuyển quân (/join)
  const step3 = await httpGet('/join', ua);
  stepResults.push({ step: 'join', ...step3 });

  const totalSessionTime = performance.now() - sessionStart;
  const isSuccess = stepResults.every(s => s.statusCode === 200);

  return {
    userId,
    isSuccess,
    totalSessionTime,
    steps: stepResults,
  };
}

async function runTier(userCount) {
  console.log(`\n--------------------------------------------------------------`);
  console.log(`⚡ BẮT ĐẦU KIỂM THỬ MỨC: ${userCount} USERS ĐỒNG THỜI (HÀNH VI NGƯỜI THẬT)...`);
  console.log(`--------------------------------------------------------------`);
  
  const tierStart = performance.now();
  const batchSize = 50;
  const userResults = [];

  for (let i = 0; i < userCount; i += batchSize) {
    const currentBatch = [];
    for (let j = 0; j < batchSize && (i + j) < userCount; j++) {
      currentBatch.push(simulateRealUserSession(i + j + 1));
    }
    const batchOut = await Promise.all(currentBatch);
    userResults.push(...batchOut);
  }

  const durationSec = (performance.now() - tierStart) / 1000;
  
  // Tổng hợp dữ liệu
  let totalRequests = 0;
  let successfulRequests = 0;
  let totalBytes = 0;
  const allLatencies = [];

  for (const u of userResults) {
    for (const s of u.steps) {
      totalRequests++;
      totalBytes += s.bytes;
      allLatencies.push(s.latency);
      if (s.statusCode === 200) {
        successfulRequests++;
      }
    }
  }

  allLatencies.sort((a, b) => a - b);
  const minLatency = allLatencies[0] || 0;
  const maxLatency = allLatencies[allLatencies.length - 1] || 0;
  const avgLatency = allLatencies.reduce((a, b) => a + b, 0) / (allLatencies.length || 1);
  const p50 = allLatencies[Math.floor(allLatencies.length * 0.50)] || 0;
  const p90 = allLatencies[Math.floor(allLatencies.length * 0.90)] || 0;
  const p95 = allLatencies[Math.floor(allLatencies.length * 0.95)] || 0;
  const rps = (totalRequests / durationSec).toFixed(2);
  const mb = (totalBytes / (1024 * 1024)).toFixed(2);
  const successRate = ((successfulRequests / totalRequests) * 100).toFixed(1);

  console.log(`✅ Hoàn thành mức ${userCount} users:`);
  console.log(`   - Tổng requests: ${totalRequests} | Thành công: ${successRate}%`);
  console.log(`   - Thời gian hoàn tất: ${durationSec.toFixed(2)}s | Thông lượng: ${rps} req/s`);
  console.log(`   - Ping trung vị (p50): ${p50.toFixed(1)} ms | Trung bình: ${avgLatency.toFixed(1)} ms | Min: ${minLatency.toFixed(1)} ms`);
  console.log(`   - Tổng dữ liệu tải: ${mb} MB`);

  return {
    tier: userCount,
    totalUsers: userCount,
    totalRequests,
    successfulRequests,
    successRate: parseFloat(successRate),
    durationSec: parseFloat(durationSec.toFixed(2)),
    rps: parseFloat(rps),
    totalMB: parseFloat(mb),
    minLatency: parseFloat(minLatency.toFixed(1)),
    p50: parseFloat(p50.toFixed(1)),
    avgLatency: parseFloat(avgLatency.toFixed(1)),
    p90: parseFloat(p90.toFixed(1)),
    p95: parseFloat(p95.toFixed(1)),
    maxLatency: parseFloat(maxLatency.toFixed(1)),
  };
}

async function runAllTiers() {
  console.log('='.repeat(70));
  console.log(`🚀 KHỞI ĐỘNG HỆ THỐNG STRESS TEST 7 MỨC TẢI LIÊN HOÀN (200 -> 2000 USERS)`);
  console.log(`🎯 Mục tiêu kiểm thử: https://${TARGET_HOST}`);
  console.log(`🎭 Mô phỏng: Hành vi người thật (Duyệt Home -> Tải Banner/Logo -> Vào /join)`);
  console.log(`📊 Các mốc tải: ${TIERS.join(', ')} users`);
  console.log('='.repeat(70));

  const allSummary = [];

  for (const tier of TIERS) {
    const res = await runTier(tier);
    allSummary.push(res);
    // Nghỉ nhẹ 1 giây giữa các đợt để CDN hoàn nguyên socket
    await new Promise(r => setTimeout(r, 1000));
  }

  // Ghi kết quả vào file JSON để Python đọc tạo file Excel
  fs.writeFileSync('stress_test_results.json', JSON.stringify(allSummary, null, 2), 'utf-8');
  console.log(`\n🎉 ĐÃ HOÀN THÀNH TOÀN BỘ 7 MỨC KIỂM THỬ!`);
  console.log(`📁 Kết quả JSON lưu tại: stress_test_results.json`);
}

runAllTiers().catch(console.error);

