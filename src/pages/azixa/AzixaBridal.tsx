import { Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import categoryBridal from "@/assets/category-bridal.jpg";

const bridalGowns = [
  { id: "eternal-grace", name: "Eternal Grace", image: categoryBridal },
  { id: "romantic-dream", name: "Romantic Dream", image: categoryBridal },
  { id: "timeless-beauty", name: "Timeless Beauty", image: categoryBridal },
  { id: "vintage-elegance", name: "Vintage Elegance", image: categoryBridal },
];

export default function AzixaBridal() {
  return (
    <AzixaLayout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Bridal Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Your wedding day deserves a gown as extraordinary as your love story. 
            Let us create the dress of your dreams.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/custom-inquiry">
              Start Custom Inquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bridalGowns.map((gown, index) => (
              <div
                key={gown.id}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  to={`/azixa/product/${gown.id}`}
                  className="block aspect-[3/4] overflow-hidden rounded-lg elegant-border"
                >
                  <img
                    src={gown.image}
                    alt={gown.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button variant="goldOutline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </Link>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground">
                      {gown.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">Custom Design</p>
                  </div>
                  <button className="text-foreground hover:text-primary transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AzixaLayout>
  );
}
