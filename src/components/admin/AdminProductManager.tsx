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
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";

interface Product {
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
  created_at: string;
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
}

export function AdminProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [allProductImages, setAllProductImages] = useState<Record<string, ProductImage[]>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    details: "",
    category: "Prom",
    brand: "azixa",
    is_custom: false,
    in_stock: true,
  });

  const fetchProducts = useCallback(async () => {
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    
    if (brandFilter !== "all") {
      query = query.eq('brand', brandFilter);
    }
    
    const { data, error } = await query;
    
    if (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
  }, [brandFilter, toast]);

  const fetchProductImages = async (productId: string) => {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order');
    
    if (!error && data) {
      setProductImages(data);
    }
  };

  const fetchAllProductImages = useCallback(async (productIds: string[]) => {
    if (productIds.length === 0) return;
    
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .in('product_id', productIds)
      .order('display_order');
    
    if (!error && data) {
      const grouped = data.reduce((acc, img) => {
        if (!acc[img.product_id]) {
          acc[img.product_id] = [];
        }
        acc[img.product_id].push(img);
        return acc;
      }, {} as Record<string, ProductImage[]>);
      setAllProductImages(grouped);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      fetchAllProductImages(products.map(p => p.id));
    }
  }, [products, fetchAllProductImages]);

  useEffect(() => {
    if (selectedProduct) {
      fetchProductImages(selectedProduct.id);
    }
  }, [selectedProduct]);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      price: "",
      description: "",
      details: "",
      category: "Prom",
      brand: "azixa",
      is_custom: false,
      in_stock: true,
    });
    setSelectedProduct(null);
    setProductImages([]);
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      description: product.description || "",
      details: product.details?.join("\n") || "",
      category: product.category,
      brand: product.brand,
      is_custom: product.is_custom || false,
      in_stock: product.in_stock ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const productData = {
      name: formData.name,
      slug: formData.slug,
      price: parseFloat(formData.price),
      description: formData.description || null,
      details: formData.details ? formData.details.split("\n").filter(d => d.trim()) : null,
      category: formData.category,
      brand: formData.brand,
      is_custom: formData.is_custom,
      in_stock: formData.in_stock,
    };

    try {
      if (selectedProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', selectedProduct.id);

        if (error) throw error;
        
        toast({
          title: "Product updated",
          description: `${formData.name} has been updated successfully.`,
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        
        toast({
          title: "Product created",
          description: `${formData.name} has been added to your catalog.`,
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Product deleted",
        description: `${product.name} has been removed.`,
      });
      fetchProducts();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProduct || !e.target.files?.length) return;
    
    setUploadingImage(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${selectedProduct.id}/${Date.now()}.${fileExt}`;

    try {
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      // Save to product_images table
      const { error: dbError } = await supabase
        .from('product_images')
        .insert({
          product_id: selectedProduct.id,
          image_url: urlData.publicUrl,
          display_order: productImages.length,
        });

      if (dbError) throw dbError;

      toast({
        title: "Image uploaded",
        description: "Product image has been added successfully.",
      });
      
      fetchProductImages(selectedProduct.id);
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

  const handleDeleteImage = async (image: ProductImage) => {
    try {
      // Extract file path from URL
      const urlParts = image.image_url.split('/product-images/');
      if (urlParts[1]) {
        await supabase.storage.from('product-images').remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from('product_images')
        .delete()
        .eq('id', image.id);

      if (error) throw error;

      toast({
        title: "Image deleted",
        description: "Product image has been removed.",
      });
      
      if (selectedProduct) {
        fetchProductImages(selectedProduct.id);
      }
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
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Add and manage products for both brands</CardDescription>
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
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Details (one per line)</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    rows={4}
                    placeholder="Beaded lace fabric&#10;Mermaid silhouette&#10;Hidden back zipper"
                  />
                </div>

                {selectedProduct && (
                  <div className="space-y-2">
                    <Label>Product Images</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {productImages.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.image_url}
                            alt="Product"
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img)}
                            className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <label className="flex items-center justify-center aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {uploadingImage ? "Uploading..." : "Upload"}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gold" disabled={isLoading}>
                    {isLoading ? "Saving..." : selectedProduct ? "Update Product" : "Create Product"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No products found. Add your first product to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg"
              >
                <div className="h-16 w-16 bg-muted rounded flex items-center justify-center overflow-hidden">
                  {allProductImages[product.id]?.[0] ? (
                    <img
                      src={allProductImages[product.id][0].image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.brand === "azixa" ? "Azixa Rahman" : "Simply Azixa"} • {product.category} • ${product.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
