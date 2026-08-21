DROP POLICY IF EXISTS "IMEI registry is publicly readable" ON public.imei_records;
REVOKE SELECT ON public.imei_records FROM anon;
REVOKE SELECT ON public.imei_records FROM authenticated;
GRANT ALL ON public.imei_records TO service_role;