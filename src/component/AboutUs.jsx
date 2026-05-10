import { useState, useRef, useEffect } from "react";
import { Users, ShieldCheck, BriefcaseMedical, HeartPulse, Star, Building2, Clock, CheckCircle, CheckCircle2, FileText, Zap } from "lucide-react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');`;

/* ════════════════════════════════════════
   SMOOTH REVEAL HOOK
   — writes animationPlayState directly,
     zero React re-renders, pure GPU
════════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already in viewport on mount
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
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

/* ════════════════════════════════════════
   REVEAL COMPONENT
════════════════════════════════════════ */
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useReveal();
  const animName =
    direction === "left" ? "rvLeft" :
      direction === "right" ? "rvRight" :
        direction === "fade" ? "rvFade" : "rvUp";
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        animationName: animName,
        animationDuration: "0.72s",
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        animationFillMode: "forwards",
        animationPlayState: "paused",
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════
   COUNTER
════════════════════════════════════════ */
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const num = parseFloat(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let val = 0;
          const step = (num / 1600) * 16;
          const iv = setInterval(() => {
            val += step;
            if (val >= num) { setCount(num); clearInterval(iv); }
            else setCount(Math.floor(val));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const stats = [
  { icon: Users, value: "10000", suffix: "+", label: "Verified Professionals", color: "#0ea5e9" },
  { icon: Building2, value: "500", suffix: "+", label: "Partner Facilities", color: "#10b981" },
  { icon: Clock, value: "4", suffix: " hrs", label: "Avg. Fill Time", color: "#f59e0b" },
  { icon: Star, value: "99", suffix: "%", label: "Satisfaction Rate", color: "#8b5cf6" },
];

const whatWeDo = [
  { icon: Users, color: "#0ea5e9", bg: "#e0f2fe", title: "Connect Healthcare Facilities", desc: "We connect hospitals, clinics and nursing homes with skilled healthcare professionals quickly and efficiently, ensuring facilities always have access to the right talent." },
  { icon: ShieldCheck, color: "#10b981", bg: "#d1fae5", title: "Verified Medical Professionals", desc: "Every professional on the DOXEZ platform undergoes thorough verification — credential checks, background screening and skill assessment before listing." },
  { icon: BriefcaseMedical, color: "#f59e0b", bg: "#fef3c7", title: "Flexible Staffing Solutions", desc: "From emergency cover tonight to long-term workforce planning, DOXEZ provides flexible solutions tailored for every healthcare organisation's needs." },
  { icon: HeartPulse, color: "#ef4444", bg: "#fee2e2", title: "Support Better Patient Care", desc: "By connecting facilities with skilled professionals faster, we free up hospital teams to focus entirely on delivering exceptional patient outcomes." },
];

const whyList = [
  "Verified doctors, nurses and healthcare staff",
  "Sub-4-hour placement for urgent cover",
  "OTP-based time tracking — zero billing disputes",
  "Transparent, auto-calculated invoicing",
  "Dedicated account manager for every facility",
  "Trusted by 500+ healthcare organisations",
];

const values = [
  { icon: "🛡️", title: "Trust First", desc: "Every decision starts with: will this make patients safer and facilities more confident?" },
  { icon: "⚡", title: "Speed Matters", desc: "In healthcare, delay costs lives. Our systems are built to respond in minutes, not days." },
  { icon: "🤝", title: "Fair for Everyone", desc: "Hospitals get great professionals. Doctors get fair pay. No hidden markups, ever." },
  { icon: "📊", title: "Data Transparency", desc: "Full audit trails, verified timesheets, and transparent invoicing — always." },
];

const missionItems = [
  "Built by healthcare insiders",
  "Technology-first, human-centred",
  "Operational in under 4 hours",
  "Zero billing disputes with OTP tracking",
];

/* ════════════════════════════════════════
   HOVER CARD — pure CSS hover
════════════════════════════════════════ */
function HoverCard({ children, hoverShadow = "0 20px 60px rgba(14,165,233,0.1)", style = {}, className = "" }) {
  return (
    <div
      className={`hov-card ${className}`}
      style={{
        transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s",
        ...style,
      }}
    >
      {children}
      <style>{`.hov-card:hover { transform: translateY(-7px); box-shadow: ${hoverShadow}; }`}</style>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function AboutUs() {

  const CSS = `
    ${FONTS}
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; }

    /* ── KEYFRAMES ── */
    @keyframes rvUp    { from{opacity:0;transform:translateY(38px)} to{opacity:1;transform:translateY(0)} }
    @keyframes rvLeft  { from{opacity:0;transform:translateX(-38px)} to{opacity:1;transform:translateX(0)} }
    @keyframes rvRight { from{opacity:0;transform:translateX(38px)} to{opacity:1;transform:translateX(0)} }
    @keyframes rvFade  { from{opacity:0} to{opacity:1} }
    @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes imgFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes checkIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }

    /* ── LAYOUT ── */
    .au-section { padding: 80px 24px 100px; }
    .au-inner   { max-width: 1100px; margin: 0 auto; }
    .grid-2     { display: grid; grid-template-columns: 1fr 1fr; }
    .grid-4     { display: grid; }
    .stats-row  { display: grid; grid-template-columns: repeat(4,1fr); }

    /* ── MISSION ── */
    .mission-box {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
      border-radius: 28px; padding: 72px 60px;
      position: relative; overflow: hidden;
      display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
    }

    /* ── CTA ── */
    .cta-box {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
      border-radius: 28px; padding: 72px 48px; text-align: center;
      position: relative; overflow: hidden;
    }
    .cta-box h2 { font-size: 40px; }

    /* ── WHY ── */
    .why-img {
      width: 100%; border-radius: 22px; object-fit: cover; height: 480px;
      animation: imgFloat 4s ease-in-out infinite;
      box-shadow: 0 24px 64px rgba(0,0,0,0.12);
    }

    /* ── CHECK ITEMS ── */
    .check-item {
      display: flex; align-items: center; gap: 12;
      opacity: 0;
      animation-name: checkIn;
      animation-duration: 0.55s;
      animation-timing-function: cubic-bezier(0.22,1,0.36,1);
      animation-fill-mode: forwards;
      animation-play-state: paused;
    }

    /* ── SECTION BADGE ── */
    .section-badge {
      display: inline-flex; align-items: center; gap: 8;
      padding: 6px 16px; border-radius: 999px;
      font-size: 12px; font-weight: 700;
      letter-spacing: 0.07em; text-transform: uppercase;
      margin-bottom: 20px;
    }

    /* ════ 900px ════ */
    @media (max-width: 900px) {
      .grid-2       { grid-template-columns: 1fr !important; gap: 40px !important; }
      .grid-4       { grid-template-columns: repeat(2,1fr) !important; gap: 16px !important; }
      .stats-row    { grid-template-columns: repeat(2,1fr) !important; }
      .mission-box  { grid-template-columns: 1fr !important; gap: 32px !important; padding: 48px 36px !important; }
      .cta-box      { padding: 52px 32px !important; border-radius: 22px !important; }
      .cta-box h2   { font-size: 30px !important; }
      .why-img      { height: 340px !important; }
      .au-section   { padding: 60px 20px 72px !important; }
      .what-card    { flex-direction: column !important; }
      .values-title { font-size: 32px !important; }
      .wwd-title    { font-size: 32px !important; }
    }

    /* ════ 580px ════ */
    @media (max-width: 580px) {
      .grid-4       { grid-template-columns: 1fr !important; }
      .stats-row    { grid-template-columns: 1fr 1fr !important; }
      .au-section   { padding: 32px 16px 40px !important; }
      .mission-box  { padding: 32px 20px !important; border-radius: 20px !important; }
      .mission-box h2 { font-size: 24px !important; }
      .cta-box      { padding: 32px 18px !important; border-radius: 18px !important; }
      .cta-box h2   { font-size: 24px !important; }
      .why-img      { height: 260px !important; }
      .why-h2       { font-size: 26px !important; }
      .wwd-title    { font-size: 28px !important; }
      .values-title { font-size: 28px !important; }
    }
  `;

  /* ── Check items with scroll trigger ── */
  function CheckList({ items }) {
    const containerRef = useRef(null);
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const items = container.querySelectorAll(".check-item");
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            items.forEach(el => { el.style.animationPlayState = "running"; });
            obs.unobserve(container);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(container);
      return () => obs.disconnect();
    }, []);

    return (
      <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="check-item"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <CheckCircle size={15} color="#10b981" />
            </div>
            <span style={{ fontSize: 15, color: "#334155", fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8fafc", color: "#0f172a", overflowX: "hidden" }}>

        {/* ══ WHAT WE DO ══ */}
        <section className="au-section" style={{ background: "#fff" }}>
          <div className="au-inner">

            <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-badge" style={{ background: "#e0f2fe", color: "#0284c7" }}>
                What We Do
              </div>
              <h2 className="wwd-title" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 42, fontWeight: 800, color: "#0f172a", marginBottom: 14, lineHeight: 1.1 }}>
                Four pillars of the<br />
                <span style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Doxez platform
                </span>
              </h2>
            </Reveal>

            <div className="grid-4" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
              {whatWeDo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <HoverCard
                      hoverShadow={`0 20px 60px ${item.color}18`}
                      className="what-card"
                      style={{ background: "#f8fafc", borderRadius: 20, padding: "36px 32px", border: "1px solid #f1f5f9", display: "flex", gap: 22, alignItems: "flex-start", height: "100%" }}
                    >
                      <div style={{ width: 58, height: 58, borderRadius: 16, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.3s", className: "what-icon" }}>
                        <Icon size={26} color={item.color} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>{item.title}</h3>
                        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#64748b" }}>{item.desc}</p>
                      </div>
                    </HoverCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ MISSION ══ */}
        <section className="au-section" style={{ background: "#f8fafc" }}>
          <div className="au-inner">
            <Reveal>
              <div className="mission-box">
                <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #0ea5e915 0%, transparent 70%)" }} />

                {/* Left */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="section-badge" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.25)", color: "#7dd3fc" }}>
                    Our Mission
                  </div>
                  <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
                    Healthcare facilities should never go short-staffed.
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.58)", lineHeight: 1.8 }}>
                    Doxez was built to solve a real crisis — hospitals struggling to find verified professionals at short notice. We created a trusted network and the technology to connect them instantly, so patient care is never compromised.
                  </p>
                </div>

                {/* Right checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative", zIndex: 1 }}>
                  {missionItems.map((item, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <CheckCircle size={18} color="#10b981" />
                        <span style={{ color: "rgba(255,255,255,0.82)", fontSize: 15, fontWeight: 500 }}>{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="au-section" style={{ background: "#f8fafc" }}>
          <div className="au-inner">
            <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-badge" style={{ background: "#fef3c7", color: "#92400e" }}>
                Our Values
              </div>
              <h2 className="values-title" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 42, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>
                What we stand for
              </h2>
            </Reveal>

            <div className="grid-4" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 0.09}>
                  <HoverCard
                    hoverShadow="0 20px 48px rgba(14,165,233,0.1)"
                    className="val-card"
                    style={{ background: "#fff", borderRadius: 18, padding: "32px 24px", border: "1px solid #f1f5f9", textAlign: "center", height: "100%" }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>{v.title}</h3>
                    <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{v.desc}</p>
                  </HoverCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY DOXEZ ══ */}
        {/* <section className="au-section" style={{ background: "#fff" }}>
          <div className="au-inner">
            <div className="grid-2" style={{ gap: 80, alignItems: "center" }}>

            </div>
          </div>
        </section> */}

        {/* ── 7. ABOUT DOXEZ PATIENT CARE (REDESIGN) ── */}


        {/* ══ CTA ══ */}
        <section className="au-section" style={{ background: "#fff" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Reveal>
              <div className="cta-box">
                <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #0ea5e920 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, #8b5cf620 0%, transparent 70%)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 48, marginBottom: 20, animation: "float 3s ease-in-out infinite" }}>🏥</div>
                  <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.15 }}>
                    Empowering Healthcare with<br />the Right Professionals
                  </h2>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
                    Whether you're a hospital needing cover tonight or a healthcare professional seeking flexible work — Doxez connects you in minutes.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}