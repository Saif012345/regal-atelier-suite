import { Link } from "react-router-dom";
import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import categoryAbaya from "@/assets/category-abaya.jpg";

export default function SimplyAzixaHome() {
  return (
    <SimplyAzixaLayout>
      <SEOHead brand="simply-azixa" />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryAbaya})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4 font-medium">
              Modest Elegance
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ivory mb-6 leading-tight">
              Simply
              <span className="block text-gold">Azixa</span>
            </h1>
            <p className="text-ivory/80 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Discover our curated collection of luxurious abayas, where modesty 
              meets modern elegance. Each piece is crafted with attention to detail 
              and timeless sophistication.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/simply-azixa/abayas">
                <Button size="lg" variant="gold" className="group">
                  Shop Abayas
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button size="lg" variant="heroOutline">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Our Philosophy</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
              Modest, Elegant, Unique
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Simply Azixa celebrates the beauty of modest fashion without compromising on style. 
              Our abayas are designed for the modern woman who values both tradition and 
              contemporary aesthetics. Each piece features premium fabrics, intricate detailing, 
              and flattering silhouettes that make every moment special.
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">The Collection</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                Timeless Abayas for Every Occasion
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                From everyday elegance to special occasions, our collection offers 
                a variety of styles, colors, and embellishments. Whether you prefer 
                minimalist designs or statement pieces, Simply Azixa has the perfect 
                abaya for you.
              </p>
              <ul className="space-y-3 text-muted-foreground mb-8">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Premium quality fabrics
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Handcrafted embellishments
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Multiple length options
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  International shipping available
                </li>
              </ul>
              <Link to="/simply-azixa/abayas">
                <Button variant="gold" className="group">
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <img
                src={categoryAbaya}
                alt="Simply Azixa Abayas"
                className="rounded-lg shadow-elegant w-full aspect-[3/4] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-elegant">
                <p className="font-display text-2xl font-semibold">New Arrivals</p>
                <p className="text-sm opacity-90">Shop the latest styles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">Ready to Shop?</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            Discover Your Perfect Abaya
          </h2>
          <p className="text-ivory/70 max-w-2xl mx-auto mb-8">
            Explore our full collection and find the abaya that speaks to your style.
          </p>
          <Link to="/simply-azixa/abayas">
            <Button size="lg" variant="gold">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
