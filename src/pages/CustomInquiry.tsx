import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, X, Sparkles, ArrowRight, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


const inquiryTypes = [
  { id: "prom", name: "Prom Dress", description: "Custom prom gown design" },
  { id: "bridal", name: "Bridal Gown", description: "Wedding dress creation" },
  { id: "occasion", name: "Occasion Wear", description: "Gala, formal events" },
];

const embellishments = [
  "Beading",
  "Pearls",
  "Appliqués",
  "Crystals",
  "Other",
];

const accessories = [
  "Veil",
  "Handfand",
  "Matching hijab",
  "Other",
];

const consultationPreferences = [
  "FaceTime",
  "Google Meet",
  "Zoom",
  "WhatsApp",
  "Other",
];

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $2,000",
  "$2,000 - $3,500",
  "$3,500 - $5,000",
  "$5,000+",
];

export default function CustomInquiry() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    instaHandle: "",
    color: "",
    notes: "",
    budgetMin: "",
    budgetMax: "",
    currency: "USD",
    consultationPref: "",
    embellishmentOther: "",
    accessoryOther: "",
  });
  const [needDate, setNeedDate] = useState<Date | undefined>();
  const [selectedEmbellishments, setSelectedEmbellishments] = useState<string[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [inspirationFiles, setInspirationFiles] = useState<File[]>([]);
  const [fullBodyPhoto, setFullBodyPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "inspiration" | "fullBody") => {
    const files = e.target.files;
    if (!files) return;

    if (type === "inspiration") {
      const newFiles = Array.from(files).slice(0, 5 - inspirationFiles.length);
      setInspirationFiles((prev) => [...prev, ...newFiles]);
    } else {
      setFullBodyPhoto(files[0]);
    }
  };

  const removeInspirationFile = (index: number) => {
    setInspirationFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!selectedType) {
      toast({ title: "Please select an inquiry type", variant: "destructive" });
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!needDate) {
      toast({ title: "Please select your need date", variant: "destructive" });
      return;
    }
    if (inspirationFiles.length === 0) {
      toast({ title: "Please upload at least one inspiration image", variant: "destructive" });
      return;
    }
    if (!fullBodyPhoto) {
      toast({ title: "Please upload a full body photo", variant: "destructive" });
      return;
    }
    if (!formData.color) {
      toast({ title: "Please specify your preferred color", variant: "destructive" });
      return;
    }
    if (!formData.notes) {
      toast({ title: "Please describe your inspiration", variant: "destructive" });
      return;
    }
    if (!formData.budgetMin || !formData.budgetMax) {
      toast({ title: "Please specify your budget range", variant: "destructive" });
      return;
    }
    if (!formData.consultationPref) {
      toast({ title: "Please select consultation preference", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Inquiry Submitted!",
      description: "We'll be in touch within 24 hours to discuss your dream design.",
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Custom Design Service</span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Bring Your Vision to Life
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your dream design with us. Our expert team will work with you to create 
            a one-of-a-kind piece that's uniquely yours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-10">
            {/* Inquiry Type Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-display font-semibold">What are you looking for? *</Label>
              <div className="grid sm:grid-cols-3 gap-4">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "p-6 rounded-lg border text-left transition-all",
                      selectedType === type.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <h3 className="font-display text-lg font-semibold mb-1">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-display font-semibold border-b border-border pb-2">
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (234) 567-890"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    placeholder="+1 (234) 567-890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instaHandle">Instagram Handle (optional)</Label>
                  <Input
                    id="instaHandle"
                    value={formData.instaHandle}
                    onChange={(e) => handleInputChange("instaHandle", e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event/Need Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !needDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {needDate ? format(needDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card" align="start">
                      <Calendar
                        mode="single"
                        selected={needDate}
                        onSelect={setNeedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Design Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-display font-semibold border-b border-border pb-2">
                Design Details
              </h2>

              {/* Inspiration Upload */}
              <div className="space-y-2">
                <Label>Style Inspiration Images * (up to 5)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop or click to upload
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "inspiration")}
                    className="hidden"
                    id="inspiration-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("inspiration-upload")?.click()}
                  >
                    Choose Files
                  </Button>
                </div>
                {inspirationFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {inspirationFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative group bg-muted px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                      >
                        <span className="truncate max-w-[150px]">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeInspirationFile(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Upload Full Body Photo *</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Required for accurate design recommendations
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "fullBody")}
                  className="hidden"
                  id="fullbody-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("fullbody-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {fullBodyPhoto ? fullBodyPhoto.name : "Upload Photo"}
                </Button>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label htmlFor="color">Preferred Color *</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange("color", e.target.value)}
                  placeholder="e.g., Champagne gold, Navy blue, Blush pink"
                />
              </div>

               {/* Embellishments */}
              <div className="space-y-3">
                <Label>Embellishment Preferences (optional)</Label>
                <p className="text-sm text-muted-foreground">Select all that apply</p>
                <div className="flex flex-wrap gap-3">
                  {embellishments.map((emb) => (
                    <label
                      key={emb}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all",
                        selectedEmbellishments.includes(emb)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Checkbox
                        checked={selectedEmbellishments.includes(emb)}
                        onCheckedChange={(checked) => {
                          setSelectedEmbellishments((prev) =>
                            checked
                              ? [...prev, emb]
                              : prev.filter((e) => e !== emb)
                          );
                        }}
                      />
                      <span className="text-sm">{emb}</span>
                    </label>
                  ))}
                </div>
                {selectedEmbellishments.includes("Other") && (
                  <Input
                    value={formData.embellishmentOther}
                    onChange={(e) => handleInputChange("embellishmentOther", e.target.value)}
                    placeholder="Please specify..."
                    className="mt-2"
                  />
                )}
              </div>

              {/* Accessories */}
              <div className="space-y-3">
                <Label>Accessories (optional)</Label>
                <p className="text-sm text-muted-foreground">Select all that apply</p>
                <div className="flex flex-wrap gap-3">
                  {accessories.map((acc) => (
                    <label
                      key={acc}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all",
                        selectedAccessories.includes(acc)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Checkbox
                        checked={selectedAccessories.includes(acc)}
                        onCheckedChange={(checked) => {
                          setSelectedAccessories((prev) =>
                            checked
                              ? [...prev, acc]
                              : prev.filter((a) => a !== acc)
                          );
                        }}
                      />
                      <span className="text-sm">{acc}</span>
                    </label>
                  ))}
                </div>
                {selectedAccessories.includes("Other") && (
                  <Input
                    value={formData.accessoryOther}
                    onChange={(e) => handleInputChange("accessoryOther", e.target.value)}
                    placeholder="Please specify..."
                    className="mt-2"
                  />
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Describe Your Vision *</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Tell us about your dream dress - the style, silhouette, any specific details you'd love to include..."
                  rows={5}
                />
              </div>
            </div>

            {/* Budget & Consultation */}
            <div className="space-y-6">
              <h2 className="text-lg font-display font-semibold border-b border-border pb-2">
                Budget & Consultation
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Budget Range * (numerical values only)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Select
                        value={formData.currency}
                        onValueChange={(v) => handleInputChange("currency", v)}
                      >
                        <SelectTrigger className="bg-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="NGN">NGN</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={formData.budgetMin}
                        onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                        placeholder="Min"
                        min="0"
                        step="100"
                      />
                    </div>
                    <div className="col-span-1">
                      <Input
                        type="number"
                        value={formData.budgetMax}
                        onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                        placeholder="Max"
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Virtual Consultation Preference *</Label>
                  <Select
                    value={formData.consultationPref}
                    onValueChange={(v) => handleInputChange("consultationPref", v)}
                  >
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="How would you like to meet?" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {consultationPreferences.map((pref) => (
                        <SelectItem key={pref} value={pref}>
                          {pref}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Calendly Video Consultation Booking */}
                <div className="p-6 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Schedule a Video Consultation
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Want to discuss your vision in detail? Book a video call with our design team 
                        to walk through your ideas and get expert guidance.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/booking">Book Video Consultation</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-border">
              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Inquiry
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By submitting, you agree to our{" "}
                <Link to="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
                . We'll respond within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
