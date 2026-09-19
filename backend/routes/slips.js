const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'fee-slips');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config — memory storage for serverless & local compatibility
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Sirf JPG, PNG, WebP, PDF allowed hain'));
  }
});

// ───────────── POST / — Submit new slip ─────────────
router.post('/', authMiddleware, upload.single('fee_slip'), async (req, res) => {
  try {
    const { exam_name, exam_date, fee_amount } = req.body;
    if (!exam_name) {
      return res.status(400).json({ error: 'Exam name zaruri hai' });
    }

    let fee_slip_url = null;
    if (req.file) {
      const mime = req.file.mimetype || 'image/jpeg';
      const base64 = req.file.buffer.toString('base64');
      fee_slip_url = `data:${mime};base64,${base64}`;
    }

    const result = await pool.query(
      `INSERT INTO slips (user_id, exam_name, exam_date, fee_amount, fee_slip_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.userId, exam_name, exam_date || null, fee_amount || null, fee_slip_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ───────────── GET / — Get my slips ─────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM slips WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
