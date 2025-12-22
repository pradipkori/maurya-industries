import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ media files ADD, not replace
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
    setSuccess(false);

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
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 1500);
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* SUCCESS */}
          {success && (
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
              ✅ Product added successfully!
            </div>
          )}

          {/* BASIC INFO */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Basic Information
            </h2>
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
            <p className="text-sm text-gray-500 mb-3">
              You can select files multiple times. Images & videos will be added.
            </p>

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

            {/* FILE LIST */}
            {mediaFiles.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">
                {mediaFiles.map((file, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span className="truncate">
                      {file.type.startsWith("image") ? "🖼️" : "🎥"} {file.name}
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
          </section>

          {/* TECH SPECS */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Technical Specifications
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Input name="bladeLength" placeholder="Blade Length" onChange={handleSpecsChange} />
              <Input name="power" placeholder="Power" onChange={handleSpecsChange} />
              <Input name="capacity" placeholder="Capacity" onChange={handleSpecsChange} />
              <Input name="throatSize" placeholder="Throat Size" onChange={handleSpecsChange} />
              <Input name="rotorSpeed" placeholder="Rotor Speed" onChange={handleSpecsChange} />
              <Input name="weight" placeholder="Weight" onChange={handleSpecsChange} />
            </div>
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
            <Button
              type="submit"
              variant="industrial"
              disabled={loading}
              className={loading ? "animate-pulse" : ""}
            >
              {loading ? "Adding product..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
