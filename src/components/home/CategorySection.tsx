import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Category {
  name: string;
  description: string;
  image: string;
  href: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
            Our Collections
          </p>
          <h2 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Shop by Category
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] hover-lift elegant-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-semibold text-ivory mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-ivory/70 mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center text-gold text-sm font-medium tracking-wide opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Shop Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
