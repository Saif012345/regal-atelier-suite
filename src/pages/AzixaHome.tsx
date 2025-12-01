import { Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";
import categoryOccasion from "@/assets/category-occasion.jpg";
import heroFormal from "@/assets/hero-formal.jpg";

const categories = [
  {
    name: "Prom",
    description: "Make an unforgettable entrance with our stunning prom collection",
    image: categoryProm,
    href: "/azixa/prom",
  },
  {
    name: "Bridal",
    description: "Timeless elegance for your most special day",
    image: categoryBridal,
    href: "/azixa/bridal",
  },
  {
    name: "Occasion",
    description: "Sophisticated pieces for galas, events & celebrations",
    image: categoryOccasion,
    href: "/azixa/occasion",
  },
];

export default function AzixaHome() {
  return (
    <AzixaLayout>
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroFormal}
            alt="Azixa Rahman Collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Luxury Formal Wear</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-ivory mb-6 animate-slide-up">
              Where Dreams<br />Meet Design
            </h1>
            <p className="text-lg text-ivory/90 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Custom couture for life's most extraordinary moments. Each piece is meticulously crafted 
              to celebrate your unique vision and style.
            </p>
            <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" variant="gold">
                <Link to="/azixa/custom">
                  Start Custom Inquiry
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-ivory/10 backdrop-blur-sm border-ivory/30 text-ivory hover:bg-ivory/20">
                <Link to="#collection">Explore Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl font-semibold text-foreground mb-6">
              The Art of Azixa Rahman
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              For over a decade, Azixa Rahman has been synonymous with elegance, 
              craftsmanship, and timeless beauty. Each gown is a masterpiece, 
              hand-crafted with meticulous attention to detail and an unwavering 
              commitment to making you feel extraordinary.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From prom nights to wedding days, from galas to once-in-a-lifetime 
              celebrations, we create pieces that don't just dress you—they transform 
              you into the best version of yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="collection" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-semibold text-foreground mb-4">
              Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated collections, each designed to make your special moments unforgettable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] elegant-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-ivory mb-2">
                    {category.name}
                  </h3>
                  <p className="text-ivory/80 text-sm mb-4">{category.description}</p>
                  <Button variant="goldOutline" size="sm">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-6">
            Ready to Create Your Dream Piece?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of expert designers is here to bring your vision to life. 
            Start your custom inquiry today and let's create something extraordinary together.
          </p>
          <Button asChild size="lg" variant="gold">
            <Link to="/custom-inquiry">
              Submit Custom Inquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </AzixaLayout>
  );
}
