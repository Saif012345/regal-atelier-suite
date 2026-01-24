import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number | null;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string | null;
  details: string[] | null;
  category: string;
  brand: string;
  is_custom: boolean | null;
  in_stock: boolean | null;
  colors: string[] | null;
  sizes: string[] | null;
  created_at: string;
  images: ProductImage[];
}

// Parse color string "Name:#hex" to object
export function parseColor(colorStr: string): { name: string; hex: string } {
  const [name, hex] = colorStr.split(":");
  return { name, hex: hex || "#000000" };
}

async function fetchProducts(brand?: string, category?: string): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (brand) {
    query = query.eq("brand", brand);
  }
  if (category) {
    query = query.eq("category", category);
  }

  const { data: products, error } = await query;

  if (error) {
    throw error;
  }

  if (!products || products.length === 0) {
    return [];
  }

  // Fetch images for all products
  const productIds = products.map((p) => p.id);
  const { data: images } = await supabase
    .from("product_images")
    .select("*")
    .in("product_id", productIds)
    .order("display_order");

  // Map images to products
  return products.map((product) => ({
    ...product,
    images: (images || []).filter((img) => img.product_id === product.id),
  }));
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!product) {
    return null;
  }

  // Fetch images for this product
  const { data: images } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", product.id)
    .order("display_order");

  return {
    ...product,
    images: images || [],
  };
}

export function useProducts(brand?: string, category?: string) {
  return useQuery({
    queryKey: ["products", brand, category],
    queryFn: () => fetchProducts(brand, category),
  });
}

export function useProductBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug || ""),
    enabled: !!slug,
  });
}

export function useProductsByBrand(brand: "azixa" | "simply-azixa") {
  return useProducts(brand);
}

export function useProductsByCategory(category: string) {
  return useProducts(undefined, category);
}
