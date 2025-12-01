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

// Azixa Rahman images
const azixaImages = [
  { id: 1, image: categoryBridal, caption: "Eternal Grace Bridal", category: "Bridal" },
  { id: 2, image: categoryProm, caption: "Celestial Prom Night", category: "Prom" },
  { id: 3, image: categoryOccasion, caption: "Gala Evening Gown", category: "Occasion" },
  { id: 4, image: categoryBridal, caption: "Vintage Romance", category: "Bridal" },
  { id: 5, image: categoryProm, caption: "Midnight Serenade", category: "Prom" },
  { id: 6, image: categoryOccasion, caption: "Mother of the Bride", category: "Occasion" },
];

// Simply Azixa images
const simplyAzixaImages = [
  { id: 7, image: categoryAbaya, caption: "Noir Elegance Abaya", category: "Abaya" },
  { id: 8, image: categoryAbaya, caption: "Pearl Cascade Collection", category: "Abaya" },
  { id: 9, image: categoryAbaya, caption: "Embroidered Luxury", category: "Abaya" },
  { id: 10, image: categoryAbaya, caption: "Champagne Dream", category: "Abaya" },
  { id: 11, image: categoryAbaya, caption: "Rose Gold Modest Wear", category: "Abaya" },
  { id: 12, image: categoryAbaya, caption: "Emerald Grace", category: "Abaya" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeBrand, setActiveBrand] = useState<"azixa" | "simply">("azixa");

  const allImages = [...azixaImages, ...simplyAzixaImages];
  const currentImages = activeBrand === "azixa" ? azixaImages : simplyAzixaImages;
  
  const currentIndex = selectedImage !== null
    ? allImages.findIndex((img) => img.id === selectedImage)
    : -1;

  const navigateImage = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + allImages.length) % allImages.length
        : (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[newIndex].id);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of custom creations from both Azixa Rahman and Simply Azixa collections.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Azixa Rahman Section */}
            <div>
              <div className="mb-8">
                <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
                  Azixa Rahman Label
                </h2>
                <p className="text-muted-foreground">
                  Prom, Bridal & Occasion Wear
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {azixaImages.map((item, index) => (
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
                      <p className="text-ivory font-display text-sm">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simply Azixa Section */}
            <div>
              <div className="mb-8">
                <h2 className="font-display text-3xl font-semibold text-foreground mb-2">
                  Simply Azixa
                </h2>
                <p className="text-muted-foreground">
                  Modest Abaya Collection
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {simplyAzixaImages.map((item, index) => (
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
                      <p className="text-ivory font-display text-sm">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-charcoal border-none">
          <DialogTitle className="sr-only">Gallery Image View</DialogTitle>
          {selectedImage !== null && (
            <div className="relative">
              <img
                src={allImages.find((img) => img.id === selectedImage)?.image}
                alt={allImages.find((img) => img.id === selectedImage)?.caption}
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
                  {allImages.find((img) => img.id === selectedImage)?.category}
                </p>
                <p className="text-ivory font-display text-xl">
                  {allImages.find((img) => img.id === selectedImage)?.caption}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
