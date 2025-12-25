import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Achievements', href: '/achievements' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  /* ================= AUTO CLOSE ON ROUTE CHANGE ================= */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* ================= LOCK BODY SCROLL ON MOBILE ================= */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed w-full z-50">
      {/* ================= TOP BAR ================= */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container-industrial flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="tel:+919930418261" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+91 99304 18261</span>
              </a>
              <a href="tel:+919307766923" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+91 93077 66923</span>
              </a>
            </div>
            <a href="mailto:mauryaindustries1978@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="h-4 w-4" />
              <span>mauryaindustries1978@gmail.com</span>
            </a>
          </div>
          <div className="text-primary-foreground/80">
            Palghar, Maharashtra, India
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className="bg-card/95 backdrop-blur-md shadow-md">
        <div className="container-industrial">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">MI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-bold text-lg text-foreground leading-tight">MAURYA</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Industries</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-heading text-sm font-semibold uppercase tracking-wider transition-colors relative
                    ${location.pathname === item.href 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                    }
                  `}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="industrial" asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-foreground z-50"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden bg-card border-t border-border z-50 relative"
              >
                <div className="container-industrial py-4 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-3 px-4 font-heading text-sm font-semibold uppercase tracking-wider rounded transition-colors
                        ${location.pathname === item.href 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="pt-4">
                    <Button variant="industrial" className="w-full" asChild>
                      <Link to="/contact">Get Quote</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
