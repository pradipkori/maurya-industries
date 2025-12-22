import { useEffect, useState, useRef } from "react";
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
  Play,
} from "lucide-react";

// ================= TYPES =================
interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Product {
  _id: string;
  name: string;
  model?: string;
  category: string;
  shortDesc?: string;
  imageUrl?: string;
  media?: MediaItem[];
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

  // Gallery state
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // ================= FETCH =================
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
          setSelectedProduct(data.products[0]);
        }
      });
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (products.length === 0) {
    return <div className="p-16 text-center">Loading products…</div>;
  }

  // ================= MEDIA HELPERS =================
  const getMedia = (product: Product): MediaItem[] => {
    if (product.media && product.media.length > 0) return product.media;
    if (product.imageUrl) return [{ url: product.imageUrl, type: "image" }];
    return [];
  };

  const media = selectedProduct ? getMedia(selectedProduct) : [];
  const activeMedia = media[activeMediaIndex];

  // ================= MOBILE SWIPE =================
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      setActiveMediaIndex((prev) =>
        diff > 0
          ? Math.min(prev + 1, media.length - 1)
          : Math.max(prev - 1, 0)
      );
    }
    touchStartX.current = null;
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-primary py-16">
        <div className="container-industrial">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-semibold uppercase text-sm">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2">
              Industrial Machinery Solutions
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="section-padding">
        <div className="container-industrial">

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GRID */}
          {viewMode === "grid" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveMediaIndex(0);
                    setViewMode("detailed");
                  }}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* ================= DETAILED ================= */}
          {viewMode === "detailed" && selectedProduct && (
            <div className="bg-card rounded-xl shadow-xl p-6 lg:p-8 mt-10">
              <div className="grid lg:grid-cols-2 gap-10">

                {/* ===== MEDIA GALLERY ===== */}
                <div
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                >
                  <div className="aspect-square bg-black rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    {activeMedia?.type === "image" ? (
                      <img
                        src={activeMedia.url}
                        className="w-full h-full object-contain bg-white"
                      />
                    ) : (
                      <video
                        src={activeMedia.url}
                        controls
                        className="w-full h-full"
                      />
                    )}
                  </div>

                  {/* THUMBNAILS */}
                  <div className="flex gap-3 overflow-x-auto">
                    {media.map((m, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveMediaIndex(i)}
                        className={`relative w-20 h-20 rounded border ${
                          i === activeMediaIndex
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                      >
                        {m.type === "image" ? (
                          <img
                            src={m.url}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-black flex items-center justify-center rounded">
                            <Play className="text-white w-6 h-6" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-2 lg:hidden">
                    Swipe left/right to view more media
                  </p>
                </div>

                {/* ===== DETAILS ===== */}
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedProduct.name}
                  </h2>

                  {selectedProduct.price && (
                    <div className="text-primary text-2xl font-bold mb-4">
                      ₹{selectedProduct.price.toLocaleString("en-IN")}
                    </div>
                  )}

                  <p className="mb-6">{selectedProduct.shortDesc}</p>

                  {/* FEATURES */}
                  {selectedProduct.features && (
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Key Features</h3>
                      <ul className="grid grid-cols-2 gap-2 text-sm">
                        {selectedProduct.features.map((f) => (
                          <li key={f} className="flex gap-2">
                            <ChevronRight className="w-4 h-4 text-secondary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to="/contact">
                        <Phone className="mr-2 w-4 h-4" />
                        Request Quote
                      </Link>
                    </Button>
                    <Button variant="ghost" onClick={() => setViewMode("grid")}>
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ================= CARD =================
function ProductCard({ product }: { product: Product }) {
  const image =
    product.media?.find((m) => m.type === "image")?.url ||
    product.imageUrl ||
    "/placeholder.png";

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square bg-muted">
        <img src={image} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.shortDesc}
        </p>
      </div>
    </div>
  );
}
