import { api } from "../api/client";

export async function fetchAllNews() {
  const res = await api.get("/api/news");
  return res.data;
}

export async function fetchNewsById(id) {
  const res = await api.get(`/api/news/${encodeURIComponent(id)}`);
  return res.data;
}

export async function fetchNewsByCategory(category) {
  const res = await api.get(
    `/api/news/category/${encodeURIComponent(category)}`
  );
  return res.data;
}

export async function createNews(formData) {
  const res = await api.post("/api/news/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateNews(id, formData) {
  const res = await api.put(`/api/news/${encodeURIComponent(id)}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteNews(id) {
  const res = await api.delete(`/api/news/${encodeURIComponent(id)}`);
  return res.data;
}

export async function fetchNewsByEditor(editorId) {
  const res = await api.get(
    `/api/news/editor/${encodeURIComponent(editorId)}`
  );
  return res.data;
}

