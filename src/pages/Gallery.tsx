import { useState } from "react";
import { Link } from "react-router-dom";
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

// Azixa Rahman Label Gallery
const azixaGalleryImages = [
  { id: 1, image: categoryBridal, caption: "Sarah's Dream Wedding Gown", category: "Bridal", href: "/azixa/bridal" },
  { id: 2, image: categoryProm, caption: "Emma's Prom Night", category: "Prom", href: "/azixa/prom" },
  { id: 3, image: categoryOccasion, caption: "Gala Event - Custom Design", category: "Occasion", href: "/azixa/occasion" },
  { id: 4, image: categoryBridal, caption: "Vintage-Inspired Bridal", category: "Bridal", href: "/azixa/bridal" },
  { id: 5, image: categoryProm, caption: "Red Carpet Ready", category: "Prom", href: "/azixa/prom" },
  { id: 6, image: categoryOccasion, caption: "Mother of the Bride", category: "Occasion", href: "/azixa/occasion" },
  { id: 7, image: categoryProm, caption: "Custom Prom Masterpiece", category: "Custom", href: "/custom-inquiry" },
  { id: 8, image: categoryBridal, caption: "Bespoke Bridal Design", category: "Custom", href: "/custom-inquiry" },
];

// Simply Azixa Gallery
const simplyAzixaGalleryImages = [
  { id: 101, image: categoryAbaya, caption: "Ramadan Collection Piece", category: "Abaya", href: "/simply-azixa/abayas" },
  { id: 102, image: categoryAbaya, caption: "Embroidered Elegance", category: "Abaya", href: "/simply-azixa/abayas" },
  { id: 103, image: categoryAbaya, caption: "Minimalist Luxury", category: "Lifestyle", href: "/simply-azixa/abayas" },
  { id: 104, image: categoryAbaya, caption: "Evening Collection", category: "Abaya", href: "/simply-azixa/abayas" },
  { id: 105, image: categoryAbaya, caption: "Pearl Detailed Abaya", category: "Abaya", href: "/simply-azixa/abayas" },
  { id: 106, image: categoryAbaya, caption: "Modest Lifestyle", category: "Lifestyle", href: "/simply-azixa/abayas" },
];

type GalleryImage = {
  id: number;
  image: string;
  caption: string;
  category: string;
  href: string;
};

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentGallery, setCurrentGallery] = useState<GalleryImage[]>([]);

  const openLightbox = (image: GalleryImage, gallery: GalleryImage[]) => {
    setSelectedImage(image);
    setCurrentGallery(gallery);
  };

  const currentIndex = selectedImage 
    ? currentGallery.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const navigateImage = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + currentGallery.length) % currentGallery.length
        : (currentIndex + 1) % currentGallery.length;
    setSelectedImage(currentGallery[newIndex]);
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
            Explore our portfolio of custom creations and client showcases across both brands.
          </p>
        </div>
      </section>

      {/* Two-Column Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Simply Azixa Section - Left */}
            <div>
              <div className="text-center mb-8">
                <Link to="/simply-azixa">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground hover:text-primary transition-colors mb-2">
                    Simply Azixa
                  </h2>
                </Link>
                <p className="text-muted-foreground text-sm">Modest Elegance Collection</p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {simplyAzixaGalleryImages.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(item, simplyAzixaGalleryImages)}
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
              
              <div className="text-center mt-6">
                <Link to="/simply-azixa/abayas">
                  <Button variant="outline" className="border-primary text-primary">
                    Shop Simply Azixa
                  </Button>
                </Link>
              </div>
            </div>

            {/* Azixa Rahman Label Section - Right */}
            <div>
              <div className="text-center mb-8">
                <Link to="/azixa">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground hover:text-primary transition-colors mb-2">
                    Azixa Rahman Label
                  </h2>
                </Link>
                <p className="text-muted-foreground text-sm">Prom • Bridal • Occasion • Custom</p>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {azixaGalleryImages.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(item, azixaGalleryImages)}
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
              
              <div className="text-center mt-6">
                <Link to="/azixa">
                  <Button variant="outline" className="border-primary text-primary">
                    Shop Azixa Rahman
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-charcoal border-none">
          <DialogTitle className="sr-only">Gallery Image View</DialogTitle>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.caption}
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
                  {selectedImage.category}
                </p>
                <p className="text-ivory font-display text-xl">
                  {selectedImage.caption}
                </p>
                <Link 
                  to={selectedImage.href}
                  className="inline-block mt-3 text-sm text-gold hover:text-ivory transition-colors"
                >
                  View Collection →
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
