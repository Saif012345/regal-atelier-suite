import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";

import categoryAbaya from "@/assets/category-abaya.jpg";

const mockAbayas = [
  {
    id: "1",
    name: "Classic Black Abaya",
    price: 299,
    image: categoryAbaya,
    slug: "classic-black-abaya",
  },
  {
    id: "2",
    name: "Embroidered Abaya",
    price: 399,
    image: categoryAbaya,
    slug: "embroidered-abaya",
  },
  {
    id: "3",
    name: "Pearl Detail Abaya",
    price: 449,
    image: categoryAbaya,
    slug: "pearl-detail-abaya",
  },
  {
    id: "4",
    name: "Silk Blend Abaya",
    price: 499,
    image: categoryAbaya,
    slug: "silk-blend-abaya",
  },
  {
    id: "5",
    name: "Modern Cut Abaya",
    price: 349,
    image: categoryAbaya,
    slug: "modern-cut-abaya",
  },
  {
    id: "6",
    name: "Lace Trim Abaya",
    price: 429,
    image: categoryAbaya,
    slug: "lace-trim-abaya",
  },
];

export default function Abayas() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${categoryAbaya})`,
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-4 animate-fade-in">
            Abaya Collection
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto animate-slide-up opacity-90">
            Elegant and modest designs crafted with the finest fabrics
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockAbayas.map((abaya, index) => (
              <Card
                key={abaya.id}
                className="group overflow-hidden hover:shadow-elegant transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={abaya.image}
                    alt={abaya.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-lg"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Link to={`/product/${abaya.slug}`}>
                    <h3 className="font-display text-xl font-semibold mb-2 hover:text-primary transition-colors">
                      {abaya.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4">
                    ${abaya.price.toLocaleString()}
                  </p>
                  <Link to={`/product/${abaya.slug}`}>
                    <Button variant="gold" className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
