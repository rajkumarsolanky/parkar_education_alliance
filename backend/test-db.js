require('dotenv').config();
const { Pool } = require('pg');

console.log('Testing connection with this URL (password hidden):');
console.log(process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
console.log('---');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()')
    .then(res => {
        console.log('✅ SUCCESS! Connected to database.');
        console.log('Server time:', res.rows[0].now);
        process.exit(0);
    })
    .catch(err => {
        console.log('❌ FAILED to connect.');
        console.log('Error code:', err.code);
        console.log('Error message:', err.message);
        process.exit(1);
    });