const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { full_name, father_name, surname, cnic, mobile, dob, password } = req.body;
    if (!full_name || !cnic || !mobile || !dob || !password) {
      return res.status(400).json({ error: 'Sab zaroori fields bharein' });
    }

    const existing = await pool.query(
      'SELECT id FROM users WHERE cnic = $1 OR mobile = $2',
      [cnic, mobile]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'CNIC ya mobile pehle se registered hai' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (full_name, father_name, surname, cnic, mobile, dob, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, full_name, father_name, surname, cnic, mobile, dob, city, address`,
      [full_name, father_name || null, surname || null, cnic, mobile, dob, password_hash]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      return res.status(400).json({ error: 'Mobile aur password zaruri hain' });
    }

    const result = await pool.query('SELECT * FROM users WHERE mobile = $1', [mobile]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Mobile ya password galat hai' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Mobile ya password galat hai' });
    }

    delete user.password_hash;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// RESET PASSWORD (demo-style: mobile verify ho chuka frontend OTP step se)
router.post('/reset-password', async (req, res) => {
  try {
    const { mobile, new_password } = req.body;
    if (!mobile || !new_password || new_password.length < 6) {
      return res.status(400).json({ error: 'Valid mobile aur 6+ character password do' });
    }

    const result = await pool.query('SELECT id FROM users WHERE mobile = $1', [mobile]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Is mobile se koi account nahi mila' });
    }

    const password_hash = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE mobile = $2', [password_hash, mobile]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
