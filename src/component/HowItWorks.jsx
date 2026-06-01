import { useState, useEffect, useRef } from "react";
import AyushmanImg from "../assets/ayushman.jpeg";
import OldAgeImg from "../assets/oldage.jpeg";
import DoxezWorkflow from "./DoxezWorkFlow";

/* ═══════════════════════════════════════
   SMOOTH REVEAL HOOK
═══════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.style.animationPlayState = "running";
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationPlayState = "running";
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCounter(target, started, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let val = 0;
    const step = target / (duration / 16);
    const iv = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(iv); }
      else setCount(Math.floor(val));
    }, 16);
    return () => clearInterval(iv);
  }, [started, target]);
  return count;
}

/* ═══════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #f4f8fc; font-family: "DM Sans", sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #0b76ff; border-radius: 99px; }

  @keyframes revealUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes revealFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .rv {
    opacity: 0;
    animation-duration: 0.75s;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-fill-mode: forwards;
    animation-play-state: paused;
  }
  .rv-up   { animation-name: revealUp; }
  .rv-left { animation-name: revealLeft; }
  .rv-fade { animation-name: revealFade; }

  /* ── How Doxez Works ── */
  .dw-section { padding: 160px 0 80px; background: #f4f8fc; }
  .dw-inner { max-width: 1140px; margin: 0 auto; padding: 0 40px; }
  .dw-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
  }
  .dw-img-placeholder {
    width: 100%; aspect-ratio: 4/3;
    background: #e8f0f8; border-radius: 20px;
    border: 2px dashed #b3c8e0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 10px; color: #7a9bbd; font-size: 13px;
    font-family: "DM Sans", sans-serif;
  }
  .dw-step-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 16px; border-radius: 14px;
    border: 1.5px solid transparent;
    transition: background 0.2s, border-color 0.2s;
    cursor: default;
  }
  .dw-step-row:hover {
    background: white; border-color: #dde7f0;
    box-shadow: 0 4px 20px rgba(11,118,255,0.07);
  }
  .dw-step-num {
    width: 32px; height: 32px; border-radius: 10px;
    background: #eef4fb; border: 1.5px solid #dde7f0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; color: #0b76ff;
    flex-shrink: 0; margin-top: 1px;
    font-family: "Bricolage Grotesque", sans-serif;
  }

  /* ── Ayushman Bharat ── */
  .ay-section { padding: 80px 0 100px; background: white; }
  .ay-inner { max-width: 1140px; margin: 0 auto; padding: 0 40px; }
  .ay-grid {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 60px;
    align-items: center;
  }
  .ay-card {
    background: #f4f8fc; border: 1.5px solid #dde7f0;
    border-radius: 18px; padding: 20px 22px;
    transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
    cursor: default;
  }
  .ay-card:hover {
    border-color: rgba(11,118,255,0.3);
    box-shadow: 0 12px 40px rgba(11,118,255,0.1);
    transform: translateY(-4px);
  }
  .ay-icon-wrap {
    width: 38px; height: 38px; border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ay-highlight {
    background: #f0fdf4; border: 1.5px solid #bbf7d0;
    border-radius: 16px; padding: 18px 22px;
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
  }

  /* ── FAQ ── */
  .faq-item {
    background: white; border: 1.5px solid #dde7f0;
    border-radius: 16px; overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .faq-item.open {
    border-color: rgba(11,118,255,0.3);
    box-shadow: 0 8px 32px rgba(11,118,255,0.08);
  }
  .faq-trigger {
    padding: 18px 20px; cursor: pointer;
    display: flex; justify-content: space-between;
    align-items: center; gap: 16px; user-select: none;
  }

  @media (max-width: 900px) {
    .dw-grid, .ay-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .faq-cols { grid-template-columns: 1fr !important; gap: 32px !important; }
    .faq-sidebar { position: static !important; top: auto !important; }
    .dw-inner, .ay-inner { padding: 0 20px !important; }
  }
  @media (max-width: 580px) {
    .dw-section { padding: 120px 0 32px !important; }
    .ay-section { padding: 32px 0 40px !important; }
    section[style*="padding: 112px 0"] { padding: 40px 0 !important; }
    section[style*="padding: 80px 0 120px"] { padding: 40px 0 60px !important; }
    .faq-trigger { padding: 16px !important; }
    .cta-card { padding: 32px 20px !important; border-radius: 20px !important; }
    .cta-title { font-size: 1.6rem !important; }
    .cta-text { font-size: 14px !important; margin-bottom: 32px !important; }
    .cta-btn { padding: 12px 16px !important; font-size: 13px !important; width: 100%; justify-content: center; }
  }
`;

/* ═══════════════════════════════════════
   FAQ DATA
═══════════════════════════════════════ */
const faqs = [
  { q: "What is Doxez?", a: "Doxez is India's leading digital platform for end-to-end surgical care facilitation. We connect patients with verified doctors and top-tier hospitals, ensuring a seamless journey from consultation to recovery." },
  { q: "How does Doxez help with Ayushman Bharat?", a: "We help patients find Ayushman-empanelled hospitals, check bed availability, and provide complete support for the treatment process." },
  { q: "Is Doxez a hospital?", a: "No, Doxez is a facilitator platform. We partner with highly skilled surgeons and top-tier hospitals to ensure you get the best medical care at the most affordable prices." },
  { q: "Are there any charges for using Doxez services?", a: "Doxez simplifies surgical care by coordinating between patients, surgeons, and hospitals. Our priority is to ensure you receive high-quality treatment with full coordination support. For specific details regarding our service structure, please connect with our team of experts." },
  { q: "How do I book an appointment?", a: "You can book a free consultation by filling out the form on our homepage or by calling our support line. Our team of experts will then guide you through the entire process." },
  { q: "What surgical specialties does Doxez cover?", a: "We facilitate a wide range of surgeries including Proctology (Piles, Fistula), Urology (Kidney Stones), General Surgery (Hernia, Gallstone), Gynecology, ENT, Orthopedics, and more." },
];

/* ═══════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════ */
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useReveal();
  const cls = direction === "left" ? "rv rv-left" : direction === "fade" ? "rv rv-fade" : "rv rv-up";
  return (
    <div ref={ref} className={cls} style={{ animationDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function StatNum({ value, suffix = "", prefix = "" }) {
  const ref = useReveal();
  const [started, setStarted] = useState(false);
  const n = useCounter(value, started);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <span ref={ref} className="rv rv-up" style={{ display: "inline-block" }}>
      {prefix}{n}{suffix}
    </span>
  );
}

function FAQItem({ q, a, delay, isOpen, onToggle }) {
  return (
    <Reveal delay={delay}>
      <div className={`faq-item${isOpen ? " open" : ""}`}>
        <div className="faq-trigger" onClick={onToggle}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: "#0b1f3a", lineHeight: 1.4 }}>{q}</span>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
            background: isOpen ? "#0b76ff" : "#eef4fb",
            border: `1.5px solid ${isOpen ? "#0b76ff" : "#dde7f0"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: isOpen ? "white" : "#4a6080", fontSize: 18, fontWeight: 300,
            transform: isOpen ? "rotate(45deg)" : "none", transition: "all 0.3s",
          }}>+</div>
        </div>
        {isOpen && (
          <div style={{ margin: "0 28px 22px", paddingTop: 16, borderTop: "1px solid #dde7f0", fontSize: 14.5, lineHeight: 1.85, color: "#4a6080" }}>
            {a}
          </div>
        )}
      </div>
    </Reveal>
  );
}

function SectionBadge({ label, color = "#0b76ff", bg = "#ddeeff" }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      background: bg, color, fontSize: 11.5, fontWeight: 700,
      padding: "5px 14px", borderRadius: 99,
      letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {label}
    </div>
  );
}

function ImgPlaceholder({ label = "Insert relevant image here" }) {
  return (
    <div className="dw-img-placeholder">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7a9bbd" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   HOW DOXEZ WORKS SECTION
═══════════════════════════════════════ */
const HOW_STEPS = [
  { n: "01", title: "Book free consultation", desc: "Speak with a Doxez advisor at no cost to understand your options and eligibility." },
  { n: "02", title: "Diagnosis & treatment plan", desc: "Get a clear diagnosis and a personalised treatment roadmap from verified specialists." },
  { n: "03", title: "Hospital selection & Payment check", desc: "We identify the right empanelled hospital and verify your insurance or self-pay options." },
  { n: "04", title: "Admission & surgery coordination", desc: "Doxez handles bed allocation, paperwork, and surgical team scheduling end to end." },
  { n: "05", title: "Recovery & follow-up support", desc: "Post-discharge check-ins, physiotherapy referrals, and ongoing care coordination." },
];

function HowDoxezWorksSection() {
  return (
    <section className="dw-section">
      <div className="dw-inner">
        <div className="dw-grid">
          {/* LEFT: sticky header + image */}
          <Reveal direction="left">
            <div style={{ position: "sticky", top: 80 }}>
              <SectionBadge label="How it works" />
              <h2 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 800, color: "#0b1f3a",
                letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16,
              }}>
                How <span style={{ color: "#0b76ff" }}>DOXEZ</span> works
              </h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "#4a6080", marginBottom: 28 }}>
                From your first message to full recovery — we coordinate every step so you never navigate the healthcare system alone.
              </p>
              <img
                src={OldAgeImg}
                alt="How Doxez Works"
                style={{ width: "100%", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              />
            </div>
          </Reveal>

          {/* RIGHT: steps list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 8 }}>
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="dw-step-row">
                  <div className="dw-step-num">{s.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14.5, fontWeight: 700, color: "#0b1f3a", marginBottom: 4 }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
                {i < HOW_STEPS.length - 1 && (
                  <div style={{ width: 2, height: 18, background: "linear-gradient(to bottom,#dde7f0,transparent)", marginLeft: 30 }} />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   AYUSHMAN BHARAT SECTION
═══════════════════════════════════════ */
const AYUSHMAN_CARDS = [
  {
    title: "Find nearby Ayushman hospitals",
    desc: "Locate verified empanelled hospitals close to you with real-time availability checks.",
    iconBg: "#dcfce7",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Check bed & ICU availability",
    desc: "Real-time bed status including ICU, general ward, and surgical slots at empanelled hospitals.",
    iconBg: "#dbeafe",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    title: "Eligibility & documentation support",
    desc: "We verify your Ayushman card, prepare required documents, and submit claims on your behalf.",
    iconBg: "#fef9c3",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a16207" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
      </svg>
    ),
  },
];

function AyushmanSection() {
  return (
    <section className="ay-section">
      <div className="ay-inner">
        {/* HEADER: Placed outside the grid so the image only centers against the boxes */}
        <Reveal direction="up" style={{ maxWidth: 600, marginBottom: 35 }}>
          <SectionBadge label="Ayushman Bharat" color="#166534" bg="#dcfce7" />
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            fontWeight: 800, color: "#0b1f3a",
            letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 12,
          }}>
            Complete surgical support under Ayushman Bharat
          </h2>
          <p style={{ fontSize: 15.5, fontWeight: 700, color: "#0b1f3a", marginBottom: 6 }}>
            Find. Verify. Get Admitted. Get Treated.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4a6080", marginBottom: 0 }}>
            We handle it all — so you focus entirely on getting better.
          </p>
        </Reveal>

        <div className="ay-grid">
          {/* LEFT: boxes */}
          <Reveal direction="left">

            <div className="ay-highlight" style={{ padding: "14px 20px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 800, color: "#14532d" }}>
                  Faster admission coordination
                </div>
                <div style={{ fontSize: 12, color: "#166534", marginTop: 2, lineHeight: 1.4 }}>
                  Priority processing for Ayushman beneficiaries at empanelled hospitals
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {AYUSHMAN_CARDS.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="ay-card" style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div className="ay-icon-wrap" style={{
                        background: c.iconBg,
                        width: 34, height: 34, borderRadius: 10
                      }}>
                        {c.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13.5, fontWeight: 700, color: "#0b1f3a", marginBottom: 3 }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>{c.desc}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* RIGHT: image */}
          <Reveal delay={0.15} style={{ alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 0 }}>
            <img
              src={AyushmanImg}
              alt="Ayushman Bharat Support"
              style={{ width: "100%", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SpecialtiesSection() {
  return (
    <section style={{ padding: "100px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Reveal>
            <SectionBadge label="Specialties" color="#0b76ff" bg="#ddeeff" />
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800, color: "#0b1f3a",
              letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16
            }}>
              Advanced Surgical Specialties
            </h2>
            <p style={{ fontSize: 16, color: "#4a6080", maxWidth: 600, margin: "0 auto" }}>
              Expert care across a range of specialized surgical and clinical departments.
            </p>
          </Reveal>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24
        }}>
          {SPECIALTIES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div style={{
                background: "white", padding: "32px", borderRadius: 24,
                border: "1.5px solid #dde7f0", transition: "all 0.3s",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 18, fontWeight: 800, color: "#0b1f3a", marginBottom: 10
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function HowItWorksPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f4f8fc", color: "#0b1f3a", overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ── DOXEZ WORKFLOW ANIMATION ── */}
      {/* <DoxezWorkflow /> */}

      {/* ── HOW DOXEZ WORKS ── */}
      <HowDoxezWorksSection />

      {/* ── AYUSHMAN BHARAT SUPPORT ── */}
      <AyushmanSection />

      {/* ── ADVANCED SPECIALTIES ── */}
      {/* <SpecialtiesSection /> */}

      {/* ── FAQ ── */}
      <section style={{ padding: "112px 0", background: "#f4f8fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div className="faq-cols" style={{ display: "grid", gridTemplateColumns: "0.88fr 1.12fr", gap: 80, alignItems: "start" }}>
            <Reveal direction="left">
              <div style={{ position: "sticky", top: 48 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#ddeeff", color: "#0b76ff", fontSize: 11.5, fontWeight: 700, padding: "5px 14px", borderRadius: 99, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20 }}>
                  FAQs
                </div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: "#0b1f3a", letterSpacing: "-0.03em", lineHeight: 1.12, marginBottom: 16 }}>
                  Questions we hear most often
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "#4a6080", marginBottom: 32 }}>
                  Everything you need to know about Doxez surgical facilitation services — for patients and families alike.
                </p>
                <div style={{ background: "#0b1f3a", borderRadius: 20, padding: "26px 28px" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Still have questions?</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "1rem", fontWeight: 800, color: "white", marginBottom: 6 }}>📞 +91-9692949500</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "1rem", fontWeight: 800, color: "white" }}>✉️ support@doxez.in</div>
                </div>
              </div>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {faqs.map((f, i) => (
                <FAQItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  delay={i * 0.06}
                  isOpen={activeFaq === i}
                  onToggle={() => setActiveFaq(activeFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0 120px", background: "#eef4fb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <Reveal>
            <div className="cta-card" style={{ background: "#0b1f3a", borderRadius: 28, padding: "80px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(11,118,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 className="cta-title" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 660, margin: "0 auto 16px" }}>
                  Ready to experience a smarter way to handle your surgery?
                </h2>
                <p className="cta-text" style={{ fontSize: 17, color: "rgba(255,255,255,0.52)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.9 }}>
                  Reach out to our team. We will guide you through the process and connect you with the right specialists — fast.
                </p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  {[
                    { icon: "📞", text: "+91-9692949500", bg: "white", color: "#0b1f3a" },
                    { icon: "✉️", text: "support@doxez.in", bg: "rgba(255,255,255,0.07)", color: "white", border: "1.5px solid rgba(255,255,255,0.14)" },
                    { icon: "📍", text: "Bhubaneswar, Odisha", bg: "rgba(255,255,255,0.07)", color: "white", border: "1.5px solid rgba(255,255,255,0.14)" },
                  ].map(item => (
                    <div key={item.text} className="cta-btn" style={{ background: item.bg, border: item.border || "none", borderRadius: 14, padding: "15px 26px", fontSize: 15, fontWeight: 700, color: item.color, cursor: "default", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {item.icon} {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}