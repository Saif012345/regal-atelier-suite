import { useState } from "react";
import { Link } from "react-router-dom";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";
import { useProducts, parseColor } from "@/hooks/useProducts";
import categoryAbaya from "@/assets/category-abaya.jpg";

// Numeric sizes 2-24
const sizes = ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"];
const lengths = ["52", "54", "56", "58", "60", "62"];

export default function SimplyAzixaAbayas() {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedLengths, setSelectedLengths] = useState<Record<string, string>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  // Fetch products from database
  const { data: products, isLoading, error } = useProducts("simply-azixa");

  const handleWishlistToggle = (product: NonNullable<typeof products>[0]) => {
    const imageUrl = product.images[0]?.image_url || categoryAbaya;
    
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: imageUrl,
        category: "Abaya",
        isCustom: false,
      });
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (product: NonNullable<typeof products>[0]) => {
    const productColors = product.colors?.map(parseColor) || [];
    const color = selectedColors[product.slug] || productColors[0]?.name || "Default";
    const length = selectedLengths[product.slug] || lengths[0];
    const size = selectedSizes[product.slug] || sizes[0];
    const imageUrl = product.images[0]?.image_url || categoryAbaya;
    
    addToCart({
      id: `${product.slug}-${color}-${length}-${size}`,
      name: `${product.name}`,
      price: product.price,
      image: imageUrl,
      category: "Abaya",
      quantity: 1,
      sizing: {
        type: "standard",
        size: size,
      },
    });
    toast.success(`Added to cart - Size ${size}, ${color}, ${length}" length`);
  };

  if (isLoading) {
    return (
      <SimplyAzixaLayout>
        <SEOHead brand="simply-azixa" title="Abaya Collection | Simply Azixa" />
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </section>
      </SimplyAzixaLayout>
    );
  }

  if (error) {
    return (
      <SimplyAzixaLayout>
        <SEOHead brand="simply-azixa" title="Abaya Collection | Simply Azixa" />
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-destructive">Error loading products. Please try again.</p>
          </div>
        </section>
      </SimplyAzixaLayout>
    );
  }

  const abayas = products || [];

  return (
    <SimplyAzixaLayout>
      <SEOHead 
        brand="simply-azixa" 
        title="Abaya Collection | Simply Azixa"
        description="Shop our curated collection of luxurious abayas designed for the modern woman who values modesty without compromising on style."
      />
      {/* Hero */}
      <section className="bg-charcoal py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-ivory sm:text-5xl mb-4">
            Abaya Collection
          </h1>
          <p className="text-ivory/70 max-w-2xl mx-auto">
            Discover our curated collection of luxurious abayas, designed for the modern woman 
            who values modesty without compromising on style.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {abayas.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">Check back soon for new arrivals.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {abayas.map((abaya, index) => {
                const imageUrl = abaya.images[0]?.image_url || categoryAbaya;
                const productColors = abaya.colors?.map(parseColor) || [];

                return (
                  <div
                    key={abaya.id}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-lg elegant-border mb-4">
                      <Link to={`/product/${abaya.slug}`}>
                        <img
                          src={imageUrl}
                          alt={abaya.name}
                          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      
                      {/* Wishlist Button */}
                      <div className="absolute top-4 right-4">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm"
                          onClick={() => handleWishlistToggle(abaya)}
                        >
                          <Heart
                            className={`h-5 w-5 ${isInWishlist(abaya.slug) ? "fill-primary text-primary" : ""}`}
                          />
                        </Button>
                      </div>

                      {/* Quick Add */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => handleAddToCart(abaya)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link to={`/product/${abaya.slug}`}>
                        <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors">
                          {abaya.name}
                        </h3>
                      </Link>
                      <p className="text-primary font-semibold text-lg">${abaya.price}</p>

                      {/* Size Selection */}
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Size:</span>
                        <div className="flex flex-wrap gap-1">
                          {sizes.slice(0, 6).map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSizes({ ...selectedSizes, [abaya.slug]: size })}
                              className={`w-8 h-8 text-xs rounded border transition-colors ${
                                (selectedSizes[abaya.slug] || sizes[0]) === size
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                          <button
                            className="px-2 h-8 text-xs rounded border border-border text-muted-foreground"
                          >
                            +6
                          </button>
                        </div>
                      </div>

                      {/* Color Options */}
                      {productColors.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Color:</span>
                          <div className="flex gap-1">
                            {productColors.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => setSelectedColors({ ...selectedColors, [abaya.slug]: color.name })}
                                className={`px-2 py-1 text-xs rounded border transition-colors ${
                                  (selectedColors[abaya.slug] || productColors[0]?.name) === color.name
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                {color.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Length Options */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Length:</span>
                        <div className="flex gap-1">
                          {lengths.slice(0, 4).map((length) => (
                            <button
                              key={length}
                              onClick={() => setSelectedLengths({ ...selectedLengths, [abaya.slug]: length })}
                              className={`px-2 py-1 text-xs rounded border transition-colors ${
                                (selectedLengths[abaya.slug] || lengths[0]) === length
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              {length}"
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
