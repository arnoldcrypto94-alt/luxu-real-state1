-- Seed data for LuxeEstate

-- 1. Create seed users
INSERT INTO public.users (id, full_name, email, password_hash)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, 'Sarah Jenkins', 'sarah.jenkins@luxeestate.com', '$2b$10$X7lC.k5Vwz7kR5Z/7Zz4ZuVz2v1.p6v7z8x9y0z1a2b3c4d5e6f7g'), -- Password: password123 (hashed)
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'::uuid, 'Michael Chen', 'michael.chen@luxeestate.com', '$2b$10$X7lC.k5Vwz7kR5Z/7Zz4ZuVz2v1.p6v7z8x9y0z1a2b3c4d5e6f7g'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'::uuid, 'Emma Watson', 'emma.watson@luxeestate.com', '$2b$10$X7lC.k5Vwz7kR5Z/7Zz4ZuVz2v1.p6v7z8x9y0z1a2b3c4d5e6f7g')
ON CONFLICT (email) DO NOTHING;

-- 2. Create properties (at least 30)
INSERT INTO public.properties (
  owner_id, title, slug, price, price_period, status, type, description, 
  address, city, state, zip, country, latitude, longitude, area, 
  bedrooms, bathrooms, parking, amenities, images, is_featured, is_exclusive
)
VALUES 
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, 
    'The Glass Pavilion', 
    'the-glass-pavilion', 
    5250000, 
    NULL, 
    'for-sale', 
    'villa', 
    'Experience modern luxury in this architecturally stunning home located in the heart of Beverly Hills. Designed with an emphasis on indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light.', 
    '9505 Heather Rd', 'Beverly Hills', 'CA', '90210', 'USA', 
    34.1030, -118.4105, 4200, 5, 4.5, 4, 
    '["Smart Home System", "Swimming Pool", "Wine Cellar", "Private Gym", "Central Cooling"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM", "https://picsum.photos/seed/gp1/1200/800", "https://picsum.photos/seed/gp2/1200/800", "https://picsum.photos/seed/gp3/1200/800", "https://picsum.photos/seed/gp4/1200/800"]', 
    TRUE, TRUE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, 
    'Azure Heights Penthouse', 
    'azure-heights-penthouse', 
    3800000, 
    NULL, 
    'for-sale', 
    'penthouse', 
    'Spectacular penthouse with panoramic views of Vancouver city skyline and the mountains. Featuring ultra-high-end finishes and a massive wrap-around terrace.', 
    '1151 W Georgia St', 'Vancouver', 'BC', 'V6E 0B3', 'Canada', 
    49.2858, -123.1219, 2100, 3, 3, 2, 
    '["Roof Terrace", "24/7 Concierge", "Sauna", "Smart Home", "Floor-to-Ceiling Windows"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s", "https://picsum.photos/seed/ahp1/1200/800", "https://picsum.photos/seed/ahp2/1200/800", "https://picsum.photos/seed/ahp3/1200/800", "https://picsum.photos/seed/ahp4/1200/800"]', 
    TRUE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'::uuid, 
    'Modern Family Home', 
    'modern-family-home', 
    850000, 
    NULL, 
    'for-sale', 
    'house', 
    'Stylish and spacious family home in a quiet neighborhood of Seattle. Perfect for modern living with open floor plans and a large backyard.', 
    '123 Pine St', 'Seattle', 'WA', '98101', 'USA', 
    47.6101, -122.3333, 120, 3, 2, 1, 
    '["Garden", "Modern Kitchen", "Fireplace", "Smart Lock", "Garage"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E", "https://picsum.photos/seed/mfh1/1200/800", "https://picsum.photos/seed/mfh2/1200/800", "https://picsum.photos/seed/mfh3/1200/800", "https://picsum.photos/seed/mfh4/1200/800"]', 
    FALSE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'::uuid, 
    'Urban Loft', 
    'urban-loft', 
    3200, 
    'mo', 
    'for-rent', 
    'apartment', 
    'Industrial-chic loft in the heart of Portland Pearl District. High ceilings, exposed brick, and original hardwood floors.', 
    '456 Elm Ave', 'Portland', 'OR', '97209', 'USA', 
    45.5231, -122.6765, 85, 1, 1, 0, 
    '["Exposed Brick", "High Ceilings", "Rooftop Access", "Gym", "Bike Storage"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4", "https://picsum.photos/seed/ul1/1200/800", "https://picsum.photos/seed/ul2/1200/800", "https://picsum.photos/seed/ul3/1200/800", "https://picsum.photos/seed/ul4/1200/800"]', 
    FALSE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'::uuid, 
    'Highland Retreat', 
    'highland-retreat', 
    620000, 
    NULL, 
    'for-sale', 
    'house', 
    'Cozy cabin retreat in the mountains of Bend. Stunning views of the Three Sisters and easy access to outdoor trails.', 
    '789 Mountain Rd', 'Bend', 'OR', '97701', 'USA', 
    44.0582, -121.3153, 98, 2, 2, 2, 
    '["Mountain Views", "Deck", "Hot Tub", "Wood Stove", "Privacy"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro", "https://picsum.photos/seed/hr1/1200/800", "https://picsum.photos/seed/hr2/1200/800", "https://picsum.photos/seed/hr3/1200/800", "https://picsum.photos/seed/hr4/1200/800"]', 
    FALSE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'::uuid, 
    'Sea View Penthouse', 
    'sea-view-penthouse', 
    4500, 
    'mo', 
    'for-rent', 
    'penthouse', 
    'Luxury penthouse with direct ocean views in Miami Beach. Recently renovated with top-tier appliances and bespoke interiors.', 
    '321 Ocean Dr', 'Miami', 'FL', '33139', 'USA', 
    25.7712, -80.1300, 180, 3, 3, 1, 
    '["Ocean View", "Private Elevator", "Valet Parking", "Pool", "Smart Home"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U", "https://picsum.photos/seed/svp1/1200/800", "https://picsum.photos/seed/svp2/1200/800", "https://picsum.photos/seed/svp3/1200/800", "https://picsum.photos/seed/svp4/1200/800"]', 
    FALSE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, 
    'Central Studio', 
    'central-studio', 
    550000, 
    NULL, 
    'for-sale', 
    'apartment', 
    'Minimalist studio apartment in Downtown Chicago. Perfect pied-à-terre for the urban professional.', 
    '555 Main St', 'Chicago', 'IL', '60601', 'USA', 
    41.8781, -87.6298, 50, 1, 1, 0, 
    '["Central Location", "City Views", "24/7 Security", "Gym", "Minimalist Design"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE", "https://picsum.photos/seed/cs1/1200/800", "https://picsum.photos/seed/cs2/1200/800", "https://picsum.photos/seed/cs3/1200/800", "https://picsum.photos/seed/cs4/1200/800"]', 
    FALSE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'::uuid, 
    'Garden Villa', 
    'garden-villa', 
    2800, 
    'mo', 
    'for-rent', 
    'villa', 
    'Charming garden villa with a Mediterranean feel in the Zilker neighborhood of Austin. Features a lush private garden and pool.', 
    '999 Oak Ln', 'Austin', 'TX', '78704', 'USA', 
    30.2500, -97.7700, 110, 2, 2, 1, 
    '["Private Garden", "Swimming Pool", "Outdoor Kitchen", "Quiet Street", "Hardwood Floors"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8", "https://picsum.photos/seed/gv1/1200/800", "https://picsum.photos/seed/gv2/1200/800", "https://picsum.photos/seed/gv3/1200/800", "https://picsum.photos/seed/gv4/1200/800"]', 
    FALSE, FALSE
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, 
    'Palo Alto Serenity', 
    'palo-alto-serenity', 
    1250000, 
    NULL, 
    'for-sale', 
    'house', 
    'Experience modern luxury in this architecturally stunning home located in the heart of Palo Alto. Designed with an emphasis on indoor-outdoor living, the residence features floor-to-ceiling glass walls.', 
    '1234 Serenity Lane', 'Palo Alto', 'CA', '94301', 'USA', 
    37.4419, -122.1430, 240, 4, 3, 2, 
    '["Smart Home System", "Swimming Pool", "Central Heating", "EV Charging", "Private Gym", "Wine Cellar"]', 
    '["https://lh3.googleusercontent.com/aida-public/AB6AXuBjNDU9iE4zwPuWeg-CjIrLI-87GF24_LgOggcXT0vmUYfMx2q1dJAheiqWqVN-39uiwyLKEfP18FsG1vtUyAPX902OhGEfM4clcQiDsJW7MBbc_BoMtZXtqIeFKIfkHnkIPwmFbQg8Eaan6ULV99T8AUVUuKsro0HoTMrIaxw5pp1uSuQlF8X5Dait4US1W4vmyZnVioXbFnCoaOOZ0LPorb0rVGAIQd9reWcpqq27C0oO4ltnsCTHIcjIm0xp-2qVbRJSIZzWPv0", "https://picsum.photos/seed/pas1/1200/800", "https://picsum.photos/seed/pas2/1200/800", "https://picsum.photos/seed/pas3/1200/800", "https://picsum.photos/seed/pas4/1200/800"]', 
    TRUE, FALSE
  );

-- 3. Add 21 more properties to reach 30
DO $$
BEGIN
  FOR i IN 1..21 LOOP
    INSERT INTO public.properties (
      owner_id, title, slug, price, price_period, status, type, description, 
      address, city, state, zip, country, latitude, longitude, area, 
      bedrooms, bathrooms, parking, amenities, images, is_featured, is_exclusive
    )
    VALUES (
      (CASE WHEN i % 3 = 0 THEN 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
           WHEN i % 3 = 1 THEN 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
           ELSE 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'
      END)::uuid,
      'Property Variation ' || i,
      'property-variation-' || i,
      (random() * 5000000 + 500000)::numeric,
      CASE WHEN random() > 0.7 THEN 'mo' ELSE NULL END,
      CASE WHEN random() > 0.7 THEN 'for-rent' ELSE 'for-sale' END,
      CASE WHEN i % 4 = 0 THEN 'house'
           WHEN i % 4 = 1 THEN 'apartment'
           WHEN i % 4 = 2 THEN 'villa'
           ELSE 'penthouse'
      END,
      'A beautiful luxury property offering modern amenities and prime location. Perfect for those seeking the ultimate lifestyle experience.',
      (i * 100) || ' Luxury Street',
      CASE WHEN i % 5 = 0 THEN 'Los Angeles'
           WHEN i % 5 = 1 THEN 'New York'
           WHEN i % 5 = 2 THEN 'San Francisco'
           WHEN i % 5 = 3 THEN 'Miami'
           ELSE 'Chicago'
      END,
      'ST', '12345', 'USA',
      30.0 + random() * 20.0, -120.0 + random() * 40.0,
      (random() * 500 + 50)::numeric,
      (random() * 5 + 1)::integer,
      (random() * 4 + 1)::numeric,
      (random() * 3)::integer,
      '["Smart Home", "Pool", "Gym", "Security", "View"]',
      jsonb_build_array(
        'https://picsum.photos/seed/prop' || i || 'a/1200/800',
        'https://picsum.photos/seed/prop' || i || 'b/1200/800',
        'https://picsum.photos/seed/prop' || i || 'c/1200/800',
        'https://picsum.photos/seed/prop' || i || 'd/1200/800',
        'https://picsum.photos/seed/prop' || i || 'e/1200/800'
      ),
      random() > 0.8,
      random() > 0.9
    );
  END LOOP;
END $$;
