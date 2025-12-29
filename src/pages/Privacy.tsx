import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-foreground text-center mb-4">
              Privacy Policy
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-muted-foreground mb-6">
                Azixa Rahman ("we," "our," or "us") respects your privacy and is committed to protecting 
                your personal data. This privacy policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website or make a purchase.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                2. Information We Collect
              </h2>
              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                Personal Information
              </h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6">
                <li>Name and contact information (email address, phone number, shipping address)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Body measurements for custom orders</li>
                <li>Communication preferences</li>
                <li>Photos provided for custom design consultations</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">
                Automatically Collected Information
              </h3>
              <p className="text-muted-foreground mb-6">
                When you visit our website, we may automatically collect certain information about your 
                device and browsing activity, including IP address, browser type, pages visited, and 
                time spent on pages.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders, consultations, and inquiries</li>
                <li>Schedule and conduct video consultations</li>
                <li>Process payments securely</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                4. Payment Processing
              </h2>
              <p className="text-muted-foreground mb-6">
                We use third-party payment processors (such as Stripe, PayPal, and Paystack) to handle 
                all payment transactions. We do not store your full credit card information on our servers. 
                All payment data is encrypted and handled in accordance with PCI-DSS requirements.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                5. Consultations
              </h2>
              <p className="text-muted-foreground mb-6">
                When you book a video consultation, we collect your preferred platform (Zoom, Google Meet, 
                FaceTime, or WhatsApp), contact information, and any notes you provide about your design 
                preferences. Consultation recordings are only made with your explicit consent and are used 
                solely for reference during the design process.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                6. Data Sharing
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6">
                <li>Payment processors to complete transactions</li>
                <li>Shipping carriers to deliver your orders</li>
                <li>Service providers who assist with our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                7. Communications
              </h2>
              <p className="text-muted-foreground mb-6">
                You may receive transactional emails related to your orders and consultations. Marketing 
                communications are sent only with your consent, and you can unsubscribe at any time by 
                clicking the unsubscribe link in our emails or contacting us directly.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                8. Data Security
              </h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate technical and organizational security measures to protect your 
                personal information. However, no method of transmission over the Internet or electronic 
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                9. Your Rights
              </h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have rights regarding your personal information, including:
              </p>
              <ul className="text-muted-foreground mb-6 list-disc pl-6">
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Objection to processing</li>
                <li>Data portability</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground mb-6">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact us at:
                <br /><strong>Email:</strong> azixarahman@gmail.com
              </p>

              <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-muted-foreground mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
