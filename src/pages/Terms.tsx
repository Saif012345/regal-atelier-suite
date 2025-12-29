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

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general">General Terms</TabsTrigger>
                <TabsTrigger value="simply-azixa">Simply Azixa</TabsTrigger>
                <TabsTrigger value="azixa-rahman">Azixa Rahman</TabsTrigger>
              </TabsList>

              {/* General Terms */}
              <TabsContent value="general" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    General Terms (All Purchases)
                  </h2>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    1. Agreement to Terms
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    By accessing and making a purchase from our website, you agree to be bound by these 
                    Terms and Conditions. Please read them carefully before placing an order.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    2. Payments & Costs
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Production begins once your payment is successfully processed. All prices listed on 
                    the website do not include any potential taxes, customs duties, or fees charged by 
                    your country upon import. These fees are the responsibility of the customer.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    3. International Orders & Customs Duties
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For international shipments, the recipient is solely responsible for all import duties, 
                    customs fees, tariffs, taxes, and any other charges levied by the destination country. 
                    These fees are not included in the product price or shipping cost. Shipping times do 
                    not include potential delays in customs clearance.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    4. Force Majeure
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We are not liable for any delay or failure in performance resulting from causes outside 
                    our reasonable control, including but not limited to acts of God, war, terrorism, riots, 
                    embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, 
                    shortages of materials, or supply chain failures.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    5. Staying Updated
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We may occasionally update these Terms & Conditions to better serve you. Any changes 
                    will be posted here on our website. By continuing to shop with us, you are agreeing 
                    to the newest version of our terms.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    6. Contact Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For any questions regarding these Terms and Conditions or your order, please contact us at:
                    <br /><strong>azixarahman@gmail.com</strong>
                  </p>
                </div>
              </TabsContent>

              {/* Simply Azixa Terms */}
              <TabsContent value="simply-azixa" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Terms & Conditions for Simply Azixa
                  </h2>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    1. About Your Abaya & Sizing
                  </h3>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">A. The Beautiful Fit</h4>
                  <p className="text-muted-foreground mb-4">
                    All of our Abayas are designed with modesty and comfort in mind, featuring a relaxed, 
                    "One Size Fits All" silhouette regarding width and overall body fit. We embrace flow and coverage!
                  </p>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">B. Choosing the Right Length</h4>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>The only measurement you need to choose is the Length, which ensures the hemline is perfect for you.</li>
                    <li>Our lengths are available from 52 inches up to 62 inches.</li>
                    <li><strong>Your Responsibility:</strong> We highly recommend checking our detailed Sizing Guide and perhaps measuring a favorite garment you already own before selecting your length. We rely on you to choose the perfect fit, and unfortunately, we can't be responsible if an incorrect length is selected during ordering.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    2. Our Journey Together: Order, Creation, & Delivery
                  </h3>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">A. Confirmation & Excitement</h4>
                  <p className="text-muted-foreground mb-4">
                    Once you place your order, we'll send you an email to confirm all the lovely details! 
                    This means we've safely received your request and are getting ready to start the creative process.
                  </p>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">B. Crafting Your Abaya (Production Time)</h4>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Many of our Abayas are carefully made or finished specifically for you! We call this our Production Time.</li>
                    <li>Please allow us a maximum of two (2) weeks (14 calendar days) to lovingly craft and prepare your order for shipping.</li>
                  </ul>
                  <h4 className="font-semibold text-foreground mt-4 mb-2">C. Shipping & The Final Stretch</h4>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li>Shipping time begins after the production process is complete.</li>
                    <li>Standard shipping can take up to ten (10) business days to arrive at your doorstep.</li>
                    <li><strong>Friendly Note:</strong> While we partner with reliable carriers, we cannot control delays caused by post office issues, customs checks, or unexpected events.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    3. Care, Returns, and Exchanges
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li><strong>Our Policy:</strong> Because each Abaya is often made specifically for your chosen length, All sales are considered final.</li>
                    <li><strong>If Something is Wrong:</strong> We perform thorough quality checks, but if your Abaya arrives with an unexpected defect or damage, please let us know immediately! You must contact us within 3 days of receiving your order.</li>
                    <li><strong>Incorrect Lengths:</strong> We are unable to accept returns or offer refunds if the length you selected doesn't fit the way you hoped. Please measure twice—we want you to love it!</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    4. Need to Talk?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions at all about these terms, your order, or just want to say hello, 
                    please reach out! We're here to help at <strong>azixarahman@gmail.com</strong>.
                  </p>
                </div>
              </TabsContent>

              {/* Azixa Rahman Terms */}
              <TabsContent value="azixa-rahman" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                    Terms & Conditions for Azixa Rahman
                  </h2>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    1. Order Types & Payment Terms
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li><strong>Website (Made-to-Order) Items:</strong> Dresses displayed on our website are available for purchase as Made-to-Order. These items require full payment upfront before production commences. No physical stock exists; each dress is produced specifically for your order.</li>
                    <li><strong>Custom Orders:</strong> Custom designs for occasions such as prom, bridal, or other special events are separate from website listings. A paid consultation fee is required to initiate the custom design process. This fee is separate from the final dress cost and is non-refundable. Following the consultation, a non-refundable deposit of 50-70% of the total estimated cost is required to begin the design and production process. The remaining balance is due before shipment.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    2. Measurement Process & Customer Responsibility
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    For Made-to-Order dresses purchased from the website, you have three measurement options:
                  </p>
                  <ol className="text-muted-foreground mb-4 list-decimal pl-6">
                    <li><strong>Standard Size:</strong> Select a size from our provided standard size chart.</li>
                    <li><strong>Custom Measurements:</strong> Input your specific body measurements following our online guide.</li>
                    <li><strong>Virtual Measurement Consultation:</strong> Schedule a video call for a guided measurement session for an additional fee.</li>
                  </ol>
                  <p className="text-muted-foreground mb-4 font-semibold">
                    YOU ARE SOLELY RESPONSIBLE FOR PROVIDING ACCURATE MEASUREMENTS AND/OR SELECTING THE CORRECT SIZE. 
                    We are not liable for garments that do not fit due to incorrect measurements submitted by you, 
                    an incorrectly chosen standard size, or changes in your measurements after the order is placed.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    3. Production & Shipping Timelines
                  </h3>
                  <ul className="text-muted-foreground mb-4 list-disc pl-6">
                    <li><strong>Production Lead Time:</strong> All items are handcrafted upon receipt of full payment and all required specifications. Completion typically takes 4-8 weeks.</li>
                    <li><strong>Event Deadline Policy:</strong> We require a minimum of one (1) month prior to your event date for simple designs. For complex Custom Orders (bridal, heavily detailed gowns), a longer lead time of 3-6 months is strongly recommended.</li>
                    <li><strong>Shipping Processing:</strong> Please allow 1-3 business days for order processing and packaging.</li>
                    <li><strong>Shipping Transit:</strong> Standard shipping transit times are 7-10 business days from the date of dispatch.</li>
                  </ul>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    4. Fittings & Alterations
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We do not offer physical fittings for Made-to-Order items purchased online. Custom Order clients 
                    who are local may, at our sole discretion and subject to scheduling availability, be offered 
                    limited in-person fittings. We do not cover the cost of external alterations. We recommend 
                    budgeting for a local tailor for any final minor adjustments.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    5. Returns, Exchanges, & Refunds
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Given the personalized, made-to-order nature of all our products, we do not accept returns, 
                    exchanges, or offer refunds for change of mind, incorrect size selection, or inaccurate 
                    measurements provided by the customer. Refunds are only considered in the unlikely event 
                    of a major manufacturing defect, which must be reported in writing with photographic evidence 
                    within 3 days of receipt. Consultation fees for custom orders are non-refundable.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    6. Dispute Resolution & Unwarranted Chargebacks
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    In the event of a disagreement or dispute, the customer agrees to contact us directly to seek 
                    a resolution in good faith before initiating any chargeback with a payment provider or pursuing 
                    any legal claim. We actively dispute all chargebacks we deem invalid and will pursue recovery 
                    of the full order amount, plus any associated fees.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    7. Deposits for Custom Orders
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    All deposits and consultation fees for Custom Orders are non-refundable and non-transferable. 
                    They secure our dedicated design time, consultation efforts, and production scheduling. In the 
                    event of order cancellation by the customer after a deposit is paid, the deposit is forfeited.
                  </p>

                  <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-3">
                    8. Fabric & Design Variations
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We make every effort to represent colors and fabrics accurately on our website and in consultations. 
                    However, slight variations may occur due to monitor settings, dye lots, and the inherent nature of 
                    textiles. Minor design details may be adapted at our discretion to ensure quality and aesthetics.
                  </p>

                  <p className="text-muted-foreground mt-8 font-semibold">
                    By placing an order, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
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
