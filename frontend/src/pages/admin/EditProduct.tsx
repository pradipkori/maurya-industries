import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

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
  // LOAD PRODUCT DATA
  // ===============================
  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm({
            name: data.product.name || "",
            model: data.product.model || "",
            category: data.product.category || "",
            shortDesc: data.product.shortDesc || "",
            specs: {
              bladeLength: data.product.specs?.bladeLength || "",
              power: data.product.specs?.power || "",
              capacity: data.product.specs?.capacity || "",
              throatSize: data.product.specs?.throatSize || "",
              rotorSpeed: data.product.specs?.rotorSpeed || "",
              weight: data.product.specs?.weight || "",
            },
            features: data.product.features || [],
          });

          setImageUrl(data.product.imageUrl || "");
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

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (index: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== index),
    });
  };

  // ===============================
  // SAVE PRODUCT
  // ===============================
  const saveProduct = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("model", form.model);
    formData.append("category", form.category);
    formData.append("shortDesc", form.shortDesc);
    formData.append("specs", JSON.stringify(form.specs));
    formData.append("features", JSON.stringify(form.features));

    if (image) {
      formData.append("image", image);
    }

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
        navigate("/admin");
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center text-muted-foreground">
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

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-3 gap-6">
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" />
          <Input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
          <Input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        </div>

        <Textarea
          className="mt-4"
          value={form.shortDesc}
          placeholder="Short Description"
          onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
        />

        {/* IMAGE */}
        <div className="mt-6">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Product"
              className="mt-4 w-48 h-48 object-cover rounded border"
            />
          )}
        </div>

        {/* SPECS */}
        <h3 className="font-semibold mt-8 mb-4">Technical Specifications</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <Input name="bladeLength" value={form.specs.bladeLength} onChange={handleSpecsChange} placeholder="Blade Length" />
          <Input name="power" value={form.specs.power} onChange={handleSpecsChange} placeholder="Power" />
          <Input name="capacity" value={form.specs.capacity} onChange={handleSpecsChange} placeholder="Capacity" />
          <Input name="throatSize" value={form.specs.throatSize} onChange={handleSpecsChange} placeholder="Throat Size" />
          <Input name="rotorSpeed" value={form.specs.rotorSpeed} onChange={handleSpecsChange} placeholder="Rotor Speed" />
          <Input name="weight" value={form.specs.weight} onChange={handleSpecsChange} placeholder="Weight" />
        </div>

        {/* FEATURES */}
        <h3 className="font-semibold mt-8">Features</h3>

        {form.features.map((f, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <Input
              value={f}
              onChange={(e) => handleFeatureChange(i, e.target.value)}
              placeholder={`Feature ${i + 1}`}
            />
            <Button variant="destructive" onClick={() => removeFeature(i)}>
              ✕
            </Button>
          </div>
        ))}

        <Button className="mt-2" variant="outline" onClick={addFeature}>
          + Add Feature
        </Button>

        <Button className="mt-8" onClick={saveProduct}>
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}
