import { Sparkles, Heart, Award } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-champagne/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground mb-6">
            About Azixa Rahman
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            With years of expertise in creating stunning formal wear, we specialize in bringing your dream dress to life. 
            Every piece is carefully crafted with attention to detail, ensuring you look and feel extraordinary.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From prom nights to wedding days and special occasions, we're dedicated to creating timeless pieces 
            that reflect your unique style and personality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Custom Craftsmanship
            </h3>
            <p className="text-muted-foreground">
              Each garment is uniquely designed and tailored to your exact measurements and preferences.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Personal Touch
            </h3>
            <p className="text-muted-foreground">
              We work closely with you throughout the design process to ensure your vision comes to life.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Premium Quality
            </h3>
            <p className="text-muted-foreground">
              Only the finest fabrics and materials are used to create garments that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
