import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { DualBrandBar } from "./DualBrandBar";

const navigation = [
  { name: "Home", href: "/simply-azixa" },
  { name: "Abayas", href: "/simply-azixa/abayas" },
  { name: "Gallery", href: "/gallery" },
  { name: "Size Chart", href: "/size-chart" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function SimplyAzixaNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <DualBrandBar />
      <div className="glass-effect">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/simply-azixa" className="flex items-center">
            <span className="font-display text-2xl font-semibold tracking-wide text-foreground">
              Simply Azixa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Wishlist"
              onClick={() => (window.location.href = "/wishlist")}
            >
              <Heart className="h-5 w-5" />
              {wishlistTotal > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {wishlistTotal}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Wishlist"
              onClick={() => (window.location.href = "/wishlist")}
            >
              <Heart className="h-5 w-5" />
              {wishlistTotal > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {wishlistTotal}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="space-y-1 pb-6 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium transition-colors duration-300",
                    location.pathname === item.href
                      ? "text-primary bg-secondary rounded-md"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-md"
                  )}
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </div>
        )}
      </nav>
      </div>
      <CartDrawer />
    </header>
  );
}
