import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, ShoppingBag, SlidersHorizontal, Search, X } from "lucide-react";

import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";
import categoryOccasion from "@/assets/category-occasion.jpg";
import categoryAbaya from "@/assets/category-abaya.jpg";

const categories = [
  { id: "all", name: "All" },
  { id: "prom", name: "Prom" },
  { id: "bridal", name: "Bridal" },
  { id: "occasion", name: "Occasion" },
  { id: "abayas", name: "Abayas" },
];

const mockProducts = [
  { id: "celestial-ballgown", name: "Celestial Ballgown", price: 1899, image: categoryProm, category: "prom", isNew: true },
  { id: "midnight-glamour", name: "Midnight Glamour", price: 1599, image: categoryProm, category: "prom" },
  { id: "eternal-grace", name: "Eternal Grace", price: 3499, image: categoryBridal, category: "bridal", isNew: true },
  { id: "whisper-lace", name: "Whisper Lace", price: 2899, image: categoryBridal, category: "bridal" },
  { id: "emerald-dream", name: "Emerald Dream", price: 1299, image: categoryOccasion, category: "occasion" },
  { id: "golden-hour", name: "Golden Hour Gown", price: 1499, image: categoryOccasion, category: "occasion" },
  { id: "noir-elegance", name: "Noir Elegance Abaya", price: 599, image: categoryAbaya, category: "abayas" },
  { id: "royal-pearl", name: "Royal Pearl Abaya", price: 749, image: categoryAbaya, category: "abayas", isNew: true },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const selectedCategory = searchParams.get("category") || "all";

  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      products = [...products].sort((a, b) => b.price - a.price);
    }

    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover exquisite formal wear crafted with precision and designed to make you feel extraordinary.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10 pb-6 border-b border-border">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "gold" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-card">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-8">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); handleCategoryChange("all"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4 bg-muted elegant-border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {product.isNew && (
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                          New
                        </span>
                      )}

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
                        <Button variant="gold" size="sm">
                          Quick View
                        </Button>
                      </div>
                    </div>

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
          )}
        </div>
      </section>
    </Layout>
  );
}
