import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqSections = [
  {
    title: "Sizing & Fit",
    faqs: [
      {
        question: "Are your Abayas true to size?",
        answer: "Our Abayas are designed with a modest, relaxed One Size Fits All silhouette in terms of width and body fit. They are flowy, comfortable, and provide full coverage."
      },
      {
        question: "What size do I need to select?",
        answer: "You only need to select your preferred length. Width and overall fit are standardized for ease and modesty."
      },
      {
        question: "What lengths are available?",
        answer: "Our Abayas are available in lengths ranging from 52 inches to 62 inches."
      },
      {
        question: "How do I choose the correct length?",
        answer: "We strongly recommend checking the size chart on the product page and measuring a similar garment you already own. Choosing the correct length is the customer's responsibility."
      },
      {
        question: "Can I exchange or return an Abaya if the length doesn't fit?",
        answer: "Unfortunately, no. Since Abayas are often made specifically to the length you choose, we cannot accept returns or exchanges for incorrect length selection."
      }
    ]
  },
  {
    title: "Ordering & Production",
    faqs: [
      {
        question: "What happens after I place my order?",
        answer: "Once your order is placed, you will receive a confirmation email confirming that production preparation has begun."
      },
      {
        question: "How long does production take?",
        answer: "Production can take up to 14 calendar days (2 weeks). We always aim to finish sooner, but this is the maximum timeframe."
      },
      {
        question: "When does shipping start?",
        answer: "Shipping begins after production is completed."
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping can take up to 10 business days, depending on your location and courier service."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship internationally. Delivery times may vary due to customs processing."
      },
      {
        question: "Are customs duties or taxes included?",
        answer: "No. All customs duties, taxes, or import fees are the responsibility of the customer."
      },
      {
        question: "What if my order is delayed?",
        answer: "Delays caused by customs, weather, holidays, or courier services are outside our control. We appreciate your patience."
      }
    ]
  },
  {
    title: "Payments",
    faqs: [
      {
        question: "When does production begin?",
        answer: "Production begins once payment is successfully processed."
      },
      {
        question: "Are payments refundable?",
        answer: "No. All sales are final."
      }
    ]
  },
  {
    title: "Returns & Issues",
    faqs: [
      {
        question: "Do you accept returns or exchanges?",
        answer: "No. All sales are final due to the custom-length nature of our Abayas."
      },
      {
        question: "What if my Abaya arrives damaged or defective?",
        answer: "Please contact us within 3 days of delivery with clear evidence, and we will assist accordingly."
      }
    ]
  },
  {
    title: "Care Instructions",
    faqs: [
      {
        question: "How should I care for my Abaya?",
        answer: "Care instructions will be provided with your Abaya to help maintain quality and longevity."
      }
    ]
  },
  {
    title: "Policy Updates",
    faqs: [
      {
        question: "Can your policies change?",
        answer: "Yes. Policies may be updated from time to time. Continued use of our services means acceptance of the updated terms."
      }
    ]
  },
  {
    title: "Contact & Support",
    faqs: [
      {
        question: "How can I contact Simply Azixa?",
        answer: "📧 Email: azixarahman@gmail.com — We're happy to assist with any questions regarding sizing, orders, or general inquiries."
      }
    ]
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

            {faqSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {section.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${sectionIndex}-${faqIndex}`}
                      className="border border-border rounded-lg px-6"
                    >
                      <AccordionTrigger className="font-display text-lg font-medium text-foreground hover:text-primary py-6 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            <div className="mt-12 text-center p-8 bg-secondary rounded-2xl">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                We're here to help. Reach out to our team for personalized assistance.
              </p>
              <Button variant="default" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
