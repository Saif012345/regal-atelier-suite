import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FabricSwatch {
  id: string;
  name: string;
  hex_color: string;
  image_url: string | null;
  description: string | null;
  brand: string;
}

export interface ProductFabric {
  id: string;
  product_id: string;
  fabric_id: string;
  fabric: FabricSwatch;
}

// Fetch all fabric swatches
async function fetchAllFabrics(brand?: string): Promise<FabricSwatch[]> {
  let query = supabase
    .from("fabric_swatches")
    .select("*")
    .order("name");

  if (brand) {
    query = query.eq("brand", brand);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

// Fetch fabrics assigned to a specific product
async function fetchProductFabrics(productId: string): Promise<FabricSwatch[]> {
  const { data, error } = await supabase
    .from("product_fabrics")
    .select(`
      id,
      product_id,
      fabric_id,
      fabric_swatches (
        id,
        name,
        hex_color,
        image_url,
        description,
        brand
      )
    `)
    .eq("product_id", productId);

  if (error) {
    throw error;
  }

  // Extract fabric details from the joined data
  return (data || [])
    .map((pf: any) => pf.fabric_swatches)
    .filter((f: FabricSwatch | null): f is FabricSwatch => f !== null);
}

// Hook to get all fabrics
export function useFabrics(brand?: string) {
  return useQuery({
    queryKey: ["fabrics", brand],
    queryFn: () => fetchAllFabrics(brand),
  });
}

// Hook to get fabrics assigned to a product
export function useProductFabrics(productId: string | undefined) {
  return useQuery({
    queryKey: ["product-fabrics", productId],
    queryFn: () => fetchProductFabrics(productId!),
    enabled: !!productId,
  });
}
