const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ───────────── POST / — Register for Pre-Entry Test / Generate Admit Card ─────────────
router.post('/', authMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    const { exam_name = 'Pre-Entry Test (Batch - 2026)', exam_date, test_venue } = req.body;

    await client.query('BEGIN');

    // Serialize registrations for the same user and exam to prevent races.
    await client.query('SELECT pg_advisory_xact_lock($1, hashtext($2))', [req.userId, exam_name]);

    // Keep the oldest registration and automatically remove legacy duplicates.
    await client.query(
      `DELETE FROM slips
       WHERE user_id = $1 AND exam_name = $2
         AND id NOT IN (
           SELECT id FROM slips
           WHERE user_id = $1 AND exam_name = $2
           ORDER BY created_at ASC, id ASC
           LIMIT 1
         )`,
      [req.userId, exam_name]
    );

    const existing = await client.query(
      'SELECT * FROM slips WHERE user_id = $1 AND exam_name = $2',
      [req.userId, exam_name]
    );

    if (existing.rows.length > 0) {
      await client.query('COMMIT');
      return res.json(existing.rows[0]);
    }

    // Generate unique Application ID & Seat No
    const appRandom = Math.floor(100000 + Math.random() * 900000);
    const countRes = await client.query('SELECT COUNT(*)::int AS count FROM slips');
    const nextNum = (countRes.rows[0].count + 1).toString().padStart(4, '0');
    const seat_no = `PEA-2026-${nextNum}`;
    const application_id = appRandom.toString();
    const defaultDate = exam_date || '2026-09-27';
    const defaultVenue = test_venue || 'Public School / Govt Degree College, Nagarparkar';

    const result = await client.query(
      `INSERT INTO slips (user_id, exam_name, exam_date, seat_no, application_id, test_venue, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'approved')
       RETURNING *`,
      [req.userId, exam_name, defaultDate, seat_no, application_id, defaultVenue]
    );

    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// ───────────── GET / — Get my Admit Cards / Test Slips ─────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      `DELETE FROM slips
       WHERE user_id = $1
         AND id NOT IN (
           SELECT DISTINCT ON (exam_name) id
           FROM slips
           WHERE user_id = $1
           ORDER BY exam_name, created_at ASC, id ASC
         )`,
      [req.userId]
    );

    const result = await pool.query(
      `WITH unique_slips AS (
         SELECT DISTINCT ON (s.exam_name)
           s.*, u.full_name, u.father_name, u.surname, u.cnic, u.mobile
         FROM slips s
         JOIN users u ON s.user_id = u.id
         WHERE s.user_id = $1
         ORDER BY s.exam_name, s.created_at ASC, s.id ASC
       )
       SELECT * FROM unique_slips
       ORDER BY created_at DESC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
