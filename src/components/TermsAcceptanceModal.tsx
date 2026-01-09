import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ExternalLink } from "lucide-react";

interface TermsAcceptanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  context: "checkout" | "custom-inquiry" | "booking";
  brand?: "simply-azixa" | "azixa-rahman";
}

function SimplyAzixaTermsContent() {
  return (
    <div className="space-y-6 text-sm">
      <section>
        <h3 className="font-semibold text-foreground mb-2">1. About Our Abayas</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>All Simply Azixa Abayas are designed with modesty and comfort in mind.</li>
          <li>They feature a relaxed, flowy "One Size Fits All" silhouette in terms of width and body fit.</li>
          <li>The only variable you choose is your preferred <strong>length</strong> (52" to 62").</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">2. Sizing & Length Selection</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Please review the size chart on the product page before ordering.</li>
          <li>We recommend measuring a similar garment you already own.</li>
          <li><strong>You are responsible</strong> for selecting the correct length.</li>
          <li>We cannot accept returns, exchanges, or refunds for incorrect length selection.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">3. Ordering & Production</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Once your order is placed, you will receive a confirmation email.</li>
          <li>Production begins after payment is successfully processed.</li>
          <li>Production can take up to <strong>14 calendar days (2 weeks)</strong>.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">4. Shipping & Delivery</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Shipping begins after production is complete.</li>
          <li>Standard shipping takes up to <strong>10 business days</strong>.</li>
          <li>International orders may be subject to customs processing and delays.</li>
          <li>Customs duties, taxes, or import fees are the <strong>customer's responsibility</strong>.</li>
          <li>We are not responsible for delays caused by customs, weather, holidays, or courier services.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">5. Payments</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Full payment is required before production begins.</li>
          <li><strong>All sales are final. No refunds.</strong></li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">6. Returns & Exchanges</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Due to the custom-length nature of our Abayas, <strong>all sales are final</strong>.</li>
          <li>No returns or exchanges for incorrect length selection or change of mind.</li>
          <li>If your Abaya arrives damaged or defective, contact us within <strong>3 days of delivery</strong> with photo evidence.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">7. Care Instructions</h3>
        <p className="text-muted-foreground">
          Care instructions will be provided with your Abaya to help maintain its quality and longevity.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">8. Policy Updates</h3>
        <p className="text-muted-foreground">
          Policies may be updated from time to time. Continued use of our services means acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">9. Contact</h3>
        <p className="text-muted-foreground">
          📧 Email: <strong>azixarahman@gmail.com</strong>
        </p>
      </section>

      <p className="text-muted-foreground font-semibold border-t border-border pt-4">
        By placing an order, you confirm that you have read and agreed to these Terms & Conditions.
      </p>
    </div>
  );
}

function AzixaRahmanTermsContent() {
  return (
    <div className="space-y-6 text-sm">
      <section>
        <h3 className="font-semibold text-foreground mb-2">1. Order Types</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li><strong>Made-to-Order (Website Orders):</strong> Designs shown on the website. You select a standard size or submit measurements, and the dress is produced accordingly.</li>
          <li><strong>Custom Orders:</strong> Bespoke designs for bridal, prom, or special occasions. These begin with a paid consultation and involve personalized design development.</li>
          <li>We do not sell ready-made dresses. All garments are Made-to-Order or Custom.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">2. Payments & Fees</h3>
        <h4 className="font-medium text-foreground mt-2 mb-1 text-xs">Website Orders</h4>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Full payment upfront before production begins.</li>
        </ul>
        <h4 className="font-medium text-foreground mt-2 mb-1 text-xs">Custom Orders</h4>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Non-refundable consultation fee to initiate design process.</li>
          <li>50–70% non-refundable deposit to begin production.</li>
          <li>Remaining balance paid before shipping.</li>
          <li>Some projects may require full payment upfront.</li>
        </ul>
        <p className="text-muted-foreground mt-2">
          <strong>Consultation fees are non-refundable and non-transferable.</strong>
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">3. Measurements & Sizing</h3>
        <p className="text-muted-foreground mb-1">You may:</p>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Select a standard size from our size chart</li>
          <li>Submit custom measurements</li>
          <li>Book a virtual measurement consultation (additional fee)</li>
        </ul>
        <p className="text-muted-foreground mt-2 font-medium">
          The client is fully responsible for measurement accuracy. We do not accept returns, refunds, or exchanges due to incorrect measurements, wrong size selection, or body changes after ordering.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">4. Production & Timelines</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Production typically takes <strong>4–8 weeks</strong>, depending on design complexity.</li>
          <li>Simple designs: Order at least <strong>1 month</strong> before your event.</li>
          <li>Bridal/custom designs: <strong>3–6 months</strong> recommended.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">5. Shipping & Delivery</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Processing: 1–3 business days after completion.</li>
          <li>Standard shipping: 7–10 business days.</li>
          <li>Tracking details will be sent once shipped.</li>
          <li>Shipping timelines are estimates only. We are not responsible for courier delays.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">6. International Orders</h3>
        <p className="text-muted-foreground">
          Customers are responsible for all customs duties, taxes, and import fees. These are not included in the product price.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">7. Fittings & Alterations</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Website orders: No fittings offered.</li>
          <li>Custom orders: Limited fittings for local clients only (at our discretion).</li>
          <li>We do not cover alteration costs. Alterations are the client's responsibility.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">8. Returns, Exchanges & Refunds</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li><strong>All sales are final.</strong> No returns or exchanges.</li>
          <li>If your dress arrives defective, contact us within <strong>3 days of delivery</strong> with photo evidence.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">9. Cancellations & Deposits</h3>
        <p className="text-muted-foreground">
          You may cancel a custom order, but <strong>all consultation fees and deposits are forfeited</strong>.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">10. Fabric & Design Variations</h3>
        <p className="text-muted-foreground">
          Minor variations may occur due to screen settings, dye lots, and the inherent nature of textiles. We strive for accuracy but cannot guarantee exact matches.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">11. Disputes & Chargebacks</h3>
        <ul className="text-muted-foreground list-disc pl-5 space-y-1">
          <li>Contact us directly to resolve any issues professionally.</li>
          <li>Unwarranted chargebacks will be disputed if terms were agreed to and delivery confirmed.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-foreground mb-2">12. Contact</h3>
        <p className="text-muted-foreground">
          📧 Email: <strong>azixarahman@gmail.com</strong>
        </p>
      </section>

      <p className="text-muted-foreground font-semibold border-t border-border pt-4">
        By placing an order, you confirm that you have read and agreed to these Terms & Conditions.
      </p>
    </div>
  );
}

export function TermsAcceptanceModal({
  open,
  onOpenChange,
  onAccept,
  context,
  brand = "azixa-rahman",
}: TermsAcceptanceModalProps) {
  const [accepted, setAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  const contextTitles = {
    checkout: "Complete Your Order",
    "custom-inquiry": "Submit Custom Inquiry",
    booking: "Confirm Your Booking",
  };

  const contextDescriptions = {
    checkout:
      "Please review and accept our Terms & Conditions before completing your purchase.",
    "custom-inquiry":
      "Please review and accept our Terms & Conditions before submitting your custom design inquiry.",
    booking:
      "Please review and accept our Terms & Conditions before confirming your consultation booking.",
  };

  const handleAccept = () => {
    if (accepted) {
      onAccept();
      setAccepted(false);
      onOpenChange(false);
    }
  };

  const termsLink = brand === "simply-azixa" ? "/simply-azixa/terms" : "/azixa/terms";
  const privacyLink = "/privacy";
  const brandName = brand === "simply-azixa" ? "Simply Azixa" : "Azixa Rahman";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {contextTitles[context]}
          </DialogTitle>
          <DialogDescription>{contextDescriptions[context]}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "terms" | "privacy")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="mt-4">
            <div className="mb-2 text-xs text-muted-foreground">
              {brandName} — {brand === "simply-azixa" ? "Luxury Modest Abayas" : "Made-to-Order & Custom Couture"}
            </div>
            <ScrollArea className="h-[350px] pr-4 border border-border rounded-md p-4">
              {brand === "simply-azixa" ? (
                <SimplyAzixaTermsContent />
              ) : (
                <AzixaRahmanTermsContent />
              )}
            </ScrollArea>
            <div className="mt-2 text-xs text-muted-foreground text-right">
              <Link
                to={termsLink}
                target="_blank"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Open in new tab
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-4">
            <ScrollArea className="h-[350px] pr-4 border border-border rounded-md p-4">
              <div className="space-y-6 text-sm">
                <section>
                  <h3 className="font-semibold text-foreground mb-2">Information We Collect</h3>
                  <p className="text-muted-foreground">
                    We collect information you provide directly to us, such as your name, email address, shipping address, phone number, and payment information when you make a purchase or inquiry.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">How We Use Your Information</h3>
                  <ul className="text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and inquiries</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Improve our products and services</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">Data Protection</h3>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information. Your payment information is processed securely through our payment providers.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
                  <p className="text-muted-foreground">
                    You have the right to access, correct, or delete your personal information. Contact us at azixarahman@gmail.com for any privacy-related requests.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                  <p className="text-muted-foreground">
                    📧 Email: <strong>azixarahman@gmail.com</strong>
                  </p>
                </section>
              </div>
            </ScrollArea>
            <div className="mt-2 text-xs text-muted-foreground text-right">
              <Link
                to={privacyLink}
                target="_blank"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Open in new tab
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 pt-4 border-t border-border">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked === true)}
              className="mt-0.5"
            />
            <Label className="text-sm cursor-pointer leading-relaxed">
              I have read and agree to the Terms & Conditions and Privacy Policy
            </Label>
          </label>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={handleAccept}
              disabled={!accepted}
            >
              Accept & Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
