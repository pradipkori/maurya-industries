import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Clock, Lightbulb, Award, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import heroImage from '@/assets/hero-industrial.jpg';
import granulatorMachine from '@/assets/granulator-machine.jpg';
import granulator3 from '@/assets/granulator-3.jpg';
import factoryExterior from '@/assets/factory-exterior.jpg';

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / value), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}


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
    name: 'Automatic Plastic Cutting Machine',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/4/NT/PQ/ZR/47305699/khaleel-model-plastic-cutting-machine-500x500.jpg',
    capacity: '200 Kg/h',
    power: '15 HP',
  },
  {
    id: 2,
    name: 'High Speed Mixer Machine',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/4/CA/US/QW/47305699/high-speed-mixer-machine-500x500.jpg',
    capacity: '500 KG/HOUR',
    power: 'N/A',
  },
  {
    id: 3,
    name: 'Plastic Dewatering Machine',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/1/QC/FU/HJ/47305699/plastic-dewatering-machine-500x500.jpg',
    capacity: '500 KG Per Hour',
    power: '7.5 HP',
  },
];


export default function Index() {
  return (
    <>
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
              Delivering excellence in engineering for over 20 years.
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
{/*
<div
  className="absolute bottom-0 left-0 right-0 h-24 bg-background"
  style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
/>
*/}

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
              Industrial Machinery & Accessories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-performance industrial machinery and cutting tools designed for maximum efficiency and durability. 
              Perfect for various manufacturing and processing needs.
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
      <section className="relative section-padding overflow-hidden 
  bg-gradient-to-b from-background via-background to-muted/30
  dark:from-background dark:via-background dark:to-muted/10">

  {/* ENGINEERING SVG GRID */}
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>

  <div className="container-industrial relative z-10">

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className="max-w-5xl mx-auto text-center"
    >

      {/* SINCE BADGE */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                   bg-primary/10 text-primary font-heading text-sm font-semibold
                   uppercase tracking-wider mb-4"
      >
        Since 2003
      </motion.div>

      {/* TITLE */}
      <motion.h2
        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
        className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6"
      >
        Engineering Excellence That Powers Industry
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
        className="text-muted-foreground text-lg max-w-3xl mx-auto"
      >
        Maurya Industries is a trusted manufacturer of Plastic Granulator Machines
        and industrial machinery. With decades of hands-on engineering expertise,
        we deliver precision-built solutions that perform reliably in real-world
        industrial environments.
      </motion.p>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-14 max-w-4xl mx-auto">
        {[
          { value: 20, label: "Years Experience" },
          { value: 250, label: "Machines Delivered" },
          { value: 200, label: "Satisfied Clients" },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-center"
          >
            <div className="font-heading font-bold text-4xl text-primary">
              <Counter value={item.value} />+
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        className="flex flex-wrap justify-center gap-4 mt-14"
      >
        {[
          "ISO 9001:2015 Certified",
          "Quality Tested",
          "Made in India",
          "Industry Compliant",
        ].map((badge, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded-md border border-border text-sm
                       text-muted-foreground bg-background/60 backdrop-blur
                       hover:text-primary hover:border-primary transition"
          >
            {badge}
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        className="mt-16"
      >
        <Button variant="industrial" size="lg" asChild>
          <Link to="/about">Learn More About Us</Link>
        </Button>
      </motion.div>
    </motion.div>
  </div>

  {/* DIVIDER */}
  <div className="absolute bottom-0 left-0 w-full h-px 
                  bg-gradient-to-r from-transparent via-border to-transparent" />
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
                <a href="tel:+919930418261">
                  <Phone className="mr-2 w-5 h-5" /> Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
