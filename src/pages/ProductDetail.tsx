import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, ShoppingBag, Ruler, ChevronRight, Check, Video, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProductBySlug, parseColor } from "@/hooks/useProducts";
import heroFormal from "@/assets/hero-formal.jpg";

// Azixa Rahman size chart (full measurements for custom fitting)
const azixaRahmanSizeChart = [
  { size: "2", bust: "32", waist: "24", hips: "34" },
  { size: "4", bust: "33", waist: "25", hips: "35" },
  { size: "6", bust: "34", waist: "26", hips: "36" },
  { size: "8", bust: "35", waist: "27", hips: "37" },
  { size: "10", bust: "36", waist: "28", hips: "38" },
  { size: "12", bust: "38", waist: "30", hips: "40" },
  { size: "14", bust: "40", waist: "32", hips: "42" },
  { size: "16", bust: "42", waist: "34", hips: "44" },
  { size: "18", bust: "44", waist: "36", hips: "46" },
  { size: "20", bust: "46", waist: "38", hips: "48" },
  { size: "22", bust: "48", waist: "40", hips: "50" },
  { size: "24", bust: "50", waist: "42", hips: "52" },
];

// Simply Azixa size chart (simplified for abayas)
const simplyAzixaSizeChart = [
  { size: "2", bust: "32", waist: "24", hips: "34" },
  { size: "4", bust: "33", waist: "25", hips: "35" },
  { size: "6", bust: "34", waist: "26", hips: "36" },
  { size: "8", bust: "35", waist: "27", hips: "37" },
  { size: "10", bust: "36", waist: "28", hips: "38" },
  { size: "12", bust: "38", waist: "30", hips: "40" },
  { size: "14", bust: "40", waist: "32", hips: "42" },
  { size: "16", bust: "42", waist: "34", hips: "44" },
  { size: "18", bust: "44", waist: "36", hips: "46" },
  { size: "20", bust: "46", waist: "38", hips: "48" },
  { size: "22", bust: "48", waist: "40", hips: "50" },
  { size: "24", bust: "50", waist: "42", hips: "52" },
];

const fabricOptions = [
  { id: "silk-champagne", name: "Silk Champagne", color: "#d4af37" },
  { id: "silk-ivory", name: "Silk Ivory", color: "#fffff0" },
  { id: "silk-blush", name: "Silk Blush", color: "#e8b4b8" },
  { id: "silk-burgundy", name: "Silk Burgundy", color: "#722f37" },
  { id: "silk-navy", name: "Silk Navy", color: "#000080" },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const { addItem, setIsCartOpen } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  const { data: product, isLoading, error } = useProductBySlug(slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [sizingOption, setSizingOption] = useState<"standard" | "custom">("standard");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFabric, setSelectedFabric] = useState(fabricOptions[0].id);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    shoulderWidth: "",
    waistToFloor: "",
    sleeveLength: "",
    fullHeight: "",
  });

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </section>
      </Layout>
    );
  }

  // If product not found, redirect to shop
  if (!product || error) {
    return <Navigate to="/shop" replace />;
  }

  // Parse colors from database format
  const productColors = product.colors?.map(parseColor) || [];
  const productLengths = ["52", "54", "56", "58", "60", "62"]; // Default lengths for abayas
  
  // Get images with fallback
  const productImages = product.images.length > 0 
    ? product.images.map(img => img.image_url) 
    : [heroFormal];

  const handleWishlistToggle = () => {
    if (isInWishlist(product.slug)) {
      toast({
        title: "Already in wishlist",
        description: "This item is already in your wishlist.",
      });
      return;
    }

    addToWishlist({
      id: product.slug,
      name: product.name,
      price: product.price,
      image: productImages[0],
      category: product.category,
      isCustom: product.is_custom || false,
    });

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleAddToBag = () => {
    if (sizingOption === "standard" && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a standard size or enter custom measurements.",
        variant: "destructive",
      });
      return;
    }

    if (sizingOption === "custom") {
      const missing = Object.entries(customMeasurements)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
      if (missing.length > 0) {
        toast({
          title: "Missing measurements",
          description: "Please fill in all custom measurements.",
          variant: "destructive",
        });
        return;
      }
    }

    const selectedFabricObj = fabricOptions.find((f) => f.id === selectedFabric)!;

    addItem({
      id: `${product.slug}-${Date.now()}`,
      name: product.name,
      price: product.price,
      image: productImages[0],
      category: product.category,
      quantity: 1,
      sizing: {
        type: sizingOption,
        size: sizingOption === "standard" ? selectedSize : undefined,
        measurements: sizingOption === "custom" ? customMeasurements : undefined,
      },
      fabric: {
        id: selectedFabricObj.id,
        name: selectedFabricObj.name,
      },
    });

    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your shopping bag.`,
    });

    setIsCartOpen(true);
  };

  // Brand detection based on product data
  const isSimplyAzixa = product.brand === "simply-azixa";

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={isSimplyAzixa ? "/simply-azixa" : "/azixa"} className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={isSimplyAzixa ? "/simply-azixa/abayas" : "/shop"} className="hover:text-primary transition-colors">
              {isSimplyAzixa ? "Abayas" : "Shop"}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
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
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-4">
                  {productImages.map((img, index) => (
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
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium tracking-widest text-primary uppercase mb-2">
                  {product.category}
                </p>
                <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-medium text-foreground">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Simply Azixa: Color Selection */}
              {isSimplyAzixa && productColors.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-base font-medium">Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {productColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                          selectedColor === color.name
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm">{color.name}</span>
                        {selectedColor === color.name && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Simply Azixa: Length Selection */}
              {isSimplyAzixa && (
                <div className="space-y-4">
                  <Label className="text-base font-medium">Length</Label>
                  <div className="flex flex-wrap gap-2">
                    {productLengths.map((length) => (
                      <button
                        key={length}
                        onClick={() => setSelectedLength(length)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedLength === length
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {length}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Azixa Rahman: Fabric Selection */}
              {!isSimplyAzixa && (
                <div className="space-y-4">
                  <Label className="text-base font-medium">Fabric & Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {fabricOptions.map((fabric) => (
                      <button
                        key={fabric.id}
                        onClick={() => setSelectedFabric(fabric.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                          selectedFabric === fabric.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-border"
                          style={{ backgroundColor: fabric.color }}
                        />
                        <span className="text-sm">{fabric.name}</span>
                        {selectedFabric === fabric.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizing Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Sizing</Label>
                  {/* Size Chart - Both brands have their own inline dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" className="h-auto p-0">
                        <Ruler className="h-4 w-4 mr-1" />
                        Size Chart
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg bg-card" aria-describedby="size-chart-description">
                      <DialogHeader>
                        <DialogTitle className="font-display text-2xl">Size Chart</DialogTitle>
                        <DialogDescription id="size-chart-description">Reference measurements for standard sizes</DialogDescription>
                      </DialogHeader>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="py-3 px-4 text-left font-medium">Size</th>
                              <th className="py-3 px-4 text-left font-medium">Bust (in)</th>
                              <th className="py-3 px-4 text-left font-medium">Waist (in)</th>
                              <th className="py-3 px-4 text-left font-medium">Hips (in)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(isSimplyAzixa ? simplyAzixaSizeChart : azixaRahmanSizeChart).map((row) => (
                              <tr key={row.size} className="border-b border-border/50">
                                <td className="py-3 px-4 font-medium">{row.size}</td>
                                <td className="py-3 px-4">{row.bust}</td>
                                <td className="py-3 px-4">{row.waist}</td>
                                <td className="py-3 px-4">{row.hips}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Azixa Rahman: Standard/Custom sizing toggle */}
                {!isSimplyAzixa && (
                  <RadioGroup
                    value={sizingOption}
                    onValueChange={(v) => setSizingOption(v as "standard" | "custom")}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Size</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Measurements</Label>
                    </div>
                  </RadioGroup>
                )}

                {/* Size selector - each brand uses their own size chart */}
                {(isSimplyAzixa || sizingOption === "standard") && (
                  <div className="flex flex-wrap gap-2">
                    {(isSimplyAzixa ? simplyAzixaSizeChart : azixaRahmanSizeChart).map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`w-14 h-14 rounded-lg border text-sm font-medium transition-all ${
                          selectedSize === s.size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom measurements - Azixa Rahman only */}
                {!isSimplyAzixa && sizingOption === "custom" && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    {Object.entries(customMeasurements).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <Label htmlFor={key} className="text-xs capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()} (in) *
                        </Label>
                        <Input
                          id={key}
                          type="number"
                          placeholder="0.0"
                          value={value}
                          onChange={(e) =>
                            setCustomMeasurements((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="h-9 bg-card"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Consultation - Azixa Rahman only */}
              {!isSimplyAzixa && (
                <div className="p-4 bg-champagne rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Video className="h-5 w-5 text-primary" />
                    <span className="font-medium">Need help deciding?</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Schedule a virtual consultation with our stylists
                  </p>
                  <Link to="/booking">
                    <Button variant="outline" size="sm">
                      Book Consultation
                    </Button>
                  </Link>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToBag}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product.slug) ? "text-primary border-primary" : ""}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.slug) ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Product Details Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger className="text-base font-medium">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {product.details?.map((detail, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="h-4 w-4 text-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-base font-medium">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Production Time:</strong>{" "}
                        {isSimplyAzixa ? "1-2 weeks" : "4-6 weeks for custom orders"}
                      </p>
                      <p>
                        <strong className="text-foreground">Shipping:</strong>{" "}
                        Worldwide shipping available. Free shipping on orders over $500.
                      </p>
                      <p>
                        <strong className="text-foreground">Returns:</strong>{" "}
                        {isSimplyAzixa 
                          ? "Returns accepted within 14 days of delivery for unworn items."
                          : "Custom orders are final sale. Please ensure measurements are accurate."
                        }
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="care">
                  <AccordionTrigger className="text-base font-medium">
                    Care Instructions
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-muted-foreground">
                      <p>• Professional dry clean only</p>
                      <p>• Store in a cool, dry place</p>
                      <p>• Use a padded hanger to maintain shape</p>
                      <p>• Keep away from direct sunlight</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
