import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Heart, Filter } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { products, getProductsByBrand } from "@/data/products";

// Get only Azixa Rahman products for the shop
const azixaProducts = getProductsByBrand("azixa").map(p => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image: p.images[0],
  category: p.category,
  isCustom: p.isCustom,
}));

const colors = ["All", "Black", "White", "Ivory", "Blue", "Pink", "Red", "Green", "Silver", "Gold"];
const sizes = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const categoryParam = searchParams.get("category") || "all";
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = azixaProducts;

    // Category filter
    if (categoryParam !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase());
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [categoryParam, priceRange, sortBy]);

  const handleWishlistToggle = (product: typeof azixaProducts[0]) => {
    if (isInWishlist(product.id)) {
      return;
    }

    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      isCustom: product.isCustom,
    });

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Shop Collection
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our exquisite collection of luxury formal wear
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs value={categoryParam} onValueChange={(v) => setSearchParams({ category: v })} className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="prom">Prom</TabsTrigger>
              <TabsTrigger value="bridal">Bridal</TabsTrigger>
              <TabsTrigger value="occasion">Occasion</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="font-display text-xl font-semibold">Filters</h3>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <Label className="mb-3 block">Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Sizes</SelectItem>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={100}
                    className="mb-2"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg font-medium text-foreground mb-2">No products found</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try adjusting your filters
                  </p>
                  <Button variant="gold" onClick={() => {
                    setSelectedSize("All");
                    setPriceRange([0, 5000]);
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group">
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleWishlistToggle(product);
                            }}
                            className={`absolute top-3 right-3 h-10 w-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
                              isInWishlist(product.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-card/90 hover:bg-primary hover:text-primary-foreground"
                            }`}
                            aria-label="Add to wishlist"
                          >
                            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                          </button>
                        </div>
                      </Link>
                      <div className="space-y-2">
                        <p className="text-xs font-medium tracking-widest text-primary uppercase">
                          {product.category}
                        </p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-display text-xl font-medium text-foreground hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        {!product.isCustom && (
                          <p className="text-lg font-medium text-foreground">
                            ${product.price.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
