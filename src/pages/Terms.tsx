import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Terms() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-foreground text-center mb-4">
              Terms & Conditions
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Please read these terms carefully before placing an order.
            </p>

<Tabs defaultValue="simply-azixa" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="simply-azixa">Simply Azixa</TabsTrigger>
                <TabsTrigger value="azixa-rahman">Azixa Rahman</TabsTrigger>
              </TabsList>

              {/* Simply Azixa Terms */}
              <TabsContent value="simply-azixa" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Simply Azixa — Terms & Conditions
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Luxury Modest Abayas
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    1. About Our Abayas
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>All Simply Azixa Abayas are designed with modesty and comfort in mind.</li>
                    <li>They feature a relaxed, flowy "One Size Fits All" silhouette in terms of width and body fit.</li>
                    <li>The only variable you choose is your preferred <strong>length</strong> (52" to 62").</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    2. Sizing & Length Selection
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Please review our <strong>Size Chart</strong> before ordering.</li>
                    <li>We recommend measuring a similar garment you already own.</li>
                    <li><strong>You are responsible</strong> for selecting the correct length.</li>
                    <li>We cannot accept returns, exchanges, or refunds for incorrect length selection.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    3. Ordering & Production
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Once your order is placed, you will receive a confirmation email.</li>
                    <li>Production begins after payment is successfully processed.</li>
                    <li>Production can take up to <strong>14 calendar days (2 weeks)</strong>.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    4. Shipping & Delivery
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Shipping begins after production is complete.</li>
                    <li>Standard shipping takes up to <strong>10 business days</strong>.</li>
                    <li>International orders may be subject to customs processing and delays.</li>
                    <li>Customs duties, taxes, or import fees are the <strong>customer's responsibility</strong>.</li>
                    <li>We are not responsible for delays caused by customs, weather, holidays, or courier services.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    5. Payments
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Full payment is required before production begins.</li>
                    <li><strong>All sales are final. No refunds.</strong></li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    6. Returns & Exchanges
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Due to the custom-length nature of our Abayas, <strong>all sales are final</strong>.</li>
                    <li>No returns or exchanges for incorrect length selection or change of mind.</li>
                    <li>If your Abaya arrives damaged or defective, contact us within <strong>3 days of delivery</strong> with photo evidence.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    7. Care Instructions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Care instructions will be provided with your Abaya to help maintain its quality and longevity.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    8. Policy Updates
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Policies may be updated from time to time. Continued use of our services means acceptance of the updated terms.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    9. Contact
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    📧 Email: <strong>azixarahman@gmail.com</strong>
                  </p>

                  <p className="text-muted-foreground mt-8 font-semibold border-t border-border pt-6">
                    By placing an order, you confirm that you have read and agreed to these Terms & Conditions.
                  </p>
                </div>
              </TabsContent>

              {/* Azixa Rahman Terms */}
              <TabsContent value="azixa-rahman" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Azixa Rahman — Terms & Conditions
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Made-to-Order & Custom Couture
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    1. Order Types
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li><strong>Made-to-Order (Website Orders):</strong> Designs shown on the website. You select a standard size or submit measurements, and the dress is produced accordingly.</li>
                    <li><strong>Custom Orders:</strong> Bespoke designs for bridal, prom, or special occasions. These begin with a paid consultation and involve personalized design development.</li>
                    <li>We do not sell ready-made dresses. All garments are Made-to-Order or Custom.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    2. Payments & Fees
                  </h3>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">Website Orders</h4>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Full payment upfront before production begins.</li>
                  </ul>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">Custom Orders</h4>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Non-refundable consultation fee to initiate design process.</li>
                    <li>50–70% non-refundable deposit to begin production.</li>
                    <li>Remaining balance paid before shipping.</li>
                    <li>Some projects may require full payment upfront.</li>
                  </ul>
                  <p className="text-muted-foreground mb-4">
                    <strong>Consultation fees are non-refundable and non-transferable.</strong>
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    3. Measurements & Sizing
                  </h3>
                  <p className="text-muted-foreground mb-2">You may:</p>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Select a standard size from our size chart</li>
                    <li>Submit custom measurements</li>
                    <li>Book a virtual measurement consultation (additional fee)</li>
                  </ul>
                  <p className="text-muted-foreground mb-4 font-semibold">
                    The client is fully responsible for measurement accuracy. We do not accept returns, refunds, or exchanges due to incorrect measurements, wrong size selection, or body changes after ordering.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    4. Production & Timelines
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Production typically takes <strong>4–8 weeks</strong>, depending on design complexity.</li>
                    <li>Simple designs: Order at least <strong>1 month</strong> before your event.</li>
                    <li>Bridal/custom designs: <strong>3–6 months</strong> recommended.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    5. Shipping & Delivery
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Processing: 1–3 business days after completion.</li>
                    <li>Standard shipping: 7–10 business days.</li>
                    <li>Tracking details will be sent once shipped.</li>
                    <li>Shipping timelines are estimates only. We are not responsible for courier delays.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    6. International Orders
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Customers are responsible for all customs duties, taxes, and import fees. These are not included in the product price.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    7. Fittings & Alterations
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Website orders: No fittings offered.</li>
                    <li>Custom orders: Limited fittings for local clients only (at our discretion).</li>
                    <li>We do not cover alteration costs. Alterations are the client's responsibility.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    8. Returns, Exchanges & Refunds
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li><strong>All sales are final.</strong> No returns or exchanges.</li>
                    <li>If your dress arrives defective, contact us within <strong>3 days of delivery</strong> with photo evidence.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    9. Cancellations & Deposits
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You may cancel a custom order, but <strong>all consultation fees and deposits are forfeited</strong>.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    10. Fabric & Design Variations
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Minor variations may occur due to screen settings, dye lots, and the inherent nature of textiles. We strive for accuracy but cannot guarantee exact matches.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    11. Disputes & Chargebacks
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Contact us directly to resolve any issues professionally.</li>
                    <li>Unwarranted chargebacks will be disputed if terms were agreed to and delivery confirmed.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    12. Contact
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    📧 Email: <strong>azixarahman@gmail.com</strong>
                  </p>

                  <p className="text-muted-foreground mt-8 font-semibold border-t border-border pt-6">
                    By placing an order, you confirm that you have read and agreed to these Terms & Conditions.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}
