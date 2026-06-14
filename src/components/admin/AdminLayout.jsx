import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}