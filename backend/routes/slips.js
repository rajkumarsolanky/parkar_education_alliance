const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ───────────── POST / — Register for Pre-Entry Test / Generate Admit Card ─────────────
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { exam_name = 'Pre-Entry Test (Batch - 2026)', exam_date, test_venue } = req.body;

    // Check if user already registered for this exam
    const existing = await pool.query(
      'SELECT * FROM slips WHERE user_id = $1 AND exam_name = $2',
      [req.userId, exam_name]
    );

    if (existing.rows.length > 0) {
      return res.json(existing.rows[0]);
    }

    // Generate unique Application ID & Seat No
    const appRandom = Math.floor(100000 + Math.random() * 900000);
    const countRes = await pool.query('SELECT COUNT(*)::int AS count FROM slips');
    const nextNum = (countRes.rows[0].count + 1).toString().padStart(4, '0');
    const seat_no = `PEA-2026-${nextNum}`;
    const application_id = appRandom.toString();
    const defaultDate = exam_date || '2026-09-27';
    const defaultVenue = test_venue || 'Public School / Govt Degree College, Nagarparkar';

    const result = await pool.query(
      `INSERT INTO slips (user_id, exam_name, exam_date, seat_no, application_id, test_venue, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'approved')
       RETURNING *`,
      [req.userId, exam_name, defaultDate, seat_no, application_id, defaultVenue]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ───────────── GET / — Get my Admit Cards / Test Slips ─────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.*, u.full_name, u.father_name, u.surname, u.cnic, u.mobile
       FROM slips s
       JOIN users u ON s.user_id = u.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
