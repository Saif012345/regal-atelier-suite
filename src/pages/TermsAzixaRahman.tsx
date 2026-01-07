import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Link } from "react-router-dom";

export default function TermsAzixaRahman() {
  return (
    <AzixaLayout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-foreground text-center mb-4">
              Terms & Conditions
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Azixa Rahman — Made-to-Order & Custom Couture
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  1. Order Types
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li><strong>Made-to-Order (Website Orders):</strong> Designs shown on the website. You select a standard size or submit measurements, and the dress is produced accordingly.</li>
                  <li><strong>Custom Orders:</strong> Bespoke designs for bridal, prom, or special occasions. These begin with a paid consultation and involve personalized design development.</li>
                  <li>We do not sell ready-made dresses. All garments are Made-to-Order or Custom.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  2. Payments & Fees
                </h2>
                <h3 className="font-semibold text-foreground mt-4 mb-2">Website Orders</h3>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Full payment upfront before production begins.</li>
                </ul>
                <h3 className="font-semibold text-foreground mt-4 mb-2">Custom Orders</h3>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Non-refundable consultation fee to initiate design process.</li>
                  <li>50–70% non-refundable deposit to begin production.</li>
                  <li>Remaining balance paid before shipping.</li>
                  <li>Some projects may require full payment upfront.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  <strong>Consultation fees are non-refundable and non-transferable.</strong>
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  3. Measurements & Sizing
                </h2>
                <p className="text-muted-foreground mb-2">You may:</p>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Select a standard size from our <Link to="/size-chart" className="text-primary hover:underline">size chart</Link></li>
                  <li>Submit custom measurements</li>
                  <li><Link to="/booking" className="text-primary hover:underline">Book a virtual measurement consultation</Link> (additional fee)</li>
                </ul>
                <p className="text-muted-foreground mt-4 font-semibold">
                  The client is fully responsible for measurement accuracy. We do not accept returns, refunds, or exchanges due to incorrect measurements, wrong size selection, or body changes after ordering.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  4. Production & Timelines
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Production typically takes <strong>4–8 weeks</strong>, depending on design complexity.</li>
                  <li>Simple designs: Order at least <strong>1 month</strong> before your event.</li>
                  <li>Bridal/custom designs: <strong>3–6 months</strong> recommended.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  5. Shipping & Delivery
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Processing: 1–3 business days after completion.</li>
                  <li>Standard shipping: 7–10 business days.</li>
                  <li>Tracking details will be sent once shipped.</li>
                  <li>Shipping timelines are estimates only. We are not responsible for courier delays.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  6. International Orders
                </h2>
                <p className="text-muted-foreground">
                  Customers are responsible for all customs duties, taxes, and import fees. These are not included in the product price.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  7. Fittings & Alterations
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Website orders: No fittings offered.</li>
                  <li>Custom orders: Limited fittings for local clients only (at our discretion).</li>
                  <li>We do not cover alteration costs. Alterations are the client's responsibility.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  8. Returns, Exchanges & Refunds
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li><strong>All sales are final.</strong> No returns or exchanges.</li>
                  <li>If your dress arrives defective, contact us within <strong>3 days of delivery</strong> with photo evidence.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  9. Cancellations & Deposits
                </h2>
                <p className="text-muted-foreground">
                  You may cancel a custom order, but <strong>all consultation fees and deposits are forfeited</strong>.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  10. Fabric & Design Variations
                </h2>
                <p className="text-muted-foreground">
                  Minor variations may occur due to screen settings, dye lots, and the inherent nature of textiles. We strive for accuracy but cannot guarantee exact matches.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  11. Disputes & Chargebacks
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Contact us directly to resolve any issues professionally.</li>
                  <li>Unwarranted chargebacks will be disputed if terms were agreed to and delivery confirmed.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  12. Contact
                </h2>
                <p className="text-muted-foreground">
                  📧 Email: <strong>azixarahman@gmail.com</strong>
                </p>
              </section>

              <p className="text-muted-foreground mt-8 font-semibold border-t border-border pt-6">
                By placing an order, you confirm that you have read and agreed to these Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AzixaLayout>
  );
}
