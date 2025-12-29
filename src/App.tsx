import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

// Shared pages
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CustomInquiry from "./pages/CustomInquiry";
import Gallery from "./pages/Gallery";
import SizeChart from "./pages/SizeChart";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Azixa Rahman Label pages
import AzixaHome from "./pages/AzixaHome";
import AzixaProm from "./pages/AzixaProm";
import AzixaBridal from "./pages/AzixaBridal";
import AzixaOccasion from "./pages/AzixaOccasion";
import AboutAzixaRahman from "./pages/AboutAzixaRahman";
import FAQAzixaRahman from "./pages/FAQAzixaRahman";

// Simply Azixa pages
import SimplyAzixaHome from "./pages/SimplyAzixaHome";
import SimplyAzixaAbayas from "./pages/SimplyAzixaAbayas";
import AboutSimplyAzixa from "./pages/AboutSimplyAzixa";
import FAQSimplyAzixa from "./pages/FAQSimplyAzixa";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WishlistProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Root redirects to Azixa Rahman */}
              <Route path="/" element={<Navigate to="/azixa" replace />} />
              
              {/* Azixa Rahman Label Routes */}
              <Route path="/azixa" element={<AzixaHome />} />
              <Route path="/azixa/prom" element={<AzixaProm />} />
              <Route path="/azixa/bridal" element={<AzixaBridal />} />
              <Route path="/azixa/occasion" element={<AzixaOccasion />} />
              <Route path="/azixa/about" element={<AboutAzixaRahman />} />
              <Route path="/azixa/faq" element={<FAQAzixaRahman />} />
              
              {/* Simply Azixa Routes */}
              <Route path="/simply-azixa" element={<SimplyAzixaHome />} />
              <Route path="/simply-azixa/abayas" element={<SimplyAzixaAbayas />} />
              <Route path="/simply-azixa/about" element={<AboutSimplyAzixa />} />
              <Route path="/simply-azixa/faq" element={<FAQSimplyAzixa />} />
              
              {/* Shared Pages */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/prom/:slug" element={<ProductDetail />} />
              <Route path="/bridal/:slug" element={<ProductDetail />} />
              <Route path="/occasion/:slug" element={<ProductDetail />} />
              <Route path="/abaya/:slug" element={<ProductDetail />} />
              <Route path="/custom-inquiry" element={<CustomInquiry />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/size-chart" element={<SizeChart />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Legacy routes */}
              <Route path="/about" element={<Navigate to="/azixa/about" replace />} />
              <Route path="/faq" element={<Navigate to="/azixa/faq" replace />} />
              <Route path="/formal-wear/prom" element={<Navigate to="/azixa/prom" replace />} />
              <Route path="/formal-wear/bridal" element={<Navigate to="/azixa/bridal" replace />} />
              <Route path="/formal-wear/occasion" element={<Navigate to="/azixa/occasion" replace />} />
              <Route path="/abayas" element={<Navigate to="/simply-azixa/abayas" replace />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
