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

  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [deletedMediaIndexes, setDeletedMediaIndexes] = useState<number[]>([]);

  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);

  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [existingBrochure, setExistingBrochure] = useState<string | null>(null);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

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

        if (p.media?.length) {
          setExistingMedia(p.media);
        } else if (p.imageUrl) {
          setExistingMedia([{ url: p.imageUrl, type: "image" }]);
        }

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
    const match = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/
    );
    return match ? match[1] : null;
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

    if (youtubeLinks.length) {
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

    // SAVE MEDIA ORDER
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
        <div className="p-10 text-center">Loading product…</div>
      </Layout>
    );
  }

  /* ================= UI ================= */
  return (
    <Layout>
      {saving && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p>Saving changes…</p>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl text-center">
            <div className="text-4xl mb-2">✅</div>
            <h2 className="text-xl font-semibold">
              Product Updated Successfully
            </h2>
            <p className="text-gray-600">Redirecting…</p>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-black text-white px-4 py-3 rounded">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

        {/* YOUTUBE */}
        <h3 className="font-semibold mt-8">YouTube Videos</h3>

        {youtubeLinks.map((link, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <Input
              value={link}
              onChange={(e) => {
                const updated = [...youtubeLinks];
                updated[i] = e.target.value;
                setYoutubeLinks(updated);
              }}
            />
            <Button
              variant="destructive"
              onClick={() =>
                setYoutubeLinks(
                  youtubeLinks.filter((_, idx) => idx !== i)
                )
              }
            >
              ✕
            </Button>
          </div>
        ))}

        <Button
          className="mt-2"
          variant="outline"
          onClick={() => setYoutubeLinks([...youtubeLinks, ""])}
        >
          + Add YouTube Video
        </Button>

        <Button className="mt-8" onClick={saveProduct}>
          Save Changes
        </Button>
      </div>
    </Layout>
  );
}
