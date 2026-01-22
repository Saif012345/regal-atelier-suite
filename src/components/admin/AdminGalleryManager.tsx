import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  category: string;
  brand: string;
  href: string | null;
  display_order: number;
  created_at: string;
}

export function AdminGalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    caption: "",
    category: "Prom",
    brand: "azixa",
    href: "",
    imageFile: null as File | null,
  });

  const fetchImages = useCallback(async () => {
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('display_order')
      .order('created_at', { ascending: false });
    
    if (brandFilter !== "all") {
      query = query.eq('brand', brandFilter);
    }
    
    const { data, error } = await query;
    
    if (error) {
      toast({
        title: "Error fetching gallery images",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setImages(data || []);
    }
  }, [brandFilter, toast]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const resetForm = () => {
    setFormData({
      caption: "",
      category: "Prom",
      brand: "azixa",
      href: "",
      imageFile: null,
    });
    setSelectedImage(null);
    setPreviewUrl("");
  };

  const openEditDialog = (image: GalleryImage) => {
    setSelectedImage(image);
    setFormData({
      caption: image.caption || "",
      category: image.category,
      brand: image.brand,
      href: image.href || "",
      imageFile: null,
    });
    setPreviewUrl(image.image_url);
    setIsDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const getDefaultHref = (brand: string, category: string) => {
    if (brand === "simply-azixa") {
      return "/simply-azixa/abayas";
    }
    const categoryLower = category.toLowerCase();
    if (categoryLower === "prom") return "/azixa/prom";
    if (categoryLower === "bridal") return "/azixa/bridal";
    if (categoryLower === "occasion") return "/azixa/occasion";
    return "/azixa";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = selectedImage?.image_url || "";

      // Upload new image if provided
      if (formData.imageFile) {
        setUploadingImage(true);
        const fileExt = formData.imageFile.name.split('.').pop();
        const fileName = `${formData.brand}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery-images')
          .upload(fileName, formData.imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
        setUploadingImage(false);
      }

      if (!imageUrl && !selectedImage) {
        throw new Error("Please upload an image");
      }

      const imageData = {
        image_url: imageUrl,
        caption: formData.caption || null,
        category: formData.category,
        brand: formData.brand,
        href: formData.href || getDefaultHref(formData.brand, formData.category),
        display_order: selectedImage?.display_order || images.length,
      };

      if (selectedImage) {
        // Update existing image
        const { error } = await supabase
          .from('gallery_images')
          .update(imageData)
          .eq('id', selectedImage.id);

        if (error) throw error;
        
        toast({
          title: "Image updated",
          description: "Gallery image has been updated successfully.",
        });
      } else {
        // Create new image
        const { error } = await supabase
          .from('gallery_images')
          .insert(imageData);

        if (error) throw error;
        
        toast({
          title: "Image added",
          description: "New image has been added to the gallery.",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setUploadingImage(false);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      // Extract file path from URL and delete from storage
      const urlParts = image.image_url.split('/gallery-images/');
      if (urlParts[1]) {
        await supabase.storage.from('gallery-images').remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;

      toast({
        title: "Image deleted",
        description: "Gallery image has been removed.",
      });
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gallery Management</CardTitle>
          <CardDescription>Upload and manage showcase images for both brands</CardDescription>
        </div>
        <div className="flex gap-4">
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="azixa">Azixa Rahman</SelectItem>
              <SelectItem value="simply-azixa">Simply Azixa</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="gold">
                <Plus className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {selectedImage ? "Edit Gallery Image" : "Add Gallery Image"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Image</Label>
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full aspect-[3/4] object-cover rounded-lg"
                      />
                      <label className="absolute bottom-2 right-2 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button type="button" variant="secondary" size="sm" asChild>
                          <span>Change Image</span>
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!selectedImage}
                      />
                      <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                      <span className="text-muted-foreground">Click to upload image</span>
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select
                      value={formData.brand}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="azixa">Azixa Rahman</SelectItem>
                        <SelectItem value="simply-azixa">Simply Azixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Prom">Prom</SelectItem>
                        <SelectItem value="Bridal">Bridal</SelectItem>
                        <SelectItem value="Occasion">Occasion</SelectItem>
                        <SelectItem value="Abaya">Abaya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caption">Caption</Label>
                  <Input
                    id="caption"
                    value={formData.caption}
                    onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="e.g., Lavender Sequin Elegance"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="href">Link URL (optional)</Label>
                  <Input
                    id="href"
                    value={formData.href}
                    onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
                    placeholder="e.g., /azixa/prom"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use default link based on brand and category
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" disabled={isLoading || uploadingImage}>
                    {isLoading || uploadingImage
                      ? "Uploading..."
                      : selectedImage
                      ? "Update Image"
                      : "Add Image"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No gallery images found. Upload your first image to get started.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.image_url}
                  alt={image.caption || "Gallery image"}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    image.brand === "azixa" 
                      ? "bg-primary/90 text-primary-foreground" 
                      : "bg-secondary/90 text-secondary-foreground"
                  }`}>
                    {image.brand === "azixa" ? "Azixa" : "Simply"}
                  </span>
                </div>
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 rounded-lg">
                  <p className="text-ivory text-sm text-center px-2">{image.caption}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(image)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(image)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
