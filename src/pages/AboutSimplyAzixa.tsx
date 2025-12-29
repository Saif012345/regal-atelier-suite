import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { Heart, Sparkles, Hand } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AboutSimplyAzixa() {
  return (
    <SimplyAzixaLayout>
      {/* Hero */}
      <section className="bg-charcoal py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-ivory sm:text-5xl lg:text-6xl mb-6">
            About Simply Azixa
          </h1>
          <p className="text-xl text-primary font-medium mb-4">
            Where Luxury Meets Heartfelt Modesty
          </p>
        </div>
      </section>

      {/* Our Passionate Beginning */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">
                  Our Passionate Beginning
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Simply Azixa was created out of a desire for more expressive modest fashion. 
                  We often noticed that the market offered pieces that felt too conventional or 
                  lacked unique character, leaving little room for vibrant self-expression.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We founded this brand to celebrate the woman who loves elegance and flair—who 
                  deserves a wearable statement piece that mirrors her unique personality and 
                  refined taste. Here, modest dressing becomes an opportunity for true luxury.
                </p>
              </div>
            </div>

            {/* The Heart of Our Craft */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Hand className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-foreground">
                  The Heart of Our Craft: Commitment to Uniqueness
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  What truly sets us apart is our heartfelt commitment to artistry and exclusive 
                  design. We cherish the human touch in fashion, which is why we proudly practice 
                  slow fashion and focus on distinctive details.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every abaya is lovingly handmade by skilled artisans. Whether featuring subtle 
                  textures or intricate adornments like our signature meticulous hand beading, 
                  each piece is crafted to stand apart. This dedicated process ensures quality 
                  and transforms beautiful fabric into your exclusive garment.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Slow Fashion
                </h3>
                <p className="text-muted-foreground">
                  Each piece is thoughtfully crafted, never mass-produced, ensuring exceptional 
                  quality and uniqueness.
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Hand className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Handcrafted
                </h3>
                <p className="text-muted-foreground">
                  Skilled artisans pour their expertise into every stitch, bead, and detail of 
                  your abaya.
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Exclusive Design
                </h3>
                <p className="text-muted-foreground">
                  Stand out with designs you won't find anywhere else—each abaya is a wearable 
                  work of art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-charcoal rounded-2xl p-12">
            <h2 className="font-display text-3xl font-semibold text-ivory mb-4">
              Discover Your Perfect Abaya
            </h2>
            <p className="text-ivory/80 mb-8 text-lg">
              Explore our collection of luxurious, handcrafted abayas designed for the modern woman.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/simply-azixa/abayas">Shop Collection</Link>
            </Button>
          </div>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
