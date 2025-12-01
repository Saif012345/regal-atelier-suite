import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, ShoppingBag, ChevronRight, Check, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

import categoryAbaya from "@/assets/category-abaya.jpg";

const mockAbaya = {
  id: "noir-elegance",
  name: "Noir Elegance Abaya",
  price: 599,
  images: [categoryAbaya, categoryAbaya],
  category: "Abaya",
  description: "Luxurious black abaya featuring intricate embroidery and premium fabric. Perfect for any occasion, combining modesty with contemporary elegance.",
  colors: [
    { id: "black", name: "Black", hex: "#000000" },
    { id: "navy", name: "Navy", hex: "#000080" },
    { id: "charcoal", name: "Charcoal", hex: "#36454F" },
  ],
  lengths: ["Standard (54\")", "Maxi (58\")", "Petite (52\")"],
  sizes: ["XS", "S", "M", "L", "XL"],
  details: [
    "Premium crepe fabric",
    "Hand-finished embroidery",
    "Matching belt included",
    "Hidden button closure",
    "Side pockets",
    "Machine washable",
  ],
};

export default function SimplyAzixaProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { addItem, setIsCartOpen } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(mockAbaya.colors[0].id);
  const [selectedLength, setSelectedLength] = useState(mockAbaya.lengths[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: `${mockAbaya.id}-${Date.now()}`,
      name: mockAbaya.name,
      price: mockAbaya.price,
      image: mockAbaya.images[0],
      category: mockAbaya.category,
      quantity,
      sizing: {
        type: "standard",
        size: `${selectedSize} - ${selectedLength}`,
      },
    });

    toast({
      title: "Added to cart",
      description: `${mockAbaya.name} has been added to your cart.`,
    });

    setIsCartOpen(true);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(mockAbaya.id)) {
      toast({
        title: "Already in wishlist",
        description: "This item is already in your wishlist.",
      });
      return;
    }

    addToWishlist({
      id: mockAbaya.id,
      name: mockAbaya.name,
      price: mockAbaya.price,
      image: mockAbaya.images[0],
      category: mockAbaya.category,
      isCustom: false,
    });

    toast({
      title: "Added to wishlist",
      description: `${mockAbaya.name} has been added to your wishlist.`,
    });
  };

  return (
    <SimplyAzixaLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/simply-azixa" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/simply-azixa/abayas" className="hover:text-primary transition-colors">Abayas</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{mockAbaya.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted elegant-border">
                <img
                  src={mockAbaya.images[selectedImage]}
                  alt={mockAbaya.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                {mockAbaya.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
                  {mockAbaya.category}
                </p>
                <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
                  {mockAbaya.name}
                </h1>
                <p className="text-2xl font-medium text-foreground mb-4">
                  ${mockAbaya.price}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {mockAbaya.description}
                </p>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Color</Label>
                <div className="flex gap-3">
                  {mockAbaya.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        selectedColor === color.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm">{color.name}</span>
                      {selectedColor === color.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Length</Label>
                <RadioGroup value={selectedLength} onValueChange={setSelectedLength}>
                  {mockAbaya.lengths.map((length) => (
                    <div key={length} className="flex items-center space-x-2">
                      <RadioGroupItem value={length} id={length} />
                      <Label htmlFor={length}>{length}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Size</Label>
                <div className="flex flex-wrap gap-2">
                  {mockAbaya.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-lg border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Quantity</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="gold" size="xl" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="xl" onClick={handleWishlistToggle}>
                  <Heart className={`h-5 w-5 ${isInWishlist(mockAbaya.id) ? "fill-current text-primary" : ""}`} />
                </Button>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="font-display text-lg font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {mockAbaya.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
