import { useState } from "react";
import { Upload, X, GripVertical, Plus, Save, File, Youtube, Video } from "lucide-react";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

export default function EditProduct() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [deletedMediaIndexes, setDeletedMediaIndexes] = useState<number[]>([]);

  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);
  const [youtubeTouched, setYoutubeTouched] = useState(false);

  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [existingBrochure, setExistingBrochure] = useState<string | null>(null);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "Industrial Bandsaw Pro 5000",
    model: "BS-5000-PRO",
    category: "Industrial Equipment",
    shortDesc: "High-performance bandsaw designed for industrial cutting applications with precision control and durability.",
    specs: {
      bladeLength: "142 inches",
      power: "5 HP",
      capacity: "12 x 20 inches",
      throatSize: "20 inches",
      rotorSpeed: "3000 RPM",
      weight: "850 lbs",
    },
    features: [
      "Variable speed control for different materials",
      "Heavy-duty cast iron construction",
      "Digital readout for precise measurements"
    ],
  });

  // Initialize with sample data
  useState(() => {
    setExistingMedia([
      { url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800", type: "image" },
      { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800", type: "image" },
    ]);
    setYoutubeLinks(["https://www.youtube.com/watch?v=dQw4w9WgXcQ"]);
    setExistingBrochure("https://example.com/brochure.pdf");
  });

  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([^&?/]+)/,
      /youtu\.be\/([^&?/]+)/,
      /youtube\.com\/shorts\/([^&?/]+)/,
      /youtube\.com\/embed\/([^&?/]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const removeMedia = (index: number) => {
    setDeletingIndex(index);
    setTimeout(() => {
      setDeletedMediaIndexes((prev) => [...prev, index]);
      setExistingMedia((prev) => prev.filter((_, i) => i !== index));
      setDeletingIndex(null);
    }, 300);
  };

  const onDragStart = (index: number) => setDragIndex(index);

  const onDrop = (index: number) => {
    if (dragIndex === null) return;
    const updated = [...existingMedia];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setExistingMedia(updated);
    setDragIndex(null);
  };

  const saveProduct = async () => {
    setSaving(true);
    setToast(null);

    // Simulate save
    setTimeout(() => {
      setSaving(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* SAVING OVERLAY */}
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-semibold text-slate-700">Saving changes...</p>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Product Updated Successfully
            </h2>
            <p className="text-slate-600">Changes have been saved</p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl">
          {toast}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Edit Product</h1>
                <p className="text-slate-600">Update product information and media</p>
              </div>
              <button 
                onClick={saveProduct}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>

          {/* BASIC INFO SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-blue-600 rounded-full mr-3" />
              Basic Information
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <input 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Model</label>
                <input 
                  value={form.model} 
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Enter model number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <input 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description</label>
              <textarea
                value={form.shortDesc}
                onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                className="w-full min-h-32 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all"
                placeholder="Enter a brief description of the product"
              />
            </div>
          </div>

          {/* TECH SPECS SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-purple-600 rounded-full mr-3" />
              Technical Specifications
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(form.specs).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    value={value}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        specs: { ...form.specs, [key]: e.target.value },
                      })
                    }
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MEDIA SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-green-600 rounded-full mr-3" />
              Media Gallery
            </h2>

            <div className="mb-6">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors mb-2" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                    Click to upload images or videos
                  </span>
                  <span className="text-xs text-slate-500 mt-1">PNG, JPG, MP4, WebM</span>
                </div>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*"
                  onChange={(e) => setMediaFiles(Array.from(e.target.files || []))}
                  className="hidden"
                />
              </label>
            </div>

            {existingMedia.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                  <GripVertical className="w-4 h-4" />
                  <span>Drag items to reorder display</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {existingMedia.map((m, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => onDragStart(i)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => onDrop(i)}
                      className={`group relative cursor-move rounded-xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 ${
                        deletingIndex === i ? "scale-90 opacity-0" : "hover:shadow-lg"
                      } ${dragIndex === i ? "opacity-50 scale-95" : ""}`}
                    >
                      <div className="aspect-square bg-slate-100">
                        {m.type === "image" ? (
                          <>
                            <img 
                              src={m.url} 
                              className="w-full h-full object-cover" 
                              alt=""
                            />
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-slate-700">
                              📷 Image
                            </div>
                          </>
                        ) : (
                          <>
                            <video 
                              src={m.url} 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-slate-700 flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Video
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <GripVertical className="w-8 h-8 text-white" />
                      </div>

                      <button
                        onClick={() => removeMedia(i)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* YOUTUBE SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-red-600 rounded-full mr-3" />
              YouTube Videos
            </h2>

            <div className="space-y-3">
              {youtubeLinks.map((link, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        value={link}
                        onChange={(e) => {
                          const updated = [...youtubeLinks];
                          updated[i] = e.target.value;
                          setYoutubeLinks(updated);
                          setYoutubeTouched(true);
                        }}
                        className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setYoutubeLinks(youtubeLinks.filter((_, idx) => idx !== i));
                      setYoutubeTouched(true);
                    }}
                    className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setYoutubeLinks([...youtubeLinks, ""]);
                setYoutubeTouched(true);
              }}
              className="mt-4 w-full h-12 flex items-center justify-center gap-2 border-dashed border-2 border-slate-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-semibold text-slate-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add YouTube Video
            </button>
          </div>

          {/* BROCHURE SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-amber-600 rounded-full mr-3" />
              Product Brochure
            </h2>

            {existingBrochure && (
              <a 
                href={existingBrochure} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors group"
              >
                <div className="p-3 bg-amber-600 rounded-lg">
                  <File className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">Current Brochure</p>
                  <p className="text-sm text-slate-600">Click to download PDF</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Upload className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-amber-600 transition-colors block">
                    Upload New Brochure
                  </span>
                  <span className="text-xs text-slate-500">PDF format only</span>
                </div>
              </div>
              <input 
                type="file" 
                accept="application/pdf"
                onChange={(e) => setBrochureFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>

          {/* FEATURES SECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3" />
              Key Features
            </h2>

            <div className="space-y-3">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1">
                    <input
                      value={f}
                      onChange={(e) => {
                        const updated = [...form.features];
                        updated[i] = e.target.value;
                        setForm({ ...form, features: updated });
                      }}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      placeholder="Enter feature description"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        features: form.features.filter((_, idx) => idx !== i),
                      })
                    }
                    className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setForm({ ...form, features: [...form.features, ""] })}
              className="mt-4 w-full h-12 flex items-center justify-center gap-2 border-dashed border-2 border-slate-300 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold text-slate-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Feature
            </button>
          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="sticky bottom-6 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-slate-600">
                Make sure all information is correct before saving
              </p>
              <button 
                onClick={saveProduct}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40"
              >
                <Save className="w-5 h-5" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}