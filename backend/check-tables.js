const pool = require('./db');

async function check() {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const admins = await pool.query('SELECT COUNT(*) FROM admins');
    const slips = await pool.query('SELECT COUNT(*) FROM slips');
    console.log('✅ ALL TABLES EXIST & READY!');
    console.log(`Users: ${users.rows[0].count}, Admins: ${admins.rows[0].count}, Slips: ${slips.rows[0].count}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Table Error:', err.message);
    process.exit(1);
  }
}

check();
