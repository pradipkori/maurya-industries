import ScrollToTop from "./ScrollToTop";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import WhatsAppButton from "../WhatsAppButton";



interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
            {/* Floating WhatsApp Button */}
      <WhatsAppButton />

    </div>
  );
}


export default Layout;
