-- Parkar Education Alliance Database Schema

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255),
  surname VARCHAR(255),
  cnic VARCHAR(50) UNIQUE NOT NULL,
  mobile VARCHAR(50) UNIQUE NOT NULL,
  dob DATE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) DEFAULT 'PEA Administrator',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Slips Table
CREATE TABLE IF NOT EXISTS slips (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  exam_name VARCHAR(255) NOT NULL,
  exam_date DATE,
  fee_amount NUMERIC(10, 2),
  fee_slip_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
