import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { name: "Prom Dresses", href: "/shop?category=prom" },
    { name: "Bridal Collection", href: "/shop?category=bridal" },
    { name: "Occasion Wear", href: "/shop?category=occasion" },
    { name: "Abayas", href: "/shop?category=abayas" },
  ],
  services: [
    { name: "Custom Inquiry", href: "/custom-inquiry" },
    { name: "Book Consultation", href: "/booking" },
    { name: "Size Guide", href: "/size-chart" },
    { name: "Gallery", href: "/gallery" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "FAQs", href: "/faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-semibold tracking-wide">
                Azixa <span className="text-gold">Rahman</span>
              </span>
            </Link>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Crafting exquisite formal wear for life's most memorable moments. 
              From prom dreams to bridal elegance, each piece tells your unique story.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/azixarahman"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16BLSUJzvM/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-lg font-semibold tracking-wide mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold tracking-wide mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold tracking-wide mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-ivory/70">
                <MapPin className="h-5 w-5 flex-shrink-0 text-gold" />
                <span>123 Fashion Avenue<br />New York, NY 10001</span>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 text-gold" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a
                  href="mailto:azixarahman@gmail.com"
                  className="flex items-center gap-3 text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-gold" />
                  azixarahman@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-ivory/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} Azixa Rahman. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ivory/50">
            <Link to="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
