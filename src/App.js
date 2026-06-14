import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import NewsDetails from "./pages/NewsDetails";

import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import NewsList from "./pages/admin/NewsList";
import CreateNews from "./pages/admin/CreateNews";
import EditNews from "./pages/admin/EditNews";
import CategoryNews from "./pages/admin/CategoryNews";
import Settings from "./pages/admin/Settings";

import {
  fetchAllNews,
  fetchNewsByCategory,
} from "./services/news.service";

function HomePage() {
  const [cat, setCat] = useState("All");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);

        const res =
          cat === "All"
            ? await fetchAllNews()
            : await fetchNewsByCategory(cat);

        setNews(res?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [cat]);

  const heroItem = news[0];
  const grid = useMemo(() => news.slice(1), [news]);

  return (
    <div className="app">
      <Header />

      <main className="container">
        {loading && <h2>Loading...</h2>}

        {heroItem && <Hero item={heroItem} />}

        <div className="section-head">
          <h2>
            <span className="bar" />
            Latest Stories
          </h2>

          <CategoryFilter
            value={cat}
            onChange={setCat}
          />
        </div>

        <div className="layout">
          <div className="grid">
            {grid.map((item) => (
              <NewsCard
                key={item._id}
                item={item}
              />
            ))}
          </div>

          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/news/:id" element={<NewsDetails />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/news"
        element={
          <ProtectedRoute role="admin">
            <NewsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/news/create"
        element={
          <ProtectedRoute role="admin">
            <CreateNews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/news/edit/:id"
        element={
          <ProtectedRoute role="admin">
            <EditNews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/category/:category"
        element={
          <ProtectedRoute role="admin">
            <CategoryNews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute role="admin">
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ganga-tv"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}