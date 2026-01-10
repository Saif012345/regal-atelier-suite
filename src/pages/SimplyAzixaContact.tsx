import { SimplyAzixaLayout } from "@/components/layout/SimplyAzixaLayout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SimplyAzixaContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <SimplyAzixaLayout>
      <SEOHead 
        title="Contact Us - Simply Azixa"
        description="Get in touch with Simply Azixa for premium modest fashion inquiries. We're here to help with orders, sizing, and styling advice."
        brand="simply-azixa"
      />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our modest fashion collection? Need help with sizing or styling? 
            We're here to help. Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Connect With Simply Azixa
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <a 
                        href="mailto:simplyazixa@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        simplyazixa@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Instagram</h3>
                      <a 
                        href="https://www.instagram.com/simplyazixa" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @simplyazixa
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Facebook className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Facebook</h3>
                      <a 
                        href="https://www.facebook.com/simplyazixa" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Simply Azixa
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Quick Questions?
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  For quick inquiries about sizing, availability, or shipping, feel free to DM us on Instagram for faster responses.
                </p>
                <Button asChild variant="outline">
                  <a 
                    href="https://www.instagram.com/simplyazixa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Message on Instagram
                  </a>
                </Button>
              </div>

              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Explore Our Collection
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse our ready-to-wear modest fashion collection featuring elegant abayas and contemporary designs.
                </p>
                <Button asChild>
                  <a href="/simply-azixa/shop">Shop Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Footer */}
      <section className="py-12 bg-charcoal text-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-2xl font-semibold mb-4">
            Follow Simply Azixa
          </h3>
          <p className="text-ivory/70 mb-6 max-w-md mx-auto">
            Stay updated with our latest collections, styling tips, and exclusive offers.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/simplyazixa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-ivory/10 hover:bg-ivory/20 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/simplyazixa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-ivory/10 hover:bg-ivory/20 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </section>
    </SimplyAzixaLayout>
  );
}
