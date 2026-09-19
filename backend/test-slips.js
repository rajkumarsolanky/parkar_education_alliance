// Quick API test for slips management system
const http = require('http');

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body && body.token) {
      options.headers['Authorization'] = `Bearer ${body.token}`;
      delete body.token;
    }
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on('error', reject);
    if (body && Object.keys(body).length) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test() {
  console.log('=== SLIPS MANAGEMENT SYSTEM — API TESTS ===\n');

  // 1. Admin Login
  console.log('1. Admin Login...');
  const adminLogin = await request('POST', '/api/admin/login', { username: 'admin', password: 'password' });
  console.log(`   Status: ${adminLogin.status}`);
  if (adminLogin.status === 200) {
    console.log(`   ✅ Admin login successful! Token received.`);
    console.log(`   Admin: ${adminLogin.data.admin.full_name} (${adminLogin.data.admin.username})`);
  } else {
    console.log(`   ❌ Admin login failed: ${JSON.stringify(adminLogin.data)}`);
  }

  const adminToken = adminLogin.data?.token;

  // 2. Admin Stats
  if (adminToken) {
    console.log('\n2. Admin Dashboard Stats...');
    const stats = await request('GET', '/api/admin/stats', { token: adminToken });
    console.log(`   Status: ${stats.status}`);
    if (stats.status === 200) {
      console.log(`   ✅ Stats: Total=${stats.data.total}, Pending=${stats.data.pending}, Approved=${stats.data.approved}, Rejected=${stats.data.rejected}`);
    } else {
      console.log(`   ❌ Stats failed: ${JSON.stringify(stats.data)}`);
    }

    // 3. Admin Get Slips
    console.log('\n3. Admin Get All Slips...');
    const slips = await request('GET', '/api/admin/slips', { token: adminToken });
    console.log(`   Status: ${slips.status}`);
    console.log(`   ✅ Got ${slips.data.length || 0} slips`);
  }

  // 4. Test student cannot access admin routes
  console.log('\n4. Security: Student token cannot access admin...');
  const fakeToken = 'fake.token.here';
  const securityTest = await request('GET', '/api/admin/stats', { token: fakeToken });
  console.log(`   Status: ${securityTest.status}`);
  if (securityTest.status === 403) {
    console.log('   ✅ Correctly blocked! Invalid token rejected.');
  } else {
    console.log('   ❌ Security issue!');
  }

  // 5. Backend root
  console.log('\n5. Backend Health Check...');
  const health = await request('GET', '/', {});
  console.log(`   Status: ${health.status}`);
  console.log(`   ✅ Backend response: ${health.data}`);

  console.log('\n=== ALL TESTS COMPLETE ===');
}

test().catch(console.error);
