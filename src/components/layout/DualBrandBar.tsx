import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function DualBrandBar() {
  const location = useLocation();
  const isSimplyAzixa = location.pathname.startsWith("/simply-azixa");

  return (
    <div className="bg-secondary/50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-10 py-2 sm:py-0 gap-2 sm:gap-0">
          {/* Simply Azixa - Left */}
          <Link
            to="/simply-azixa"
            className={cn(
              "text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary",
              isSimplyAzixa
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Simply Azixa
          </Link>

          {/* Divider for desktop */}
          <div className="hidden sm:block h-4 w-px bg-border" />

          {/* Azixa Rahman Label - Right */}
          <Link
            to="/azixa"
            className={cn(
              "text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary",
              !isSimplyAzixa
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Azixa Rahman Label
          </Link>
        </div>
      </div>
    </div>
  );
}
