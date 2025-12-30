import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Play, Download, ChevronLeft, Sparkles, Award, Shield, TrendingUp, Zap, Package, Settings, Factory } from "lucide-react";

/* ================= TYPES ================= */
interface MediaItem {
  type: "image" | "video" | "youtube";
  url?: string;
  youtubeId?: string;
}

interface Product {
  _id: string;
  name: string;
  model?: string;
  category: string;
  shortDesc?: string;
  imageUrl?: string;
  media?: { url: string; type: "image" | "video" }[];
  youtubeVideos?: { youtubeId: string }[];
  price?: number;
  specs?: Record<string, string>;
  features?: string[];
}

/* ================= SPEC ICON MAP ================= */
const SPEC_ICONS: Record<string, string> = {
  power: "⚡",
  capacity: "📦",
  rotorSpeed: "🌀",
  bladeLength: "📏",
  throatSize: "🔩",
  weight: "🏋️",
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "detailed">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  /* ================= FETCH WITH YOUR REAL API ================= */
  useEffect(() => {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://maurya-industries-backend.onrender.com";
    
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;
        setProducts(data.products);
        setSelectedProduct(data.products[0]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Factory className="w-10 h-10 text-orange-600 animate-pulse" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mb-2">Loading Machinery</p>
          <p className="text-sm text-slate-600">Fetching our industrial equipment...</p>
        </div>
      </div>
    );
  }

  /* ================= MEDIA ================= */
  const getMedia = (product: Product): MediaItem[] => {
    const uploaded =
      product.media?.map((m) => ({ type: m.type, url: m.url })) || [];

    const youtube =
      product.youtubeVideos?.map((y) => ({
        type: "youtube" as const,
        youtubeId: y.youtubeId,
      })) || [];

    if (uploaded.length === 0 && product.imageUrl) {
      uploaded.push({ type: "image", url: product.imageUrl });
    }

    return [...uploaded, ...youtube];
  };

  const media = selectedProduct ? getMedia(selectedProduct) : [];
  const activeMedia = media[activeIndex];

  const scrollThumbs = (dir: "left" | "right") => {
    if (!thumbRef.current) return;
    thumbRef.current.scrollBy({
      left: dir === "left" ? -120 : 120,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px),
            `,
            backgroundSize: "80px 80px"
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-sm font-bold tracking-wide">Premium Industrial Solutions</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Our Industrial Machinery
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-orange-50 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Discover cutting-edge equipment engineered for <span className="text-yellow-300 font-bold">performance</span>, <span className="text-yellow-300 font-bold">reliability</span>, and <span className="text-yellow-300 font-bold">precision</span>
            </motion.p>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto"
            >
              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center justify-center mb-3">
                    <Package className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    {products.length}+
                  </div>
                  <div className="text-sm text-orange-100 font-semibold">Products</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center justify-center mb-3">
                    <Shield className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-orange-100 font-semibold">Quality Assured</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center justify-center mb-3">
                    <Zap className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-orange-100 font-semibold">Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(255 247 237)"/>
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* CATEGORY FILTER */}
          <div className="flex gap-3 flex-wrap mb-12 justify-center">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-xl relative overflow-hidden group ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-300"
                    : "bg-white text-slate-700 border-2 border-orange-200 hover:border-orange-400"
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="relative">{cat}</span>
              </motion.button>
            ))}
          </div>

          {/* GRID VIEW */}
          {viewMode === "grid" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setSelectedProduct(p);
                    setActiveIndex(0);
                    setViewMode("detailed");
                  }}
                  className="cursor-pointer"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* DETAILED VIEW */}
          {viewMode === "detailed" && selectedProduct && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <Button
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className="mb-6 group hover:bg-orange-100 text-orange-700 font-semibold"
              >
                <ChevronLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Products</span>
              </Button>

              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-2 border-orange-100">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* GALLERY */}
                  <div className="space-y-6">
                    <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-xl border-2 border-orange-200 relative group">
                      {activeMedia?.type === "image" && (
                        <img
                          src={activeMedia.url}
                          className="w-full h-full object-contain bg-white p-6 transition-transform duration-500 group-hover:scale-105"
                          alt={selectedProduct.name}
                        />
                      )}
                      {activeMedia?.type === "video" && (
                        <video
                          src={activeMedia.url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                      {activeMedia?.type === "youtube" && (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${activeMedia.youtubeId}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                      
                      {media.length > 1 && (
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {activeIndex + 1} / {media.length}
                        </div>
                      )}
                    </div>

                    {/* THUMBNAILS */}
                    {media.length > 1 && (
                      <div className="relative px-8">
                        <button
                          onClick={() => scrollThumbs("left")}
                          className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-orange-50 hover:scale-110 transition-all border-2 border-orange-200"
                        >
                          <ChevronLeft className="w-5 h-5 text-orange-600" />
                        </button>

                        <div
                          ref={thumbRef}
                          className="flex gap-4 overflow-x-auto snap-x scroll-smooth"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {media.map((m, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveIndex(i)}
                              className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 snap-center transition-all overflow-hidden ${
                                i === activeIndex
                                  ? "ring-4 ring-orange-500 border-orange-500 shadow-xl scale-110"
                                  : "border-orange-200 hover:border-orange-400 opacity-60 hover:opacity-100"
                              }`}
                            >
                              {m.type === "image" && (
                                <img
                                  src={m.url}
                                  className="w-full h-full object-cover"
                                  alt=""
                                />
                              )}
                              {m.type === "video" && (
                                <div className="bg-black h-full flex items-center justify-center">
                                  <Play className="text-white w-8 h-8" />
                                </div>
                              )}
                              {m.type === "youtube" && (
                                <div className="relative w-full h-full bg-black overflow-hidden">
                                  <img
                                    src={`https://img.youtube.com/vi/${m.youtubeId}/hqdefault.jpg`}
                                    className="w-full h-full object-cover opacity-70"
                                    alt=""
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/60 rounded-full p-2">
                                      <Play className="w-6 h-6 text-white" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => scrollThumbs("right")}
                          className="absolute -right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-orange-50 hover:scale-110 transition-all border-2 border-orange-200"
                        >
                          <ChevronRight className="w-5 h-5 text-orange-600" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-6">
                    {selectedProduct.model && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full border-2 border-orange-300">
                        <Award className="w-4 h-4 text-orange-700" />
                        <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">
                          {selectedProduct.model}
                        </span>
                      </div>
                    )}

                    <div>
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 leading-tight">
                        {selectedProduct.name}
                      </h2>

                      {selectedProduct.price && (
                        <div className="inline-flex items-baseline gap-3 bg-gradient-to-r from-orange-100 via-red-50 to-transparent px-6 py-4 rounded-2xl border-2 border-orange-300 mb-6">
                          <span className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            ₹{selectedProduct.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-sm text-slate-600 font-semibold">+ GST</span>
                        </div>
                      )}

                      <p className="text-lg text-slate-600 leading-relaxed">
                        {selectedProduct.shortDesc}
                      </p>
                    </div>

                    {/* HIGHLIGHTED SPECS */}
                    {selectedProduct.specs && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Settings className="w-5 h-5 text-orange-600" />
                          <h3 className="text-xl font-bold text-slate-900">
                            Technical Specifications
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(selectedProduct.specs)
                            .filter(([, v]) => v)
                            .map(([k, v]) => (
                              <SpecHighlight
                                key={k}
                                label={k.replace(/([A-Z])/g, " $1")}
                                value={v}
                                icon={SPEC_ICONS[k] || "⚙️"}
                              />
                            ))}
                        </div>
                      </div>
                    )}

                    {/* FEATURES */}
                    {selectedProduct.features && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                          <h3 className="text-xl font-bold text-slate-900">
                            Key Features
                          </h3>
                        </div>
                        <ul className="grid grid-cols-2 gap-3">
                          {selectedProduct.features.map((f) => (
                            <li key={f} className="flex gap-3 items-start group">
                              <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center border-2 border-orange-400 group-hover:scale-110 transition-transform">
                                <ChevronRight className="w-3.5 h-3.5 text-orange-700" />
                              </div>
                              <span className="text-slate-700 leading-snug font-medium">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-4 flex-wrap pt-6 border-t-2 border-orange-100">
                      <Button size="lg" className="flex-1 min-w-[200px] bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-xl shadow-orange-300 hover:shadow-2xl hover:shadow-orange-400 transition-all text-base font-bold group">
                        <Phone className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Request Quote
                      </Button>

                      <Button variant="outline" size="lg" className="flex-1 min-w-[200px] border-2 border-orange-400 hover:border-orange-600 hover:bg-orange-50 text-orange-700 text-base font-bold group">
                        <Download className="mr-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        Download Brochure
                      </Button>
                    </div>
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

/* ================= PRODUCT CARD ================= */
function ProductCard({ product }: { product: Product }) {
  const image =
    product.media?.find((m) => m.type === "image")?.url ||
    product.imageUrl ||
    "/placeholder.png";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-orange-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          alt={product.name}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {product.price && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-2 border-orange-300 group-hover:scale-110 transition-transform">
            <span className="text-orange-700 font-bold text-sm">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-orange-300 flex items-center gap-2">
            <span className="text-sm font-bold text-orange-700">View Details</span>
            <ChevronRight className="w-4 h-4 text-orange-600" />
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        {product.model && (
          <div className="inline-flex items-center gap-1.5 bg-orange-100 px-3 py-1 rounded-lg mb-3 border border-orange-300">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
              {product.model}
            </span>
          </div>
        )}
        
        <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-orange-700 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {product.shortDesc}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-orange-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-orange-600 group-hover:to-red-600 group-hover:scale-110 transition-all">
            <ChevronRight className="w-4 h-4 text-orange-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= SPEC HIGHLIGHT CARD ================= */
function SpecHighlight({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl text-center border-2 border-orange-200 hover:border-orange-400 transition-all shadow-sm hover:shadow-lg group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs uppercase tracking-wider text-slate-600 font-semibold">
        {label}
      </div>
    </motion.div>
  );
}