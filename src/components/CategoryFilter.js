import React from "react";
const CATS = [
  "All",
  "local",
  "national",
  "international",
  "politics",
  "sports",
  "business",
  "technology",
  "education",
  "health",
  "entertainment",
];
export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="filters">
      {CATS.map(c => (
        <button
          key={c}
          className={value === c ? "active" : ""}
          onClick={() => onChange(c)}
          style={{ textTransform: "capitalize" }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
