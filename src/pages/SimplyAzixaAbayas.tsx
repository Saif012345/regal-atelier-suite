import { useState } from "react";
import { Link } from "react-router-dom";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import categoryAbaya from "@/assets/category-abaya.jpg";

const abayas = [
  { id: "pearl-mist", name: "Pearl Mist Abaya", price: 249, image: categoryAbaya, colors: ["Pearl", "Black", "Navy"], lengths: ["52", "54", "56", "58"] },
  { id: "midnight-grace", name: "Midnight Grace Abaya", price: 279, image: categoryAbaya, colors: ["Black", "Dark Grey"], lengths: ["52", "54", "56", "58"] },
  { id: "desert-rose", name: "Desert Rose Abaya", price: 299, image: categoryAbaya, colors: ["Rose", "Blush", "Mauve"], lengths: ["52", "54", "56", "58"] },
  { id: "ocean-breeze", name: "Ocean Breeze Abaya", price: 269, image: categoryAbaya, colors: ["Ocean Blue", "Teal", "Sky"], lengths: ["52", "54", "56", "58"] },
  { id: "golden-hour", name: "Golden Hour Abaya", price: 319, image: categoryAbaya, colors: ["Black/Gold", "Navy/Gold", "Burgundy/Gold"], lengths: ["52", "54", "56", "58"] },
  { id: "classic-noir", name: "Classic Noir Abaya", price: 229, image: categoryAbaya, colors: ["Black"], lengths: ["52", "54", "56", "58"] },
];

export default function SimplyAzixaAbayas() {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [selectedLengths, setSelectedLengths] = useState<Record<string, string>>({});

  const handleWishlistToggle = (abaya: typeof abayas[0]) => {
    if (isInWishlist(abaya.id)) {
      removeFromWishlist(abaya.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: abaya.id,
        name: abaya.name,
        price: abaya.price,
        image: abaya.image,
        category: "Abaya",
        isCustom: false,
      });
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (abaya: typeof abayas[0]) => {
    const color = selectedColors[abaya.id] || abaya.colors[0];
    const length = selectedLengths[abaya.id] || abaya.lengths[0];
    
    addToCart({
      id: `${abaya.id}-${color}-${length}`,
      name: `${abaya.name} (${color}, ${length}")`,
      price: abaya.price,
      image: abaya.image,
      category: "Abaya",
      quantity: 1,
      sizing: {
        type: "standard",
        size: length,
      },
    });
    toast.success("Added to cart");
  };

  return (
    <SimplyAzixaLayout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Abaya Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of luxurious abayas, designed for the modern woman 
            who values modesty without compromising on style.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {abayas.map((abaya, index) => (
              <div
                key={abaya.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg elegant-border mb-4">
                  <Link to={`/product/${abaya.id}`}>
                    <img
                      src={abaya.image}
                      alt={abaya.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm"
                      onClick={() => handleWishlistToggle(abaya)}
                    >
                      <Heart
                        className={`h-5 w-5 ${isInWishlist(abaya.id) ? "fill-primary text-primary" : ""}`}
                      />
                    </Button>
                  </div>

                  {/* Quick Add */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button
                      variant="gold"
                      className="w-full"
                      onClick={() => handleAddToCart(abaya)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link to={`/product/${abaya.id}`}>
                    <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors">
                      {abaya.name}
                    </h3>
                  </Link>
                  <p className="text-primary font-semibold">${abaya.price}</p>

                  {/* Color Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Color:</span>
                    <div className="flex gap-1">
                      {abaya.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColors({ ...selectedColors, [abaya.id]: color })}
                          className={`px-2 py-1 text-xs rounded border transition-colors ${
                            (selectedColors[abaya.id] || abaya.colors[0]) === color
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Length Options */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Length:</span>
                    <div className="flex gap-1">
                      {abaya.lengths.map((length) => (
                        <button
                          key={length}
                          onClick={() => setSelectedLengths({ ...selectedLengths, [abaya.id]: length })}
                          className={`px-2 py-1 text-xs rounded border transition-colors ${
                            (selectedLengths[abaya.id] || abaya.lengths[0]) === length
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
            ))}
          </div>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
