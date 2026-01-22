-- Create app_role enum for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create has_role function (security definer to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - only admins can view roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  details TEXT[],
  category TEXT NOT NULL CHECK (category IN ('Prom', 'Bridal', 'Occasion', 'Abaya')),
  brand TEXT NOT NULL CHECK (brand IN ('azixa', 'simply-azixa')),
  is_custom BOOLEAN DEFAULT false,
  colors TEXT[],
  sizes TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are publicly viewable"
ON public.products
FOR SELECT
USING (true);

-- Only admins can manage products
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create product_images table
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on product_images
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Product images are publicly readable
CREATE POLICY "Product images are publicly viewable"
ON public.product_images
FOR SELECT
USING (true);

-- Only admins can manage product images
CREATE POLICY "Admins can manage product images"
ON public.product_images
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT NOT NULL,
  brand TEXT NOT NULL CHECK (brand IN ('azixa', 'simply-azixa')),
  href TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Gallery images are publicly readable
CREATE POLICY "Gallery images are publicly viewable"
ON public.gallery_images
FOR SELECT
USING (true);

-- Only admins can manage gallery images
CREATE POLICY "Admins can manage gallery images"
ON public.gallery_images
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);

-- Storage policies for product images
CREATE POLICY "Product images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for gallery images
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery-images');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger for products
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();