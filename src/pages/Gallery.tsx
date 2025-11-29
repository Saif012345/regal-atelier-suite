import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";
import categoryOccasion from "@/assets/category-occasion.jpg";
import categoryAbaya from "@/assets/category-abaya.jpg";

const galleryImages = [
  { id: 1, image: categoryBridal, caption: "Sarah's Dream Wedding Gown", category: "Bridal", tags: ["Luxury", "Custom"] },
  { id: 2, image: categoryProm, caption: "Emma's Prom Night", category: "Prom", tags: ["Modern"] },
  { id: 3, image: categoryOccasion, caption: "Gala Event - Custom Design", category: "Occasion", tags: ["Luxury", "Custom"] },
  { id: 4, image: categoryAbaya, caption: "Ramadan Collection Piece", category: "Abaya", tags: ["Modest", "Elegant"] },
  { id: 5, image: categoryBridal, caption: "Vintage-Inspired Bridal", category: "Bridal", tags: ["Custom", "Vintage"] },
  { id: 6, image: categoryProm, caption: "Red Carpet Ready", category: "Prom", tags: ["Luxury", "Bold"] },
  { id: 7, image: categoryOccasion, caption: "Mother of the Bride", category: "Occasion", tags: ["Elegant"] },
  { id: 8, image: categoryAbaya, caption: "Embroidered Elegance", category: "Abaya", tags: ["Modest", "Luxury"] },
];

const categories = ["All", "Prom", "Bridal", "Occasion", "Abaya"];
const tagFilters = ["All Tags", "Luxury", "Modest", "Custom", "Elegant", "Modern", "Bold", "Vintage"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = galleryImages.filter((img) => {
    const categoryMatch = selectedCategory === "All" || img.category === selectedCategory;
    const tagMatch = selectedTag === "All Tags" || img.tags.includes(selectedTag);
    return categoryMatch && tagMatch;
  });

  const currentIndex = selectedImage !== null
    ? filteredImages.findIndex((img) => img.id === selectedImage)
    : -1;

  const navigateImage = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
        : (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex].id);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Our Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of custom creations and client showcases. 
            Each piece tells a unique story of elegance and craftsmanship.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="space-y-4 mb-10">
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Category</p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-medium">Tags</p>
              <div className="flex flex-wrap justify-center gap-2">
                {tagFilters.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "gold" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredImages.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] elegant-border animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs text-gold uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <p className="text-ivory font-display text-lg">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No images found in this category.
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-charcoal border-none">
          <DialogTitle className="sr-only">Gallery Image View</DialogTitle>
          {selectedImage !== null && (
            <div className="relative">
              <img
                src={filteredImages.find((img) => img.id === selectedImage)?.image}
                alt={filteredImages.find((img) => img.id === selectedImage)?.caption}
                className="w-full max-h-[80vh] object-contain"
              />
              
              {/* Navigation */}
              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Close */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 h-10 w-10 flex items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal to-transparent">
                <p className="text-xs text-gold uppercase tracking-wider mb-1">
                  {filteredImages.find((img) => img.id === selectedImage)?.category}
                </p>
                <p className="text-ivory font-display text-xl">
                  {filteredImages.find((img) => img.id === selectedImage)?.caption}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
