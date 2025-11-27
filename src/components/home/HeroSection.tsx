import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  heroImage: string;
}

export function HeroSection({ heroImage }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant formal wear collection"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-slide-up">
          <p className="mb-4 font-display text-lg tracking-widest text-gold uppercase">
            New Collection 2024
          </p>
          <h1 className="mb-6 font-display text-5xl font-semibold leading-tight text-ivory sm:text-6xl lg:text-7xl">
            Elegance for Every
            <span className="block text-gold">Occasion</span>
          </h1>
          <p className="mb-8 text-lg text-ivory/80 leading-relaxed max-w-lg">
            Discover our exquisite collection of prom dresses, bridal gowns, 
            and occasion wear. Handcrafted with precision and designed to make 
            you feel extraordinary.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/shop">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/custom-inquiry">
                Custom Design
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-ivory/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
