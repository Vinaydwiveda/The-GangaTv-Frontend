import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewsGrid from "../components/NewsGrid";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }}>
          <NewsGrid />
        </div>

        <div style={{ flex: 1 }}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}