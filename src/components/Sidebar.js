import React, { useEffect, useState } from "react";
import { fetchAllNews } from "../services/news.service";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetchAllNews()
      .then((res) => {
        const all = res?.data || [];
        // Show the 5 most recent published news as trending
        const published = all
          .filter((n) => n.status === "published")
          .slice(0, 5);
        setTrending(published);
      })
      .catch(() => setTrending([]));
  }, []);

  return (
    <aside className="sidebar details-sidebar-inner">
      <h3>📈 Trending Now</h3>
      <ol>
        {trending.length === 0 ? (
          <li style={{ listStyle: "none", color: "#888", fontSize: 13 }}>
            No trending news yet.
          </li>
        ) : (
          trending.map((t, i) => {
            const id = t._id || t.id;
            const timeLabel = t.createdAt
              ? new Date(t.createdAt).toLocaleString()
              : "";
            const place = t.category || "";
            return (
              <li key={id}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <Link
                    to={`/news/${id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h4>{t.title}</h4>
                  </Link>
                  <small>
                    {place} {timeLabel && `· ${timeLabel}`}
                  </small>
                </div>
              </li>
            );
          })
        )}
      </ol>
    </aside>
  );
}
