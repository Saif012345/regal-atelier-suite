import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
export function DualBrandBar() {
  const location = useLocation();
  const isSimplyAzixa = location.pathname.startsWith("/simply-azixa");
  return <div className="bg-secondary/50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Azixa Rahman Label - Left */}
          <Link to="/azixa" className={cn("text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary", !isSimplyAzixa ? "text-primary" : "text-muted-foreground")}>
            AZIXA RAHMAN
          </Link>

          {/* Simply Azixa - Right */}
          <Link to="/simply-azixa" className={cn("text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary", isSimplyAzixa ? "text-primary" : "text-muted-foreground")}>Simply Azixa</Link>
        </div>
      </div>
    </div>;
}