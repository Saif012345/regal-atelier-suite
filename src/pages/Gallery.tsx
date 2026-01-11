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

import gallerySimply1 from "@/assets/gallery-simply-1.jpg";
import gallerySimply2 from "@/assets/gallery-simply-3.jpg";
import galleryAzixa1 from "@/assets/gallery-azixa-1.jpg";
import galleryAzixa2 from "@/assets/gallery-azixa-2.jpg";
import galleryAzixa3 from "@/assets/gallery-azixa-3.jpg";
import galleryAzixa4 from "@/assets/gallery-azixa-4.jpg";
import galleryAzixa5 from "@/assets/gallery-azixa-5.jpg";
import galleryAzixa6 from "@/assets/gallery-azixa-6.jpg";
import galleryAzixa7 from "@/assets/gallery-azixa-7.jpg";
import galleryAzixa8 from "@/assets/gallery-azixa-8.jpg";
import galleryAzixa9 from "@/assets/gallery-azixa-9.jpg";
import galleryAzixa10 from "@/assets/gallery-azixa-10.jpg";

// Azixa Rahman Label Gallery
const azixaGalleryImages = [
  { id: 1, image: galleryAzixa1, caption: "Lavender Sequin Elegance", category: "Occasion", href: "/azixa/occasion" },
  { id: 2, image: galleryAzixa2, caption: "Pink Crystal Feather Dress", category: "Prom", href: "/azixa/prom" },
  { id: 3, image: galleryAzixa3, caption: "Lavender Ball Gown", category: "Occasion", href: "/azixa/occasion" },
  { id: 4, image: galleryAzixa4, caption: "Purple Ruffled Mermaid Gown", category: "Prom", href: "/azixa/prom" },
  { id: 5, image: galleryAzixa5, caption: "Pink Sequin Mermaid Gown", category: "Prom", href: "/azixa/prom" },
  { id: 6, image: galleryAzixa6, caption: "Fuchsia Velvet Beaded Dress", category: "Occasion", href: "/azixa/occasion" },
  { id: 7, image: galleryAzixa7, caption: "Lavender Ruffled Mermaid Gown", category: "Prom", href: "/azixa/prom" },
  { id: 8, image: galleryAzixa8, caption: "Purple Beaded Evening Gown", category: "Occasion", href: "/azixa/occasion" },
  { id: 9, image: galleryAzixa9, caption: "Red Beaded Evening Gown", category: "Occasion", href: "/azixa/occasion" },
  { id: 10, image: galleryAzixa10, caption: "Purple Ankara Sequin Dress", category: "Occasion", href: "/azixa/occasion" },
];

// Simply Azixa Gallery
const simplyAzixaGalleryImages = [
  { id: 101, image: gallerySimply1, caption: "Red Sequin Embellished Abaya", category: "Abaya", href: "/simply-azixa/abayas" },
  { id: 102, image: gallerySimply2, caption: "Pink Ruffled Modest Dress", category: "Abaya", href: "/simply-azixa/abayas" },
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
