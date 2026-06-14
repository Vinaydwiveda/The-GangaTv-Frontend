import React, { useEffect, useState } from "react";
import { fetchSettings } from "../services/settings.service";

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings()
      .then((res) => setSettings(res?.data || null))
      .catch(() => setSettings(null));
  }, []);

  const websiteName = settings?.websiteName || "The Ganga TV News";
  const footerText = settings?.footerText || "आपका अपना मंच — sach, sabse pehle.";

  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div>
          <h3>
            The <span className="red">Ganga</span> TV News
          </h3>
          <p>{footerText}</p>
        </div>
        <div>
          <h4>Sections</h4>
          <a href="#">Politics</a>
          <a href="#">Sports</a>
          <a href="#">Entertainment</a>
          <a href="#">Breaking</a>
        </div>
        <div>
          <h4>Follow us</h4>
          <div className="social">
            {settings?.facebook ? (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            ) : (
              <a href="#">Facebook</a>
            )}
            {settings?.twitter ? (
              <a href={settings.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            ) : (
              <a href="#">Twitter</a>
            )}
            {settings?.youtube ? (
              <a href={settings.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            ) : (
              <a href="#">YouTube</a>
            )}
            {settings?.instagram ? (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            ) : (
              <a href="#">Instagram</a>
            )}
          </div>
        </div>
      </div>
      <div className="copy">
        © {new Date().getFullYear()} {websiteName}. All rights reserved.
      </div>
    </footer>
  );
}
