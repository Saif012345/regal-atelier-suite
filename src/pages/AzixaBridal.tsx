import { Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import categoryBridal from "@/assets/category-bridal.jpg";

const bridalDresses = [
  { id: "eternal-grace", name: "Eternal Grace", image: categoryBridal },
  { id: "vintage-romance", name: "Vintage Romance", image: categoryBridal },
  { id: "modern-minimalist", name: "Modern Minimalist", image: categoryBridal },
  { id: "lace-dreams", name: "Lace Dreams", image: categoryBridal },
  { id: "royal-elegance", name: "Royal Elegance", image: categoryBridal },
  { id: "bohemian-bliss", name: "Bohemian Bliss", image: categoryBridal },
];

export default function AzixaBridal() {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  const handleWishlistToggle = (dress: typeof bridalDresses[0]) => {
    if (isInWishlist(dress.id)) {
      removeFromWishlist(dress.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: dress.id,
        name: dress.name,
        image: dress.image,
        category: "Bridal",
        isCustom: true,
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
            Bridal Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Your dream wedding dress, crafted just for you. Each bridal gown is 
            a masterpiece of elegance and timeless beauty.
          </p>
          <Link to="/custom-inquiry">
            <Button variant="gold">Start Custom Inquiry</Button>
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bridalDresses.map((dress, index) => (
              <div
                key={dress.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg elegant-border mb-4">
                  <Link to={`/bridal/${dress.id}`}>
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm"
                      onClick={() => handleWishlistToggle(dress)}
                    >
                      <Heart
                        className={`h-5 w-5 ${isInWishlist(dress.id) ? "fill-primary text-primary" : ""}`}
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
                  <Link to={`/bridal/${dress.id}`}>
                    <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors">
                      {dress.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">Custom Pricing</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AzixaLayout>
  );
}
