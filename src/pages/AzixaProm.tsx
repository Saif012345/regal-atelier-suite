import { Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { useProducts } from "@/hooks/useProducts";
import heroFormal from "@/assets/hero-formal.jpg";

export default function AzixaProm() {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  // Fetch prom products from database
  const { data: products, isLoading } = useProducts("azixa", "Prom");

  const handleWishlistToggle = (product: NonNullable<typeof products>[0]) => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0]?.image_url || heroFormal,
        category: "Prom",
        isCustom: product.is_custom || false,
      });
      toast.success("Added to wishlist");
    }
  };

  return (
    <AzixaLayout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Prom Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Make your prom night unforgettable with our stunning custom gowns. 
            Each piece is designed to make you shine.
          </p>
          <Link to="/custom-inquiry">
            <Button variant="gold">Start Custom Inquiry</Button>
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No prom dresses available yet.</p>
              <Link to="/custom-inquiry">
                <Button variant="gold" className="mt-4">Request a Custom Design</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => {
                const imageUrl = product.images[0]?.image_url || heroFormal;
                return (
                  <div
                    key={product.id}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-lg elegant-border mb-4">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      
                      <div className="absolute top-4 right-4">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm"
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart
                            className={`h-5 w-5 ${isInWishlist(product.slug) ? "fill-primary text-primary" : ""}`}
                          />
                        </Button>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Link to="/custom-inquiry">
                          <Button variant="gold" className="w-full">
                            Customize This
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-lg font-medium text-foreground">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </AzixaLayout>
  );
}
