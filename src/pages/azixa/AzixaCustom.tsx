import { Link } from "react-router-dom";
import { AzixaLayout } from "@/components/layout/AzixaLayout";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Ruler, Video, ArrowRight } from "lucide-react";

export default function AzixaCustom() {
  return (
    <AzixaLayout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Custom Design Service</span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Bring Your Vision to Life
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Work directly with our expert designers to create a one-of-a-kind piece 
            that's uniquely yours. From concept to completion, we'll guide you through 
            every step of the creative journey.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/custom-inquiry">
              Submit Custom Inquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
              The Custom Design Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating your dream piece is a collaborative journey. Here's how we work together:
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Submit Inquiry",
                description: "Share your vision, inspiration photos, and design preferences with us.",
                icon: Sparkles,
              },
              {
                step: "02",
                title: "Consultation",
                description: "Meet with our designers via video call to discuss your ideas in detail.",
                icon: Video,
              },
              {
                step: "03",
                title: "Measurements",
                description: "Provide your precise measurements or visit for a professional fitting.",
                icon: Ruler,
              },
              {
                step: "04",
                title: "Creation",
                description: "We bring your design to life with expert craftsmanship and regular updates.",
                icon: Calendar,
              },
            ].map((step, index) => (
              <div
                key={step.step}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
                  Step {step.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-8 text-center">
              Why Choose Custom Design?
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Perfectly You",
                  description: "Every element is tailored to your preferences, body type, and personal style.",
                },
                {
                  title: "Premium Quality",
                  description: "We use only the finest fabrics and materials, sourced from trusted suppliers worldwide.",
                },
                {
                  title: "Expert Craftsmanship",
                  description: "Our experienced team brings decades of couture expertise to every creation.",
                },
                {
                  title: "Flexible Timeline",
                  description: "We work with your schedule to ensure your piece is ready when you need it.",
                },
              ].map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 bg-card rounded-lg elegant-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Submit your custom inquiry today and take the first step toward owning a 
            piece that's as unique as you are.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/custom-inquiry">
              Submit Custom Inquiry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </AzixaLayout>
  );
}
