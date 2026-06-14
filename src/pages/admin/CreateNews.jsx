import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { createNews } from "../../services/news.service";

export default function CreateNews() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("local");
  const [status, setStatus] = useState("published");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("summary", summary);
      fd.append("description", description);
      fd.append("category", category);
      fd.append("status", status);
      fd.append("tags", tags);
      if (thumbnail) fd.append("thumbnail", thumbnail);

      await createNews(fd);
      alert("News Created");
      navigate("/admin/news");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create news");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <h1>Create News</h1>

      <form
        onSubmit={submit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          display: "grid",
          gap: 12,
          maxWidth: 900,
        }}
      >
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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

        <textarea rows={2} placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <textarea rows={8} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="published">published</option>
          <option value="draft">draft</option>
        </select>

        <input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

        <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0] || null)} />

        <button type="submit" disabled={saving}>
          {saving ? "Creating..." : "Create"}
        </button>
      </form>
    </AdminLayout>
  );
}
