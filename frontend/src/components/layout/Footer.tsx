import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';


const navigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },  
    { name: 'Contact', href: '/contact' },
  ],
  products: [
    { name: 'Plastic Grinder Machine', href: '/products#plastic-grinder' },
    { name: 'Plastic Dana Cutter', href: '/products#plastic-dana-cutter' },
    { name: 'Plastic Dewatering Machine', href: '/products#plastic-dewatering' },
    { name: 'All Products', href: '/products' },
  ],
  services: [
    { name: 'Manufacturing', href: '/services' },
    { name: 'Custom Design', href: '/services' },
    { name: 'Maintenance', href: '/services' },
    { name: 'Spare Parts', href: '/services' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-industrial section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div>
  <div className="flex flex-col gap-3 mb-6">
    
    <p className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">MAURYA INDUSTRIES</p>
  </div>
  
  <p className="text-primary-foreground/80 mb-6 leading-relaxed">
    Leading manufacturer of high-quality Plastic Granulator Machines and industrial machinery. 
    Committed to excellence in engineering for over 20 years.
  </p>

  <div className="flex gap-4">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/1aSUsTgZYv/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
  >
    <Facebook className="h-5 w-5" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/maurya_industries?igsh=cHR5MDRjZm1sNGs5"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
  >
    <Instagram className="h-5 w-5" />
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@mauryaindustries440"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
  >
    <Youtube className="h-5 w-5" />
  </a>
</div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Our Products</h4>
            <ul className="space-y-3">
              {navigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80">
                  Gala No. 1, Amarnath Industrial Estate,<br />
                  Tungareshwar Complex, Sativali,<br />
                  Vasai (E), Palghar – 401208
                </span>
              </li>

              <li>
                <div className="flex flex-col gap-2">
                  <a href="tel:+919930418261" className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors">
                    <Phone className="h-5 w-5 text-secondary" />
                    +91 99304 18261
                  </a>
                  <a href="tel:+919307766923" className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors">
                    <Phone className="h-5 w-5 text-secondary" />
                    +91 93077 66923
                  </a>
                </div>
              </li>

              <li>
                <a href="mailto:mauryaindustries1978@gmail.com" className="flex items-center gap-3 text-primary-foreground/80 hover:text-secondary transition-colors">
                  <Mail className="h-5 w-5 text-secondary" />
                  mauryaindustries1978@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-industrial py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Maurya Industries. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
