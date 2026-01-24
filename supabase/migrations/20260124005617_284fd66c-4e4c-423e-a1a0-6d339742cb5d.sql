
-- Create site_images table for admin-managed banner/category images
CREATE TABLE public.site_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text NOT NULL UNIQUE,
    image_url text NOT NULL,
    alt_text text,
    brand text NOT NULL CHECK (brand IN ('azixa', 'simply-azixa', 'shared')),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Public can view site images
CREATE POLICY "Site images are publicly viewable"
ON public.site_images
FOR SELECT
USING (true);

-- Admins can manage site images
CREATE POLICY "Admins can manage site images"
ON public.site_images
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_site_images_updated_at
BEFORE UPDATE ON public.site_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default entries for the category images
INSERT INTO public.site_images (key, image_url, alt_text, brand) VALUES
('azixa-category-prom', '', 'Prom Collection', 'azixa'),
('azixa-category-bridal', '', 'Bridal Collection', 'azixa'),
('azixa-category-occasion', '', 'Occasion Collection', 'azixa'),
('simply-azixa-new-arrivals', '', 'New Arrivals', 'simply-azixa'),
('simply-azixa-hero', '', 'Simply Azixa Hero', 'simply-azixa'),
('azixa-hero', '', 'Azixa Rahman Hero', 'azixa');
