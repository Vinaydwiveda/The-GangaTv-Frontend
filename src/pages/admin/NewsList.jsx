import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchAllNews, deleteNews } from "../../services/news.service";
import { useNavigate } from "react-router-dom";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    setLoading(true);
    try {
      const res = await fetchAllNews();
      setNews(res?.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this news?")) return;
    await deleteNews(id);
    await loadNews();
    alert("Deleted");
  }

  return (
    <AdminLayout>
      <h1>Manage News</h1>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate("/admin/news/create")}>Create News</button>
      </div>

      <table
        style={{
          width: "100%",
          background: "#fff",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 10 }}>Title</th>
            <th style={{ textAlign: "left", padding: 10 }}>Category</th>
            <th style={{ textAlign: "left", padding: 10 }}>Status</th>
            <th style={{ textAlign: "left", padding: 10 }}>Editor</th>
            <th style={{ padding: 10 }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} style={{ padding: 10 }}>Loading...</td>
            </tr>
          ) : news.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: 10 }}>No news found</td>
            </tr>
          ) : (
            news.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: 10 }}>{item.title}</td>
                <td style={{ padding: 10 }}>{item.category}</td>
                <td style={{ padding: 10 }}>{item.status}</td>
                <td style={{ padding: 10 }}>{item.editor?.name || item.editor?.email || "-"}</td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => navigate(`/admin/news/edit/${item._id}`)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(item._id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
}
