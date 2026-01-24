import { Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useSiteImage } from "@/hooks/useSiteImages";
import heroFormal from "@/assets/hero-formal.jpg";

export default function AzixaHome() {
  // Fetch products for category images
  const { data: products, isLoading } = useProducts("azixa");
  
  // Fetch site images for categories
  const { data: promCategoryImage } = useSiteImage("azixa-category-prom");
  const { data: bridalCategoryImage } = useSiteImage("azixa-category-bridal");
  const { data: occasionCategoryImage } = useSiteImage("azixa-category-occasion");
  const { data: heroImage } = useSiteImage("azixa-hero");

  // Get first product image as fallback
  const getProductImage = (category: string) => {
    const product = products?.find(p => p.category === category);
    return product?.images[0]?.image_url || heroFormal;
  };

  const categories = [
    {
      name: "Prom",
      description: "Make an unforgettable entrance with our stunning prom collection",
      image: promCategoryImage?.image_url || getProductImage("Prom"),
      href: "/azixa/prom"
    },
    {
      name: "Bridal",
      description: "Timeless elegance for your most special day",
      image: bridalCategoryImage?.image_url || getProductImage("Bridal"),
      href: "/azixa/bridal"
    },
    {
      name: "Occasion",
      description: "Sophisticated pieces for galas, events & celebrations",
      image: occasionCategoryImage?.image_url || getProductImage("Occasion"),
      href: "/azixa/occasion"
    }
  ];

  const heroBackgroundImage = heroImage?.image_url || heroFormal;

  return (
    <AzixaLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4 font-medium">
              Luxury Couture
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ivory mb-6 leading-tight">
              Azixa Rahman
            </h1>
            <p className="text-ivory/80 text-lg mb-8 max-w-lg leading-relaxed">
              Where dreams are woven into fabric. Each gown is a masterpiece of
              craftsmanship, designed to make you feel extraordinary on your most
              memorable occasions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" variant="gold" className="group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/custom-inquiry">
                <Button size="lg" variant="heroOutline">
                  Custom Design
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
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">The Art of Elegance</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
              About the Brand
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Azixa Rahman Label represents the pinnacle of bespoke fashion, where traditional
              craftsmanship meets contemporary elegance. Each piece is meticulously designed
              and handcrafted to transform your vision into a stunning reality. Our commitment
              to excellence ensures that every gown tells a unique story of beauty and sophistication.
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn More About Azixa Rahman
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Our Collections</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
              Shop by Category
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="group relative overflow-hidden rounded-lg aspect-[3/4] elegant-border animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl text-ivory mb-2">{category.name}</h3>
                    <p className="text-ivory/70 text-sm mb-4">{category.description}</p>
                    <span className="inline-flex items-center text-gold text-sm group-hover:translate-x-2 transition-transform">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">Bespoke Service</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            Create Your Dream Gown
          </h2>
          <p className="text-ivory/70 max-w-2xl mx-auto mb-8">
            Work directly with our design team to bring your vision to life.
            From fabric selection to final fitting, we're with you every step of the way.
          </p>
          <Link to="/custom-inquiry">
            <Button size="lg" variant="gold">
              Start Custom Inquiry
            </Button>
          </Link>
        </div>
      </section>
    </AzixaLayout>
  );
}
