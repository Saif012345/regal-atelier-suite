import { Link, useLocation } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, subtotal, isCartOpen, setIsCartOpen } = useCart();
  const location = useLocation();
  
  // Determine brand context
  const isSimplyAzixa = location.pathname.startsWith("/simply-azixa") || 
    items.some(item => item.category === "Abaya");
  
  const shopLink = isSimplyAzixa ? "/simply-azixa/abayas" : "/azixa/prom";
  const shopText = isSimplyAzixa ? "Shop Abayas" : "Shop Collection";

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-card flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Shopping Bag ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mb-6">
              Add items to get started
            </p>
            <Button variant="default" onClick={() => setIsCartOpen(false)} asChild>
              <Link to={shopLink}>{shopText}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                  <div className="w-24 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div>
                        <h3 className="font-medium text-foreground line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {item.fabric && (
                      <p className="text-xs text-muted-foreground mb-1">
                        Fabric: {item.fabric.name}
                      </p>
                    )}
                    
                    {item.sizing.type === "standard" && item.sizing.size && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Size: {item.sizing.size}
                      </p>
                    )}
                    {item.sizing.type === "custom" && (
                      <p className="text-xs text-muted-foreground mb-2">
                        Custom Measurements
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 rounded-full border border-border hover:border-primary flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-full border border-border hover:border-primary flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-base font-medium">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Subtotal</span>
                <span className="font-display text-2xl font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                Taxes and shipping calculated at checkout
              </p>

              <Button variant="gold" size="xl" className="w-full" asChild>
                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full" 
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
