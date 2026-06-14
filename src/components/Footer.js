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
  const footerText =
    settings?.footerText || "आपका अपना मंच — sach, sabse pehle.";

  return (
    <footer className="footer">
      <div className="container foot-grid">
        {/* Brand */}
        <div>
          <h3>
            The <span className="red">Ganga</span> TV News
          </h3>
          <p>{footerText}</p>
        </div>

        {/* Sections */}
        <div>
          <h4>Sections</h4>
          <div className="footer-links">
            <span>Politics</span>
            <span>Sports</span>
            <span>Entertainment</span>
            <span>Breaking</span>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4>Follow Us</h4>

          <div className="social">
            {settings?.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            )}

            {settings?.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            )}

            {settings?.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            )}

            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
          </div>

          {!settings?.facebook &&
            !settings?.twitter &&
            !settings?.youtube &&
            !settings?.instagram && (
              <p>Social links will appear here.</p>
            )}
        </div>
      </div>

      <div className="copy">
        © {new Date().getFullYear()} {websiteName}. All rights reserved.
      </div>
    </footer>
  );
}