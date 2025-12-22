import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MediaItem {
  url: string;
  type: "image" | "video";
}

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Existing + new media
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  // Delete confirmation
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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

  // ===============================
  // LOAD PRODUCT
  // ===============================
  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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

          setExistingMedia(p.media || []);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ===============================
  // HANDLERS
  // ===============================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSpecsChange = (e: any) => {
    setForm({
      ...form,
      specs: { ...form.specs, [e.target.name]: e.target.value },
    });
  };

  const handleFeatureChange = (i: number, value: string) => {
    const updated = [...form.features];
    updated[i] = value;
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (i: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, idx) => idx !== i),
    });
  };

  // ===============================
  // SAVE PRODUCT
  // ===============================
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

    // send remaining existing media URLs as JSON
    formData.append("existingMedia", JSON.stringify(existingMedia));

    // append new files
    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setToast("✅ Product updated successfully");
        setShowSuccessModal(true);
        setTimeout(() => navigate("/admin"), 2500);
      } else {
        setToast("❌ Failed to update product");
      }
    } catch {
      setToast("❌ Server error");
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center animate-pulse">
          Loading product…
        </div>
      </Layout>
    );
  }

  // ===============================
  // UI
  // ===============================
  return (
    <Layout>
      {/* FULL PAGE LOADING */}
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p>Saving changes…</p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-3 rounded animate-fade-in">
          {toast}
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl text-center animate-fade-in">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold mb-2">
              Product Updated
            </h2>
            <p className="text-gray-600">
              Redirecting to dashboard…
            </p>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl animate-fade-in">
            <h3 className="text-lg font-semibold mb-3">
              Delete this media?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteIndex(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter((_, i) => i !== deleteIndex)
                  );
                  setDeleteIndex(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        {/* BASIC */}
        <div className="grid md:grid-cols-3 gap-6">
          <Input name="name" value={form.name} onChange={handleChange} />
          <Input name="model" value={form.model} onChange={handleChange} />
          <Input name="category" value={form.category} onChange={handleChange} />
        </div>

        <Textarea
          className="mt-4"
          value={form.shortDesc}
          onChange={(e) =>
            setForm({ ...form, shortDesc: e.target.value })
          }
        />

        {/* MEDIA */}
        <div className="mt-6">
          <Input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => {
              if (!e.target.files) return;
              setMediaFiles((prev) => [
                ...prev,
                ...Array.from(e.target.files),
              ]);
            }}
          />

          {/* EXISTING MEDIA */}
          {existingMedia.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {existingMedia.map((m, i) => (
                <div key={i} className="relative">
                  {m.type === "image" ? (
                    <img src={m.url} className="h-40 w-full object-cover rounded border" />
                  ) : (
                    <video src={m.url} controls className="h-40 w-full rounded border" />
                  )}
                  <button
                    onClick={() => setDeleteIndex(i)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FEATURES */}
        <h3 className="font-semibold mt-8">Features</h3>
        {form.features.map((f, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <Input
              value={f}
              onChange={(e) =>
                handleFeatureChange(i, e.target.value)
              }
            />
            <Button variant="destructive" onClick={() => removeFeature(i)}>
              ✕
            </Button>
          </div>
        ))}

        <Button className="mt-2" variant="outline" onClick={addFeature}>
          + Add Feature
        </Button>

        <Button
          className="mt-8"
          onClick={saveProduct}
          disabled={saving}
        >
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}
