import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useSiteImages, useUpdateSiteImage } from "@/hooks/useSiteImages";

const IMAGE_LABELS: Record<string, { label: string; description: string }> = {
  "azixa-category-prom": { label: "Prom Category", description: "Category card image on Azixa Rahman homepage" },
  "azixa-category-bridal": { label: "Bridal Category", description: "Category card image on Azixa Rahman homepage" },
  "azixa-category-occasion": { label: "Occasion Category", description: "Category card image on Azixa Rahman homepage" },
  "azixa-hero": { label: "Azixa Hero", description: "Hero background on Azixa Rahman homepage" },
  "simply-azixa-new-arrivals": { label: "New Arrivals", description: "Featured collection image on Simply Azixa homepage" },
  "simply-azixa-hero": { label: "Simply Azixa Hero", description: "Hero background on Simply Azixa homepage" },
};

export function AdminSiteImagesManager() {
  const { data: siteImages, isLoading } = useSiteImages();
  const updateSiteImage = useUpdateSiteImage();
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setUploadingKey(key);
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `site-images/${key}-${Date.now()}.${fileExt}`;

    try {
      // Upload to storage (using gallery-images bucket for site images)
      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(fileName);

      // Update site_images table
      await updateSiteImage.mutateAsync({
        key,
        image_url: urlData.publicUrl,
      });

      toast({
        title: "Image updated",
        description: "Site image has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingKey(null);
    }
  };

  const azixaImages = siteImages?.filter((img) => img.brand === "azixa") || [];
  const simplyAzixaImages = siteImages?.filter((img) => img.brand === "simply-azixa") || [];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-muted-foreground text-center">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Azixa Rahman Images</CardTitle>
          <CardDescription>Manage homepage category and hero images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {azixaImages.map((img) => (
              <div key={img.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">
                      {IMAGE_LABELS[img.key]?.label || img.key}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {IMAGE_LABELS[img.key]?.description}
                    </p>
                  </div>
                </div>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {img.image_url ? (
                    <img
                      src={img.image_url}
                      alt={img.alt_text || img.key}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(img.key, e)}
                    className="hidden"
                    disabled={uploadingKey === img.key}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                    disabled={uploadingKey === img.key}
                  >
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingKey === img.key ? "Uploading..." : "Upload Image"}
                    </span>
                  </Button>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simply Azixa Images</CardTitle>
          <CardDescription>Manage homepage hero and featured collection images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simplyAzixaImages.map((img) => (
              <div key={img.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">
                      {IMAGE_LABELS[img.key]?.label || img.key}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {IMAGE_LABELS[img.key]?.description}
                    </p>
                  </div>
                </div>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {img.image_url ? (
                    <img
                      src={img.image_url}
                      alt={img.alt_text || img.key}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(img.key, e)}
                    className="hidden"
                    disabled={uploadingKey === img.key}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                    disabled={uploadingKey === img.key}
                  >
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingKey === img.key ? "Uploading..." : "Upload Image"}
                    </span>
                  </Button>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
