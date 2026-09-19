const pool = require('./db');

async function migrate() {
  try {
    console.log('Running database migrations...');
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS father_name VARCHAR(255);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS surname VARCHAR(255);
      
      ALTER TABLE slips ADD COLUMN IF NOT EXISTS seat_no VARCHAR(100);
      ALTER TABLE slips ADD COLUMN IF NOT EXISTS application_id VARCHAR(100);
      ALTER TABLE slips ADD COLUMN IF NOT EXISTS test_venue VARCHAR(255) DEFAULT 'Public School / Govt Degree College, Nagarparkar';
    `);
    console.log('✅ Migrations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  }
}

migrate();
