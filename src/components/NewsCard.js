import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ item }) {
  const id = item?._id || item?.id;
  return (
    <Link to={`/news/${id}`} className="card card-link">
      <div className="thumb">
        <img src={item.thumbnail || item.image} alt={item.title} />
        <span className="cat">{item.category}</span>
      </div>
      <div className="body">
        <h3>{item.title}</h3>
        <p>{item.summary || item.excerpt}</p>
        <div className="meta">
          {item.editor?.name ? `👤 ${item.editor.name}` : ""}
          {item.createdAt ? ` · ⏱ ${new Date(item.createdAt).toLocaleString()}` : item.time ? ` · ⏱ ${item.time}` : ""}
        </div>
      </div>
    </Link>
  );
}

