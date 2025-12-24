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

  // Media
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  // YouTube
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);

  // Drag state
  const [dragIndex, setDragIndex] = useState<number | null>(null);

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

  /* ================= HELPERS ================= */
  const extractYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  /* ================= LOAD ================= */
  useEffect(() => {
    if (!id) return;

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

        setExistingMedia(p.media || []);
        setYoutubeLinks(
          (p.youtubeVideos || []).map(
            (y: YoutubeItem) =>
              `https://www.youtube.com/watch?v=${y.youtubeId}`
          )
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= DRAG & DROP ================= */
  const onDragStart = (index: number) => setDragIndex(index);

  const onDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...existingMedia];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);

    setExistingMedia(updated);
    setDragIndex(null);
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

    // IMPORTANT: send existing media (after delete + reorder)
    formData.append("existingMedia", JSON.stringify(existingMedia));

    mediaFiles.forEach((file) => {
      formData.append("media", file);
    });

    const youtubeVideos = youtubeLinks
      .map(extractYouTubeId)
      .filter(Boolean)
      .map((id) => ({ youtubeId: id }));

    formData.append("youtubeVideos", JSON.stringify(youtubeVideos));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        { method: "PUT", body: formData }
      );
      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
        setTimeout(() => navigate("/admin"), 2500);
      } else {
        setToast("❌ Update failed");
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
        <div className="p-10 text-center">Loading…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl">Saving…</div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl text-center">
            🎉 Product Updated
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>

        <Textarea
          className="mt-4"
          value={form.shortDesc}
          onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
        />

        {/* MEDIA */}
        <div className="mt-6">
          <Input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) =>
              setMediaFiles((prev) => [...prev, ...Array.from(e.target.files || [])])
            }
          />

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {existingMedia.map((m, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(i)}
                className="relative cursor-move"
              >
                {m.type === "image" ? (
                  <img src={m.url} className="h-40 w-full object-cover rounded" />
                ) : (
                  <video src={m.url} controls className="h-40 w-full rounded" />
                )}

                <button
                  onClick={() =>
                    setExistingMedia(existingMedia.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button className="mt-8" onClick={saveProduct}>
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}
