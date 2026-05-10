/* ══════════════════════════════════════════════════════════
   ORIGINAL FOOTER (v1) — Dark theme with emails + address
   Commented out to preserve. See git history for full code.
   ══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   FOOTER v2 — Surgery-focused treatment directory
   (Wrong identity — Doxez is staffing, not surgery)
   Commented out to preserve. See git history for full code.
   ══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   FOOTER v3 — Pristyn-style with DOXEZ STAFFING content
   Current active version below
   ══════════════════════════════════════════════════════════ */

import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Foter from "./../assets/Doxez.png";

export default function Footer() {
  return (
    <footer style={{ background: "#0b1f3a", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .dx-ft-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 2fr 1.2fr;
          gap: 40px;
          padding: 72px 24px 56px;
        }
        .dx-ft-col h4 {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 22px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .dx-ft-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dx-ft-links a {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
        }
        .dx-ft-links a:hover {
          color: #00afef;
          padding-left: 4px;
        }
        .dx-ft-social {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .dx-ft-social a {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          transition: all 0.25s;
        }
        .dx-ft-social a:hover {
          transform: translateY(-3px);
          background: var(--dx-secondary, #00afef);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 6px 16px rgba(0,175,239,0.3);
        }
        .dx-ft-bottom {
          background: rgba(0,0,0,0.2);
          padding: 24px;
        }
        .dx-ft-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dx-ft-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.6;
        }
        .dx-ft-contact-item svg { color: #00afef; flex-shrink: 0; margin-top: 2px; }

        @media (max-width: 992px) {
          .dx-ft-grid { grid-template-columns: 1fr 1fr; gap: 48px; }
        }
        @media (max-width: 600px) {
          .dx-ft-grid { 
            grid-template-columns: 1fr; 
            gap: 24px; 
            padding: 32px 20px; 
            text-align: center;
          }
          .dx-ft-col { display: flex; flex-direction: column; align-items: center; }
          .dx-quick-links { display: none; }
          .dx-ft-links-wrapper { 
            grid-template-columns: 1fr !important; 
            gap: 12px !important; 
            min-width: 100% !important;
          }
          .dx-ft-links { align-items: center; }
          .dx-ft-social { justify-content: center; margin-top: 16px; }
          .dx-ft-contact-item { align-items: center; justify-content: center; text-align: center; margin-bottom: 12px; }
          .dx-ft-bottom { padding: 16px 20px; }
          .dx-ft-bottom-inner { flex-direction: column; gap: 8px; text-align: center; }
          .dx-ft-col h4 { margin-bottom: 16px; }
        }
      `}</style>

      <div className="dx-ft-grid">
        {/* Brand */}
        <div className="dx-ft-col">
          <img src={Foter} alt="Doxez" style={{ height: 50, marginBottom: 20, filter: "brightness(0) invert(1)" }} />
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 8, maxWidth: 300 }}>
            India’s First Digital Healthcare Platform connecting facilities with verified professionals, while providing end-to-end surgical care facilitation across India.          </p>
          <div className="dx-ft-social">
            <a href="#"><Facebook size={17} /></a>
            <a href="#"><Instagram size={17} /></a>
            <a href="#"><Twitter size={17} /></a>
          </div>
        </div>


        {/* Quick Links */}
        <div className="dx-ft-col dx-quick-links">
          <h4>Quick Links</h4>
          <div className="dx-ft-links-wrapper" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "32px", minWidth: "320px" }}>
            <div className="dx-ft-links">
              <Link to="/">Home</Link>
              <Link to="/service">Services</Link>
              <Link to="/HowItWorks">How It Works</Link>
              <Link to="/hospital-partner">Partner With Us</Link>
            </div>
            <div className="dx-ft-links">
              <Link to="/doctor-onboard">Doctor Onboarding</Link>
              <Link to="/about">About Us</Link>
              <Link to="/ContactUs">Contact Us</Link>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="dx-ft-col">
          <h4>Get In Touch</h4>
          <div className="dx-ft-contact-item">
            <MapPin size={16} />
            <span>
              IIT-Bhubaneswar Research & Entrepreneurship Park (REP),
              Samantapuri, Bhubaneswar – 751013
            </span>
          </div>
          <div className="dx-ft-contact-item">
            <Phone size={16} />
            <span style={{ color: "#fff", fontWeight: 600 }}>+91-9692949500</span>
          </div>
          <div className="dx-ft-contact-item">
            <Mail size={16} />
            <span>support@doxez.in</span>
          </div>
          <div className="dx-ft-contact-item">
            <Mail size={16} />
            <span>contact@hedenahealth.com</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="dx-ft-bottom">
        <div className="dx-ft-bottom-inner">
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            © 2025 Hedena Healthcare Pvt. Ltd. All rights reserved. | Doxez®
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
