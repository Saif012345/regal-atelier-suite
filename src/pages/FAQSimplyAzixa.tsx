import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
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
    question: "What sizes do your abayas come in?",
    answer: "Our abayas feature a relaxed, 'One Size Fits All' silhouette regarding width and overall body fit. The only measurement you need to choose is the Length, available from 52 inches up to 62 inches. We use numeric sizing 2-24 for length selection."
  },
  {
    question: "How do I choose the right length?",
    answer: "We recommend measuring a favorite abaya you already own or measuring from your shoulder to where you want the hem to fall. Our Sizing Guide provides detailed instructions. Please measure carefully as we cannot accept returns for incorrect length selections."
  },
  {
    question: "Are your abayas handmade?",
    answer: "Yes! Every abaya is lovingly handmade by skilled artisans. Whether featuring subtle textures or intricate adornments like our signature meticulous hand beading, each piece is crafted to stand apart."
  },
  {
    question: "How long does production take?",
    answer: "Please allow us a maximum of two (2) weeks (14 calendar days) to lovingly craft and prepare your order for shipping. We always aim to get it to you sooner, but this is the maximum time you should expect."
  },
  {
    question: "What are the shipping times?",
    answer: "Shipping time begins after the production process is complete. Standard shipping can take up to ten (10) business days to arrive at your doorstep, depending on your location and the courier."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. Please note that all prices do not include any potential taxes, customs duties, or fees charged by your country upon import. These fees are the responsibility of the customer."
  },
  {
    question: "What is your return policy?",
    answer: "Because each Abaya is often made specifically for your chosen length, all sales are considered final. If your Abaya arrives with an unexpected defect or damage, please contact us within 3 days of receiving your order."
  },
  {
    question: "What if the length I ordered doesn't fit?",
    answer: "We are unable to accept returns or offer refunds if the length you selected doesn't fit the way you hoped. This is why we strongly recommend checking our detailed Sizing Guide and measuring carefully before ordering."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards (via Stripe), PayPal, and Paystack for Nigerian customers. Payment is required upfront before production begins."
  },
  {
    question: "Can I track my order?",
    answer: "Yes! You will receive a tracking notification once your order is shipped. You can track your package directly through the carrier's website."
  },
  {
    question: "How do I care for my abaya?",
    answer: "Care instructions are included with each abaya. Generally, we recommend hand washing or dry cleaning for delicate fabrics and embellished pieces. Always check the specific care label on your garment."
  },
  {
    question: "How can I contact you?",
    answer: "If you have any questions at all about your order, or just want to say hello, please reach out to us at azixarahman@gmail.com. We're here to help!"
  }
];

export default function FAQSimplyAzixa() {
  return (
    <SimplyAzixaLayout>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl font-semibold text-foreground text-center mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Simply Azixa - Luxury Modest Abayas
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
                  <Link to="/size-chart">Size Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
