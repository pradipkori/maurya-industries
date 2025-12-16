import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
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
    features: "",
  });

  const [imageUrl, setImageUrl] = useState<string>("");

  // 🔹 Load existing product
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm({
            ...data.product,
            features: data.product.features?.join(", ") || "",
          });
          setImageUrl(data.product.imageUrl || "");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 🖼 Cloudinary Image Editor
  const openImageEditor = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "YOUR_CLOUD_NAME",
        uploadPreset: "YOUR_UPLOAD_PRESET",
        multiple: false,

        // Image editing features
        cropping: true,
        croppingAspectRatio: 1,
        showAdvancedOptions: true,
        showSkipCropButton: false,

        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        maxImageFileSize: 5000000,
      },
      (error: any, result: any) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );

    widget.open();
  };

  // 💾 Save changes
  const saveProduct = async () => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        imageUrl, // ✅ updated only if changed
        features: form.features
          .split(",")
          .map((f: string) => f.trim())
          .filter(Boolean),
      }),
    });

    navigate("/admin");
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-muted-foreground">
          Loading product...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        {/* Basic Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <input
            className="input"
            value={form.name}
            placeholder="Product Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input"
            value={form.model}
            placeholder="Model"
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <input
            className="input"
            value={form.category}
            placeholder="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <textarea
          className="input mt-4 h-28"
          placeholder="Short Description"
          value={form.shortDesc}
          onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
        />

        {/* Image */}
        <div className="mt-6">
          <Button variant="outline" onClick={openImageEditor}>
            Upload / Edit Image
          </Button>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Product"
              className="mt-4 w-48 h-48 object-cover rounded border"
            />
          )}
        </div>

        {/* Specs */}
        <h3 className="font-semibold mt-8 mb-4">Technical Specifications</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {Object.keys(form.specs).map((key) => (
            <input
              key={key}
              className="input"
              placeholder={key}
              value={form.specs[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  specs: { ...form.specs, [key]: e.target.value },
                })
              }
            />
          ))}
        </div>

        {/* Features */}
        <textarea
          className="input mt-4 h-24"
          placeholder="Features (comma separated)"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />

        <Button className="mt-6" onClick={saveProduct}>
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}
