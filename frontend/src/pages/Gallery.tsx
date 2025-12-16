import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import granulatorMachine from '@/assets/granulator-machine.jpg';
import granulator3 from '@/assets/granulator-3.jpg';
import factoryExterior from '@/assets/factory-exterior.jpg';
import heroIndustrial from '@/assets/hero-industrial.jpg';

const categories = ['All', 'Factory', 'Machines', 'Production'];

const galleryImages = [
  { id: 1, src: heroIndustrial, category: 'Factory', title: 'Manufacturing Floor' },
  { id: 2, src: granulatorMachine, category: 'Machines', title: 'Plastic Granulator Mi150' },
  { id: 3, src: factoryExterior, category: 'Factory', title: 'Factory Exterior' },
  { id: 4, src: granulator3, category: 'Machines', title: 'Plastic Granulator Mi300' },
  { id: 5, src: heroIndustrial, category: 'Production', title: 'Production Line' },
  { id: 6, src: granulatorMachine, category: 'Machines', title: 'Granulator Detail' },
  { id: 7, src: factoryExterior, category: 'Factory', title: 'Company Building' },
  { id: 8, src: granulator3, category: 'Production', title: 'Machine Assembly' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 -mt-32 md:-mt-40 pt-48 md:pt-56">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">Gallery</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mt-2 mb-4">
              Our Work in Pictures
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Explore our manufacturing facility, machines, and production processes through our gallery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-secondary font-heading font-semibold text-xs uppercase tracking-wider">
                        {image.category}
                      </span>
                      <h3 className="text-primary-foreground font-heading font-bold text-lg mt-1">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-primary-foreground hover:text-secondary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="text-primary-foreground font-heading font-bold text-xl mt-1">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
