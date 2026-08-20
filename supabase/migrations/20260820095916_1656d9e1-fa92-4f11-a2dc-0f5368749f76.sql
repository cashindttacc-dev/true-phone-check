CREATE TABLE public.imei_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  imei TEXT NOT NULL UNIQUE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  storage TEXT NOT NULL,
  purchase_region TEXT NOT NULL,
  warranty_status TEXT NOT NULL DEFAULT 'Active',
  warranty_until DATE,
  authentic BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.imei_records TO anon;
GRANT SELECT ON public.imei_records TO authenticated;
GRANT ALL ON public.imei_records TO service_role;

ALTER TABLE public.imei_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "IMEI registry is publicly readable"
  ON public.imei_records FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX imei_records_imei_idx ON public.imei_records (imei);

INSERT INTO public.imei_records (imei, brand, model, storage, purchase_region, warranty_status, warranty_until, authentic) VALUES
  ('356938035643809', 'Apple', 'iPhone 15 Pro Max', '256GB', 'Global', 'Active', '2027-03-12', true),
  ('351234567890123', 'Apple', 'iPhone 14 Pro', '256GB', 'US', 'Active', '2026-11-02', true),
  ('354879051234567', 'Apple', 'iPhone 13', '128GB', 'EU', 'Expired', '2024-05-19', true),
  ('359784102938475', 'Samsung', 'Galaxy S24 Ultra', '512GB', 'Global', 'Active', '2027-01-28', true),
  ('353918274650192', 'Samsung', 'Galaxy S23', '256GB', 'Africa', 'Active', '2026-08-15', true),
  ('357612348901234', 'Samsung', 'Galaxy Z Fold 5', '256GB', 'EU', 'Expired', '2025-02-04', true),
  ('358240051111110', 'Google', 'Pixel 8 Pro', '256GB', 'US', 'Active', '2026-10-09', true),
  ('352091847362514', 'Google', 'Pixel 7a', '128GB', 'Global', 'Expired', '2025-06-21', true),
  ('355678129384756', 'Xiaomi', 'Xiaomi 14 Ultra', '512GB', 'Global', 'Active', '2027-04-30', true),
  ('356102938475610', 'Redmi', 'Redmi Note 13 Pro', '256GB', 'Africa', 'Active', '2026-09-12', true),
  ('354765432109876', 'OnePlus', 'OnePlus 12', '256GB', 'EU', 'Active', '2026-12-01', true),
  ('357890123456789', 'Nothing', 'Nothing Phone (2)', '256GB', 'Global', 'Expired', '2025-07-08', true),
  ('351928374655443', 'Sony', 'Xperia 1 V', '256GB', 'EU', 'Active', '2026-07-19', true),
  ('359123456789012', 'Motorola', 'Motorola Edge 40 Pro', '256GB', 'Africa', 'Expired', '2025-03-27', true),
  ('358901234567890', 'Asus', 'ROG Phone 7', '512GB', 'Global', 'Active', '2026-06-14', true);