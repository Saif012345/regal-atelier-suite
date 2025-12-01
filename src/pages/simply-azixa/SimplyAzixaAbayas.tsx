import { useState } from "react";
import { Link } from "react-router-dom";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import categoryAbaya from "@/assets/category-abaya.jpg";

const abayas = [
  { id: "noir-elegance", name: "Noir Elegance", price: 599, image: categoryAbaya, color: "Black", length: "Standard" },
  { id: "pearl-cascade", name: "Pearl Cascade", price: 699, image: categoryAbaya, color: "Cream", length: "Maxi" },
  { id: "midnight-bloom", name: "Midnight Bloom", price: 649, image: categoryAbaya, color: "Navy", length: "Standard" },
  { id: "rose-gold-luxury", name: "Rose Gold Luxury", price: 799, image: categoryAbaya, color: "Rose", length: "Maxi" },
  { id: "emerald-grace", name: "Emerald Grace", price: 729, image: categoryAbaya, color: "Green", length: "Standard" },
  { id: "champagne-dream", name: "Champagne Dream", price: 679, image: categoryAbaya, color: "Champagne", length: "Maxi" },
];

export default function SimplyAzixaAbayas() {
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedLength, setSelectedLength] = useState("All");
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart, setIsCartOpen } = useCart();
  const { toast } = useToast();

  const colors = ["All", "Black", "Cream", "Navy", "Rose", "Green", "Champagne"];
  const lengths = ["All", "Standard", "Maxi"];

  const filteredAbayas = abayas.filter((abaya) => {
    const colorMatch = selectedColor === "All" || abaya.color === selectedColor;
    const lengthMatch = selectedLength === "All" || abaya.length === selectedLength;
    return colorMatch && lengthMatch;
  });

  const handleAddToCart = (abaya: typeof abayas[0]) => {
    addToCart({
      id: abaya.id,
      name: abaya.name,
      price: abaya.price,
      image: abaya.image,
      category: "Abaya",
      quantity: 1,
      sizing: { type: "standard", size: "One Size" },
    });
    toast({
      title: "Added to cart",
      description: `${abaya.name} has been added to your cart.`,
    });
    setIsCartOpen(true);
  };

  const handleWishlistToggle = (abaya: typeof abayas[0]) => {
    if (isInWishlist(abaya.id)) {
      toast({
        title: "Already in wishlist",
        description: "This item is already in your wishlist.",
      });
      return;
    }
    addToWishlist({
      id: abaya.id,
      name: abaya.name,
      price: abaya.price,
      image: abaya.image,
      category: "Abaya",
      isCustom: false,
    });
    toast({
      title: "Added to wishlist",
      description: `${abaya.name} has been added to your wishlist.`,
    });
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
            Discover our exquisite collection of abayas, each designed with elegance, 
            modesty, and contemporary style in mind.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">Color</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">Length</p>
              <div className="flex flex-wrap gap-2">
                {lengths.map((length) => (
                  <Button
                    key={length}
                    variant={selectedLength === length ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLength(length)}
                  >
                    {length}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAbayas.map((abaya, index) => (
              <div
                key={abaya.id}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  to={`/simply-azixa/product/${abaya.id}`}
                  className="block aspect-[3/4] overflow-hidden rounded-lg elegant-border"
                >
                  <img
                    src={abaya.image}
                    alt={abaya.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleWishlistToggle(abaya)}
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-elegant hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isInWishlist(abaya.id) ? "fill-current text-primary" : ""}`} />
                  </button>
                  <button
                    onClick={() => handleAddToCart(abaya)}
                    className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-elegant hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-lg font-medium text-foreground mb-1">
                    {abaya.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{abaya.color} • {abaya.length}</p>
                    <p className="font-medium text-foreground">${abaya.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAbayas.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No abayas found with the selected filters.
            </p>
          )}
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
