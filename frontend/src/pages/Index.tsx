import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Clock, Lightbulb, Award, ChevronRight, ArrowRight, Phone, Sparkles, TrendingUp, Users, Factory, Cog, Target, Star, CheckCircle2 } from 'lucide-react';
import scrapGrinder from "@/assets/products/scrap-grinder.jpg";
import colourMixingMachine from "@/assets/products/colour-mixing-machine.jpg";


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
  { icon: Shield, title: 'Quality', description: 'Premium materials and precision engineering', color: 'blue' },
  { icon: Zap, title: 'Efficient', description: 'High-performance machines for maximum output', color: 'yellow' },
  { icon: Clock, title: 'Durable', description: 'Built to last with robust construction', color: 'green' },
  { icon: Lightbulb, title: 'Innovative', description: 'Cutting-edge technology solutions', color: 'purple' },
  { icon: Award, title: 'Reliable', description: 'Trusted by industries across India', color: 'cyan' },
];

const featuredProducts = [
  {
    _id: "6944e5055da6faf4ba4a2814",
    name: 'Plastic Dewatering Machine',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/1/QC/FU/HJ/47305699/plastic-dewatering-machine-500x500.jpg',
    capacity: '500 KG Per Hour',
    power: '7.5 HP',
    badge: 'Best Seller'
    },
  {
    _id: "6943ff39652754d939dbbb0",  // Must match your MongoDB exactly
    name: 'Plastic Scrap Grinder Machine',
    image: scrapGrinder,
    capacity: '300 Kg / Hour',
    power: '20 HP',
    badge: 'Heavy Duty'
  },
  {
    _id: "6943fd2ec2ca5f0a1aa77b7d",
    name: 'Colour Mixing Machine',
    image: colourMixingMachine,
    capacity: '50–300 Kg / Batch',
    power: '3 HP',
    badge: 'Featured'
  }
];

const features = [
  { icon: Factory, title: 'State-of-the-Art Facility', description: 'Large-scale manufacturing facility' },
  { icon: Cog, title: 'Expert Engineering', description: 'Team of 10+ skilled engineers' },
  { icon: Target, title: 'Custom Solutions', description: 'Tailored to your specifications' },
  { icon: CheckCircle2, title: 'Quality Assured', description: '100% testing before delivery' },
];

export default function Index() {
  const navigate = useNavigate(); // 
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ opacity, scale }} className="w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=1920&q=80"
              alt="Industrial Manufacturing" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
          
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
                         backdrop-blur-md border border-blue-400/30 rounded-full mb-8 shadow-lg shadow-blue-500/20"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <span className="text-cyan-100 font-semibold text-sm uppercase tracking-wider">
                Manufacturer of Industrial Machinery
              </span>
            </motion.div>
            
            <motion.h1 
              className="font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                We Provide Best,
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                Innovative & Quality
              </motion.span>
              <motion.span 
                className="block text-white mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Engineering
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Leading manufacturer of Plastic Granulator Machines and industrial machinery. 
              <span className="text-cyan-400 font-semibold"> Delivering excellence in engineering for over 20 years.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              
  <motion.button
  onClick={() =>
    navigate("/products", {
      state: { productId: featuredProducts[0]._id },
    })
  }
  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold"
  whileHover={{
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(59,130,246,0.4)",
  }}
  whileTap={{ scale: 0.95 }}
>
  <span className="relative z-10 flex items-center">
    View Products
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <ChevronRight className="ml-2" />
    </motion.div>
  </span>

  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600"
    initial={{ x: "-100%" }}
    whileHover={{ x: 0 }}
    transition={{ duration: 0.3 }}
  />
</motion.button>

              
              <motion.button
  onClick={() => navigate("/contact")}
  className="border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
  whileTap={{ scale: 0.95 }}
>
  Request a Quote
</motion.button>

            </motion.div>

            <motion.div 
              className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { icon: TrendingUp, text: '20+ Years Experience', color: 'text-cyan-400' },
                { icon: Users, text: '200+ Happy Clients', color: 'text-blue-400' },
                
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-2 text-slate-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  whileHover={{ scale: 1.1, color: '#fff' }}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-lg h-full"
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      scale: 1.05
                    }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2 text-center">{item.title}</h3>
                      <p className="text-sm text-slate-600 text-center leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </motion.div>

        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-6 border border-blue-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Products</span>
            </motion.div>
            
            <motion.h2 
              className="font-bold text-4xl md:text-5xl mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Industrial Machinery & Accessories
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-slate-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              High-performance industrial machinery and cutting tools designed for maximum efficiency and durability.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className="group relative"
                initial={{ opacity: 0, y: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <motion.div 
                      className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 
                                 text-white text-xs font-bold rounded-full shadow-lg"
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {product.badge}
                    </motion.div>

                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    >
                      <motion.button
                        className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Quick View
                      </motion.button>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex gap-3 mb-6">
                      <motion.div 
                        className="flex-1 px-3 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                        whileHover={{ scale: 1.05, backgroundColor: '#dbeafe' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="text-xs text-slate-600 font-semibold">Power</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{product.power}</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex-1 px-3 py-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100"
                        whileHover={{ scale: 1.05, backgroundColor: '#cffafe' }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Clock className="w-4 h-4 text-cyan-600" />
                          <span className="text-xs text-slate-600 font-semibold">Capacity</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{product.capacity}</span>
                      </motion.div>
                    </div>

                    <motion.button
  onClick={() =>
    navigate("/products", {
      state: { productId: product._id },
    })
  }
  className="w-full px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
  whileHover={{
    scale: 1.02,
    backgroundImage: "linear-gradient(to right, rgb(59,130,246), rgb(6,182,212))",
  }}
  whileTap={{ scale: 0.98 }}
>
  View Details
  <motion.div
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <ArrowRight className="w-4 h-4" />
  </motion.div>
</motion.button>

                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
  onClick={() => navigate("/products")}
  className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl shadow-blue-500/30 text-white px-10 py-5 rounded-xl font-bold text-lg"
  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(59,130,246,0.3)" }}
  whileTap={{ scale: 0.95 }}
>
  View All Products
</motion.button>

          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Maurya Industries</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  <motion.div 
                    className="w-14 h-14 mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl 
                               flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FeatureIcon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-300 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
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
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                         border border-blue-500/20 mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                Since 2003
              </span>
            </motion.div>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
              className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Engineering Excellence
              </span>
              <br />
              <span className="text-slate-700">That Powers Industry</span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}
              className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Maurya Industries is a trusted manufacturer of Plastic Granulator Machines
              and industrial machinery. With decades of hands-on engineering expertise,
              we deliver precision-built solutions that perform reliably in real-world
              industrial environments.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                { value: 20, label: "Years Experience" },
                { value: 250, label: "Machines Delivered" },
                { value: 200, label: "Satisfied Clients" },
              ].map((item, i) => {
                const icons = [Clock, Zap, Users];
                const ItemIcon = icons[i];
                return (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  className="relative group p-8 bg-white rounded-2xl border border-slate-200 shadow-lg"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="inline-block"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ItemIcon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                    </motion.div>
                    <div className="font-bold text-6xl text-blue-600">
                      <Counter value={item.value} />+
                    </div>
                    <div className="text-sm text-slate-600 font-semibold mt-3">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap justify-center gap-3 mt-16"
            >
              {[
                
                "Quality Tested",
                "Made in India",
                "Industry Compliant",
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className="group px-6 py-3 rounded-full border-2 border-slate-200 bg-white
                             hover:border-blue-500 hover:bg-blue-50 transition-all duration-300
                             shadow-md hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors font-semibold">
                    {badge}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="mt-20"
            >
              <motion.button
  onClick={() => navigate("/about")}
  className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-2xl shadow-blue-500/30 text-white px-12 py-5 rounded-xl font-bold text-lg"
  whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(59,130,246,0.4)" }}
  whileTap={{ scale: 0.95 }}
>
  Learn More About Us
</motion.button>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />
        
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex-1">
              <motion.h2 
                className="font-bold text-3xl md:text-4xl text-white mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Need a Custom Machine Solution?
              </motion.h2>
              <motion.p 
                className="text-blue-100 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Contact us today for a free consultation and quote.
              </motion.p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.button
  onClick={() => navigate("/contact")}
  className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl px-8 py-4 rounded-xl font-bold text-lg"
  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.3)" }}
  whileTap={{ scale: 0.95 }}
>
  Get Quote
</motion.button>

              <motion.a 
                href="tel:+919930418261"
                className="border-2 border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 
                           text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5" /> Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}