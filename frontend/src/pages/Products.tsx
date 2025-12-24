import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Phone, Play, Download } from "lucide-react";

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "detailed">("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  /* ================= FETCH ================= */
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
      {/* HERO */}
      <section className="bg-primary py-16">
        <div className="container-industrial">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            Our Industrial Machinery
          </motion.h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-industrial">
          {/* CATEGORY FILTER */}
          <div className="flex gap-3 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold ${
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
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setActiveIndex(0);
                    setViewMode("detailed");
                  }}
                  className="cursor-pointer"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          {/* DETAILED VIEW */}
          {viewMode === "detailed" && selectedProduct && (
            <div className="bg-card rounded-xl shadow-xl p-6 lg:p-8 mt-10">
              <div className="grid lg:grid-cols-2 gap-10">
                {/* GALLERY */}
                <div>
                  <div className="aspect-square bg-black rounded-lg overflow-hidden mb-4">
                    {activeMedia?.type === "image" && (
                      <img
                        src={activeMedia.url}
                        className="w-full h-full object-contain bg-white"
                      />
                    )}
                    {activeMedia?.type === "video" && (
                      <video
                        src={activeMedia.url}
                        controls
                        className="w-full h-full"
                      />
                    )}
                    {activeMedia?.type === "youtube" && (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${activeMedia.youtubeId}`}
                        allowFullScreen
                      />
                    )}
                  </div>

                  {/* THUMBNAILS */}
                  <div className="relative">
                    <button
                      onClick={() => scrollThumbs("left")}
                      className="absolute -left-3 top-1/2 bg-white rounded-full px-2"
                    >
                      ◀
                    </button>

                    <div
                      ref={thumbRef}
                      className="flex gap-3 overflow-x-auto px-6 snap-x"
                    >
                      {media.map((m, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          className={`w-20 h-20 rounded border snap-center ${
                            i === activeIndex
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          {m.type === "image" && (
                            <img
                              src={m.url}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                          {m.type === "video" && (
                            <div className="bg-black h-full flex items-center justify-center">
                              <Play className="text-white" />
                            </div>
                          )}
                          {m.type === "youtube" && (
                            <img
                              src={`https://img.youtube.com/vi/${m.youtubeId}/hqdefault.jpg`}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => scrollThumbs("right")}
                      className="absolute -right-3 top-1/2 bg-white rounded-full px-2"
                    >
                      ▶
                    </button>
                  </div>
                </div>

                {/* DETAILS */}
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

                  {/* HIGHLIGHTED SPECS */}
                  {selectedProduct.specs && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {Object.entries(selectedProduct.specs)
                        .filter(([, v]) => v)
                        .map(([k, v]) => (
                          <SpecHighlight
                            key={k}
                            label={k.replace(/([A-Z])/g, " $1")}
                            value={v}
                            icon="⚙️"
                          />
                        ))}
                    </div>
                  )}

                  {/* FEATURES */}
                  {selectedProduct.features && (
                    <ul className="grid grid-cols-2 gap-2 mb-6 text-sm">
                      {selectedProduct.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <ChevronRight className="w-4 h-4 text-secondary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* ACTIONS */}
                  <div className="flex gap-3 flex-wrap">
                    <Button asChild>
                      <Link to="/contact">
                        <Phone className="mr-2 w-4 h-4" />
                        Request Quote
                      </Link>
                    </Button>

                    <Button variant="outline">
                      <Download className="mr-2 w-4 h-4" />
                      Download Brochure
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setViewMode("grid")}
                    >
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

/* ================= CARD ================= */
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

/* ================= SPEC CARD ================= */
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
    <div className="bg-muted p-4 rounded-xl text-center border hover:border-primary transition">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
