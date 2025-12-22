import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    name: "",
    model: "",
    category: "",
    price: "",
    shortDesc: "",
    specs: {
      bladeLength: "",
      power: "",
      capacity: "",
      throatSize: "",
      rotorSpeed: "",
      weight: "",
    },
    features: [""],
  });

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
  // SUBMIT
  // ===============================
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("model", form.model);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("shortDesc", form.shortDesc);
    formData.append("specs", JSON.stringify(form.specs));
    formData.append("features", JSON.stringify(form.features));

    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setToast("✅ Product added successfully");
        setShowSuccessModal(true);

        setTimeout(() => {
          navigate("/admin");
        }, 2500);
      } else {
        setToast(data.message || "❌ Failed to add product");
      }
    } catch {
      setToast("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* 🔥 FULL PAGE LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium">Adding product…</p>
          </div>
        </div>
      )}

      {/* 🔔 TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-3 rounded shadow-lg animate-fade-in">
          {toast}
        </div>
      )}

      {/* 🎉 SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-full max-w-md text-center animate-fade-in">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold mb-2">
              Product Added Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Redirecting to dashboard…
            </p>
            <Button disabled className="w-full">
              Please wait
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* BASIC INFO */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Product Name" onChange={handleChange} required />
              <Input name="model" placeholder="Model" onChange={handleChange} required />
              <Input name="category" placeholder="Category" onChange={handleChange} required />
              <Input name="price" type="number" placeholder="Price (₹)" onChange={handleChange} required />
            </div>

            <Textarea
              className="mt-4"
              placeholder="Short Description"
              onChange={(e) =>
                setForm({ ...form, shortDesc: e.target.value })
              }
            />
          </section>

          {/* MEDIA */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Product Media</h2>

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

            {mediaFiles.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">
                {mediaFiles.map((file, i) => (
                  <div key={i} className="flex justify-between border p-2 rounded">
                    <span>
                      {file.type.startsWith("image") ? "🖼️" : "🎥"} {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaFiles(mediaFiles.filter((_, idx) => idx !== i))
                      }
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* FEATURES */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>

            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  value={f}
                  placeholder={`Feature ${i + 1}`}
                  onChange={(e) =>
                    handleFeatureChange(i, e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeFeature(i)}
                >
                  ✕
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addFeature}>
              + Add Feature
            </Button>
          </section>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <Button type="submit" variant="industrial">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
