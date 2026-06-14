import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchNewsByCategory } from "../../services/news.service";

export default function CategoryNews() {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchNewsByCategory(category);
        setNews(res?.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  return (
    <AdminLayout>
      <h1>News - {category}</h1>

      {loading ? (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>Loading...</div>
      ) : (
        <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
          {news.length === 0 ? (
            <div>No news found</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 10 }}>Title</th>
                  <th style={{ textAlign: "left", padding: 10 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {news.map((n) => (
                  <tr key={n._id}>
                    <td style={{ padding: 10 }}>{n.title}</td>
                    <td style={{ padding: 10 }}>{n.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

