import { useState, useRef, useEffect } from "react";
import { MapPin, Clock, Briefcase, ChevronRight, Users, Rocket, Heart, Zap } from "lucide-react";

/* ── Reveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Data ── */
const VALUES = [
  { icon: Rocket, color: "#0b76ff", bg: "#eaf4ff", title: "Move Fast", desc: "Healthcare doesn't wait — and neither do we. We ship solutions rapidly to solve real problems." },
  { icon: Heart, color: "#ef4444", bg: "#fee2e2", title: "Patient First", desc: "Every line of code, every partnership, every hire — it all comes back to better patient outcomes." },
  { icon: Users, color: "#7c3aed", bg: "#f5f3ff", title: "Team Over Ego", desc: "We win together. Transparency, ownership, and mutual respect drive everything we do." },
  { icon: Zap, color: "#d97706", bg: "#fffbeb", title: "Build With Purpose", desc: "We're solving a real healthcare crisis. Every team member's work has a tangible impact on lives." },
];

const PERKS = [
  { icon: "💰", title: "Competitive Salary", desc: "Market-leading compensation with performance bonuses." },
  { icon: "🏥", title: "Health Insurance", desc: "Comprehensive medical cover for you and your family." },
  { icon: "🏠", title: "Remote Flexibility", desc: "Hybrid and remote options for eligible roles." },
  { icon: "📚", title: "Learning Budget", desc: "Annual allowance for courses, conferences, and certifications." },
  { icon: "🚀", title: "Fast Growth Path", desc: "Early-stage startup = massive career acceleration." },
  { icon: "🎯", title: "Equity Options", desc: "Ownership in the company through ESOPs for key roles." },
];

const OPENINGS = [
  {
    title: "Full Stack Developer",
    dept: "Engineering",
    location: "Bhubaneswar / Remote",
    type: "Full-time",
    exp: "2-4 years",
    desc: "Build and scale the core Doxez platform — matching engine, real-time dashboards, and mobile apps.",
    tags: ["React", "Node.js", "MongoDB", "React Native"],
  },
  {
    title: "Business Development Manager",
    dept: "Growth",
    location: "Bhubaneswar",
    type: "Full-time",
    exp: "3-5 years",
    desc: "Drive hospital partnerships and expand Doxez's facility network across Odisha and beyond.",
    tags: ["B2B Sales", "Healthcare", "Partnerships"],
  },
  {
    title: "Operations Associate",
    dept: "Operations",
    location: "Bhubaneswar",
    type: "Full-time",
    exp: "1-3 years",
    desc: "Coordinate daily staffing operations — scheduling, professional onboarding, and facility support.",
    tags: ["Ops Management", "Staffing", "Communication"],
  },
  {
    title: "UI/UX Designer",
    dept: "Design",
    location: "Remote",
    type: "Full-time",
    exp: "2-4 years",
    desc: "Design intuitive interfaces for hospitals and healthcare professionals. Own the product design end-to-end.",
    tags: ["Figma", "Product Design", "Healthcare UX"],
  },
  {
    title: "Medical Recruitment Specialist",
    dept: "Talent",
    location: "Bhubaneswar",
    type: "Full-time",
    exp: "1-2 years",
    desc: "Source, screen, and verify healthcare professionals for the Doxez network. Build relationships with doctors and nurses.",
    tags: ["Recruitment", "Healthcare", "Verification"],
  },
  {
    title: "Marketing & Content Lead",
    dept: "Marketing",
    location: "Bhubaneswar / Remote",
    type: "Full-time",
    exp: "2-4 years",
    desc: "Own Doxez's brand voice across channels — social media, blog, email, and partnerships marketing.",
    tags: ["Content Strategy", "SEO", "Social Media"],
  },
];

const DEPT_COLORS = {
  Engineering: "#0b76ff",
  Growth: "#059669",
  Operations: "#d97706",
  Design: "#7c3aed",
  Talent: "#db2777",
  Marketing: "#0891b2",
};

export default function Careers() {
  const [filterDept, setFilterDept] = useState("All");
  const departments = ["All", ...new Set(OPENINGS.map(o => o.dept))];
  const filtered = filterDept === "All" ? OPENINGS : OPENINGS.filter(o => o.dept === filterDept);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#212529", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .cr-hero {
          background: linear-gradient(135deg, #0b2540 0%, #1e4b8f 60%, #2563a8 100%);
          padding: 80px 24px 100px;
          position: relative;
          overflow: hidden;
        }
        .cr-hero::before {
          content: "";
          position: absolute;
          top: -100px; right: -100px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: rgba(255,136,0,0.1);
          filter: blur(60px);
        }
        .cr-hero::after {
          content: "";
          position: absolute;
          bottom: -60px; left: -60px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(0,175,239,0.1);
          filter: blur(50px);
        }
        .cr-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cr-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }
        .cr-val-card {
          background: #fff;
          border: 1.5px solid #e8ecf0;
          border-radius: 16px;
          padding: 32px 24px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .cr-val-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(30,75,143,0.1);
          border-color: rgba(30,75,143,0.2);
        }

        .cr-perks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .cr-perk-card {
          background: #fff;
          border: 1px solid #e8ecf0;
          border-radius: 14px;
          padding: 28px 24px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .cr-perk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(30,75,143,0.08);
        }

        .cr-job-card {
          background: #fff;
          border: 1.5px solid #e8ecf0;
          border-radius: 16px;
          padding: 28px 32px;
          margin-bottom: 16px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          cursor: pointer;
        }
        .cr-job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(30,75,143,0.1);
          border-color: rgba(30,75,143,0.2);
        }

        .cr-tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          background: var(--dx-bg-alt, #f4f7fb);
          color: var(--dx-text-muted, #5f6368);
          margin-right: 8px;
          margin-top: 8px;
        }

        .cr-dept-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .cr-dept-btn {
          padding: 8px 20px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 600;
          border: 1.5px solid #e8ecf0;
          background: #fff;
          color: var(--dx-text-muted, #5f6368);
          transition: all 0.2s;
        }
        .cr-dept-btn:hover {
          border-color: var(--dx-primary, #1e4b8f);
          color: var(--dx-primary, #1e4b8f);
        }
        .cr-dept-btn.active {
          background: var(--dx-primary, #1e4b8f);
          color: #fff;
          border-color: var(--dx-primary, #1e4b8f);
        }

        .cr-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 24px;
          background: var(--dx-primary, #1e4b8f);
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.2s;
          margin-top: 16px;
        }
        .cr-apply-btn:hover { background: #163c73; }

        .cr-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--dx-text-muted, #5f6368);
        }

        @media (max-width: 992px) {
          .cr-values-grid { grid-template-columns: repeat(2, 1fr); }
          .cr-perks-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .cr-values-grid { grid-template-columns: 1fr; }
          .cr-perks-grid { grid-template-columns: 1fr; }
          .cr-hero { padding: 48px 20px 60px; }
          .cr-section { padding: 40px 20px !important; }
          section[style*="padding: 80px 24px"] { padding: 40px 20px !important; }
        }
      `}</style>

      {/* ═══ Hero ═══ */}
      <section className="cr-hero">
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,136,0,0.15)", border: "1px solid rgba(255,136,0,0.25)",
              color: "#fbbf24", padding: "6px 18px", borderRadius: 99,
              fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
              marginBottom: 24,
            }}>
              We're Hiring
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
              Build the Future of<br/>
              <span style={{ color: "var(--dx-accent, #ff8800)" }}>Healthcare Staffing</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.7 }}>
              Join a mission-driven team solving India's healthcare workforce crisis. Your work here will directly impact how hospitals deliver care.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#openings" style={{
              display: "inline-block", background: "var(--dx-accent, #ff8800)", color: "#fff",
              padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 16,
            }}>
              View Open Roles
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ Our Values ═══ */}
      <section className="cr-section">
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>What Drives Us</h2>
          <p style={{ fontSize: 16, color: "#5f6368", maxWidth: 480, margin: "0 auto" }}>
            At Doxez, culture isn't a poster on the wall — it's how we make decisions every day.
          </p>
        </Reveal>
        <div className="cr-values-grid">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="cr-val-card">
                  <div style={{
                    width: 50, height: 50, borderRadius: 14, background: v.bg,
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  }}>
                    <Icon size={24} color={v.color} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "#5f6368", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══ Life at Doxez ═══ */}
      <section style={{ padding: "80px 24px", background: "var(--dx-bg-alt, #f4f7fb)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <Reveal>
              <div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#d1fae5", color: "#065f46", padding: "6px 16px", borderRadius: 99,
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  marginBottom: 20,
                }}>
                  Life at Doxez
                </div>
                <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20, lineHeight: 1.2 }}>
                  Where healthcare<br/>
                  <span style={{ color: "var(--dx-secondary, #00afef)" }}>meets innovation</span>
                </h2>
                <p style={{ fontSize: 15, color: "#5f6368", lineHeight: 1.75, marginBottom: 24 }}>
                  We're an IIT-Bhubaneswar incubated startup backed by Startup India and Startup Odisha.
                  Our team is small, fast-moving, and deeply committed to making healthcare staffing seamless.
                </p>
                {[
                  "Work on real problems that affect patient care daily",
                  "Direct access to founders and leadership",
                  "Flat hierarchy — your ideas ship fast",
                  "Build 0→1 products used by hospitals across India",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, background: "#d1fae5",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <span style={{ color: "#059669", fontSize: 13, fontWeight: 800 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, color: "#333", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{
                background: "linear-gradient(135deg, #0b2540, #1e4b8f)",
                borderRadius: 24, padding: 48, textAlign: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(0,175,239,0.15)", filter: "blur(30px)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🏥</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    {[
                      { val: "IIT-B", label: "Incubated" },
                      { val: "2024", label: "Founded" },
                      { val: "15+", label: "Team Size" },
                      { val: "∞", label: "Ambition" },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{s.val}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.04em" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Perks ═══ */}
      <section className="cr-section">
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Perks & Benefits</h2>
          <p style={{ fontSize: 16, color: "#5f6368", maxWidth: 460, margin: "0 auto" }}>
            We take care of the team so the team can take care of healthcare.
          </p>
        </Reveal>
        <div className="cr-perks-grid">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="cr-perk-card">
                <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.title}</h4>
                <p style={{ fontSize: 13.5, color: "#5f6368", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ Open Positions ═══ */}
      <section id="openings" style={{ padding: "80px 24px", background: "var(--dx-bg-alt, #f4f7fb)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Open Positions</h2>
            <p style={{ fontSize: 16, color: "#5f6368" }}>
              Find the role that excites you. {OPENINGS.length} positions open.
            </p>
          </Reveal>

          {/* Filters */}
          <div className="cr-dept-filters">
            {departments.map(d => (
              <button
                key={d}
                className={`cr-dept-btn ${filterDept === d ? "active" : ""}`}
                onClick={() => setFilterDept(d)}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          {filtered.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.08}>
              <div className="cr-job-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 6,
                      fontSize: 11, fontWeight: 700, color: DEPT_COLORS[job.dept] || "#666",
                      background: `${DEPT_COLORS[job.dept] || "#666"}14`,
                      marginBottom: 8,
                    }}>
                      {job.dept}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{job.title}</h3>
                    <p style={{ fontSize: 14, color: "#5f6368", lineHeight: 1.65, marginBottom: 12, maxWidth: 560 }}>{job.desc}</p>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 8 }}>
                      <span className="cr-meta"><MapPin size={14} /> {job.location}</span>
                      <span className="cr-meta"><Clock size={14} /> {job.type}</span>
                      <span className="cr-meta"><Briefcase size={14} /> {job.exp}</span>
                    </div>
                    <div>
                      {job.tags.map(t => <span key={t} className="cr-tag">{t}</span>)}
                    </div>
                  </div>
                  <button className="cr-apply-btn" onClick={() => window.open(`mailto:careers@doxez.in?subject=Application: ${job.title}`, "_blank")}>
                    Apply <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "#999" }}>
              <p style={{ fontSize: 16 }}>No openings in this department right now. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "80px 24px" }}>
        <Reveal>
          <div style={{
            maxWidth: 800, margin: "0 auto", textAlign: "center",
            background: "linear-gradient(135deg, #0b2540 0%, #1e4b8f 100%)",
            borderRadius: 24, padding: "64px 40px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,136,0,0.12)", filter: "blur(40px)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💼</div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
                Don't see your role?
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.7 }}>
                We're always looking for exceptional people. Send us your profile and we'll reach out when the right opening comes up.
              </p>
              <a href="mailto:careers@doxez.in?subject=General Application" style={{
                display: "inline-block", background: "var(--dx-accent, #ff8800)", color: "#fff",
                padding: "15px 36px", borderRadius: 8, fontWeight: 700, fontSize: 16,
              }}>
                Send Your Resume →
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
