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

// Parse color string "Name:#hex" or just "Name" to object
export function parseColor(colorStr: string): { name: string; hex: string } {
  if (colorStr.includes(":")) {
    const [name, hex] = colorStr.split(":");
    return { name, hex: hex || "#000000" };
  }
  // If no hex provided, return a default based on common color names
  const colorMap: Record<string, string> = {
    "Black": "#1a1a1a",
    "White": "#ffffff",
    "Ivory": "#fffff0",
    "Navy": "#1e3a5f",
    "Navy Blue": "#1e3a5f",
    "Royal Blue": "#4169e1",
    "Sky Blue": "#87ceeb",
    "Red": "#dc2626",
    "Burgundy": "#722f37",
    "Pink": "#ec4899",
    "Blush": "#e8c4c4",
    "Rose": "#d4a5a5",
    "Gold": "#d4af37",
    "Silver": "#c0c0c0",
    "Emerald Green": "#50c878",
    "Green": "#22c55e",
    "Mint": "#98fb98",
    "Lilac": "#c8a2c8",
    "Purple": "#9333ea",
    "Orange": "#f97316",
    "Yellow": "#facc15",
    "Peach": "#ffcba4",
    "Brown": "#8b4513",
    "Teal": "#4a7c7c",
    "Mauve": "#b8a5b8",
  };
  return { name: colorStr, hex: colorMap[colorStr] || "#6b7280" };
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
