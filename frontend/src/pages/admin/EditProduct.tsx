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
  const [success, setSuccess] = useState(false);

  // ✅ Existing media from DB
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);

  // ✅ Newly selected files
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

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
  // SAVE
  // ===============================
  const saveProduct = async () => {
    setSaving(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("model", form.model);
    formData.append("category", form.category);
    formData.append("shortDesc", form.shortDesc);
    formData.append("specs", JSON.stringify(form.specs));
    formData.append("features", JSON.stringify(form.features));

    // ✅ append (not replace)
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
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        alert("Failed to update product");
      }
    } catch {
      alert("Server error");
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
          Loading product...
        </div>
      </Layout>
    );
  }

  // ===============================
  // UI
  // ===============================
  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            ✅ Product updated successfully!
          </div>
        )}

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
              {existingMedia.map((m, i) =>
                m.type === "image" ? (
                  <img
                    key={i}
                    src={m.url}
                    className="w-full h-40 object-cover rounded border"
                  />
                ) : (
                  <video
                    key={i}
                    src={m.url}
                    controls
                    className="w-full h-40 rounded border"
                  />
                )
              )}
            </div>
          )}

          {/* NEW FILES */}
          {mediaFiles.length > 0 && (
            <div className="mt-4 space-y-2 text-sm">
              {mediaFiles.map((f, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>
                    {f.type.startsWith("image") ? "🖼️" : "🎥"} {f.name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setMediaFiles(
                        mediaFiles.filter((_, idx) => idx !== i)
                      )
                    }
                    className="text-red-500"
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
          className={`mt-8 ${saving ? "animate-pulse" : ""}`}
          onClick={saveProduct}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Layout>
  );
}
