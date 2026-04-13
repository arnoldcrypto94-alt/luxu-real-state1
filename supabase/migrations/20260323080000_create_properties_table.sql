-- Create the properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.users(id) NOT NULL,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  status TEXT DEFAULT 'for-sale' NOT NULL,
  type TEXT DEFAULT 'apartment' NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  area NUMERIC,
  year_built INTEGER,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  parking INTEGER DEFAULT 0,
  amenities JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view properties
CREATE POLICY "Public can view all properties" ON public.properties
  FOR SELECT USING (true);

-- Authenticated users can create properties
CREATE POLICY "Authenticated users can create properties" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Owners can update their own properties
CREATE POLICY "Owners can update their own properties" ON public.properties
  FOR UPDATE USING (auth.uid() = owner_id);

-- Owners can delete their own properties
CREATE POLICY "Owners can delete their own properties" ON public.properties
  FOR DELETE USING (auth.uid() = owner_id);
