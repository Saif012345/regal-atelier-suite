import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
              Curated Selection
            </p>
            <h2 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Featured Pieces
            </h2>
          </div>
          <Button asChild variant="goldOutline" className="mt-6 sm:mt-0">
            <Link to="/shop">View All</Link>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-muted elegant-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badges */}
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                  
                  {/* Quick Actions */}
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

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button variant="gold" size="sm">
                      Quick View
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground tracking-wide uppercase">
                    {product.category}
                  </p>
                  <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-medium text-foreground">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
