import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import Sidebar from "../components/Sidebar";

function formatPlainTextToBlocks(text) {
  if (!text) return [];

  const raw = String(text).replace(/\r\n/g, "\n").trim();
  if (!raw) return [];

  // Split on blank lines as paragraphs
  const parts = raw
    .split(/\n\s*\n+/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.map((p, idx) => {
    const looksLikeHeading =
      /^[#]{0,6}\s*/.test(p) ||
      /^heading\s*[:-]/i.test(p) ||
      (p.length <= 70 &&
        /^[A-Z0-9\s-–—]+$/.test(
          p.replace(/[^A-Za-z0-9]/g, "")
        ));

    if (looksLikeHeading) {
      const cleaned = p
        .replace(/^[#]{0,6}\s*/g, "")
        .replace(/^heading\s*[:-]\s*/i, "")
        .trim();

      return {
        type: "h2",
        key: idx,
        text: cleaned || p,
      };
    }

    // Heuristic for bulleted list (single block)
    if (/^(-|\*|•)\s+/.test(p)) {
      const items = p
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.replace(/^(-|\*|•)\s+/, ""))
        .filter(Boolean);

      if (items.length > 0) {
        return {
          type: "ul",
          key: idx,
          items,
        };
      }
    }

    return {
      type: "p",
      key: idx,
      text: p,
    };
  });
}

export default function NewsDetails() {
  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/api/news/${id}`);
        const payload = res?.data;
        const item = payload?.data;

        if (mounted) {
          setNews(item || null);
        }
      } catch (e) {
        if (mounted) {
          setError(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load news"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [id]);

  const blocks = useMemo(
    () => formatPlainTextToBlocks(news?.description),
    [news?.description]
  );

  return (
    <div className="app">
      <main className="container">
        <div style={{ padding: "16px 0" }}>
          <Link
            to="/"
            style={{
              color: "#d32027",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {loading && (
          <div style={{ padding: 20 }}>
            Loading...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 20,
              color: "#b00",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && news && (
          <div className="layout details-layout">
            <article className="details-article">
              <header className="details-header">
                <div className="details-cat">
                  {news.category}
                </div>

                <h1 className="details-title">
                  {news.title}
                </h1>

                {news.editor?.name && (
                  <div className="details-meta">
                    By {news.editor.name}
                  </div>
                )}
              </header>

              {news.thumbnail && (
                <img
                  className="details-image"
                  src={news.thumbnail}
                  alt={news.title}
                />
              )}

              <section className="details-content">
                {blocks.length > 0 ? (
                  blocks.map((block) => {
                    if (block.type === "h2") {
                      return (
                        <h2 key={block.key}>
                          {block.text}
                        </h2>
                      );
                    }

                    if (block.type === "ul") {
                      return (
                        <ul key={block.key}>
                          {block.items.map((item, index) => (
                            <li key={index}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={block.key}>
                        {block.text}
                      </p>
                    );
                  })
                ) : (
                  <p>{news.description || ""}</p>
                )}
              </section>
            </article>

            <aside className="details-sidebar">
              <Sidebar />
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}