import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

import categoryProm from "@/assets/category-prom.jpg";

const promDresses = [
  { id: 1, name: "Celestial Ballgown", price: 1899, image: categoryProm },
  { id: 2, name: "Midnight Glamour", price: 1599, image: categoryProm },
  { id: 3, name: "Starlight Sequin", price: 1799, image: categoryProm },
  { id: 4, name: "Ruby Romance", price: 1699, image: categoryProm },
  { id: 5, name: "Silver Dreams", price: 1499, image: categoryProm },
  { id: 6, name: "Golden Hour", price: 1899, image: categoryProm },
];

export default function FormalWearProm() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Prom Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Make your prom night unforgettable with a stunning gown designed just for you. Each piece can be fully customized to your measurements and style preferences.
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
            {promDresses.map((dress, index) => (
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
                    Fully customizable to your measurements
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
