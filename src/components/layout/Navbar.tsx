import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const navigation = [{
  name: "Home",
  href: "/"
}, {
  name: "Abayas",
  href: "/abayas"
}, {
  name: "Gallery",
  href: "/gallery"
}, {
  name: "Measurements",
  href: "/size-chart"
}, {
  name: "Booking",
  href: "/booking"
}, {
  name: "About",
  href: "/about"
}, {
  name: "Contact",
  href: "/contact"
}];
const formalWearLinks = [{
  name: "Prom",
  href: "/formal-wear/prom"
}, {
  name: "Bridal",
  href: "/formal-wear/bridal"
}, {
  name: "Occasion",
  href: "/formal-wear/occasion"
}];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  return <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-display text-2xl font-semibold tracking-wide text-foreground">
              Azixa Rahman
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className={cn("text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary", location.pathname === item.href ? "text-primary" : "text-muted-foreground")}>
                {item.name}
              </Link>)}
            
            {/* Formal Wear Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1">
                Formal Wear
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-card border border-border rounded-lg shadow-elegant overflow-hidden min-w-[180px]">
                  {formalWearLinks.map(link => <Link key={link.name} to={link.href} className="block px-4 py-3 text-sm hover:bg-muted transition-colors">
                      {link.name}
                    </Link>)}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping bag">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                0
              </span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping bag">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="lg:hidden animate-fade-in">
            <div className="space-y-1 pb-6 pt-2">
              {navigation.map(item => <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className={cn("block px-4 py-3 text-base font-medium transition-colors duration-300", location.pathname === item.href ? "text-primary bg-secondary rounded-md" : "text-muted-foreground hover:text-primary hover:bg-secondary/50 rounded-md")}>
                  {item.name}
                </Link>)}
              
              {/* Formal Wear Section in Mobile */}
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-muted-foreground mb-2">Formal Wear</p>
                {formalWearLinks.map(link => <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="block py-2 pl-4 text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>)}
              </div>
              
              <div className="mt-4 flex gap-4 px-4">
                <Button variant="outline" className="flex-1">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button variant="outline" className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>}
      </nav>
    </header>;
}