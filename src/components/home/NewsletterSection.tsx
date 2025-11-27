import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to our list!",
      description: "You'll be the first to know about new collections and exclusive offers.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-champagne">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Join Our World
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive exclusive access to new collections, styling tips, 
            and special offers. Be the first to know about our latest designs.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-card border-border focus:border-primary"
            />
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={isLoading}
              className="whitespace-nowrap"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
