import React, { useContext, useEffect, useMemo, useState } from "react";
import { fetchAllNews } from "../services/news.service";
import { fetchSettings } from "../services/settings.service";
import AdminLayout from "../components/admin/AdminLayout";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [newsCount, setNewsCount] = useState(0);
  const [editorCount, setEditorCount] = useState(0);
  const [hasSettings, setHasSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [newsRes, settingsRes] = await Promise.all([
          fetchAllNews(),
          fetchSettings().catch(() => null),
        ]);

        const newsData = newsRes?.data || [];
        setNewsCount(Array.isArray(newsData) ? newsData.length : 0);

        // Derive unique editors from the populated `editor` field in GET /api/news
        const editorIds = new Set(
          (Array.isArray(newsData) ? newsData : [])
            .map((n) => n?.editor?._id || n?.editor?.id)
            .filter(Boolean)
        );
        setEditorCount(editorIds.size);

        setHasSettings(Boolean(settingsRes?.data));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const dashboardCards = useMemo(() => {
    if (loading) {
      return [
        { title: "Total News", value: "..." },
        { title: "Total Editors", value: "..." },
        { title: "Website Settings", value: "..." },
      ];
    }

    return [
      { title: "Total News", value: String(newsCount) },
      { title: "Total Editors", value: String(editorCount) },
      { title: "Website Settings", value: hasSettings ? "Configured" : "Not set" },
    ];
  }, [loading, newsCount, editorCount, hasSettings]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user && (
            <span style={{ color: "#6b7280", fontSize: 14 }}>
              Logged in as <strong>{user.name}</strong> ({user.role})
            </span>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: "#d32027",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {dashboardCards.map((c) => (
          <div key={c.title} className="card">
            <h3>{c.title}</h3>
            <p style={{ fontSize: 28, fontWeight: 700 }}>{c.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
