import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Video, Clock, Calendar as CalendarIcon, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { TermsAcceptanceModal } from "@/components/TermsAcceptanceModal";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const consultationTypes = [
  {
    id: "complimentary",
    name: "Complimentary Consultation",
    duration: "15 min",
    price: 0,
    description: "Quick styling advice and general questions",
  },
  {
    id: "styling",
    name: "Styling Session",
    duration: "30 min",
    price: 50,
    description: "In-depth consultation for finding your perfect look",
  },
  {
    id: "custom-design",
    name: "Custom Design Consultation",
    duration: "45 min",
    price: 75,
    description: "Detailed discussion for bespoke creations",
  },
];

const platforms = ["Zoom", "Google Meet", "FaceTime", "WhatsApp Video"];

export default function Booking() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("complimentary");
  const [platform, setPlatform] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const selectedConsultation = consultationTypes.find((c) => c.id === consultationType);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!selectedDate || !selectedTime || !platform) {
      toast({
        title: "Please complete all fields",
        description: "Select a date, time, and platform for your consultation.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing contact information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      setShowTermsModal(true);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Booking Confirmed!",
      description: `Your ${selectedConsultation?.name} is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Video className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Virtual Consultations</span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Book a Consultation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with our expert stylists from the comfort of your home. 
            Get personalized advice and explore your options.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Date & Time */}
              <div className="space-y-8">
                {/* Consultation Type */}
                <div className="space-y-4">
                  <Label className="text-lg font-display font-semibold">
                    Select Consultation Type
                  </Label>
                  <RadioGroup
                    value={consultationType}
                    onValueChange={setConsultationType}
                    className="space-y-3"
                  >
                    {consultationTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                          consultationType === type.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={type.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{type.name}</span>
                            <span className="font-medium text-primary">
                              {type.price === 0 ? "Free" : `$${type.price}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {type.duration}
                            </span>
                            <span>{type.description}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Calendar */}
                <div className="space-y-4">
                  <Label className="text-lg font-display font-semibold">
                    Select Date
                  </Label>
                  <div className="border border-border rounded-lg p-4 bg-card">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        isBefore(date, startOfToday()) ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                      className="mx-auto"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-4 animate-fade-in">
                    <Label className="text-lg font-display font-semibold">
                      Available Times for {format(selectedDate, "MMMM d")}
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                            selectedTime === time
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-8">
                {/* Platform Selection */}
                <div className="space-y-4">
                  <Label className="text-lg font-display font-semibold">
                    Preferred Platform
                  </Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Select video platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {platforms.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <Label className="text-lg font-display font-semibold">
                    Your Information
                  </Label>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
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
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
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
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="+1 (234) 567-890"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        placeholder="Tell us about what you'd like to discuss..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary & Submit */}
                <div className="p-6 bg-champagne rounded-lg space-y-4">
                  <h3 className="font-display text-lg font-semibold">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consultation:</span>
                      <span className="font-medium">{selectedConsultation?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{selectedTime || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform:</span>
                      <span className="font-medium">{platform || "Not selected"}</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between text-base">
                        <span className="font-medium">Total:</span>
                        <span className="font-semibold text-primary">
                          {selectedConsultation?.price === 0
                            ? "Free"
                            : `$${selectedConsultation?.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms Acceptance Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                    className="mt-0.5"
                  />
                  <span className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <Button
                  type="submit"
                  variant="default"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Confirming..."
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Confirm Booking
                    </>
                  )}
                </Button>

                <TermsAcceptanceModal
                  open={showTermsModal}
                  onOpenChange={setShowTermsModal}
                  onAccept={() => {
                    setTermsAccepted(true);
                    handleSubmit();
                  }}
                  context="booking"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
