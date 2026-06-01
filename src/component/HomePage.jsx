import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Star, MessageSquare, ArrowRight, ShieldCheck, Clock, CheckCircle2,
  Building2, UserPlus, Zap, Lock, FileText, CheckCircle, HeartPulse,
  Activity, Loader2, CheckCircle2 as CheckIcon, ChevronRight, ChevronLeft,
  Stethoscope, Heart, Mic, Sparkles, Bone, Brain, ShieldPlus, Shield, Search
} from "lucide-react";
import DoxezWorkflow from "./DoxezWorkFlow";

// Local Assets
import img1 from "../assets/IITBBSR.png";
import img2 from "../assets/StartupIndia.png";
import img3 from "../assets/StartupOdisha.png";
import nurse from "../assets/nurse34.png";
import Priya from "../assets/Priya.jpg";
import Arjun from "../assets/Arjun.jpg";
// import sneha from "../assets/Snhea.jpg";
import Vikram from "../assets/orthopedic.jpg";
import Ananya from "../assets/doctor5.jpg";
import proctologyIcon from "../assets/proctologii.png";
import urology from "../assets/urology.png";
import Gynecology from "../assets/Gynecology.png";
import ENT from "../assets/ENT.png";
import orthopedics from "../assets/orthopedics.png";
import cosmeticIcon from "../assets/cumaaticc.png";
import generalSurgeryIcon from "../assets/generalsurgery.png";



/* ── REVEAL COMPONENT ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        console.log("Fetching services from backend...", baseUrl);
        const response = await axios.get(`${baseUrl}/api/services/catalog`);
        console.log("API Response:", response.data);
        if (response.data.success && response.data.data.length > 0) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let scrollInterval = setInterval(() => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 350, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cardWidth = current.querySelector(".t-card")?.offsetWidth || 350;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // 🛡️ CRM API Configuration
  const CRM_API_URL = import.meta.env.VITE_API_URL || "https://crm.doxez.in";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      gender: "",
      disease: "",
      otherDisease: "",
      ayushman: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format"),
      phone: Yup.string().matches(/^\d{10}$/, "Valid 10-digit number required").required("Required"),
      gender: Yup.string().required("Required"),
      disease: Yup.string().required("Required"),
      otherDisease: Yup.string().when("disease", {
        is: "Others",
        then: () => Yup.string().required("Specify disease"),
        otherwise: () => Yup.string().notRequired(),
      })
    }),
    onSubmit: (values) => {
      // Show time slot modal first, before calling API
      setSelectedSlot("");
      setShowTimeSlotModal(true);
    }
  });

  const handleTimeSlotSubmit = async () => {
    setShowTimeSlotModal(false);
    setLoading(true);
    try {
      await axios.post(`${CRM_API_URL}/api/leads/public/booking`, {
        patientName: formik.values.name,
        patientPhone: formik.values.phone,
        patientEmail: formik.values.email,
        email: formik.values.email,
        patientGender: formik.values.gender,
        treatmentRequired: formik.values.disease === "Others" ? formik.values.otherDisease : formik.values.disease,
        hasAyushmanCard: formik.values.ayushman === "Yes",
        city: formik.values.location,
        patientAge: 0,
        preferredCallTime: selectedSlot,
        source: "Homepage Hero Form"
      });

      formik.resetForm();
      setShowThankYou(true);
    } catch (err) {
      console.error("Home booking failed:", err);
      alert("Consultation request failed. Please call support.");
    } finally {
      setLoading(false);
    }
  };

  const TIME_SLOTS = ["10AM - 12PM", "12PM - 2PM", "2PM - 5PM"];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#fff", color: "#111827", overflowX: "hidden" }}>

      {/* ── TIME SLOT MODAL (Doxez Original Design) ── */}
      {showTimeSlotModal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(5,15,35,0.72)",
          backdropFilter: "blur(8px)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 12, width: "100%", maxWidth: 460,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            animation: "slideUp 0.3s ease-out",
            overflow: "hidden", position: "relative"
          }}>
            {/* Clean Professional Header */}
            <div style={{
              background: "#0f172a",
              padding: "20px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Clock size={20} color="#38bdf8" />
                <h3 style={{ color: "#ffffff", fontWeight: 600, fontSize: 17, margin: 0 }}>
                  Select Callback Time
                </h3>
              </div>
              <button onClick={() => setShowTimeSlotModal(false)} style={{
                background: "transparent", border: "none", color: "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, cursor: "pointer", transition: "color 0.2s", padding: 0, lineHeight: 1
              }}>×</button>
            </div>

            <div style={{ padding: "32px 24px 24px" }}>
              <p style={{ color: "#475569", fontSize: 15, margin: "0 0 24px", lineHeight: 1.5, textAlign: "center" }}>
                Please choose your preferred time window for our care coordinator to reach out.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  { slot: "10AM - 12PM" },
                  { slot: "12PM - 2PM" },
                  { slot: "2PM - 5PM" },
                ].map(({ slot }) => {
                  const active = selectedSlot === slot;
                  return (
                    <button key={slot} onClick={() => setSelectedSlot(slot)} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 20px", borderRadius: 8, cursor: "pointer",
                      border: active ? "1.5px solid #e8631c" : "1px solid #cbd5e1",
                      background: active ? "#fffaf5" : "#ffffff",
                      transition: "all 0.15s ease", outline: "none",
                      boxShadow: active ? "0 2px 8px rgba(232, 99, 28, 0.1)" : "none"
                    }}>
                      <span style={{ fontSize: 15, fontWeight: active ? 700 : 500, color: active ? "#e8631c" : "#334155" }}>
                        {slot}
                      </span>
                      {active && <CheckCircle2 size={18} color="#e8631c" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleTimeSlotSubmit}
                disabled={loading || !selectedSlot}
                style={{
                  width: "100%", padding: "14px",
                  background: (loading || !selectedSlot) ? "#cbd5e1" : "#e8631c",
                  color: "#fff", border: "none", borderRadius: 8,
                  fontWeight: 600, fontSize: 16, cursor: (loading || !selectedSlot) ? "not-allowed" : "pointer",
                  transition: "background 0.2s"
                }}
              >
                {loading ? "Processing..." : "Confirm Time"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── THANK YOU POPUP (Doxez Original Design) ── */}
      {showThankYou && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(5,15,35,0.72)",
          backdropFilter: "blur(8px)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: 12, width: "100%", maxWidth: 420,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            animation: "slideUp 0.3s ease-out",
            overflow: "hidden", position: "relative"
          }}>
            <button onClick={() => setShowThankYou(false)} style={{
              position: "absolute", top: 16, right: 16,
              background: "transparent", border: "none", color: "#94a3b8",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, cursor: "pointer", padding: 0, lineHeight: 1
            }}>×</button>

            <div style={{ padding: "40px 32px 32px", textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", background: "#10b981",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
                boxShadow: "0 8px 16px -4px rgba(16, 185, 129, 0.3)"
              }}>
                <CheckCircle2 size={32} color="#ffffff" />
              </div>

              <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: 22, margin: "0 0 12px" }}>
                Request Submitted
              </h2>
              <p style={{ color: "#475569", fontSize: 15, margin: "0 0 32px", lineHeight: 1.6 }}>
                Thank you for choosing us. Our customer care will call you {selectedSlot ? `between ${selectedSlot}` : "shortly"}.
              </p>

              <button onClick={() => setShowThankYou(false)} style={{
                width: "100%", padding: "14px",
                background: "#0f172a", color: "#fff",
                border: "none", borderRadius: 8,
                fontWeight: 600, fontSize: 15, cursor: "pointer",
                transition: "background 0.2s"
              }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        
        .hp-hero { padding: 190px 24px 60px; min-height: 75vh; display: flex; align-items: center; background: linear-gradient(to bottom, #f0f7ff 0%, #ffffff 100%); }

        .svc-tiles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) { .svc-tiles-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .svc-tiles-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; } }
        @media (max-width: 640px) {
          .svc-tiles-grid { 
            grid-template-columns: repeat(2, 1fr) !important; 
            gap: 12px !important;
          }
          .svc-tiles-grid a > div { padding: 20px 16px !important; }
          .svc-tiles-grid a div[style*="width: 64"] { width: 48px !important; height: 48px !important; margin-bottom: 12px !important; }
          .svc-tiles-grid a h3 { font-size: 13px !important; }
          .svc-tiles-grid a p { font-size: 10px !important; }
          .svc-section { padding: 40px 20px !important; }
        }

        
        .search-container {
          max-width: 600px;
          width: 100%;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 32px;
          box-shadow: 0 10px 25px rgba(30, 75, 143, 0.05);
        }
        .search-container input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 16px;
          padding: 12px 0;
          color: #1e293b;
        }
        .search-container input::placeholder { color: #94a3b8; }
        .search-btn {
          background: #ff8800;
          color: #fff;
          border: none;
          padding: 10px 24px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-btn:hover { background: #e67a00; }

        @media (max-width: 1024px) {
          .hp-hero { padding: 140px 20px 60px; align-items: flex-start; }
        }
        .hp-inner { max-width: 1280px; margin: 0 auto; width: 100%; }
        
        .badge-main {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eef4ff;
          color: #1e4b8f;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
        }

        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
          font-weight: 800;
          line-height: 1.2;
          color: #0b1f3a;
          margin-bottom: 0;
          letter-spacing: -0.02em;
        }

        .hero-title span {
          display: block;
          font-size: 0.52em;
          font-weight: 600;
          color: #1e4b8f;
          margin-top: 6px;
          line-height: 1.4;
          letter-spacing: 0;
          opacity: 0.9;
        }

        .ayushman-small {
          display: inline-flex;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          gap: 6px;
          background: #eef4ff;
          color: #1e4b8f;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid rgba(30,75,143,0.1);
          white-space: nowrap;
        }

        .hero-sub {
          font-size: 15px;
          line-height: 1.6;
          color: #4b5563;
          max-width: 540px;
          margin-bottom: 16px;
        }

        .stats-row {
          display: flex;
          gap: 32px;
          border-top: 1px solid #f1f5f9;
          padding-top: 24px;
          margin-top: 24px;
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        .aws-branding {
          margin-top: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0.8;
        }

        @media (max-width: 900px) {
          .aws-branding {
            justify-content: center;
            margin-top: 32px !important;
          }
          .nurse-wrapper {
            margin-top: 60px !important;
          }
        }
        .stat-card h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #1e4b8f; margin-bottom: 2px; }
        .stat-card p { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.2; }
        .stat-card { border-left: 3px solid #eef4ff; padding-left: 16px; }

        @media (max-width: 640px) {
          .stats-row { 
            gap: 20px !important; 
            justify-content: space-between !important;
            padding-top: 24px !important;
          }
          .stat-card h3 { font-size: 20px !important; }
          .stat-card p { font-size: 9px !important; letter-spacing: 0.02em !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 28px !important; }
          .nurse-wrapper {
            width: 280px !important;
            height: 280px !important;
          }
        }

        .nurse-wrapper {
          width: 350px;
          height: 350px;
          position: relative;
          margin: 0 auto;
          flex-shrink: 0;
        }
        .nurse-bg-circle {
          position: absolute;
          inset: 0;
          background: #d1e7ff;
          border-radius: 50%;
          box-shadow: 0 40px 100px -12px rgba(30,75,143,0.15);
        }
        .nurse-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          bottom: 8px;
          left: 0;
          transform: scale(1.30);
          transform-origin: bottom center;
          z-index: 10;
          -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 95%);
          mask-image: linear-gradient(to bottom, black 65%, transparent 95%);
        }

        .partner-section { padding: 24px 24px 60px; border-bottom: 1px solid #f3f4f6; text-align: center; overflow: hidden; }
        .logos-wrapper {
          display: flex;
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .partner-logos { 
          display: flex; 
          gap: 80px; 
          align-items: center; 
          opacity: 1;
          animation: marquee 25s linear infinite;
          padding-right: 80px;
          width: max-content;
        }
        .partner-logos img { height: 52px; object-fit: contain; flex-shrink: 0; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes pulse-soft { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 0.4; } }
        @keyframes float-up { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

        .section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #0b1f3a; margin-bottom: 12px; }
        .section-sub { color: #6b7280; font-size: 15px; max-width: 600px; margin: 0 auto; line-height: 1.5; }

        .ayu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .ayu-list li { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #374151; font-weight: 600; margin-bottom: 16px; }

        /* Hide animated visual on mobile */
        .ayu-visual { display: flex; }
        @media (max-width: 767px) {
          .ayu-visual { display: none !important; }
          .ayu-text { flex: 1 1 100% !important; }
        }

        .testimonial-slider-container { 
          position: relative; 
          margin-top: 56px; 
          width: 100%;
        }
        .testimonial-slider { 
          display: flex; 
          gap: 24px; 
          overflow-x: auto; 
          scroll-behavior: smooth; 
          padding: 20px 4px;
          scrollbar-width: none; 
          -ms-overflow-style: none; 
          scroll-snap-type: x mandatory;
        }
        .testimonial-slider::-webkit-scrollbar { display: none; }
        
        .t-card { 
          background: #fff; 
          border: 1.5px solid #f3f4f6; 
          border-radius: 24px; 
          padding: 24px 20px; 
          transition: all 0.3s; 
          position: relative; 
          width: calc(33.333% - 16px);
          min-width: 350px;
          flex-shrink: 0; 
          scroll-snap-align: start;
        }
        .t-card:hover { border-color: #dbeafe; transform: translateY(-8px); box-shadow: 0 20px 50px -12px rgba(30,75,143,0.1); }
        .t-stars { color: #f59e0b; display: flex; gap: 4px; margin-bottom: 12px; }
        .t-msg { font-size: 15px; line-height: 1.6; color: #374151; font-style: italic; margin-bottom: 20px; min-height: 80px; }
        .t-user { display: flex; align-items: center; gap: 12px; border-top: 1px solid #f9fafb; padding-top: 16px; }

        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(30, 75, 143, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          color: #1e4b8f;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .svc-section {
          padding: 60px 24px;
          background: #fff;
        }
        .svc-icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 40px auto 0;
        }
        .svc-icon-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          padding: 40px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-decoration: none;
          position: relative;
        }
        .svc-icon-card:hover {
          transform: translateY(-12px);
          border-color: #3b82f6;
          box-shadow: 0 40px 80px -20px rgba(30, 75, 143, 0.12);
        }
        .svc-icon-box {
          width: 64px;
          height: 64px;
          background: #f8fafc;
          color: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s;
          border: 1px solid #e2e8f0;
        }
        .svc-tile {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .svc-tile:hover {
          transform: translateY(-10px);
          border-color: #3b82f6 !important;
          box-shadow: 0 30px 60px -12px rgba(30, 75, 143, 0.15) !important;
        }
        .svc-tile:hover .tile-icon {
          transform: scale(1.1);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.1);
        }

        .svc-icon-card:hover .svc-icon-box {
          background: #fff;
          color: #3b82f6;
          border-color: #3b82f6;
          transform: scale(1.1);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.1);
        }

        .arrow-btn:hover { background: #fff; box-shadow: 0 15px 45px rgba(30, 75, 143, 0.2); color: #0b76ff; transform: translateY(-50%) scale(1.1); }
        .arrow-btn:active { transform: translateY(-50%) scale(0.95); }
        .arrow-btn.left { left: -64px; }
        .arrow-btn.right { right: -64px; }

        @media (max-width: 1400px) {
          .arrow-btn.left { left: -20px; }
          .arrow-btn.right { right: -20px; }
        }

        @media (max-width: 1024px) {
          .t-card { min-width: 320px; width: calc(50% - 12px); }
          .arrow-btn { width: 44px; height: 44px; }
          .arrow-btn.left { left: -10px; }
          .arrow-btn.right { right: -10px; }
        }

        @media (max-width: 768px) {
          .arrow-btn { display: none; }
          .testimonial-slider { gap: 16px; scroll-padding: 0 20px; }
          .t-card { width: 85%; min-width: unset; scroll-snap-align: center; }
          .testimonials-section { padding: 40px 0 !important; }
          .testimonials-section .hp-inner { padding: 0 20px; }
        }

        .verified-badge { background: #dcfce7; color: #166534; font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px; }

        .trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; }
        .trust-card { 
          background: #fff; 
          border-radius: 20px; 
          padding: 32px 24px; 
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          border: 1px solid #f1f5f9;
        }
        .trust-card:hover { transform: translateY(-8px); border-color: #dbeafe; box-shadow: 0 20px 40px -12px rgba(30,75,143,0.08); }

        /* Hero responsive */
        @media (max-width: 1024px) {
          .hp-hero { padding: 120px 20px 60px !important; }
          .hp-hero .hp-inner { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .hero-sub { margin: 0 auto 40px !important; }
          .stats-row { justify-content: center !important; }
          .nurse-wrapper { width: 280px !important; height: 280px !important; margin: 32px auto !important; }
          .hero-form-card { width: 100% !important; max-width: 480px !important; margin: 0 auto !important; }
        }

        @media (max-width: 640px) {
          .hp-hero { padding: 130px 16px 30px !important; min-height: unset !important; }
          .hero-title { font-size: 1.5rem !important; }
          .hero-sub { font-size: 14px !important; }
          .nurse-wrapper { width: 220px !important; height: 220px !important; }
          .section-title { font-size: 24px !important; margin-bottom: 12px !important; }
          .section-sub { font-size: 14px !important; margin-bottom: 24px !important; }
          .t-card { padding: 24px 20px !important; }
          .t-msg { font-size: 14px !important; }
          .partner-logos { gap: 40px !important; }
          .partner-logos img { height: 46px !important; }
        }

        /* Trust grid responsive */
        @media (max-width: 1100px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }

        /* Ayushman section responsive */
        @media (max-width: 768px) {
          .svc-section { padding: 130px 0 !important; }
          .svc-inner   { padding: 0 16px !important; }
          .svc-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
          .why-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
          .ayu-section { padding: 40px 16px !important; }
          .ayu-content-text { text-align: center !important; }
          .ayu-checklist { display: inline-grid !important; text-align: left !important; margin: 0 auto !important; }
          .ayu-checklist div { justify-content: flex-start !important; }
        }

        /* Testimonials responsive */
        @media (max-width: 640px) {
          .testimonial-slider { gap: 16px !important; padding: 10px 0 !important; }
          .t-card { width: 280px !important; padding: 24px 20px !important; }
          .arrow-btn { display: none !important; }
          .testimonials-section { padding: 40px 16px !important; }
        }

        /* Trust section responsive */
        @media (max-width: 480px) {
          .svc-section { padding: 40px 20px !important; }
          .svc-inner   { padding: 0 !important; }
          .trust-section { padding: 40px 20px !important; }
          .trust-card { padding: 24px 20px !important; }
        }

        /* Partner section responsive */
        @media (max-width: 640px) {
          .partner-section { padding: 24px 16px !important; }
          .how-it-works-section { padding: 40px 16px !important; }
          .how-it-works-section div[style*="marginBottom: 80"] { margin-bottom: 40px !important; }
          .testimonials-section div[style*="marginBottom: 64"] { margin-bottom: 32px !important; }
          .workflow-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .workflow-line { display: none !important; }
        }

        /* Workflow Grid Responsive */
        @media (max-width: 1024px) {
          .workflow-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 32px !important; }
          .workflow-line { display: none !important; }
        }
        @media (max-width: 768px) {
          .workflow-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hp-hero">
        <div className="hp-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, position: "relative" }}>

          {/* LEFT: Text Content */}
          <div style={{ flex: 1, maxWidth: 640, position: "relative", zIndex: 10 }}>
            <Reveal delay={0.1}>
              <h1 className="hero-title">
                India's Comprehensive <br /> Digital Platform
                <span>for end-to-end surgical care facilitation</span>
              </h1>
              <div className="ayushman-small">
                <ShieldCheck size={14} /> Includes Ayushman, Insurance & Self Pay
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="hero-sub">
                Find the right hospital, check bed availability, and get complete support from consultation to recovery — all in one place.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="stats-row">
                <div className="stat-card">
                  <h3>15+</h3>
                  <p>Partner Hospitals</p>
                </div>
                <div className="stat-card">
                  <h3>100+</h3>
                  <p>Total Doctors</p>
                </div>
                <div className="stat-card">
                  <h3>4.8</h3>
                  <p>Google Rating</p>
                </div>
              </div>

              {/* Quick Partner Login for Doctors/Hospitals */}
              {/* <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Partner Portal:</span>
                <a href="https://crm.doxez.in/" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#0b76ff",
                    fontWeight: 800,
                    fontSize: 14,
                    textDecoration: "none",
                    padding: "10px 18px",
                    borderRadius: "12px",
                    background: "rgba(11, 118, 255, 0.06)",
                    border: "1.5px solid rgba(11, 118, 255, 0.15)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = "#0b76ff";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(11, 118, 255, 0.2)";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = "rgba(11, 118, 255, 0.06)";
                    e.currentTarget.style.color = "#0b76ff";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Building2 size={16} /> Doctor / Hospital Login <ChevronRight size={16} />
                </a>
              </div> */}
            </Reveal>

            {/* AWS Branding */}
            <Reveal delay={0.35}>
              <div className="aws-branding">
                <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Infrastructure powered by</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" style={{ height: 32 }} />
              </div>
            </Reveal>
          </div>

          {/* CENTER: Nurse */}
          <Reveal delay={0.35} style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
            <div className="nurse-wrapper">
              <div className="nurse-bg-circle">
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "linear-gradient(to top, rgba(30,75,143,0.1), transparent 50%)" }} />
              </div>
              <img src={nurse} alt="Doxez Healthcare" className="nurse-img" />
            </div>
          </Reveal>

          {/* RIGHT: Form Card */}
          <Reveal direction="right" delay={0.4} style={{ flexShrink: 0, position: "relative", zIndex: 10 }}>
            <div className="hero-form-card" style={{
              background: "#fff", borderRadius: 24, padding: "24px 28px", width: 360,
              boxShadow: "0 24px 80px -12px rgba(30,75,143,0.18)",
              border: "1px solid rgba(226,232,240,0.8)",
            }}>
              {!submitted ? (
                <>
                  <div style={{ marginBottom: 16, textAlign: "center" }}>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0b1f3a", marginBottom: 6, }}>Book Appointment</h3>
                    <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>Get expert advice for your surgical needs.</p>
                  </div>

                  <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ position: "relative" }}>
                      <input type="text" name="name" placeholder="Patient Name" disabled={loading} value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${formik.touched.name && formik.errors.name ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", background: "#f8fafc", boxSizing: "border-box" }} />
                      {formik.touched.name && formik.errors.name && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.name}</p>}
                    </div>

                    <div style={{ position: "relative" }}>
                      <input type="email" name="email" placeholder="Email Address (Optional)" disabled={loading} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${formik.touched.email && formik.errors.email ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", background: "#f8fafc", boxSizing: "border-box" }} />
                      {formik.touched.email && formik.errors.email && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.email}</p>}
                    </div>

                    <div style={{ position: "relative" }}>
                      <select
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: 10,
                          border: "1.5px solid #e2e8f0",
                          fontSize: 13,
                          outline: "none",
                          background: "#f1f4f6ff",
                          boxSizing: "border-box",
                          color: "#72757bff",
                          appearance: "auto"
                        }}
                      >
                        <option value="">Select City</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                      </select>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <div style={{ position: "relative" }}>
                        <input type="tel" name="phone" placeholder="WhatsApp No." disabled={loading} value={formik.values.phone} onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10); formik.handleChange(e); }} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${formik.touched.phone && formik.errors.phone ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", background: "#f8fafc", boxSizing: "border-box" }} />
                        {formik.touched.phone && formik.errors.phone && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.phone}</p>}
                      </div>
                      <div style={{ position: "relative" }}>
                        <select name="gender" disabled={loading} value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${formik.touched.gender && formik.errors.gender ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", color: "#475569", background: "#f8fafc", boxSizing: "border-box" }}>
                          <option value="">Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.gender}</p>}
                      </div>
                    </div>

                    <div style={{ position: "relative" }}>
                      <select name="disease" disabled={loading} value={formik.values.disease} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${formik.touched.disease && formik.errors.disease ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", color: "#475569", background: "#f8fafc", boxSizing: "border-box" }}>
                        <option value="">Select Disease / Treatment</option>
                        <option value="Proctology">Piles, Fissure, Fistula</option>
                        <option value="Laparoscopy">Hernia, Gallstone</option>
                        <option value="Urology">Kidney Stones, Prostate</option>
                        <option value="Gynecology">Gynecology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Others">Others</option>
                      </select>
                      {formik.touched.disease && formik.errors.disease && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.disease}</p>}
                    </div>

                    {formik.values.disease === "Others" && (
                      <div style={{ position: "relative", marginTop: "-4px" }}>
                        <input type="text" name="otherDisease" placeholder="Please specify the disease" disabled={loading} value={formik.values.otherDisease} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${formik.touched.otherDisease && formik.errors.otherDisease ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none", background: "#f8fafc", boxSizing: "border-box" }} />
                        {formik.touched.otherDisease && formik.errors.otherDisease && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.otherDisease}</p>}
                      </div>
                    )}

                    <select name="ayushman" disabled={loading} value={formik.values.ayushman} onChange={formik.handleChange} onBlur={formik.handleBlur} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, outline: "none", color: "#475569", background: "#f8fafc", boxSizing: "border-box" }}>
                      <option value="">Ayushman Bharat?</option>
                      <option value="Yes">Yes, I have an Ayushman Card</option>
                      <option value="No">No, I don't have one</option>
                    </select>

                    <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: loading ? "#94a3b8" : "#ff8800", color: "#fff", borderRadius: 10, border: "none", fontWeight: 800, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", marginTop: 8, boxShadow: "0 8px 20px -6px rgba(255,136,0,0.4)", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                      onMouseOver={(e) => !loading && (e.currentTarget.style.transform = "translateY(-1px)")}
                      onMouseOut={(e) => !loading && (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : "Book Appointment"}
                    </button>
                    <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 }}>
                      <ShieldCheck size={14} color="#059669" /> 100% Secure & Confidential
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: 64, height: 64, background: "#f0fdf4", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0b1f3a", marginBottom: 12 }}>Request Received!</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>Our medical team will contact you shortly to confirm your consultation.</p>
                  <button onClick={() => setSubmitted(false)} style={{ background: "transparent", color: "#1e4b8f", border: "none", fontSize: 12, fontWeight: 700, marginTop: 20, cursor: "pointer", textDecoration: "underline" }}>Send another request</button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section >



      {/* ── SERVICES GRID ── */}
      < section className="svc-section" >
        <div className="hp-inner">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Reveal>
              <div className="badge-main" style={{ marginBottom: 16 }}>Our Services</div>
              <h2 className="section-title">Specialized Surgical Care</h2>
              <p className="section-sub">Doxez connects you with expert surgeons and right hospitals for a wide range of surgical procedures.</p>
            </Reveal>
          </div>

          <div className="svc-tiles-grid">
            {(services.length > 0 ? services : [
              { id: "proctology", serviceName: "Proctology", description: "Piles, Fistula & more", iconUrl: proctologyIcon, color: "#3b82f6", bg: "#eff6ff" },
              { id: "urology", serviceName: "Urology", description: "Kidney, Prostate & more", iconUrl: urology, color: "#8b5cf6", bg: "#f5f3ff" },
              { id: "general-surgery", serviceName: "General Surgery", description: "Hernia, Gallstone & more", iconUrl: generalSurgeryIcon, color: "#10b981", bg: "#f0fdf4" },
              { id: "gynecology", serviceName: "Gynecology", description: "IVF, Fibroid & more", iconUrl: Gynecology, color: "#ec4899", bg: "#fdf2f8" },
              { id: "ent", serviceName: "ENT", description: "Sinus, Tonsil & more", iconUrl: ENT, color: "#f59e0b", bg: "#fffbeb" },
              { id: "cosmetic", serviceName: "Cosmetic Surgery", description: "Gynecomastia, Lipo & more", iconUrl: cosmeticIcon, color: "#06b6d4", bg: "#ecfeff" },
              { id: "orthopedics", serviceName: "Orthopedics", description: "Joint, Spine & more", iconUrl: orthopedics, color: "#6366f1", bg: "#eef2ff" },
              { id: "neurosurgery", serviceName: "Neurosurgery", description: "Slip Disc, Sciatica & more", iconUrl: null, color: "#0f172a", bg: "#f8fafc" },
            ]).map((cat, i) => (
              <Reveal key={cat._id || cat.id} delay={i * 0.04}>
                <Link
                  to={`/services/${cat._id || cat.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    background: "#fff",
                    border: "1.5px solid #f1f5f9",
                    borderRadius: "20px",
                    padding: "28px 24px",
                    textAlign: "center",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }} className="svc-tile">
                    <div style={{
                      width: 64, height: 64,
                      background: cat.bg || "#f8fafc",
                      borderRadius: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: cat.color || "#1e293b",
                      marginBottom: 16,
                      transition: "transform 0.3s ease"
                    }} className="tile-icon">
                      {cat.iconUrl ? (
                        <img
                          src={
                            typeof cat.iconUrl === 'string' && cat.iconUrl.startsWith('http')
                              ? cat.iconUrl
                              : (cat._id
                                ? `${import.meta.env.VITE_API_URL || "https://crm.doxez.in"}${cat.iconUrl}`
                                : cat.iconUrl)
                          }
                          alt={cat.serviceName}
                          style={{ width: 32, height: 32, objectFit: "contain" }}
                        />
                      ) : (
                        <Brain size={28} />
                      )}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0b1f3a", marginBottom: 6 }}>{cat.serviceName || cat.title}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{cat.shortDesc || cat.description || cat.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section >

      {/* ── AYUSHMAN SUPPORT ── */}
      <section className="ayu-section" style={{ padding: "60px 24px", background: "#f8fafc" }}>
        <div className="hp-inner" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>

          {/* Left: Animated Visual — hidden on mobile via CSS */}
          <Reveal className="ayu-visual" style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", position: "relative" }}>
            <div className="ayu-visual" style={{ position: "relative", width: "100%", maxWidth: "420px", height: "420px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "2px dashed #93c5fd", animation: "spin-slow 20s linear infinite" }} />
              <div style={{ position: "absolute", inset: 50, borderRadius: "50%", background: "#dbeafe", animation: "pulse-soft 3s ease-in-out infinite" }} />
              <div style={{ position: "absolute", inset: 80, borderRadius: "50%", background: "#bfdbfe" }} />
              <div style={{ position: "relative", zIndex: 10, background: "#fff", padding: "30px", borderRadius: "50%", boxShadow: "0 20px 40px rgba(30,75,143,0.15)" }}>
                <ShieldCheck size={80} color="#16a34a" />
              </div>
              <div style={{ position: "absolute", top: "15%", right: "10%", background: "#fff", padding: "16px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", animation: "float-up 4s ease-in-out infinite" }}>
                <HeartPulse color="#ef4444" size={32} />
              </div>
              <div style={{ position: "absolute", bottom: "25%", left: "5%", background: "#fff", padding: "16px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", animation: "float-up 5s ease-in-out infinite reverse" }}>
                <Activity color="#3b82f6" size={32} />
              </div>
              <div style={{ position: "absolute", bottom: "0", right: "-5%", background: "#fff", padding: "16px 20px", borderRadius: "16px", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", animation: "float-up 6s ease-in-out infinite", display: "flex", alignItems: "center", gap: "12px", zIndex: 20 }}>
                <div style={{ width: 44, height: 44, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle color="#16a34a" size={20} /></div>
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "800", color: "#1e293b" }}>100% Cashless</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Ayushman Approved</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <Reveal delay={0.2} style={{ flex: "1 1 300px" }}>
            <div className="ayu-content-text ayu-text">
              <div className="badge-main" style={{ marginBottom: "16px" }}>Coverage</div>
              <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", marginBottom: "12px", lineHeight: "1.3" }}>
                Doxez provide surgical care facilitation under Ayushman Bharat
              </h2>
              <p className="section-sub" style={{ margin: "0 0 24px 0", color: "#475569", fontSize: "15px" }}>
                Find. Verify. Get Admitted. Get Treated. — We Handle It All.
              </p>
              <div className="ayu-checklist" style={{ display: "grid", gap: "16px" }}>
                {[
                  "Find Nearby Ayushman Hospitals",
                  "Check Bed Availability",
                  "Eligibility & Documentation Support",
                  "Faster Admission Coordination"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>
                    <CheckCircle size={20} color="#10b981" />
                    <span style={{ paddingTop: "2px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="how-it-works-section" style={{ padding: "60px 24px", background: "#fcfdfe", borderTop: "1px solid #f1f5f9" }}>
        <div className="hp-inner">
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <Reveal>
              <div className="badge-main" style={{ marginBottom: 20 }}>Journey</div>
              <h2 className="section-title">How DOXEZ Works</h2>
              <p className="section-sub">A seamless, supported clinical experience from booking to full recovery.</p>
            </Reveal>
          </div>

          <div className="workflow-container" style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            {/* Horizontal Line Connector (Desktop Only) */}
            <div className="workflow-line" style={{
              position: "absolute",
              top: "40px",
              left: "10%",
              right: "10%",
              height: "2px",
              background: "linear-gradient(to right, #e5e7eb, #1e4b8f 50%, #e5e7eb)",
              zIndex: 0
            }} />

            <div className="workflow-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "32px",
              position: "relative",
              zIndex: 1
            }}>
              {[
                {
                  id: "01",
                  title: "Book Free Consultation",
                  desc: "Connect with a experts to discuss your symptoms.",
                  icon: <MessageSquare size={22} />,
                  color: "#1e4b8f"
                },
                {
                  id: "02",
                  title: "Diagnosis & Plan",
                  desc: "Our team will reviews your reports and  provide the suitable doctor according to your problem.",
                  icon: <Activity size={22} />,
                  color: "#0b76ff"
                },
                {
                  id: "03",
                  title: "Hospital & Payment",
                  desc: "Select a hospital and verify your Ayushman Bharat, insurance, or Self-pay eligibility.",
                  icon: <Building2 size={22} />,
                  color: "#10b981"
                },
                {
                  id: "04",
                  title: "Surgery Coordination",
                  desc: "Our team will help you select suitable hospitals for your surgery and connect you with surgeons empanelled with us.",
                  icon: <CheckCircle size={22} />,
                  color: "#f59e0b"
                },
                {
                  id: "05",
                  title: "Recovery Support",
                  desc: "Post-surgery follow-ups to ensure your health is on track.",
                  icon: <HeartPulse size={22} />,
                  color: "#ef4444"
                }
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* Circle Icon */}
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: step.color,
                      marginBottom: 24,
                      position: "relative",
                      boxShadow: "0 15px 35px rgba(30,75,143,0.08)",
                      zIndex: 2
                    }}>
                      {step.icon}
                      {/* Step Number Badge */}
                      <div style={{
                        position: "absolute",
                        top: -5,
                        right: -5,
                        width: 28,
                        height: 28,
                        background: step.color,
                        color: "#fff",
                        borderRadius: "50%",
                        fontSize: 10,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                      }}>
                        {step.id}
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0b1f3a", marginBottom: 8, lineHeight: 1.3 }}>{step.title}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <style>{`
        @media (max-width: 900px) {
          .workflow-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .workflow-line { display: none !important; }
          .workflow-grid > div { position: relative; min-height: 140px; }
          .workflow-grid > div:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 40px;
            top: 40px;
            bottom: -32px;
            width: 2px;
            background: #cbd5e1;
            z-index: 0;
          }
          .workflow-grid > div > div { flex-direction: row !important; text-align: left !important; gap: 24px !important; align-items: flex-start !important; }
          .workflow-grid > div > div > div:first-child { margin-bottom: 0 !important; flex-shrink: 0 !important; }
          .workflow-grid h3 { padding-top: 4px !important; font-size: 15px !important; }
          .workflow-grid p { font-size: 13px !important; }
        }
        `}</style>
      </section>

      <section className="trust-section" style={{ padding: "100px 24px", background: "#fff" }}>
        <div className="hp-inner">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Reveal>
              <h2 className="section-title">Why Patients Trust Us</h2>
              <p className="section-sub">We eliminate the stress of surgical care by providing reliable, affordable, and highly skilled support exactly when you need it.</p>
            </Reveal>
          </div>

          <div className="trust-grid">
            {[
              {
                icon: <ShieldCheck size={20} />,
                title: "Expert Surgeons",
                desc: "Every surgeon in our network is rigorously vetted for clinical excellence to ensure you receive the safest, highest quality care."
              },
              {
                icon: <Zap size={20} />,
                title: "Faster Admissions",
                desc: "Skip the waiting room. We coordinate your hospital bed, paperwork, and surgical admission instantly."
              },
              {
                icon: <FileText size={20} />,
                title: "Transparent & Affordable",
                desc: "No hidden fees. We provide upfront cost estimates and full support for cashless insurance & No-Cost EMIs."
              },
              {
                icon: <Lock size={20} />,
                title: "Total Privacy",
                desc: "Your data is safeguarded with strict protocols — ensuring 100% confidential handling of your medical and personal records."
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="trust-card">
                  <div style={{
                    width: 44, height: 44,
                    background: "#0b76ff", color: "#fff",
                    borderRadius: 10, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    marginBottom: 24
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0b1f3a", marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" style={{ padding: "80px 24px 40px" }}>
        <div className="hp-inner">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Reveal>
              <div className="badge-main" style={{ marginBottom: 20 }}>Success Stories</div>
              <h2 className="section-title">What Doctors Say</h2>
              {/* <p className="section-sub">Join thousands of verified professionals already growing their careers with Doxez.</p> */}
              <p className="section-sub">Connecting verified doctors with the right opportunities, faster.</p>
            </Reveal>
          </div>

          <div className="testimonial-slider-container">
            <button className="arrow-btn left" onClick={() => scroll("left")}>
              <ChevronLeft size={24} />
            </button>
            <button className="arrow-btn right" onClick={() => scroll("right")}>
              <ChevronRight size={24} />
            </button>

            <div className="testimonial-slider" ref={scrollRef}>
              {[
                { name: "Dr. Priya Sharma", role: "Cardiologist", msg: "The best platform for locum doctors in India. I was matched with a high-intensity department in under 4 hours.", avatar: Priya, rating: 5 },
                { name: "Dr. Arjun Mehta", role: "Anaesthesiologist", msg: "Transparent billing and instant payouts. Doxez has completely changed how I manage my professional shifts.", avatar: Arjun, rating: 5 },
                // { name: "Dr. Sneha Patel", role: "Pediatrician", msg: "Verified credentials mean hospitals trust me instantly. I focus on patient care while Doxez handles the rest.", avatar: sneha, rating: 5 },
                { name: "Dr. Vikram Singh", role: "Orthopedic Surgeon", msg: "Finding high-quality surgical cases has never been easier. The platform's interface is intuitive and the support is top-notch.", avatar: Vikram, rating: 5 },
                { name: "Dr. Ananya Iyer", role: "General Surgeon", msg: "Doxez provides the flexibility I need to balance my private practice with additional surgical opportunities.", avatar: Ananya, rating: 5 }
              ].map((t, i) => (
                <div className="t-card" key={i}>
                  <div className="t-stars">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="#f59e0b" />)}
                  </div>
                  <p className="t-msg">"{t.msg}"</p>
                  <div className="t-user">
                    <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: "#0b1f3a" }}>{t.name}</h4>
                      <p style={{ fontSize: 12, color: "#6b7280", margin: "0px 0 2px" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER SECTION ── */}
      <section className="partner-section">
        <div className="hp-inner">
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 32 }}>Recognized by</p>
            <div className="logos-wrapper">
              <div className="partner-logos">
                <img src={img1} alt="IIT Bhubaneswar" />
                <img src={img2} alt="Startup India" style={{ transform: "scale(1.7)" }} />
                <img src={img3} alt="Startup Odisha" style={{ transform: "scale(1.7)" }} />
                <img src={img1} alt="Partner" />
                <img src={img2} alt="Partner" style={{ transform: "scale(1.7)" }} />
                <img src={img1} alt="IIT Bhubaneswar" />
                <img src={img2} alt="Startup India" style={{ transform: "scale(1.7)" }} />
                <img src={img3} alt="Startup Odisha" style={{ transform: "scale(1.7)" }} />
                <img src={img1} alt="Partner" />
                <img src={img2} alt="Partner" style={{ transform: "scale(1.7)" }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}