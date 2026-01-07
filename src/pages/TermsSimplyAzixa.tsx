import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Link } from "react-router-dom";

export default function TermsSimplyAzixa() {
  return (
    <SimplyAzixaLayout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-foreground text-center mb-4">
              Terms & Conditions
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Simply Azixa — Luxury Modest Abayas
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  1. About Our Abayas
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>All Simply Azixa Abayas are designed with modesty and comfort in mind.</li>
                  <li>They feature a relaxed, flowy "One Size Fits All" silhouette in terms of width and body fit.</li>
                  <li>The only variable you choose is your preferred <strong>length</strong> (52" to 62").</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  2. Sizing & Length Selection
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Please review our <Link to="/size-chart" className="text-primary hover:underline">Size Chart</Link> before ordering.</li>
                  <li>We recommend measuring a similar garment you already own.</li>
                  <li><strong>You are responsible</strong> for selecting the correct length.</li>
                  <li>We cannot accept returns, exchanges, or refunds for incorrect length selection.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  3. Ordering & Production
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Once your order is placed, you will receive a confirmation email.</li>
                  <li>Production begins after payment is successfully processed.</li>
                  <li>Production can take up to <strong>14 calendar days (2 weeks)</strong>.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  4. Shipping & Delivery
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Shipping begins after production is complete.</li>
                  <li>Standard shipping takes up to <strong>10 business days</strong>.</li>
                  <li>International orders may be subject to customs processing and delays.</li>
                  <li>Customs duties, taxes, or import fees are the <strong>customer's responsibility</strong>.</li>
                  <li>We are not responsible for delays caused by customs, weather, holidays, or courier services.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  5. Payments
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Full payment is required before production begins.</li>
                  <li><strong>All sales are final. No refunds.</strong></li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  6. Returns & Exchanges
                </h2>
                <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                  <li>Due to the custom-length nature of our Abayas, <strong>all sales are final</strong>.</li>
                  <li>No returns or exchanges for incorrect length selection or change of mind.</li>
                  <li>If your Abaya arrives damaged or defective, contact us within <strong>3 days of delivery</strong> with photo evidence.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  7. Care Instructions
                </h2>
                <p className="text-muted-foreground">
                  Care instructions will be provided with your Abaya to help maintain its quality and longevity.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  8. Policy Updates
                </h2>
                <p className="text-muted-foreground">
                  Policies may be updated from time to time. Continued use of our services means acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  9. Contact
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
    </SimplyAzixaLayout>
  );
}
