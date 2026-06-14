
import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ item }) {
  const id = item?._id || item?.id;
  const imageUrl = item?.thumbnail || item?.image || "";
  const byline = item?.editor?.name || item?.author || "";
  const timeLabel = item?.createdAt
    ? new Date(item.createdAt).toLocaleString()
    : item?.time || "";
  const excerpt = item?.summary || item?.excerpt || "";

  return (
    <Link to={`/news/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.2)), url(${imageUrl})`,
        }}
      >
        <span className="badge">TOP STORY</span>
        <h2>{item.title}</h2>
        <p>{excerpt}</p>
        <div className="meta">
          {timeLabel && <>⏱ {timeLabel}</>}
          {byline && <>&nbsp;·&nbsp; By {byline}</>}
        </div>
      </section>
    </Link>
  );
}
