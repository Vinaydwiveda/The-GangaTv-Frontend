import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchSettings, createSettings, updateSettings } from "../../services/settings.service";

export default function Settings() {
  const [settings, setSettings] = useState(null);

  const [form, setForm] = useState({
    websiteName: "",
    footerText: "",
    youtube: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetchSettings();
      setSettings(res.data || null);
    } catch {
      setSettings(null);
    }
  }

  useEffect(() => {
    if (!settings) return;
    setForm({
      websiteName: settings.websiteName || "",
      footerText: settings.footerText || "",
      youtube: settings.youtube || "",
      facebook: settings.facebook || "",
      instagram: settings.instagram || "",
      linkedin: settings.linkedin || "",
      twitter: settings.twitter || "",
    });
  }, [settings]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("websiteName", form.websiteName);
      fd.append("footerText", form.footerText);
      fd.append("youtube", form.youtube);
      fd.append("facebook", form.facebook);
      fd.append("instagram", form.instagram);
      fd.append("linkedin", form.linkedin);
      fd.append("twitter", form.twitter);

      if (logoFile) fd.append("logo", logoFile);
      if (bannerFile) fd.append("banner", bannerFile);

      const res = settings ? await updateSettings(fd) : await createSettings(fd);

      setSettings(res.data);
      setLogoFile(null);
      setBannerFile(null);
      alert("Settings saved");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <h1>Website Settings</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          display: "grid",
          gap: 12,
          maxWidth: 900,
        }}
      >
        <div style={{ display: "grid", gap: 6 }}>
          <label>Website Name</label>
          <input
            value={form.websiteName}
            onChange={(e) =>
              setForm({ ...form, websiteName: e.target.value })
            }
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Footer Text</label>
          <textarea
            rows={3}
            value={form.footerText}
            onChange={(e) => setForm({ ...form, footerText: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>YouTube</label>
          <input
            value={form.youtube}
            onChange={(e) => setForm({ ...form, youtube: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Facebook</label>
          <input
            value={form.facebook}
            onChange={(e) => setForm({ ...form, facebook: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Instagram</label>
          <input
            value={form.instagram}
            onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>LinkedIn</label>
          <input
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Twitter</label>
          <input
            value={form.twitter}
            onChange={(e) => setForm({ ...form, twitter: e.target.value })}
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Logo {settings ? "(optional)" : "(required)"}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0] || null)}
          />
          {settings?.logo ? (
            <img alt="logo" src={settings.logo} style={{ width: 120, height: "auto" }} />
          ) : null}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Banner {settings ? "(optional)" : "(required)"}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerFile(e.target.files[0] || null)}
          />
          {settings?.banner ? (
            <img alt="banner" src={settings.banner} style={{ width: 280, height: "auto" }} />
          ) : null}
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : settings ? "Update" : "Create"}
        </button>
      </form>
    </AdminLayout>
  );   
}

