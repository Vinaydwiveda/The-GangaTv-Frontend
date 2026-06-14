import { api } from "../api/client";

export async function loginUser({ email, password }) {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
}

export async function registerUser({ name, email, password, role }) {
  const res = await api.post("/api/auth/register", { name, email, password, role });
  return res.data;
}

export async function getMe() {
  const res = await api.get("/api/auth/me");
  return res.data;
}
