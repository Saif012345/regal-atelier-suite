import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CustomInquiry from "./pages/CustomInquiry";
import Gallery from "./pages/Gallery";
import SizeChart from "./pages/SizeChart";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import FormalWearProm from "./pages/FormalWearProm";
import FormalWearBridal from "./pages/FormalWearBridal";
import FormalWearOccasion from "./pages/FormalWearOccasion";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/formal-wear/prom" element={<FormalWearProm />} />
          <Route path="/formal-wear/bridal" element={<FormalWearBridal />} />
          <Route path="/formal-wear/occasion" element={<FormalWearOccasion />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/custom-inquiry" element={<CustomInquiry />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/size-chart" element={<SizeChart />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
