import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Lock, ShoppingBag } from "lucide-react";
import { TermsAcceptanceModal } from "@/components/TermsAcceptanceModal";

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "NGN", symbol: "₦", rate: 1650 },
  { code: "CAD", symbol: "C$", rate: 1.36 },
];

const paymentMethods = [
  { id: "stripe", name: "Credit/Debit Card", description: "Visa, Mastercard, Amex" },
  { id: "paypal", name: "PayPal", description: "Pay with your PayPal account" },
  { id: "paystack", name: "Paystack", description: "For Nigerian customers" },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currency, setCurrency] = useState("USD");
  const [paymentType, setPaymentType] = useState<"full" | "deposit">("full");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const depositPercent = 50; // Admin configurable
  const selectedCurrency = currencies.find((c) => c.code === currency)!;
  const convertedSubtotal = subtotal * selectedCurrency.rate;
  const depositAmount = (convertedSubtotal * depositPercent) / 100;
  const finalAmount = paymentType === "full" ? convertedSubtotal : depositAmount;

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validation
    const required = ["email", "firstName", "lastName", "address", "city", "country", "phone"];
    const missing = required.filter((field) => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      setShowTermsModal(true);
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    toast({
      title: "Order Confirmed! 🎉",
      description: `Your ${paymentType === "deposit" ? "deposit" : "payment"} of ${selectedCurrency.symbol}${finalAmount.toFixed(2)} has been processed.`,
    });

    clearCart();
    setIsProcessing(false);
    navigate("/");
  };

  if (items.length === 0) {
    // Check if any previous items were abayas to determine context
    const isSimplyAzixaContext = false; // Default to Azixa Rahman for checkout
    
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-display text-3xl font-semibold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add items to proceed to checkout</p>
            <Button variant="default" asChild>
              <Link to="/azixa/prom">Start Shopping</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-center mb-12">Checkout</h1>

            {/* Order Summary - Now at top */}
            <Card className="p-6 space-y-6 mb-8">
              <h2 className="font-display text-2xl font-semibold">Order Summary</h2>

              {/* Currency Selector */}
              <div>
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="bg-card max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.code} ({curr.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {selectedCurrency.symbol}
                      {(item.price * item.quantity * selectedCurrency.rate).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Subtotal */}
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{selectedCurrency.symbol}{convertedSubtotal.toFixed(2)}</span>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Form */}
              <div className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <Card className="p-6 space-y-6">
                    <h2 className="font-display text-2xl font-semibold">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div>
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
                    </div>
                  </Card>

                  {/* Shipping Address */}
                  <Card className="p-6 space-y-6">
                    <h2 className="font-display text-2xl font-semibold">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Street address"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Shipping Method */}
                  <Card className="p-6 space-y-6">
                    <h2 className="font-display text-2xl font-semibold">Shipping Method</h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-primary bg-primary/5">
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-muted-foreground">4-6 weeks production + delivery</p>
                        </div>
                        <p className="font-medium">Free</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Custom gowns require 4-6 weeks for production. Expedited options available upon request.
                      </p>
                    </div>
                  </Card>

                  {/* Payment Method */}
                  <Card className="p-6 space-y-6">
                    <h2 className="font-display text-2xl font-semibold">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">{method.description}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>
                </form>
              </div>

              {/* Right: Review & Finalize */}
              <div className="space-y-6">
                <Card className="p-6 space-y-6 sticky top-24">
                  <h2 className="font-display text-2xl font-semibold">Review & Finalize</h2>

                  {/* Payment Type Toggle */}
                  <div>
                    <Label className="mb-3 block">Payment Option</Label>
                    <RadioGroup value={paymentType} onValueChange={(v) => setPaymentType(v as "full" | "deposit")}>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                        <RadioGroupItem value="full" id="full" />
                        <Label htmlFor="full" className="flex-1 cursor-pointer">
                          <div className="font-medium">Pay in Full</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedCurrency.symbol}{convertedSubtotal.toFixed(2)}
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                        <RadioGroupItem value="deposit" id="deposit" />
                        <Label htmlFor="deposit" className="flex-1 cursor-pointer">
                          <div className="font-medium">Pay Deposit ({depositPercent}%)</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedCurrency.symbol}{depositAmount.toFixed(2)} now, remaining later
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{selectedCurrency.symbol}{convertedSubtotal.toFixed(2)}</span>
                    </div>
                    {paymentType === "deposit" && (
                      <div className="flex justify-between text-base">
                        <span className="text-muted-foreground">Deposit ({depositPercent}%)</span>
                        <span>{selectedCurrency.symbol}{depositAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-display font-semibold pt-2 border-t border-border">
                      <span>Total Due</span>
                      <span>{selectedCurrency.symbol}{finalAmount.toFixed(2)}</span>
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
                    variant="default"
                    size="xl"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2" />
                        Complete Order
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Your payment information is secure and encrypted
                  </p>
                </Card>

                <TermsAcceptanceModal
                  open={showTermsModal}
                  onOpenChange={setShowTermsModal}
                  onAccept={() => {
                    setTermsAccepted(true);
                    handleSubmit();
                  }}
                  context="checkout"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
