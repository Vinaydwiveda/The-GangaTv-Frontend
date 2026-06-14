import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchNewsById, updateNews } from "../../services/news.service";

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    category: "local",
    status: "published",
    tags: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchNewsById(id);
        const data = res?.data;

        setForm({
          title: data?.title || "",
          summary: data?.summary || "",
          description: data?.description || "",
          category: data?.category || "local",
          status: data?.status || "published",
          tags: Array.isArray(data?.tags) ? data.tags.join(",") : data?.tags || "",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("summary", form.summary);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("status", form.status);
      fd.append("tags", form.tags);

      if (thumbnailFile) {
        fd.append("thumbnail", thumbnailFile);
      }

      await updateNews(id, fd);
      alert("News updated");
      navigate("/admin/news");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update news");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <h1>Edit News</h1>
        <div>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1>Edit News</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          display: "grid",
          gap: 12,
          maxWidth: 900,
        }}
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="entertainment">Entertainment</option>
          <option value="local">Local</option>
          <option value="national">National</option>
          <option value="international">International</option>
        </select>

        <textarea
          rows={2}
          placeholder="Summary"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        <textarea
          rows={8}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="published">published</option>
          <option value="draft">draft</option>
        </select>

        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        <div style={{ display: "grid", gap: 6 }}>
          <label>Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0] || null)}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update"}
        </button>
      </form>
    </AdminLayout>
  );
}

