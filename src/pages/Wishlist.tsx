import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart, X, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();
  const location = useLocation();
  
  // Determine which brand context based on referrer or item categories
  const hasAbayas = items.some(item => item.category === "Abaya");
  const isSimplyAzixaContext = hasAbayas || location.state?.from === "simply-azixa";

  const handleMoveToCart = (item: typeof items[0]) => {
    if (item.isCustom) {
      toast({
        title: "Custom item",
        description: "Please submit a custom inquiry for this item.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      price: item.price || 0,
      image: item.image,
      category: item.category,
      quantity: 1,
      sizing: {
        type: "standard",
        size: "8",
      },
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });

    removeItem(item.id);
  };

  const WishlistContent = () => (
    <section className="py-16 min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Your Wishlist
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Save your favorite pieces and come back to them anytime
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-6">
              Start adding items you love
            </p>
            <Button variant="default" asChild>
              {isSimplyAzixaContext ? (
                <Link to="/simply-azixa/abayas">Explore Abaya Collection</Link>
              ) : (
                <Link to="/azixa/prom">Explore Collection</Link>
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium tracking-widest text-primary uppercase">
                      {item.category}
                    </p>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {item.name}
                    </h3>
                    {item.price && (
                      <p className="text-lg font-medium text-foreground">
                        ${item.price.toLocaleString()}
                      </p>
                    )}
                    {!item.isCustom && item.price ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Move to Cart
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to="/custom-inquiry">Submit Inquiry</Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="default" size="lg" asChild>
                {isSimplyAzixaContext ? (
                  <Link to="/simply-azixa/abayas">Continue Shopping</Link>
                ) : (
                  <Link to="/azixa/prom">Continue Shopping</Link>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );

  // Use appropriate layout based on context
  if (isSimplyAzixaContext) {
    return (
      <SimplyAzixaLayout>
        <WishlistContent />
      </SimplyAzixaLayout>
    );
  }

  return (
    <Layout>
      <WishlistContent />
    </Layout>
  );
}
