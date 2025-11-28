import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

import categoryOccasion from "@/assets/category-occasion.jpg";

const occasionDresses = [
  { id: 1, name: "Emerald Dream", price: 1299, image: categoryOccasion },
  { id: 2, name: "Golden Hour Gown", price: 1499, image: categoryOccasion },
  { id: 3, name: "Sapphire Elegance", price: 1399, image: categoryOccasion },
  { id: 4, name: "Rose Garden", price: 1199, image: categoryOccasion },
  { id: 5, name: "Midnight Blue", price: 1599, image: categoryOccasion },
  { id: 6, name: "Champagne Cascade", price: 1449, image: categoryOccasion },
];

export default function FormalWearOccasion() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Occasion Wear Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Elegant gowns for galas, formal events, and special celebrations. Custom-designed for your unique occasion.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/custom-inquiry">Start Custom Inquiry</Link>
          </Button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {occasionDresses.map((dress, index) => (
              <article
                key={dress.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-muted elegant-border">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label="Quick add to bag"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button asChild variant="gold" size="sm">
                      <Link to="/custom-inquiry">Customize This</Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {dress.name}
                  </h3>
                  <p className="font-medium text-foreground">
                    From ${dress.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Perfect for formal events and celebrations
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
