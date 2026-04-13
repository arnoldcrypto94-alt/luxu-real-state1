-- Add missing columns to properties table
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS zip TEXT;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'USA';
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS is_exclusive BOOLEAN DEFAULT FALSE;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS price_period TEXT;

-- Update existing properties with a slug based on title (if any exist)
UPDATE public.properties SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;

-- Make slug NOT NULL and UNIQUE after update
ALTER TABLE public.properties ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.properties ADD CONSTRAINT properties_slug_unique UNIQUE (slug);
