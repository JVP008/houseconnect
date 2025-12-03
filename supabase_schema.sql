-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CONTRACTORS TABLE
CREATE TABLE contractors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  rating NUMERIC(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  price TEXT,
  image TEXT,
  available BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  location TEXT,
  response_time TEXT,
  completed_jobs INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- JOBS TABLE
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency TEXT NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contractor_id INTEGER REFERENCES contractors(id),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, completed, pending, cancelled
  price INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISPUTES TABLE
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  type TEXT NOT NULL, -- refund, quality, noshow
  description TEXT NOT NULL,
  status TEXT DEFAULT 'In Review', -- In Review, Resolved, Rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Contractors are public
CREATE POLICY "Contractors are public" ON contractors FOR SELECT USING (true);

-- Jobs: Users can CRUD their own jobs
CREATE POLICY "Users can view own jobs" ON jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Bookings: Users can CRUD their own bookings
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Disputes: Users can CRUD their own disputes
CREATE POLICY "Users can view own disputes" ON disputes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own disputes" ON disputes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- SEED DATA FOR CONTRACTORS

