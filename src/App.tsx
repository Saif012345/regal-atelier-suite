import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

// Azixa Rahman pages
import AzixaHome from "./pages/AzixaHome";
import AzixaProm from "./pages/azixa/AzixaProm";
import AzixaBridal from "./pages/azixa/AzixaBridal";
import AzixaOccasion from "./pages/azixa/AzixaOccasion";
import AzixaCustom from "./pages/azixa/AzixaCustom";
import AzixaProductDetail from "./pages/azixa/AzixaProductDetail";

// Simply Azixa pages
import SimplyAzixaHome from "./pages/SimplyAzixaHome";
import SimplyAzixaAbayas from "./pages/simply-azixa/SimplyAzixaAbayas";
import SimplyAzixaProductDetail from "./pages/simply-azixa/SimplyAzixaProductDetail";

// Shared pages
import GalleryPage from "./pages/GalleryPage";
import CustomInquiry from "./pages/CustomInquiry";
import SizeChart from "./pages/SizeChart";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

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
              {/* Redirect root to Azixa Rahman */}
              <Route path="/" element={<Navigate to="/azixa" replace />} />
              
              {/* Azixa Rahman Routes */}
              <Route path="/azixa" element={<AzixaHome />} />
              <Route path="/azixa/prom" element={<AzixaProm />} />
              <Route path="/azixa/bridal" element={<AzixaBridal />} />
              <Route path="/azixa/occasion" element={<AzixaOccasion />} />
              <Route path="/azixa/custom" element={<AzixaCustom />} />
              <Route path="/azixa/product/:id" element={<AzixaProductDetail />} />
              
              {/* Simply Azixa Routes */}
              <Route path="/simply-azixa" element={<SimplyAzixaHome />} />
              <Route path="/simply-azixa/abayas" element={<SimplyAzixaAbayas />} />
              <Route path="/simply-azixa/product/:id" element={<SimplyAzixaProductDetail />} />
              
              {/* Shared Routes */}
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/custom-inquiry" element={<CustomInquiry />} />
              <Route path="/size-chart" element={<SizeChart />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
