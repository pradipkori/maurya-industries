import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, GripVertical, Plus, Save, File, Youtube, Video } from "lucide-react";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface YoutubeItem {
  youtubeId: string;
}

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
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
  const [newDragIndex, setNewDragIndex] = useState<number | null>(null);


  const [form, setForm] = useState({
    name: "",
    model: "",
    category: "",
    shortDesc: "",
    specs: {
      bladeLength: "",
      power: "",
      capacity: "",
      throatSize: "",
      rotorSpeed: "",
      weight: "",
    },
    features: [] as string[],
  });

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;
        const p = data.product;

        setForm({
          name: p.name || "",
          model: p.model || "",
          category: p.category || "",
          shortDesc: p.shortDesc || "",
          specs: {
            bladeLength: p.specs?.bladeLength || "",
            power: p.specs?.power || "",
            capacity: p.specs?.capacity || "",
            throatSize: p.specs?.throatSize || "",
            rotorSpeed: p.specs?.rotorSpeed || "",
            weight: p.specs?.weight || "",
          },
          features: p.features || [],
        });

        if (p.media?.length) setExistingMedia(p.media);
        else if (p.imageUrl)
          setExistingMedia([{ url: p.imageUrl, type: "image" }]);

        setYoutubeLinks(
          (p.youtubeVideos || []).map(
            (y: YoutubeItem) =>
              `https://www.youtube.com/watch?v=${y.youtubeId}`
          )
        );
        

        if (p.brochureUrl) setExistingBrochure(p.brochureUrl);
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= HELPERS ================= */
  const extractYouTubeId = (url: string) => {
  if (!url) return null;

  const patterns = [
    /youtube\.com\/watch\?v=([^&?/]+)/,      // normal
    /youtu\.be\/([^&?/]+)/,                  // short link
    /youtube\.com\/shorts\/([^&?/]+)/,       // ✅ SHORTS
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
  const onNewDragStart = (index: number) => setNewDragIndex(index);

const onNewDrop = (index: number) => {
  if (newDragIndex === null) return;

  setMediaFiles((prev) => {
    const updated = [...prev];
    const [moved] = updated.splice(newDragIndex, 1);
    updated.splice(index, 0, moved);
    return updated;
  });

  setNewDragIndex(null);
};


  /* ================= SAVE ================= */
  const saveProduct = async () => {
    setSaving(true);
    setToast(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("model", form.model);
    formData.append("category", form.category);
    formData.append("shortDesc", form.shortDesc);
    formData.append("specs", JSON.stringify(form.specs));
    formData.append("features", JSON.stringify(form.features));

    if (youtubeTouched) {
  formData.append(
    "youtubeVideos",
    JSON.stringify(
      youtubeLinks
        .map(extractYouTubeId)
        .filter(Boolean)
        .map((id) => ({ youtubeId: id }))
    )
  );
}


    formData.append(
      "deletedMediaIndexes",
      JSON.stringify(deletedMediaIndexes)
    );

    // ✅ NEW: SAVE MEDIA ORDER
    formData.append(
      "mediaOrder",
      JSON.stringify(existingMedia.map((_, i) => i))
    );

    mediaFiles.forEach((f) => formData.append("media", f));
    if (brochureFile) formData.append("brochure", brochureFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        { method: "PUT", body: formData }
      );

      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        setToast("❌ Failed to update product");
      }
    } catch {
      setToast("❌ Server error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 font-medium">Loading product...</p>
          </div>
        </div>
      </Layout>
    );
  }

  /* ================= UI ================= */
  return (
    <Layout>
      {/* SAVING OVERLAY */}
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-semibold text-slate-700">Saving changes...</p>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Product Updated Successfully
            </h2>
            <p className="text-slate-600">Redirecting...</p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-top-5 duration-300">
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
              <Button 
                onClick={saveProduct}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </Button>
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
                <Input 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Model</label>
                <Input 
                  value={form.model} 
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  className="h-12"
                  placeholder="Enter model number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <Input 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-12"
                  placeholder="Enter category"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description</label>
              <Textarea
                value={form.shortDesc}
                onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                className="min-h-32 resize-none"
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
                  <Input
                    placeholder={key.replace(/([A-Z])/g, " $1")}
                    value={value}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        specs: { ...form.specs, [key]: e.target.value },
                      })
                    }
                    className="h-12"
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

  {/* UPLOAD BOX */}
  <div className="mb-6">
    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
      <div className="flex flex-col items-center">
        <Upload className="w-10 h-10 text-slate-400 group-hover:text-green-600 transition-colors mb-2" />
        <span className="text-sm font-medium text-slate-600 group-hover:text-green-600 transition-colors">
          Click to upload images or videos
        </span>
        <span className="text-xs text-slate-500 mt-1">
          PNG, JPG, MP4, WebM
        </span>
      </div>

      <Input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => {
  const files = Array.from(e.target.files || []);
  setMediaFiles((prev) => [...prev, ...files]);
  e.target.value = ""; // allow re-selecting same file
}}

        className="hidden"
      />
    </label>
  </div>

  {/* EXISTING MEDIA (FROM DB) */}
  {existingMedia.length > 0 && (
    <>
      <div className="flex items-center gap-2 mb-4 text-sm text-slate-600 bg-blue-50 px-4 py-2 rounded-lg">
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
            className={`group relative cursor-move rounded-xl overflow-hidden border-2 border-slate-200 hover:border-green-400 transition-all duration-300 ${
              deletingIndex === i
                ? "scale-90 opacity-0"
                : "hover:shadow-lg"
            } ${dragIndex === i ? "opacity-50 scale-95" : ""}`}
          >
            <div className="aspect-square bg-slate-100">
              {m.type === "image" ? (
                <img
                  src={m.url}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <video
                  src={m.url}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <button
              onClick={() => removeMedia(i)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  )}

  {/* 🔵 NEWLY SELECTED MEDIA (LOCAL PREVIEW + DRAG REORDER) */}
{mediaFiles.length > 0 && (
  <div className="mt-8">
    <p className="text-sm font-semibold text-slate-600 mb-3">
      Newly Selected Media (drag to reorder before upload)
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaFiles.map((file, i) => {
        const isVideo = file.type.startsWith("video");
        const previewUrl = URL.createObjectURL(file);

        return (
          <div
            key={i}
            draggable
            onDragStart={() => onNewDragStart(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onNewDrop(i)}
            className={`group relative cursor-move rounded-xl overflow-hidden border-2 border-dashed border-green-400 bg-green-50 transition-all ${
              newDragIndex === i
                ? "opacity-50 scale-95"
                : "hover:shadow-lg"
            }`}
          >
            <div className="aspect-square">
              {isVideo ? (
                <video
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <img
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  alt=""
                />
              )}
            </div>

            {/* LABEL */}
            <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
              New
            </div>

            {/* DRAG OVERLAY */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <GripVertical className="w-8 h-8 text-white" />
            </div>

            {/* REMOVE BUTTON */}
            <button
              type="button"
              onClick={() =>
                setMediaFiles((prev) => prev.filter((_, idx) => idx !== i))
              }
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  </div>
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
                  <div className="flex-1 relative">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <Input
                      value={link}
                      onChange={(e) => {
                        const updated = [...youtubeLinks];
                        updated[i] = e.target.value;
                        setYoutubeLinks(updated);
                        setYoutubeTouched(true);
                      }}
                      className="h-12 pl-11"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => {
                      setYoutubeLinks(youtubeLinks.filter((_, idx) => idx !== i));
                      setYoutubeTouched(true);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="mt-4 w-full border-dashed border-2"
              variant="outline"
              size="lg"
              onClick={() => {
                setYoutubeLinks([...youtubeLinks, ""]);
                setYoutubeTouched(true);
              }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add YouTube Video
            </Button>
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
              <Input 
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
                  <Input
                    value={f}
                    onChange={(e) => {
                      const updated = [...form.features];
                      updated[i] = e.target.value;
                      setForm({ ...form, features: updated });
                    }}
                    className="h-12"
                    placeholder="Enter feature description"
                  />
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() =>
                      setForm({
                        ...form,
                        features: form.features.filter((_, idx) => idx !== i),
                      })
                    }
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="mt-4 w-full border-dashed border-2"
              variant="outline"
              size="lg"
              onClick={() => setForm({ ...form, features: [...form.features, ""] })}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Feature
            </Button>
          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="sticky bottom-6 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-slate-600">
                Make sure all information is correct before saving
              </p>
              <Button 
                onClick={saveProduct}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 px-8"
              >
                <Save className="w-5 h-5 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}