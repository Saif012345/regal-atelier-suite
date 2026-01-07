import { Layout } from "@/components/layout/Layout";
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
    title: "Order Types",
    faqs: [
      {
        question: "Do you sell ready-made dresses?",
        answer: "No. All Azixa Rahman garments are Made-to-Order or Custom. We do not keep physical stock."
      },
      {
        question: "What is the difference between Made-to-Order and Custom Orders?",
        answer: "Made-to-Order (Website Orders): Designs shown on the website. You select a standard size or submit measurements, and the dress is produced accordingly.\n\nCustom Orders: Bespoke designs for bridal, prom, or special occasions. These begin with a paid consultation and involve personalized design development."
      }
    ]
  },
  {
    title: "Payments & Fees",
    faqs: [
      {
        question: "Do I have to pay in full before production starts?",
        answer: "Yes.\n\nWebsite orders: Full payment upfront\n\nCustom orders:\n• Non-refundable consultation fee\n• 50–70% non-refundable deposit to begin production\n• Remaining balance paid before shipping\n\nSome projects may require full payment upfront."
      },
      {
        question: "Are consultation fees refundable?",
        answer: "No. Consultation fees are non-refundable and non-transferable."
      }
    ]
  },
  {
    title: "Measurements & Sizing",
    faqs: [
      {
        question: "How do I submit my measurements?",
        answer: "You may:\n• Select a standard size\n• Submit custom measurements\n• Book a virtual measurement consultation (additional fee)"
      },
      {
        question: "Who is responsible for measurement accuracy?",
        answer: "The client is fully responsible."
      },
      {
        question: "What if my dress doesn't fit?",
        answer: "We do not accept returns, refunds, or exchanges due to:\n• Incorrect measurements\n• Wrong size selection\n• Body changes after ordering"
      }
    ]
  },
  {
    title: "Production & Timelines",
    faqs: [
      {
        question: "How long does production take?",
        answer: "Typically 4–8 weeks, depending on design complexity."
      },
      {
        question: "How far in advance should I order?",
        answer: "Simple designs: 1 month minimum\n\nBridal/custom designs: 3–6 months recommended"
      }
    ]
  },
  {
    title: "Shipping & Delivery",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Processing: 1–3 business days after completion\n\nStandard shipping: 7–10 business days"
      },
      {
        question: "Will I receive tracking?",
        answer: "Yes. Tracking details will be sent once shipped."
      },
      {
        question: "Are delays your responsibility?",
        answer: "No. Shipping timelines are estimates only."
      }
    ]
  },
  {
    title: "International Orders",
    faqs: [
      {
        question: "Are customs fees included?",
        answer: "No. Customers are responsible for all customs duties and taxes."
      }
    ]
  },
  {
    title: "Fittings & Alterations",
    faqs: [
      {
        question: "Do you offer fittings?",
        answer: "Website orders: No fittings\n\nCustom orders: Limited fittings for local clients only"
      },
      {
        question: "Do you cover alteration costs?",
        answer: "No. Alterations are the client's responsibility."
      }
    ]
  },
  {
    title: "Returns, Exchanges & Refunds",
    faqs: [
      {
        question: "Do you accept returns or exchanges?",
        answer: "No. All sales are final."
      },
      {
        question: "What if my dress arrives defective?",
        answer: "Contact us within 3 days of delivery with photo evidence."
      }
    ]
  },
  {
    title: "Cancellations & Deposits",
    faqs: [
      {
        question: "Can I cancel my custom order?",
        answer: "Yes, but all consultation fees and deposits are forfeited."
      }
    ]
  },
  {
    title: "Fabric & Design Variations",
    faqs: [
      {
        question: "Will my dress look exactly like the photos?",
        answer: "Minor variations may occur due to screen settings, dye lots, and textile nature."
      }
    ]
  },
  {
    title: "Disputes & Chargebacks",
    faqs: [
      {
        question: "What should I do if I have an issue?",
        answer: "Contact us directly so we can resolve it professionally."
      },
      {
        question: "Are chargebacks allowed?",
        answer: "Unwarranted chargebacks will be disputed if terms were agreed to and delivery confirmed."
      }
    ]
  },
  {
    title: "Contact",
    faqs: [
      {
        question: "How can I reach Azixa Rahman?",
        answer: "📧 Email: azixarahman@gmail.com\n\nBy placing an order, you confirm that you have read and agreed to our Terms & Conditions."
      }
    ]
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
                      <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
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
