import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
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
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have questions, need assistance, or want to connect with our team, we're here to help. Fill out the form below or email <a href="mailto:azixarahman@gmail.com" className="text-primary hover:underline font-medium">azixarahman@gmail.com</a> and our team will be in touch in the next 24 hours.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-lg p-8 shadow-elegant border border-border">
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
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Connect With Us
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <a 
                        href="mailto:azixarahman@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        azixarahman@gmail.com
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
                        href="https://www.instagram.com/azixarahman" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @azixarahman
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
                        href="https://www.facebook.com/share/16BLSUJzvM/?mibextid=wwXIfr" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Azixa Rahman
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-champagne rounded-lg p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  Book a Consultation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ready to get started? Schedule a personalized consultation to discuss your vision.
                </p>
                <Button asChild variant="gold">
                  <a href="/booking">Book Now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
