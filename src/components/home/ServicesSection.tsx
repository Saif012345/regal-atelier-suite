import { Link } from "react-router-dom";
import { Sparkles, Ruler, Video, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Sparkles,
    title: "Custom Design",
    description:
      "Bring your dream dress to life with our bespoke design service. Share your inspiration and we'll craft something uniquely yours.",
    link: "/custom-inquiry",
    linkText: "Start Inquiry",
  },
  {
    icon: Ruler,
    title: "Perfect Fit",
    description:
      "Choose standard sizing or provide custom measurements. Our detailed size guide and video tutorials ensure the perfect fit.",
    link: "/size-chart",
    linkText: "View Size Guide",
  },
  {
    icon: Video,
    title: "Virtual Consultation",
    description:
      "Schedule a one-on-one video consultation with our stylists. Get expert advice from the comfort of your home.",
    link: "/booking",
    linkText: "Book Session",
  },
  {
    icon: Truck,
    title: "Global Shipping",
    description:
      "We deliver elegance worldwide. Multiple currency support and international shipping to bring your dress to you.",
    link: "/shipping",
    linkText: "Learn More",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-charcoal text-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-gold uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            The Maison Experience
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-lg border border-ivory/10 hover:border-gold/40 transition-all duration-300 hover:bg-ivory/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-charcoal transition-colors duration-300">
                  <service.icon className="h-7 w-7" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-ivory/70 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <Button asChild variant="link" className="text-gold p-0 h-auto">
                <Link to={service.link}>{service.linkText} →</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
