
import React, { useContext, useEffect, useState } from "react";
import img from "../assets/gangatv.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchSettings } from "../services/settings.service";


const NAV = ["Home","Local News","International","Sports","Entertainment","Politics"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings()
      .then((res) => setSettings(res?.data || null))
      .catch(() => setSettings(null));
  }, []);


  function handleAuthClick() {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header className="header">

      {/* TOP BAR */}
      <div className="topbar container">

        {/* LEFT BRAND */}
        <div className="brand">
          <img
            src={settings?.logo || img}
            alt="logo"
            style={{ width: "120px" }}
          />

          <h1>
            The <span className="red">Ganga</span> TV News
            <small>आपका अपना मंच</small>
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-controls">
          <input
            type="text"
            placeholder="Search news..."
            className="search-box"
          />

          {user && (
            <span style={{ fontSize: 13, color: "#555", marginRight: 8 }}>
              Hi, {user.name}
            </span>
          )}

          <button onClick={handleAuthClick} className="login-btn">
            {user ? "Logout" : "Login"}
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="login-btn"
              style={{ marginLeft: 8 }}
            >
              Admin
            </button>
          )}
        </div>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* NAV */}
      <nav className={`nav ${open ? "open" : ""}`}>
        <div className="container nav-inner">
          {NAV.map(n => <a key={n} href="#">{n}</a>)}
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap container">
        <span className="live">● BREAKING</span>
        <div className="ticker">
          <span>Parliament passes reform bill with majority vote</span> •
          <span> India clinches series with last-ball six</span> •
          <span> Sensex hits 80,000 mark</span> •
          <span> Heavy rainfall alert in western coast</span>
        </div>
      </div>

    </header>
  );
}




