import { SimplyAzixaNavbar } from "./SimplyAzixaNavbar";
import { Footer } from "./Footer";

interface SimplyAzixaLayoutProps {
  children: React.ReactNode;
}

export function SimplyAzixaLayout({ children }: SimplyAzixaLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SimplyAzixaNavbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
