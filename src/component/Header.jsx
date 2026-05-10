import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, Mail, ChevronDown, X, Menu, Calendar } from "lucide-react";
import DoxeZ from "./../assets/WhatsApp_Image_2026-03-06_at_18.13.31-removebg-preview.png";
import AppointmentModal from "./AppointmentModal";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeDrop, setActiveDrop] = useState(null);
  const dropTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  const enterDrop = (name) => { clearTimeout(dropTimer.current); setActiveDrop(name); };
  const leaveDrop = () => { dropTimer.current = setTimeout(() => setActiveDrop(null), 150); };

  return (
    <>
      {/* GLOBAL CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap');

        :root {
          --doxez-blue: #0b76ff;
          --doxez-dark: #0b1f3a;
          --text-main: #1e293b;
          --text-light: #64748b;
          --bg-glass: rgba(255, 255, 255, 0.90);
        }

        /* ── TOP CONTACT BAR ── */
        .nx-topbar {
          background: var(--doxez-dark);
          color: rgba(255,255,255,0.8);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          height: 38px;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1001;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 40px;
          gap: 24px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nx-topbar.hidden {
          transform: translateY(-100%);
        }
        .nx-topbar a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nx-topbar a:hover {
          color: #fff;
        }

        /* ── MAIN FLOATING HEADER ── */
        .nx-header {
          position: fixed;
          top: 54px;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 1200px;
          height: 70px;
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 20px;
          box-shadow: 0 10px 40px -10px rgba(11, 31, 58, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nx-header.scrolled {
          top: 12px;
          box-shadow: 0 15px 50px -10px rgba(11, 31, 58, 0.12);
        }

        /* LOGO */
        .nx-logo img {
          height: 69px;
          display: block;
        }

        /* DESKTOP NAV */
        .nx-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media(max-width: 1024px) {
          .nx-nav { display: none; }
        }

        .nx-nav-item {
          position: relative;
        }

        .nx-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-light);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
          cursor: pointer;
          background: transparent;
          border: none;
        }
        .nx-nav-link:hover, .nx-nav-link.active {
          color: var(--doxez-blue);
          background: rgba(11, 118, 255, 0.05);
        }

        /* DROPDOWN */
        .nx-drop {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #ffffff;
          border-radius: 16px;
          padding: 10px;
          min-width: 220px;
          box-shadow: 0 20px 40px rgba(11,31,58,0.1);
          border: 1px solid rgba(11,31,58,0.05);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nx-drop.open {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          visibility: visible;
        }
        .nx-drop a {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .nx-drop a:hover {
          background: #f4f8fc;
          color: var(--doxez-blue);
          padding-left: 22px;
        }

        /* CTA & HAMBURGER */
        .nx-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nx-cta {
          background: #ff8800;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          padding: 0 24px;
          height: 46px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(255, 136, 0, 0.3);
        }
        .nx-cta:hover {
          background: #e67a00;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 136, 0, 0.4);
        }

        .nx-ham {
          display: none;
          width: 46px; height: 46px;
          background: transparent;
          color: var(--doxez-dark);
          border: none;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }
        .nx-ham:hover { opacity: 0.7; }

        @media(max-width: 1024px) {
          .nx-cta { display: none; }
          .nx-ham { display: flex; }
          .nx-header { padding: 0 16px; }
        }
        @media(max-width: 640px) {
          .nx-topbar { justify-content: center; padding: 0; font-size: 11px; height: 32px;}
          .nx-header { top: 40px; height: 62px; width: 94%; border-radius: 16px;}
          .nx-header.scrolled { top: 12px; }
          .nx-logo img { height: 50px; }
          .nx-ham { width: 40px; height: 40px; }
        }

        /* ── MOBILE MENU ── */
        .nx-mob-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 1099;
          opacity: 0; visibility: hidden;
          transition: all 0.3s;
        }
        .nx-mob-overlay.open { opacity: 1; visibility: visible; }

        .nx-mob {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 320px;
          max-width: 100vw;
          background: #fff;
          z-index: 1100;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(11,31,58,0.1);
        }
        .nx-mob.open { transform: translateX(0); }

        .nx-mob-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .nx-mob-head img { height: 40px; }
        .nx-mob-close {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #f4f8fc;
          border: none;
          color: var(--doxez-dark);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }

        .nx-mob-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }
        .nx-mlink {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-main);
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .nx-mlink.active { color: var(--doxez-blue); }

        .nx-msec {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 30px 0 10px;
        }
        .nx-msub {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--text-light);
          text-decoration: none;
          padding: 12px 0;
        }

        .nx-mob-foot {
          padding: 20px;
          border-top: 1px solid #f1f5f9;
        }
        .nx-mob-cta {
          width: 100%;
          height: 54px;
          background: #ff8800;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(255, 136, 0, 0.3);
        }
      `}</style>

      {/* TOP BAR */}
      <div className={`nx-topbar ${scrolled ? "hidden" : ""}`}>
        <a href="tel:+919692949500"><Phone size={14} /> +91-9692949500</a>
        <a href="mailto:support@doxez.in"><Mail size={14} /> support@doxez.in</a>
      </div>

      {/* HEADER */}
      <header className={`nx-header ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="nx-logo">
          <img src={DoxeZ} alt="Doxez" />
        </Link>

        {/* Desktop Nav */}
        <ul className="nx-nav">
          <li className="nx-nav-item">
            <NavLink to="/service" className={({ isActive }) => `nx-nav-link ${isActive ? "active" : ""}`}>Services</NavLink>
          </li>
          <li className="nx-nav-item">
            <NavLink to="/HowItWorks" className={({ isActive }) => `nx-nav-link ${isActive ? "active" : ""}`}>How It Works</NavLink>
          </li>
          <li className="nx-nav-item" onMouseEnter={() => enterDrop("company")} onMouseLeave={leaveDrop}>
            <button className={`nx-nav-link ${activeDrop === "company" ? "active" : ""}`}>
              Our Company <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: activeDrop === "company" ? "rotate(180deg)" : "rotate(0)" }} />
            </button>
            <div className={`nx-drop ${activeDrop === "company" ? "open" : ""}`} onMouseEnter={() => enterDrop("company")} onMouseLeave={leaveDrop}>
              <Link to="/hospital-partner" onClick={() => setActiveDrop(null)}>Partner With Us</Link>
              <Link to="/doctor-onboard" onClick={() => setActiveDrop(null)}>Doctor Onboarding</Link>
              <Link to="/about" onClick={() => setActiveDrop(null)}>About Us</Link>
            </div>
          </li>
          <li className="nx-nav-item">
            <NavLink to="/ContactUs" className={({ isActive }) => `nx-nav-link ${isActive ? "active" : ""}`}>Contact Us</NavLink>
          </li>
        </ul>

        {/* Right CTA */}
        <div className="nx-right">
          <button className="nx-cta" onClick={() => setShowModal(true)}>
            <Calendar size={18} /> Book Appointment
          </button>
          <button className="nx-ham" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`nx-mob-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <div className={`nx-mob ${menuOpen ? "open" : ""}`}>
        <div className="nx-mob-head">
          <img src={DoxeZ} alt="Doxez" />
          <button className="nx-mob-close" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="nx-mob-body">
          <NavLink to="/" className={({ isActive }) => `nx-mlink ${isActive ? "active" : ""}`}>Home</NavLink>
          <NavLink to="/service" className={({ isActive }) => `nx-mlink ${isActive ? "active" : ""}`}>Services</NavLink>
          <NavLink to="/HowItWorks" className={({ isActive }) => `nx-mlink ${isActive ? "active" : ""}`}>How It Works</NavLink>
          <NavLink to="/ContactUs" className={({ isActive }) => `nx-mlink ${isActive ? "active" : ""}`}>Contact Us</NavLink>

          <div className="nx-msec">Our Company</div>
          <NavLink to="/hospital-partner" className="nx-msub">Partner With Us</NavLink>
          <NavLink to="/doctor-onboard" className="nx-msub">Doctor Onboarding</NavLink>
          <NavLink to="/about" className="nx-msub">About Us</NavLink>
        </div>
        <div className="nx-mob-foot">
          <button className="nx-mob-cta" onClick={() => { setShowModal(true); setMenuOpen(false); }}>
            <Calendar size={18} /> Book Appointment
          </button>
        </div>
      </div>

      {showModal && <AppointmentModal onClose={() => setShowModal(false)} />}
    </>
  );
}