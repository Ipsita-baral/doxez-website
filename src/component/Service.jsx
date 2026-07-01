import { useState, useEffect, useRef } from "react";
import { Activity, Bone, Baby, Brain } from "lucide-react";
// import genSurgeon from "../assets/generalsurgeon.jpg";
import orthoImg from "../assets/orthopedic.jpg";
import othersImg from "../assets/others.jpg";
import proctologyIcon from "../assets/proctologii.png";
import urology from "../assets/urology.png";
import Gynecology from "../assets/Gynecology.png";
import ENT from "../assets/ENT.png";
import orthopedics from "../assets/orthopedics.png";
import cosmeticIcon from "../assets/cumaaticc.png";
import generalSurgeryIcon from "../assets/generalsurgery.png";
import axios from "axios";
import { servicesData as localServicesData } from '../data/servicesData';
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight, ChevronLeft, Stethoscope, Heart,
  Mic, Sparkles, ShieldPlus, Shield, Search, Mail, ArrowRight, Loader2
} from "lucide-react";


/* ─── THEME ─── */
const t = {
  bg: "#f6fbff", fg: "#0b2545", border: "#e2eaf3",
  primary: "#0b76ff", secondary: "#eaf4ff", secondaryFg: "#06345c",
  muted: "#f1f5f9", mutedFg: "#7a8794", card: "#ffffff", accent: "#00c2a8",
};

/* ─── DATA ─── */


const whyItems = [
  {
    icon: "🛡️",
    title: "100% Verified Profiles",
    desc: "Candidate presentation is centred on reviewed credentials and role relevance so facilities can evaluate with more confidence.",
  },
  {
    icon: "🎯",
    title: "Facility-Aware Matching",
    desc: "Hospitals, clinics and nursing homes each have different staffing pressure points. Doxez keeps the service aligned to those differences.",
  },
  {
    icon: "⏱️",
    title: "Rapid Coordination",
    desc: "The workflow is intentionally direct so your internal team spends less time managing follow-ups and more time maintaining service continuity.",
  },
];

/* ─── SMOOTH REVEAL HOOK ─── */
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.animationPlayState = "running";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationPlayState = "running";
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "-40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── REVEAL COMPONENT ─── */
function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`srv-reveal ${className}`}
      style={{ "--delay": `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}

/* ─── SERVICE CARD ─── */
function ServiceCard({ card, delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="srv-reveal srv-card"
      style={{ "--delay": `${delay}s` }}
    >
      <div className="srv-card-inner">
        {/* Body */}
        <div style={{ padding: "28px 22px 0" }}>
          {/* Icon + Coming Soon badge row */}
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: card.lightBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem",
            }}>
              {card.icon}
            </div>
            {card.comingSoon && (
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: "#fff8e1", color: "#b45309",
                border: "1px solid #fde68a",
                borderRadius: 999, padding: "3px 10px",
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}>
                Coming Soon
              </span>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 20, fontWeight: 700, color: t.fg,
            marginBottom: 10, lineHeight: 1.25,
            opacity: card.comingSoon ? 0.75 : 1,
          }}>
            {card.title}
          </h3>

          {/* Desc */}
          <p style={{
            fontSize: 14, lineHeight: 1.7, color: t.mutedFg,
            marginBottom: 12,
            opacity: card.comingSoon ? 0.8 : 1,
          }}>
            {card.desc}
          </p>

          {/* Checks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {card.checks.map(c => (
              <div key={c} style={{
                display: "flex", alignItems: "flex-start", gap: 8,
                fontSize: 13, color: t.fg, lineHeight: 1.5,
                opacity: card.comingSoon ? 0.65 : 1,
              }}>
                <span style={{
                  color: card.comingSoon ? "#d97706" : "#16a34a",
                  fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1,
                }}>
                  {card.comingSoon ? "◦" : "✓"}
                </span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="srv-card-img-wrap" style={{ position: "relative" }}>
          <img src={card.img} alt={card.title} className="srv-card-img" />
          {card.comingSoon && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(255,248,225,0.45)",
              backdropFilter: "blur(1px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                background: "#b45309", color: "#fff",
                fontSize: 12, fontWeight: 800,
                padding: "6px 16px", borderRadius: 999,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── WHY CARD ─── */
function WhyCard({ item, delay = 0 }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="srv-reveal why-card" style={{ "--delay": `${delay}s` }}>
      <div style={{ fontSize: "2rem", marginBottom: 20 }}>{item.icon}</div>
      <h3 style={{ fontSize: 19, fontWeight: 700, color: t.fg, marginBottom: 12, lineHeight: 1.3 }}>{item.title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: t.mutedFg }}>{item.desc}</p>
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function DoxEZServicesPage() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: #f6fbff; }

    @keyframes srvFadeUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    .srv-reveal {
      opacity: 0;
      animation-name: srvFadeUp;
      animation-duration: 0.72s;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
      animation-fill-mode: forwards;
      animation-play-state: paused;
      animation-delay: var(--delay, 0s);
    }

    .srv-card { height: 100%; }

    .srv-card-inner {
      height: 100%;
      background: #fff;
      border: 1.5px solid #e2eaf3;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      transition:
        transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.38s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.3s ease;
    }
    .srv-card-inner:hover {
      transform: translateY(-9px);
      box-shadow: 0 28px 64px rgba(11, 118, 255, 0.11);
      border-color: rgba(11, 118, 255, 0.28);
    }

    .srv-card-img-wrap {
      height: 180px;
      overflow: hidden;
      margin-top: auto;
      flex-shrink: 0;
    }
    .srv-card-img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .srv-card-inner:hover .srv-card-img {
      transform: scale(1.08);
    }

    .why-card {
      background: #f6fbff;
      border-radius: 16px;
      padding: 36px 32px;
      border: 1.5px solid #e2eaf3;
      height: 100%;
      transition:
        transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 0.32s ease,
        border-color 0.28s ease;
    }
    .why-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 18px 52px rgba(11,118,255,0.09);
      border-color: rgba(11,118,255,0.22);
    }

    .svc-section { padding: 96px 0; }
    .svc-inner   { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
    .svc-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .why-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

    @media (max-width: 1024px) {
      .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    .svc-tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .svc-tile {
      background: #fff;
      border: 1.5px solid #f1f5f9;
      border-radius: 20px;
      padding: 32px 24px;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      cursor: pointer;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
    .svc-tile:hover {
      transform: translateY(-10px);
      border-color: #3b82f6 !important;
      box-shadow: 0 30px 60px -12px rgba(30, 75, 143, 0.15) !important;
    }
    .tile-icon {
      width: 64px;
      height: 64px;
      background: #f8fafc;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1e293b;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      border: 1px solid #e2e8f0;
    }
    // .svc-tile:hover .tile-icon {
    //   transform: scale(1.1);
    //   background: #fff;
    //   border-color: #3b82f6;
    //   color: #3b82f6;
    // }
    .svc-tile h3 {
      font-size: 18px;
      font-weight: 800;
      color: #0b1f3a;
      margin-bottom: 8px;
    }
    .svc-tile p {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
      line-height: 1.5;
    }

    .reg-form-container {
      margin-top: 80px;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 40px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      box-shadow: 0 20px 50px rgba(30,75,143,0.05);
    }
    .reg-input-group {
      display: flex;
      gap: 12px;
      max-width: 500px;
      margin: 24px auto 0;
    }
    .reg-input {
      flex: 1;
      padding: 14px 20px;
      border-radius: 12px;
      border: 1.5px solid #e2e8f0;
      font-size: 15px;
      outline: none;
      transition: all 0.3s;
    }
    .reg-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59,130,246,0.1); }
    .reg-btn {
      background: #3b82f6;
      color: #fff;
      border: none;
      padding: 14px 28px;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s;
      white-space: nowrap;
    }
    .reg-btn:hover { background: #2563eb; transform: translateY(-2px); }
  `;

  const [email, setEmail] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseUrl}/api/services/catalog`);
        console.log("Backend Data for Services:::::::", response.data);

        // Define our desired frontend data for icons/desc
        const staticMap = {
          "proctology": { desc: "Piles, Fistula & more", icon: proctologyIcon },
          "urology": { desc: "Kidney, Prostate & more", icon: urology },
          "general-surgery": { desc: "Hernia, Gallstone & more", icon: generalSurgeryIcon },
          "gynecology": { desc: "IVF, Fibroid & more", icon: Gynecology },
          "ent": { desc: "Sinus, Tonsil & more", icon: ENT },
          "cosmetic-surgery": { desc: "Gynecomastia, Lipo & more", icon: cosmeticIcon },
          "orthopedics": { desc: "Joint, Spine & more", icon: orthopedics },
        };

        if (response.data.success && response.data.data.length > 0) {
          const mappedData = response.data.data.map(service => {
            const lowerTitle = service.serviceName.toLowerCase().replace(/\s+/g, '-');
            const local = staticMap[lowerTitle] || {};
            return {
              ...service,
              id: service._id,
              title: service.serviceName,
              description: service.description || service.shortDesc || local.desc || "Specialized surgical care",
              iconUrl: local.icon || (service.iconImage
                ? (service.iconImage.startsWith('http') ? service.iconImage : `${baseUrl}${service.iconImage}`)
                : proctologyIcon)
            };
          });
          setServices(mappedData);
        } else {
          setServices(localServicesData.map(s => ({ ...s, description: s.shortDesc || s.description })));
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices(localServicesData.map(s => ({ ...s, description: s.shortDesc || s.description })));
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registration link sent to ${email}`);
    setEmail("");
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: t.bg, color: t.fg, overflowX: "hidden" }}>
      <style>{css}</style>

      {/* ══ SERVICES SECTION ══ */}
      <section className="svc-section" style={{ background: t.bg, padding: "180px 0 80px" }}>
        <div className="svc-inner">

          {/* Header */}
          <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: t.secondary, color: t.secondaryFg,
              padding: "6px 16px", borderRadius: 999,
              fontSize: 12, fontWeight: 700, marginBottom: 20,
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
              Our Services
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800,
              color: t.fg, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15,
            }}>
              Specialized Surgical Care
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: t.mutedFg, maxWidth: 560, margin: "0 auto" }}>
              Doxez connects you with expert surgeons and right hospitals for a wide range of surgical procedures.
            </p>
          </Reveal>

          {/* Tiles Grid */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <Loader2 className="animate-spin" style={{ color: "#3b82f6" }} size={40} />
            </div>
          ) : (
            <div className="svc-tiles-grid">
              {services.map((cat, i) => (
                <Reveal key={cat.id} delay={i * 0.05}>
                  <Link to={`/services/${cat.id}`} className="svc-tile">
                    <div className="tile-icon">
                      {cat.iconUrl ? (
                        <img src={cat.iconUrl} alt={cat.title} style={{ width: 32, height: 32, objectFit: "contain" }} />
                      ) : (
                        <Stethoscope size={32} />
                      )}
                    </div>
                    <h3>{cat.title}</h3>
                    <p>{cat.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ WHY DOXEZ ══ */}
      <section className="svc-section" style={{ background: t.muted }}>
        <div className="svc-inner">

          {/* Header */}
          <Reveal style={{ maxWidth: 560, marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: t.secondary, color: t.secondaryFg,
              padding: "6px 16px", borderRadius: 999,
              fontSize: 12, fontWeight: 700, marginBottom: 20,
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
              The Doxez Advantage
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 800,
              color: t.fg, letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.2,
            }}>
              Why facilities choose our staffing solutions
            </h2>
          </Reveal>

          {/* Why cards */}
          <div className="why-grid">
            {whyItems.map((w, i) => (
              <WhyCard key={w.title} item={w} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// import { useState, useEffect, useRef } from "react";
// import phy from '../assets/phy.jpg';
// import nurse from '../assets/model1.webp';
// import pharma from '../assets/smiling-handsome-doctor-showing-medicine-bottle-against-blue-background.jpg';

// /* ─── THEME ─── */
// const t = {
//   bg: "#f6fbff", fg: "#0b2545", border: "#e2eaf3",
//   primary: "#0b76ff", secondary: "#eaf4ff", secondaryFg: "#06345c",
//   muted: "#f1f5f9", mutedFg: "#7a8794", card: "#ffffff", accent: "#00c2a8",
// };

// /* ─── DATA ─── */
// const cards = [
//   {
//     icon: "🩺", title: "Doctors",
//     desc: "Verified doctors and specialized for inpatient care, OPD consultations, emergency support, surgery schedules and department-based clinical needs.",
//     checks: ["Surgeons, Physicians, Anaesthesiologist, emergency Doctors and ICU Doctors", "Hospital, clinic and high-intensity department support"],
//     img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=85",
//     color: "#0b76ff", lightBg: "#eaf4ff",
//   },
//   {
//     icon: "👩‍⚕️", title: "Nurses",
//     desc: "Qualified nursing professionals for monitoring support, ICU assistance and operation theatre coverage across facilities.",
//     checks: ["Short-term, rotational and recurring nurse staffing", "Reliable support for care continuity during peak demand"],
//     img: nurse, color: "#7c3aed", lightBg: "#f5f3ff",
//   },
//   {
//     icon: "💊", title: "Pharmacists",
//     desc: "Hospital and clinic pharmacists for dispensing accuracy, medication workflows, inventory coordination and pharmaceutical support.",
//     checks: ["Facility-ready pharmacy staffing for routine and peak demand", "Support for clinical pharmacy operations and safe medication flow"],
//     img: pharma, color: "#059669", lightBg: "#f0fdf4",
//   },
//   {
//     icon: "🦴", title: "Physiotherapists",
//     desc: "Physiotherapists supporting post-operative recovery, rehabilitation planning, mobility restoration and outpatient therapy services.",
//     checks: ["Inpatient and outpatient rehabilitation support", "Recovery-focused care aligned to patient mobility outcomes"],
//     img: phy, color: "#d97706", lightBg: "#fffbeb",
//   },
//   {
//     icon: "🔬", title: "Allied Healthcare Professionals",
//     desc: "OT Technician, OT Pharmacist, Lab technicians, radiographers and GDA for diagnostic operations.",
//     checks: ["Staffing support for lab, imaging and diagnostic workflows", "Useful for hospitals, specialty centres and high-volume facilities"],
//     img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=600&q=85",
//     color: "#db2777", lightBg: "#fdf2f8",
//   },
// ];

// const whyItems = [
//   { icon: "🛡️", title: "100% Verified Profiles", desc: "Candidate presentation is centred on reviewed credentials and role relevance so facilities can evaluate with more confidence." },
//   { icon: "🎯", title: "Facility-Aware Matching", desc: "Hospitals, clinics and nursing homes each have different staffing pressure points. DoxEZ keeps the service aligned to those differences." },
//   { icon: "⏱️", title: "Rapid Coordination", desc: "The workflow is intentionally direct so your internal team spends less time managing follow-ups and more time maintaining service continuity." },
// ];

// /* ─── SMOOTH REVEAL HOOK ───
//    Sets animation-play-state to "running" only when element enters viewport.
//    The element starts with opacity:0 via CSS class, so there's zero flash.
// */
// function useReveal() {
//   const ref = useRef(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     // If already visible on mount (above the fold), run immediately
//     const rect = el.getBoundingClientRect();
//     if (rect.top < window.innerHeight) {
//       el.style.animationPlayState = "running";
//       return;
//     }

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           el.style.animationPlayState = "running";
//           observer.unobserve(el);
//         }
//       },
//       { threshold: 0.12, rootMargin: "-40px 0px" }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   return ref;
// }

// /* ─── REVEAL COMPONENT ─── */
// function Reveal({ children, delay = 0, style = {}, className = "" }) {
//   const ref = useReveal();
//   return (
//     <div
//       ref={ref}
//       className={`srv-reveal ${className}`}
//       style={{ "--delay": `${delay}s`, ...style }}
//     >
//       {children}
//     </div>
//   );
// }

// /* ─── SERVICE CARD ─── */
// function ServiceCard({ card, delay = 0 }) {
//   const ref = useReveal();
//   return (
//     <div
//       ref={ref}
//       className="srv-reveal srv-card"
//       style={{ "--delay": `${delay}s` }}
//     >
//       <div className="srv-card-inner">
//         {/* Body */}
//         <div style={{ padding: "28px 22px 0" }}>
//           {/* Icon */}
//           <div style={{ marginBottom: 20 }}>
//             <div style={{
//               width: 44, height: 44, borderRadius: 10,
//               background: card.lightBg,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: "1.4rem",
//             }}>
//               {card.icon}
//             </div>
//           </div>

//           {/* Title */}
//           <h3 style={{ fontSize: 20, fontWeight: 700, color: t.fg, marginBottom: 10, lineHeight: 1.25 }}>
//             {card.title}
//           </h3>

//           {/* Desc */}
//           <p style={{ fontSize: 14, lineHeight: 1.7, color: t.mutedFg, marginBottom: 12 }}>
//             {card.desc}
//           </p>

//           {/* Checks */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
//             {card.checks.map(c => (
//               <div key={c} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: t.fg, lineHeight: 1.5 }}>
//                 <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
//                 {c}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Image */}
//         <div className="srv-card-img-wrap">
//           <img src={card.img} alt={card.title} className="srv-card-img" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── WHY CARD ─── */
// function WhyCard({ item, delay = 0 }) {
//   const ref = useReveal();
//   return (
//     <div ref={ref} className="srv-reveal why-card" style={{ "--delay": `${delay}s` }}>
//       <div style={{ fontSize: "2rem", marginBottom: 20 }}>{item.icon}</div>
//       <h3 style={{ fontSize: 19, fontWeight: 700, color: t.fg, marginBottom: 12, lineHeight: 1.3 }}>{item.title}</h3>
//       <p style={{ fontSize: 14, lineHeight: 1.75, color: t.mutedFg }}>{item.desc}</p>
//     </div>
//   );
// }

// /* ─── MAIN EXPORT ─── */
// export default function DoxEZServicesPage() {
//   const css = `
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//     html { scroll-behavior: smooth; }
//     body { font-family: 'Inter', sans-serif; background: #f6fbff; }

//     /* ══════════════════════════════════════
//        CORE REVEAL ANIMATION
//        - starts paused so element is invisible
//        - JS sets play-state to "running" on scroll
//     ══════════════════════════════════════ */
//     @keyframes srvFadeUp {
//       from { opacity: 0; transform: translateY(36px); }
//       to   { opacity: 1; transform: translateY(0);    }
//     }

//     .srv-reveal {
//       opacity: 0;
//       animation-name: srvFadeUp;
//       animation-duration: 0.72s;
//       animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
//       animation-fill-mode: forwards;
//       animation-play-state: paused;
//       animation-delay: var(--delay, 0s);
//     }

//     /* ══════════════════════════════════════
//        SERVICE CARD
//     ══════════════════════════════════════ */
//     .srv-card { height: 100%; }

//     .srv-card-inner {
//       height: 100%;
//       background: #fff;
//       border: 1.5px solid #e2eaf3;
//       border-radius: 16px;
//       overflow: hidden;
//       display: flex;
//       flex-direction: column;
//       box-shadow: 0 2px 12px rgba(0,0,0,0.04);
//       transition:
//         transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
//         box-shadow 0.38s cubic-bezier(0.22, 1, 0.36, 1),
//         border-color 0.3s ease;
//     }
//     .srv-card-inner:hover {
//       transform: translateY(-9px);
//       box-shadow: 0 28px 64px rgba(11, 118, 255, 0.11);
//       border-color: rgba(11, 118, 255, 0.28);
//     }

//     .srv-card-img-wrap {
//       height: 180px;
//       overflow: hidden;
//       margin-top: auto;
//       flex-shrink: 0;
//     }
//     .srv-card-img {
//       width: 100%; height: 100%;
//       object-fit: cover; display: block;
//       transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
//     }
//     .srv-card-inner:hover .srv-card-img {
//       transform: scale(1.08);
//     }

//     /* ══════════════════════════════════════
//        WHY CARD
//     ══════════════════════════════════════ */
//     .why-card {
//       background: #f6fbff;
//       border-radius: 16px;
//       padding: 36px 32px;
//       border: 1.5px solid #e2eaf3;
//       height: 100%;
//       transition:
//         transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
//         box-shadow 0.32s ease,
//         border-color 0.28s ease;
//     }
//     .why-card:hover {
//       transform: translateY(-6px);
//       box-shadow: 0 18px 52px rgba(11,118,255,0.09);
//       border-color: rgba(11,118,255,0.22);
//     }

//     /* ══════════════════════════════════════
//        LAYOUT
//     ══════════════════════════════════════ */
//     .svc-section { padding: 96px 0; }
//     .svc-inner   { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
//     .svc-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
//     .why-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

//     @media (max-width: 1024px) {
//       .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
//       .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
//     }
//     @media (max-width: 768px) {
//       .svc-section { padding: 64px 0 !important; }
//       .svc-inner   { padding: 0 16px !important; }
//       .svc-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
//       .why-grid    { grid-template-columns: 1fr !important; gap: 16px !important; }
//     }
//     @media (max-width: 480px) {
//       .svc-section { padding: 48px 0 !important; }
//       .svc-inner   { padding: 0 12px !important; }
//     }
//   `;

//   return (
//     <div style={{ fontFamily: "Inter, sans-serif", background: t.bg, color: t.fg, overflowX: "hidden" }}>
//       <style>{css}</style>

//       {/* ══ SERVICES SECTION ══ */}
//       <section className="svc-section" style={{ background: t.bg }}>
//         <div className="svc-inner">

//           {/* Header */}
//           <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: 8,
//               background: t.secondary, color: t.secondaryFg,
//               padding: "6px 16px", borderRadius: 999,
//               fontSize: 12, fontWeight: 700, marginBottom: 20,
//               letterSpacing: "0.05em", textTransform: "uppercase",
//             }}>
//               <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
//               What We Offer
//             </div>
//             <h2 style={{
//               fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800,
//               color: t.fg, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15,
//             }}>
//               Healthcare Professionals We Provide
//             </h2>
//             <p style={{ fontSize: 17, lineHeight: 1.75, color: t.mutedFg, maxWidth: 560, margin: "0 auto" }}>
//               Every professional in the DoxEZ network is credential-verified, background-checked and assessed before being listed.
//             </p>
//           </Reveal>

//           {/* Cards */}
//           <div className="svc-grid">
//             {cards.map((card, i) => (
//               <ServiceCard key={card.title} card={card} delay={i * 0.1} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ WHY DOXEZ ══ */}
//       <section className="svc-section" style={{ background: t.muted }}>
//         <div className="svc-inner">

//           {/* Header */}
//           <Reveal style={{ maxWidth: 560, marginBottom: 56 }}>
//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: 8,
//               background: t.secondary, color: t.secondaryFg,
//               padding: "6px 16px", borderRadius: 999,
//               fontSize: 12, fontWeight: 700, marginBottom: 20,
//               letterSpacing: "0.05em", textTransform: "uppercase",
//             }}>
//               <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
//               The DoxEZ Advantage
//             </div>
//             <h2 style={{
//               fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 800,
//               color: t.fg, letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.2,
//             }}>
//               Why facilities choose our staffing solutions
//             </h2>
//           </Reveal>

//           {/* Why cards */}
//           <div className="why-grid">
//             {whyItems.map((w, i) => (
//               <WhyCard key={w.title} item={w} delay={i * 0.12} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
