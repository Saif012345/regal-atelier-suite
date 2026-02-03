-- Create fabric swatches table
CREATE TABLE public.fabric_swatches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  hex_color TEXT NOT NULL DEFAULT '#000000',
  image_url TEXT,
  description TEXT,
  brand TEXT NOT NULL DEFAULT 'azixa',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction table for product-fabric relationships
CREATE TABLE public.product_fabrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  fabric_id UUID NOT NULL REFERENCES public.fabric_swatches(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, fabric_id)
);

-- Enable RLS
ALTER TABLE public.fabric_swatches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_fabrics ENABLE ROW LEVEL SECURITY;

-- Policies for fabric_swatches
CREATE POLICY "Fabric swatches are publicly viewable"
ON public.fabric_swatches
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage fabric swatches"
ON public.fabric_swatches
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Policies for product_fabrics
CREATE POLICY "Product fabrics are publicly viewable"
ON public.product_fabrics
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product fabrics"
ON public.product_fabrics
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_fabric_swatches_updated_at
BEFORE UPDATE ON public.fabric_swatches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for fabric images
INSERT INTO storage.buckets (id, name, public) VALUES ('fabric-swatches', 'fabric-swatches', true);

-- Storage policies for fabric swatches
CREATE POLICY "Fabric swatch images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'fabric-swatches');

CREATE POLICY "Admins can upload fabric swatch images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'fabric-swatches' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update fabric swatch images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'fabric-swatches' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete fabric swatch images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'fabric-swatches' AND has_role(auth.uid(), 'admin'::app_role));