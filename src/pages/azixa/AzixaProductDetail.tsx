import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, Ruler, Video, ChevronRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/contexts/WishlistContext";

import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";

const sizeChart = [
  { size: "XS", bust: "32", waist: "24", hips: "34" },
  { size: "S", bust: "34", waist: "26", hips: "36" },
  { size: "M", bust: "36", waist: "28", hips: "38" },
  { size: "L", bust: "38", waist: "30", hips: "40" },
  { size: "XL", bust: "40", waist: "32", hips: "42" },
];

const fabricOptions = [
  { id: "silk-champagne", name: "Silk Champagne", color: "#d4af37" },
  { id: "silk-ivory", name: "Silk Ivory", color: "#fffff0" },
  { id: "silk-blush", name: "Silk Blush", color: "#e8b4b8" },
  { id: "silk-burgundy", name: "Silk Burgundy", color: "#722f37" },
  { id: "silk-navy", name: "Silk Navy", color: "#000080" },
];

const mockProduct = {
  id: "celestial-ballgown",
  name: "Celestial Ballgown",
  images: [categoryProm, categoryBridal],
  category: "Prom",
  description: "A breathtaking custom design featuring intricate beadwork and a dramatic silhouette. This gown is made to order specifically for you.",
  details: [
    "Hand-sewn beadwork throughout bodice",
    "Sweetheart neckline with optional straps",
    "Full tulle skirt with horsehair trim",
    "Built-in boning for structure",
    "Custom-made to your measurements",
    "Production time: 6-8 weeks",
  ],
};

export default function AzixaProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [sizingOption, setSizingOption] = useState<"standard" | "custom">("custom");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFabric, setSelectedFabric] = useState(fabricOptions[0].id);
  const [customMeasurements, setCustomMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    shoulderWidth: "",
    waistToFloor: "",
    sleeveLength: "",
    fullHeight: "",
  });

  const handleWishlistToggle = () => {
    if (isInWishlist(mockProduct.id)) {
      toast({
        title: "Already in wishlist",
        description: "This item is already in your wishlist.",
      });
      return;
    }

    addToWishlist({
      id: mockProduct.id,
      name: mockProduct.name,
      image: mockProduct.images[0],
      category: mockProduct.category,
      isCustom: true,
    });

    toast({
      title: "Added to wishlist",
      description: `${mockProduct.name} has been added to your wishlist.`,
    });
  };

  return (
    <AzixaLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/azixa" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/azixa/${mockProduct.category.toLowerCase()}`} className="hover:text-primary transition-colors">
              {mockProduct.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{mockProduct.name}</span>
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
                  src={mockProduct.images[selectedImage]}
                  alt={mockProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex gap-4">
                {mockProduct.images.map((img, index) => (
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
                  {mockProduct.category} • Custom Design
                </p>
                <h1 className="font-display text-4xl font-semibold text-foreground mb-4">
                  {mockProduct.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {mockProduct.description}
                </p>
              </div>

              {/* Fabric Selection */}
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

              {/* Sizing Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Measurements</Label>
                  <Link to="/size-chart" className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    View Size Chart
                  </Link>
                </div>

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

                {sizingOption === "standard" ? (
                  <div className="flex flex-wrap gap-2">
                    {sizeChart.map((s) => (
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
                ) : (
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

              {/* Video Consultation */}
              <div className="p-4 bg-champagne rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">Need expert guidance?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Book a video consultation with our design team to discuss your vision.
                    </p>
                    <Button asChild variant="goldOutline" size="sm">
                      <Link to="/booking">Book Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="gold" size="xl" className="flex-1" asChild>
                  <Link to="/custom-inquiry">Submit Custom Inquiry</Link>
                </Button>
                <Button variant="outline" size="xl" onClick={handleWishlistToggle}>
                  <Heart className={`h-5 w-5 ${isInWishlist(mockProduct.id) ? "fill-current text-primary" : ""}`} />
                </Button>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="font-display text-lg font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {mockProduct.details.map((detail, index) => (
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
    </AzixaLayout>
  );
}
