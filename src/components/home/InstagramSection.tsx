import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";
import categoryOccasion from "@/assets/category-occasion.jpg";
import categoryAbaya from "@/assets/category-abaya.jpg";

const instagramPosts = [
  { image: categoryProm, likes: 1234 },
  { image: categoryBridal, likes: 2456 },
  { image: categoryOccasion, likes: 987 },
  { image: categoryAbaya, likes: 1543 },
];

export function InstagramSection() {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="h-8 w-8 text-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get inspired by our latest designs and see how our clients shine in Azixa Rahman
          </p>
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://www.instagram.com/azixarahman/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Instagram className="h-5 w-5" />
              @azixarahman
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href="https://www.instagram.com/azixarahman/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image}
                alt={`Instagram post ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-background" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
