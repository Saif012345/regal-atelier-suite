import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteImage {
  id: string;
  key: string;
  image_url: string;
  alt_text: string | null;
  brand: string;
  created_at: string;
  updated_at: string;
}

async function fetchSiteImages(): Promise<SiteImage[]> {
  const { data, error } = await supabase
    .from("site_images")
    .select("*")
    .order("key");

  if (error) {
    throw error;
  }

  return data || [];
}

async function fetchSiteImageByKey(key: string): Promise<SiteImage | null> {
  const { data, error } = await supabase
    .from("site_images")
    .select("*")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export function useSiteImages() {
  return useQuery({
    queryKey: ["site-images"],
    queryFn: fetchSiteImages,
  });
}

export function useSiteImage(key: string) {
  return useQuery({
    queryKey: ["site-image", key],
    queryFn: () => fetchSiteImageByKey(key),
    enabled: !!key,
  });
}

export function useUpdateSiteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, image_url, alt_text }: { key: string; image_url: string; alt_text?: string }) => {
      const { error } = await supabase
        .from("site_images")
        .update({ image_url, alt_text })
        .eq("key", key);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
      queryClient.invalidateQueries({ queryKey: ["site-image"] });
    },
  });
}

// Utility hook to get image URL with fallback
export function useSiteImageUrl(key: string, fallback: string): string {
  const { data } = useSiteImage(key);
  return data?.image_url && data.image_url.length > 0 ? data.image_url : fallback;
}
