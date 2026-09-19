const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const slipRoutes = require('./routes/slips');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded fee-slip images as static files (for backward compatibility)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/slips', slipRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api', (req, res) => res.json({ status: 'ok', message: 'PEA API Running ✅' }));
app.get('/', (req, res) => res.send('PEA Backend Running ✅'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server chal raha hai port ${PORT} pe`));
}

module.exports = app;
