import { Layout } from "@/components/layout/Layout";
import { Sparkles, Heart, Award, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl mb-6">
            The Art of Azixa Rahman
          </h1>
          <p className="text-xl text-primary font-medium mb-4">
            A Brand Built on Purpose and Inspiration
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-background to-champagne/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Azixa Rahman began with a problem: the search for a gown that truly fit the moment. Instead of settling, we created a brand dedicated to thoughtful design, representation, and modern elegance. Every piece reflects a commitment to clarity of vision—clean lines, purposeful details, and a strong sense of identity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our gowns are made for women who know what they want: confidence, beauty, and a design that speaks for itself. This is fashion with intention. Elevated, expressive, and made for all.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Purpose-Driven Design
                </h3>
                <p className="text-muted-foreground">
                  Every gown is created with intentional design choices that elevate your presence and reflect your unique story.
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Modern Elegance
                </h3>
                <p className="text-muted-foreground">
                  Blending bold fashion moments with timeless silhouettes for women who want to be seen and remembered.
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Made for All
                </h3>
                <p className="text-muted-foreground">
                  Representation and inclusivity are at our core. Our designs celebrate women of all backgrounds and styles.
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
              Ready to Create Your Dream Gown?
            </h2>
            <p className="text-ivory/80 mb-8 text-lg">
              Start your custom design journey and work with our team to bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/custom-inquiry"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gold text-charcoal font-medium hover:bg-gold/90 transition-colors"
              >
                Start Custom Inquiry
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-ivory/30 text-ivory font-medium hover:border-ivory/50 transition-colors"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
