const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, father_name, surname, cnic, mobile, dob, city, address FROM users WHERE id = $1',
      [req.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User nahi mila' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE profile
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { full_name, father_name, surname, mobile, dob, city, address } = req.body;
    if (!full_name || !mobile) {
      return res.status(400).json({ error: 'Naam aur mobile zaruri hain' });
    }

    const result = await pool.query(
      `UPDATE users SET full_name=$1, father_name=$2, surname=$3, mobile=$4, dob=$5, city=$6, address=$7
       WHERE id=$8
       RETURNING id, full_name, father_name, surname, cnic, mobile, dob, city, address`,
      [full_name, father_name || null, surname || null, mobile, dob || null, city || null, address || null, req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CHANGE PASSWORD
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password || new_password.length < 6) {
      return res.status(400).json({ error: 'Sahi current password aur 6+ character new password do' });
    }

    const result = await pool.query('SELECT password_hash FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User nahi mila' });

    const valid = await bcrypt.compare(current_password, result.rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Current password galat hai' });

    const newHash = await bcrypt.hash(new_password, 10);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, req.userId]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE account
router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.userId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
