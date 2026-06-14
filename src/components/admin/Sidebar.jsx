import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div
      style={{
        width: "260px",
        background: "#111827",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <h2>Ganga TV</h2>

      {user && (
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>
          {user.name} · {user.role}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "10px",
          flex: 1,
        }}
      >
        <Link style={{ color: "#fff" }} to="/admin">
          Dashboard
        </Link>

        <Link style={{ color: "#fff" }} to="/admin/news">
          News
        </Link>

        <Link style={{ color: "#fff" }} to="/admin/news/create">
          Create News
        </Link>

        <Link style={{ color: "#fff" }} to="/admin/settings">
          Settings
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          background: "#d32027",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px",
          cursor: "pointer",
          fontWeight: 600,
          width: "100%",
        }}
      >
        Logout
      </button>
    </div>
  );
}