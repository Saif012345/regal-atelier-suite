import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How does the custom design process work?",
    answer: "Our custom design process begins with a consultation where we discuss your vision, preferences, and event details. After the consultation, we provide design sketches and fabric recommendations. Once approved, production begins with regular updates throughout the process. The typical timeline is 4-8 weeks depending on complexity."
  },
  {
    question: "What is the difference between Made-to-Order and Custom Orders?",
    answer: "Made-to-Order items are dresses from our existing designs made to your measurements. Custom Orders are entirely bespoke designs created specifically for you from scratch. Custom Orders require a consultation fee and a 50-70% deposit to begin the design process."
  },
  {
    question: "How do I provide my measurements?",
    answer: "You have three options: 1) Select a standard size from our size chart, 2) Input custom measurements following our online guide, or 3) Book a virtual measurement consultation for guided assistance. We strongly recommend option 3 for custom orders."
  },
  {
    question: "What sizes do you offer?",
    answer: "We offer sizes 2-24 in our standard size chart. For custom measurements, we can accommodate any size. Our goal is to create a perfect fit for every body."
  },
  {
    question: "How long does production take?",
    answer: "Made-to-Order dresses typically take 4-6 weeks. Custom designs take 6-8 weeks. For bridal gowns and heavily detailed pieces, we recommend allowing 3-6 months. We require a minimum of 1 month before your event date."
  },
  {
    question: "What is your shipping policy?",
    answer: "We offer free standard shipping on orders over $500. Standard shipping takes 7-10 business days after production is complete. Expedited shipping options are available for an additional fee. International orders may be subject to customs duties."
  },
  {
    question: "Do you offer alterations?",
    answer: "We do not offer alterations after delivery. However, our detailed measurement process is designed to ensure a perfect fit. We recommend having a local tailor on standby for any minor adjustments needed."
  },
  {
    question: "What is your return policy?",
    answer: "Due to the personalized, made-to-order nature of our products, we do not accept returns or exchanges for change of mind or sizing issues resulting from customer-provided measurements. Refunds are only considered for major manufacturing defects reported within 3 days of receipt."
  },
  {
    question: "What consultation types do you offer?",
    answer: "We offer three types: Complimentary Consultation (15 min, free) for quick styling advice, Styling Session (30 min, $50) for in-depth guidance, and Custom Design Consultation (45 min, $75) for bespoke creations. All consultations are conducted via video call."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards (via Stripe), PayPal, and Paystack for Nigerian customers. For custom orders, we require a 50-70% deposit upfront with the remaining balance due before shipment."
  },
  {
    question: "Can I see fabric samples before ordering?",
    answer: "Fabric samples can be discussed during your consultation. For custom orders, we can arrange to send fabric swatches for an additional fee. Please note that colors may vary slightly from screen representations."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. International customers are responsible for any import duties, customs fees, or taxes levied by their country. Shipping times vary by destination."
  }
];

export default function FAQAzixaRahman() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-foreground text-center mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Azixa Rahman - Luxury Custom Formal Wear
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="font-display text-lg font-medium text-foreground hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center p-8 bg-secondary rounded-2xl">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                We're here to help. Reach out to our team for personalized assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="default" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/booking">Book Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
