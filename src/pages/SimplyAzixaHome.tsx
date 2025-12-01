import { Link } from "react-router-dom";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import categoryAbaya from "@/assets/category-abaya.jpg";

export default function SimplyAzixaHome() {
  return (
    <SimplyAzixaLayout>
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={categoryAbaya}
            alt="Simply Azixa Collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-ivory mb-6 animate-slide-up">
              Modest<br />Elegance<br />Redefined
            </h1>
            <p className="text-lg text-ivory/90 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Discover our collection of exquisitely crafted abayas that blend 
              traditional modesty with contemporary design. Each piece celebrates 
              grace, sophistication, and timeless beauty.
            </p>
            <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" variant="gold">
                <Link to="/simply-azixa/abayas">
                  Shop Abayas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl font-semibold text-foreground mb-6">
              A New Chapter in Modest Fashion
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Simply Azixa brings you a carefully curated collection of abayas that 
              honor tradition while embracing modern aesthetics. Each design is crafted 
              with premium fabrics and intricate details that reflect your refined taste.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From everyday elegance to special occasion pieces, our abayas are designed 
              to make you feel confident, beautiful, and true to yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-semibold text-foreground mb-4">
              Our Signature Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our range of beautifully designed abayas, each crafted with care and attention to detail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] overflow-hidden rounded-lg elegant-border">
              <img
                src={categoryAbaya}
                alt="Abaya Collection"
                className="h-full w-full object-cover hover-lift"
              />
            </div>
            <div className="space-y-6">
              <h3 className="font-display text-3xl font-semibold text-foreground">
                Crafted for the Modern Woman
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our abayas feature luxurious fabrics, elegant embellishments, and 
                thoughtful designs that honor modesty without compromising on style. 
                From classic black to contemporary colors, each piece is a statement 
                of grace and sophistication.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">Premium fabric selections including silk, chiffon, and crepe</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">Hand-finished details and embroidery</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground">Multiple size options and length adjustments</span>
                </li>
              </ul>
              <Button asChild size="lg" variant="gold">
                <Link to="/simply-azixa/abayas">
                  Browse Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-6">
            Find Your Perfect Abaya
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our full collection and discover pieces that speak to your personal style.
          </p>
          <Button asChild size="lg" variant="gold">
            <Link to="/simply-azixa/abayas">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
