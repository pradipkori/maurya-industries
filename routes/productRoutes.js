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

  const [form, setForm] = useState({
    name: "",
    model: "",
    category: "",
    shortDesc: "",
    price: "",
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

  // ✅ LOAD PRODUCT
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
            price: data.product.price?.toString() || "",
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
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ SAVE
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("model", form.model);
    formData.append("category", form.category);
    formData.append("shortDesc", form.shortDesc);
    formData.append("price", form.price);
    formData.append("specs", JSON.stringify(form.specs));
    formData.append("features", JSON.stringify(form.features));

    if (image) {
      formData.append("image", image);
    }

    await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    navigate("/admin");
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center">Loading product...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product Name" />
            <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Model" />
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
          </div>

          <Textarea value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} placeholder="Short Description" />

          <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" type="number" />

          <Input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />

          <h3 className="font-bold">Technical Specifications</h3>

          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(form.specs).map(([key, value]) => (
              <Input
                key={key}
                placeholder={key}
                value={value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specs: { ...form.specs, [key]: e.target.value },
                  })
                }
              />
            ))}
          </div>

          <h3 className="font-bold">Features</h3>

          {form.features.map((f, i) => (
            <Input
              key={i}
              value={f}
              onChange={(e) => {
                const updated = [...form.features];
                updated[i] = e.target.value;
                setForm({ ...form, features: updated });
              }}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => setForm({ ...form, features: [...form.features, ""] })}
          >
            + Add Feature
          </Button>

          <Button type="submit" variant="industrial">
            Save Changes
          </Button>
        </form>
      </div>
    </Layout>
  );
}
