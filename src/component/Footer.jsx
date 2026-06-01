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
          grid-template-columns: 1.1fr 1.6fr 1.1fr;
          gap: 64px;
          padding: 64px 24px;
          align-items: flex-start;
        }
        .dx-ft-col h4 {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 24px 0;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .dx-ft-links-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
        }
        .dx-ft-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dx-ft-links a {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.25s ease;
          display: block;
        }
        .dx-ft-links a:hover {
          color: #00afef;
          transform: translateX(5px);
        }
        .dx-ft-social {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .dx-ft-social a {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          transition: all 0.25s ease;
        }
        .dx-ft-social a:hover {
          background: #00afef;
          color: #fff;
          border-color: transparent;
          transform: translateY(-3px);
        }
        .dx-ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.05);
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
          gap: 12px;
          margin-bottom: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }
        .dx-ft-contact-item svg { 
          color: #00afef; 
          flex-shrink: 0; 
          margin-top: 3px;
        }

        @media (max-width: 1024px) {
          .dx-ft-grid { gap: 30px; }
        }
        @media (max-width: 992px) {
          .dx-ft-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 600px) {
          .dx-ft-grid { 
            grid-template-columns: 1fr; 
            gap: 20px; 
            padding: 24px 20px; 
            text-align: center;
          }
          .dx-ft-col { display: flex; flex-direction: column; align-items: center; }
          .dx-ft-links-col { display: none; }
          .dx-ft-social { justify-content: center; margin-top: 20px; }
          .dx-ft-contact-item { align-items: center; justify-content: center; text-align: center; margin-bottom: 12px; }
          .dx-ft-bottom { padding: 16px 20px; }
          .dx-ft-bottom-inner { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="dx-ft-grid">
        {/* Brand */}
        <div className="dx-ft-col">
          <img src={Foter} alt="Doxez" style={{ height: 50, marginBottom: 20, filter: "brightness(0) invert(1)" }} />
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 300 }}>
            India’s First Digital Healthcare Platform connecting facilities with verified professionals.
          </p>
          <div className="dx-ft-social">
            <a href="https://www.facebook.com/profile.php?id=61589252032961" target="_blank" rel="noopener noreferrer"><Facebook size={17} /></a>
            <a href="https://www.instagram.com/doxezhealthcare/" target="_blank" rel="noopener noreferrer"><Instagram size={17} /></a>
            <a href="#"><Twitter size={17} /></a>
          </div>
        </div>

        {/* Links */}
        <div className="dx-ft-col dx-ft-links-col">
          <div className="dx-ft-links-container">
            <div>
              <h4>Quick Links</h4>
              <div className="dx-ft-links">
                <Link to="/">Home</Link>
                <Link to="/service">Services</Link>
                <Link to="/HowItWorks">How It Works</Link>
                <Link to="/about">About Us</Link>
              </div>
            </div>
            <div>
              <h4>Partners & Support</h4>
              <div className="dx-ft-links">
                <Link to="/hospital-partner">Partner With Us</Link>
                <Link to="/doctor-onboard">Doctor Onboarding</Link>
                <Link to="/ContactUs">Contact Us</Link>
                <Link to="/faqs">FAQs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="dx-ft-col">
          <h4>Get In Touch</h4>
          <div className="dx-ft-contact-item">
            <MapPin size={16} />
            <span>
              IIT-Bhubaneswar Research Park,<br />
              Samantapuri, Bhubaneswar – 751013
            </span>
          </div>
          <div className="dx-ft-contact-item">
            <Phone size={16} />
            <span style={{ color: "#fff", fontWeight: 600 }}>+91 96929 49500</span>
          </div>
          <div className="dx-ft-contact-item">
            <Mail size={16} />
            <span>support@doxez.in</span>
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
            <Link to="/privacy" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
