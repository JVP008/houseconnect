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
INSERT INTO contractors (name, service, rating, reviews, price, image, available, verified, location, response_time, completed_jobs, description) VALUES
('Mike''s Plumbing', 'Plumbing', 4.9, 234, '$75-150/hr', '👨‍🔧', true, true, '2.3 miles', 'Usually responds in 1 hour', 456, 'Licensed master plumber with 15+ years experience'),
('Sarah Electric Co', 'Electrical', 4.8, 189, '$80-160/hr', '👩‍🔧', true, true, '3.1 miles', 'Usually responds in 2 hours', 312, 'Certified electrician, residential and commercial'),
('CleanSweep Pro', 'Cleaning', 4.7, 567, '$40-80/hr', '🧹', true, true, '1.5 miles', 'Usually responds in 30 mins', 892, 'Deep cleaning specialists, eco-friendly products'),
('CoolAir HVAC', 'HVAC', 4.9, 145, '$90-200/hr', '❄️', false, true, '4.2 miles', 'Usually responds in 3 hours', 234, 'HVAC installation, repair, and maintenance'),
('ColorPro Painters', 'Painting', 4.6, 298, '$50-100/hr', '🎨', true, false, '2.8 miles', 'Usually responds in 2 hours', 445, 'Interior and exterior painting, quality guaranteed'),
('Green Thumb Gardens', 'Landscaping', 4.8, 176, '$60-120/hr', '🌳', true, true, '5.0 miles', 'Usually responds in 4 hours', 289, 'Full landscaping services, lawn care, design'),
('Quick Fix Plumbing', 'Plumbing', 4.5, 98, '$65-130/hr', '🔧', true, false, '1.8 miles', 'Usually responds in 1 hour', 156, 'Emergency plumbing services 24/7'),
('Bright Spark Electric', 'Electrical', 4.7, 212, '$85-170/hr', '⚡', true, true, '3.5 miles', 'Usually responds in 2 hours', 378, 'Smart home installations, rewiring, repairs'),
('Spotless Cleaning Co', 'Cleaning', 4.9, 423, '$35-70/hr', '✨', false, true, '2.0 miles', 'Usually responds in 1 hour', 712, 'Move-in/out cleaning, regular maintenance'),
('Arctic Comfort HVAC', 'HVAC', 4.4, 87, '$85-180/hr', '🌡️', true, false, '6.1 miles', 'Usually responds in 5 hours', 143, 'Heating and cooling system experts'),
('Perfect Finish Painters', 'Painting', 4.8, 334, '$55-110/hr', '🖌️', true, true, '3.3 miles', 'Usually responds in 3 hours', 567, 'Premium paint jobs, wallpaper, texturing'),
('Nature''s Touch Landscaping', 'Landscaping', 4.6, 145, '$55-100/hr', '🌺', true, true, '4.7 miles', 'Usually responds in 4 hours', 234, 'Garden design, irrigation, maintenance');
