import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";

interface FabricSwatch {
  id: string;
  name: string;
  hex_color: string;
  image_url: string | null;
  description: string | null;
  brand: string;
  created_at: string;
}

export function AdminFabricManager() {
  const [fabrics, setFabrics] = useState<FabricSwatch[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<FabricSwatch | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    hex_color: "#000000",
    description: "",
    brand: "azixa",
    image_url: "",
  });

  const fetchFabrics = useCallback(async () => {
    setIsFetching(true);
    let query = supabase.from('fabric_swatches').select('*').order('name');
    
    if (brandFilter !== "all") {
      query = query.eq('brand', brandFilter);
    }
    
    const { data, error } = await query;
    
    if (error) {
      toast({
        title: "Error fetching fabrics",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setFabrics(data || []);
    }
    setIsFetching(false);
  }, [brandFilter, toast]);

  useEffect(() => {
    fetchFabrics();
  }, [fetchFabrics]);

  const resetForm = () => {
    setFormData({
      name: "",
      hex_color: "#000000",
      description: "",
      brand: "azixa",
      image_url: "",
    });
    setSelectedFabric(null);
  };

  const openEditDialog = (fabric: FabricSwatch) => {
    setSelectedFabric(fabric);
    setFormData({
      name: fabric.name,
      hex_color: fabric.hex_color,
      description: fabric.description || "",
      brand: fabric.brand,
      image_url: fabric.image_url || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const fabricData = {
      name: formData.name,
      hex_color: formData.hex_color,
      description: formData.description || null,
      brand: formData.brand,
      image_url: formData.image_url || null,
    };

    try {
      if (selectedFabric) {
        const { error } = await supabase
          .from('fabric_swatches')
          .update(fabricData)
          .eq('id', selectedFabric.id);

        if (error) throw error;
        
        toast({
          title: "Fabric updated",
          description: `${formData.name} has been updated successfully.`,
        });
      } else {
        const { error } = await supabase
          .from('fabric_swatches')
          .insert(fabricData);

        if (error) throw error;
        
        toast({
          title: "Fabric created",
          description: `${formData.name} has been added to your fabric library.`,
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchFabrics();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save fabric",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (fabric: FabricSwatch) => {
    if (!confirm(`Are you sure you want to delete ${fabric.name}?`)) return;

    try {
      // Delete image from storage if exists
      if (fabric.image_url) {
        const urlParts = fabric.image_url.split('/fabric-swatches/');
        if (urlParts[1]) {
          await supabase.storage.from('fabric-swatches').remove([urlParts[1]]);
        }
      }

      const { error } = await supabase
        .from('fabric_swatches')
        .delete()
        .eq('id', fabric.id);

      if (error) throw error;

      toast({
        title: "Fabric deleted",
        description: `${fabric.name} has been removed.`,
      });
      fetchFabrics();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploadingImage(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('fabric-swatches')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('fabric-swatches')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: urlData.publicUrl }));

      toast({
        title: "Image uploaded",
        description: "Fabric swatch image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = async () => {
    if (formData.image_url) {
      const urlParts = formData.image_url.split('/fabric-swatches/');
      if (urlParts[1]) {
        await supabase.storage.from('fabric-swatches').remove([urlParts[1]]);
      }
    }
    setFormData(prev => ({ ...prev, image_url: "" }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <CardTitle className="text-lg sm:text-xl">Fabric Swatches</CardTitle>
          <CardDescription className="text-sm">
            Manage fabric swatches that can be assigned to products
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
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
              <Button variant="gold" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Fabric
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {selectedFabric ? "Edit Fabric" : "Add New Fabric"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Fabric Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Silk Charmeuse, Satin, Velvet"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hex_color">Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="hex_color"
                        type="color"
                        value={formData.hex_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, hex_color: e.target.value }))}
                        className="w-14 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={formData.hex_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, hex_color: e.target.value }))}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the fabric texture, weight, and characteristics..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Swatch Image (optional)</Label>
                  {formData.image_url ? (
                    <div className="relative inline-block">
                      <img
                        src={formData.image_url}
                        alt="Fabric swatch"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={removeImage}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="fabric-image-upload"
                      />
                      <Label
                        htmlFor="fabric-image-upload"
                        className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                      >
                        {uploadingImage ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        Upload Image
                      </Label>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : selectedFabric ? (
                      "Update Fabric"
                    ) : (
                      "Add Fabric"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : fabrics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No fabric swatches added yet.</p>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Fabric
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {fabrics.map((fabric) => (
              <div
                key={fabric.id}
                className="group relative border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow"
              >
                {/* Swatch Display */}
                <div className="aspect-square relative">
                  {fabric.image_url ? (
                    <img
                      src={fabric.image_url}
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: fabric.hex_color }}
                    />
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(fabric)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={() => handleDelete(fabric)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-2">
                  <p className="font-medium text-sm truncate">{fabric.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: fabric.hex_color }}
                    />
                    <span className="truncate">
                      {fabric.brand === 'azixa' ? 'Azixa Rahman' : 'Simply Azixa'}
                    </span>
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
