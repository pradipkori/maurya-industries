import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Shield, Zap, Clock, Lightbulb, Award, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import heroImage from '@/assets/hero-industrial.jpg';
import granulatorMachine from '@/assets/granulator-machine.jpg';
import granulator3 from '@/assets/granulator-3.jpg';
import factoryExterior from '@/assets/factory-exterior.jpg';

const highlights = [
  { icon: Shield, title: 'Quality', description: 'Premium materials and precision engineering' },
  { icon: Zap, title: 'Efficient', description: 'High-performance machines for maximum output' },
  { icon: Clock, title: 'Durable', description: 'Built to last with robust construction' },
  { icon: Lightbulb, title: 'Innovative', description: 'Cutting-edge technology solutions' },
  { icon: Award, title: 'Reliable', description: 'Trusted by industries across India' },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Plastic Granulator Mi150',
    image: granulatorMachine,
    capacity: '150 kg/hr',
    power: '15 HP',
  },
  {
    id: 2,
    name: 'Plastic Granulator Mi200',
    image: granulator3,
    capacity: '200 kg/hr',
    power: '20 HP',
  },
  {
    id: 3,
    name: 'Plastic Granulator Mi300',
    image: granulatorMachine,
    capacity: '300 kg/hr',
    power: '30 HP',
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center -mt-32 md:-mt-40 pt-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Industrial Manufacturing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        
        <div className="container-industrial relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block px-4 py-2 bg-secondary/20 border border-secondary/30 rounded mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
                Manufacturer of Industrial Machinery
              </span>
            </motion.div>
            
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
              We Provide Best, Innovative & Quality Engineering
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Leading manufacturer of Plastic Granulator Machines and industrial machinery. 
              Delivering excellence in engineering for over 10 years.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">
                  View Products <ChevronRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Diagonal Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="group text-center p-6 bg-card rounded-lg border border-border hover:border-secondary hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-muted">
        <div className="container-industrial">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-2 mb-4">
              Plastic Granulator Machines
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-performance plastic granulators designed for maximum efficiency and durability. 
              Perfect for recycling and processing various plastic materials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{product.name}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-secondary" />
                      {product.power}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-secondary" />
                      {product.capacity}
                    </span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/products">View Details <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="industrial" size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-2 mb-6">
                10+ Years of Excellence in Engineering
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Maurya Industries is a leading manufacturer of Plastic Granulator Machines and industrial 
                  machinery based in Palghar, Maharashtra. With over a decade of experience, we have established 
                  ourselves as a trusted name in the industry.
                </p>
                <p>
                  Our commitment to quality, innovation, and customer satisfaction has helped us serve 
                  clients across India. We take pride in delivering robust, efficient, and reliable 
                  machines that meet the highest standards of engineering excellence.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div>
                  <div className="font-heading font-bold text-4xl text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-4xl text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Machines Delivered</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-4xl text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="industrial" asChild>
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={factoryExterior} 
                alt="Maurya Industries Factory"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg">
                <div className="font-heading font-bold text-3xl">ISO</div>
                <div className="text-sm">Certified Company</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-industrial">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-2">
                Need a Custom Machine Solution?
              </h2>
              <p className="text-primary-foreground/80">
                Contact us today for a free consultation and quote.
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Get Quote</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="tel:+919876543210">
                  <Phone className="mr-2 w-5 h-5" /> Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
