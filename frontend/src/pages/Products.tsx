import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Clock,
  Settings,
  ChevronRight,
  Download,
  Phone,
} from "lucide-react";

// 🔹 Product type (matches backend schema)
interface Product {
  _id: string;
  name: string;
  model?: string;
  category: string;
  shortDesc?: string;
  imageUrl?: string;
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

  if (!selectedProduct) {
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
              Plastic Granulator Machines
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              High-quality plastic granulators designed for efficiency,
              durability, and performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product List */}
            <div className="lg:col-span-1 space-y-4">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                    selectedProduct._id === product._id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-muted border-border"
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.imageUrl || "/placeholder.png"}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      {product.model && (
                        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-secondary">
                          {product.model}
                        </span>
                      )}
                      <h3 className="font-heading font-bold">
                        {product.name}
                      </h3>
                      {product.specs?.capacity && (
                        <p className="text-sm text-muted-foreground">
                          {product.specs.capacity}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2">
              <motion.div
                key={selectedProduct._id}
                className="bg-card rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video bg-muted">
                  <img
                    src={selectedProduct.imageUrl || "/placeholder.png"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  {selectedProduct.model && (
                    <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
                      Model {selectedProduct.model}
                    </span>
                  )}

                  <h2 className="font-heading font-bold text-2xl md:text-3xl mt-1">
                    {selectedProduct.name}
                  </h2>

                  {selectedProduct.shortDesc && (
                    <p className="text-muted-foreground mt-2">
                      {selectedProduct.shortDesc}
                    </p>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 my-8">
                    {selectedProduct.specs?.power && (
                      <Stat icon={<Zap />} value={selectedProduct.specs.power} label="Power" />
                    )}
                    {selectedProduct.specs?.capacity && (
                      <Stat icon={<Clock />} value={selectedProduct.specs.capacity} label="Capacity" />
                    )}
                    {selectedProduct.specs?.rotorSpeed && (
                      <Stat icon={<Settings />} value={selectedProduct.specs.rotorSpeed} label="Rotor Speed" />
                    )}
                  </div>

                  {/* Specifications */}
                  {selectedProduct.specs && (
                    <>
                      <h3 className="font-heading font-bold text-lg mb-4">
                        Technical Specifications
                      </h3>

                      <table className="w-full border border-border rounded-lg overflow-hidden mb-8">
                        <tbody>
                          {Object.entries(selectedProduct.specs)
                            .filter(([, value]) => value)
                            .map(([key, value], i) => (
                              <tr key={key} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                                <td className="px-4 py-3 font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {value}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </>
                  )}

                  {/* Features */}
                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <>
                      <h3 className="font-heading font-bold text-lg mb-4">
                        Key Features
                      </h3>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {selectedProduct.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <ChevronRight className="w-4 h-4 text-secondary" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <Button variant="industrial" size="lg" asChild>
                      <Link to="/contact">
                        <Phone className="mr-2 w-5 h-5" />
                        Request Quote
                      </Link>
                    </Button>

                    <Button variant="outline" size="lg">
                      <Download className="mr-2 w-5 h-5" />
                      Download Brochure
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
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
    <div className="bg-muted p-4 rounded-lg text-center">
      <div className="w-6 h-6 text-secondary mx-auto mb-2">{icon}</div>
      <div className="font-heading font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
