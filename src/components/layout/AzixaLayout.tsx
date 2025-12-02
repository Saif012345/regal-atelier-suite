import { AzixaNavbar } from "./AzixaNavbar";
import { Footer } from "./Footer";

interface AzixaLayoutProps {
  children: React.ReactNode;
}

export function AzixaLayout({ children }: AzixaLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AzixaNavbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
