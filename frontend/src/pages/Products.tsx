import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Clock,
  Settings,
  ChevronRight,
  Download,
  Phone,
  ArrowRight,
  Grid,
  List,
} from "lucide-react";

// 🔹 Product type (matches backend schema)
interface Product {
  _id: string;
  name: string;
  model?: string;
  category: string;
  shortDesc?: string;
  imageUrl?: string;
  price?: number;
  specs?: {
    bladeLength?: string;
    power?: string;
    capacity?: string;
    throatSize?: string;
    rotorSpeed?: string;
    weight?: string;
  };
  features?: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "detailed">("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  // 🔹 Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products.length > 0) {
          setProducts(data.products);
          setSelectedProduct(data.products[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      });
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  
  // Filter products by category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (products.length === 0) {
    return (
      <div className="p-16 text-center text-muted-foreground">
        Loading products...
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
              Our Products
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mt-2 mb-4">
              Our Industrial Machinery Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Precision-Engineered Machines Built for Performance & Durability
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          {/* Filter & View Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
                title="Grid View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "detailed"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
                title="Detailed View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setViewMode("detailed");
                    }}
                    className="group cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Detailed View */}
          {viewMode === "detailed" && selectedProduct && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl shadow-xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* Left: Image & Gallery */}
                <div>
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={selectedProduct.imageUrl || "/placeholder.png"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    {selectedProduct.model && (
                      <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
                        Model {selectedProduct.model}
                      </span>
                    )}

                    <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2 mb-3">
                      {selectedProduct.name}
                    </h2>

                    {selectedProduct.price && (
                      <div className="text-primary font-heading font-bold text-2xl mb-3">
                        ₹{selectedProduct.price.toLocaleString("en-IN")}
                      </div>
                    )}

                    {selectedProduct.shortDesc && (
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {selectedProduct.shortDesc}
                      </p>
                    )}

                    {/* Quick Stats */}
                    {selectedProduct.specs && (
                      <div className="grid grid-cols-3 gap-4 my-8">
                        {selectedProduct.specs?.power && (
                          <Stat
                            icon={<Zap />}
                            value={selectedProduct.specs.power}
                            label="Power"
                          />
                        )}
                        {selectedProduct.specs?.capacity && (
                          <Stat
                            icon={<Clock />}
                            value={selectedProduct.specs.capacity}
                            label="Capacity"
                          />
                        )}
                        {selectedProduct.specs?.rotorSpeed && (
                          <Stat
                            icon={<Settings />}
                            value={selectedProduct.specs.rotorSpeed}
                            label="Rotor Speed"
                          />
                        )}
                      </div>
                    )}

                    {/* Specifications */}
                    {selectedProduct.specs && (
                      <div className="mb-8">
                        <h3 className="font-heading font-bold text-lg mb-4">
                          Technical Specifications
                        </h3>

                        <div className="space-y-3">
                          {Object.entries(selectedProduct.specs)
                            .filter(([, value]) => value)
                            .map(([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between items-center border-b border-border pb-2"
                              >
                                <span className="font-medium text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span className="font-heading font-semibold">
                                  {value}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {selectedProduct.features &&
                      selectedProduct.features.length > 0 && (
                        <div className="mb-8">
                          <h3 className="font-heading font-bold text-lg mb-4">
                            Key Features
                          </h3>

                          <div className="grid grid-cols-2 gap-3">
                            {selectedProduct.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-start gap-2"
                              >
                                <ChevronRight className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
                    <Button variant="industrial" size="lg" asChild>
                      <Link to="/contact">
                        <Phone className="mr-2 w-5 h-5" />
                        Request Quote
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg">
                      <Download className="mr-2 w-5 h-5" />
                      Brochure
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setViewMode("grid")}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

// 🔹 Product Card Component
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border hover:border-primary/50">
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.model && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider">
            {product.model}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-lg mb-2">
          {product.name}
        </h3>

        {product.shortDesc && (
          <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
            {product.shortDesc}
          </p>
        )}

        {/* Quick Specs */}
        <div className="space-y-2 mb-4 text-sm">
          {product.specs?.capacity && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-secondary" />
              <span>{product.specs.capacity}</span>
            </div>
          )}
          {product.specs?.power && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4 text-secondary" />
              <span>{product.specs.power}</span>
            </div>
          )}
        </div>

        {/* Price */}
        {product.price && (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="text-primary font-heading font-bold text-lg">
              ₹{product.price.toLocaleString("en-IN")}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between group/btn cursor-pointer text-primary font-heading font-semibold text-sm uppercase tracking-wider">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

// 🔹 Stat component
function Stat({
  icon,
  value,
  label,
}: {
  icon: JSX.Element;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-muted p-4 rounded-lg text-center border border-border hover:border-primary/50 transition-colors">
      <div className="w-6 h-6 text-secondary mx-auto mb-2">{icon}</div>
      <div className="font-heading font-bold text-lg">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
