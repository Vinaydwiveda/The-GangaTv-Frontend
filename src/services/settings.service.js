import { api } from "../api/client";

export async function fetchSettings() {
  const res = await api.get("/api/settings");
  return res.data;
}

export async function createSettings(formData) {
  const res = await api.post("/api/settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateSettings(formData) {
  const res = await api.put("/api/settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

