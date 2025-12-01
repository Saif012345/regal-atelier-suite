import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "./Footer";

interface AzixaLayoutProps {
  children: ReactNode;
}

export function AzixaLayout({ children }: AzixaLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  const navigation = [
    { name: "Home", href: "/azixa" },
    { name: "Gallery", href: "/gallery" },
    { name: "Size Chart", href: "/size-chart" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const shopLinks = [
    { name: "Prom", href: "/azixa/prom" },
    { name: "Bridal", href: "/azixa/bridal" },
    { name: "Occasion", href: "/azixa/occasion" },
    { name: "Custom", href: "/azixa/custom" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/azixa" className="flex-shrink-0">
              <h1 className="font-display text-2xl font-semibold text-foreground">
                AZIXA RAHMAN
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Shop Dropdown */}
              <div className="relative group">
                <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Shop
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="p-2">
                    {shopLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Brand Switch Button */}
              <Button asChild variant="outline" size="sm" className="hidden lg:flex">
                <Link to="/simply-azixa">Simply Azixa</Link>
              </Button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative text-foreground hover:text-primary transition-colors"
              >
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => {}}
                className="relative text-foreground hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-foreground"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-6 space-y-4 border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Shop</p>
                {shopLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block pl-4 text-base text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link to="/simply-azixa">Simply Azixa</Link>
              </Button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
