import { useState, useEffect, useRef } from "react";

const ROLES = [
  { id: "doctor", label: "Doctor", icon: "🩺", color: "#0b76ff", bg: "#eff6ff" },
  { id: "nurse", label: "Nurse", icon: "👩‍⚕️", color: "#7c3aed", bg: "#f5f3ff" },
  { id: "pharmacist", label: "Pharmacist", icon: "💊", color: "#0891b2", bg: "#ecfeff" },
  { id: "physiotherapist", label: "Physiotherapist", icon: "🦴", color: "#059669", bg: "#f0fdf4" },
  { id: "lab_tech", label: "Lab Technician", icon: "🔬", color: "#d97706", bg: "#fffbeb" },
  { id: "ot_tech", label: "OT Technician", icon: "⚕️", color: "#e11d48", bg: "#fff1f2" },
  { id: "gda", label: "GDA / Attender", icon: "🏥", color: "#64748b", bg: "#f8fafc" },
];

export default function GetStartedModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState(null);
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("enter");
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Enter animation (double-RAF trick) ── */
  useEffect(() => {
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setPhase("idle"));
      return r2;
    });
    document.body.style.overflow = "";
    return () => {
      cancelAnimationFrame(r1);
      document.body.style.overflow = "";
    };
  }, []);

  /* ── Escape key ── */
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const handleClose = () => {
    setPhase("exit");
    setTimeout(onClose, 380);
  };

  const goTo = (s) => {
    setStep(s);
    setTimeout(() => contentRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };
  const ErrMsg = ({ k }) => errors[k]
    ? <div style={{ color: "#ef4444", fontSize: 11.5, marginTop: 4, paddingLeft: 2 }}>{errors[k]}</div>
    : null;

  const validatePro = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone?.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid 10-digit phone required";
    if (!form.city?.trim()) e.city = "Address is required";
    return e;
  };
  const validateHospital = () => {
    const e = {};
    if (!form.hospitalName?.trim()) e.hospitalName = "Hospital name is required";
    if (!form.contactPerson?.trim()) e.contactPerson = "Contact person required";
    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone?.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid 10-digit phone required";
    if (!form.city?.trim()) e.city = "Address is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = userType === "professional" ? validatePro() : validateHospital();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "c8761307-fd22-426c-9f82-e188b287e8b4",
          subject: "New DOXEZ Request",
          type: userType, role: role?.label || "",
          name: form.name || "", email: form.email || "",
          phone: form.phone || "", city: form.city || "",
          hospitalName: form.hospitalName || "",
          contactPerson: form.contactPerson || "",
        }),
      });
      const result = await res.json();
      if (result.success) { setForm({}); setErrors({}); setRole(null); goTo(4); }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const inp = (extra = {}) => ({
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    background: "#f8fafc", outline: "none", color: "#0b1f3a",
    transition: "border-color 0.18s, box-shadow 0.18s, background 0.18s",
    ...extra,
  });

  const Lbl = ({ children }) => (
    <label style={{
      fontSize: 11.5, fontWeight: 700, color: "#64748b", display: "block",
      marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em"
    }}>
      {children}
    </label>
  );

  const Bar = ({ filled, total, color = "#0b76ff" }) => (
    <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 99,
          background: i < filled ? color : "#e8eef5",
          transition: "background 0.4s ease"
        }} />
      ))}
    </div>
  );

  const Back = ({ to }) => (
    <button onClick={() => goTo(to)} style={{
      background: "none", border: "none", cursor: "pointer", fontSize: 13,
      fontWeight: 600, color: "#94a3b8", marginBottom: 22,
      display: "inline-flex", alignItems: "center", gap: 6, padding: 0,
      fontFamily: "'DM Sans', sans-serif", transition: "color 0.18s",
    }}
      onMouseEnter={e => e.currentTarget.style.color = "#0b1f3a"}
      onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </button>
  );

  const SubmitBtn = ({ color = "#0b76ff", children }) => (
    <button onClick={handleSubmit} disabled={loading} style={{
      width: "100%", padding: "14px", borderRadius: 12, marginTop: 6,
      background: loading ? "#94a3b8" : color,
      color: "white", border: "none",
      fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700,
      cursor: loading ? "wait" : "pointer",
      boxShadow: loading ? "none" : `0 6px 20px ${color}44`,
      transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
      letterSpacing: "0.01em",
    }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${color}55`; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : `0 6px 20px ${color}44`; }}
      onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
    >
      {loading ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
            style={{ animation: "gs-spin 0.8s linear infinite" }}>
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Submitting…
        </span>
      ) : children}
    </button>
  );

  /* ── Compute modal transform based on phase + device ── */
  const isEnter = phase === "enter";
  const isExit = phase === "exit";
  const isIdle = phase === "idle";

  /* Mobile: slide from bottom. Desktop: scale+fade from center */
  const mobileTransform = isEnter ? "translateY(110%)"
    : isExit ? "translateY(100%)"
      : "translateY(0)";

  const desktopTransform = isEnter ? "translateY(40px) scale(0.96)"
    : isExit ? "translateY(20px) scale(0.98)"
      : "translateY(0) scale(1)";

  const sharedTransition = isEnter
    ? "none"
    : isExit
      ? "opacity 0.32s ease-in, transform 0.34s ease-in"
      : isMobile
        /* Mobile spring — slides up with slight overshoot */
        ? "opacity 0.45s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)"
        /* Desktop spring */
        : "opacity 0.42s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        @keyframes gs-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gs-step {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes gs-pop {
          0%   { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          65%  { transform: scale(1.18) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes gs-item {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .gs-input:focus {
          border-color: #0b76ff !important;
          background: #fff !important;
          box-shadow: 0 0 0 3.5px rgba(11,118,255,0.12) !important;
          outline: none;
        }

        /* ── Drag handle pulse on mobile ── */
        .gs-handle {
          width: 40px; height: 4px;
          background: #e2e8f0; border-radius: 99px;
          margin: 0 auto 20px;
          transition: background 0.2s;
        }

        /* ── Scrollbar ── */
        .gs-scroll::-webkit-scrollbar { width: 3px; }
        .gs-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

        /* ── Role card ── */
        .gs-role {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 15px; border-radius: 13px;
          border: 1.5px solid #edf2f7; background: #fff; cursor: pointer;
          transition: border-color 0.2s, background 0.2s,
                      box-shadow 0.2s, transform 0.26s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        .gs-role:hover  { transform: translateY(-2px) scale(1.01); }
        .gs-role:active { transform: scale(0.97); }

        /* ── Type card ── */
        .gs-type {
          border: 1.5px solid #e8eef5; border-radius: 20px;
          padding: 26px 20px; text-align: center; cursor: pointer;
          background: #fafcff;
          transition: border-color 0.25s, background 0.25s,
                      transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
          will-change: transform;
        }
        .gs-type:hover  { transform: translateY(-5px); }
        .gs-type:active { transform: scale(0.97); }
        .gs-type.pro:hover  { border-color: #0b76ff; background: #f0f7ff; box-shadow: 0 16px 40px rgba(11,118,255,0.13); }
        .gs-type.hosp:hover { border-color: #059669; background: #f0fdf4; box-shadow: 0 16px 40px rgba(5,150,105,0.13); }

        /* ── Close btn ── */
        .gs-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%; border: none;
          background: #f1f5f9; cursor: pointer; font-size: 14px;
          color: #94a3b8; display: flex; align-items: center; justify-content: center;
          transition: background 0.18s, color 0.18s, transform 0.18s;
        }
        .gs-close:hover { background: #e2e8f0; color: #0b1f3a; transform: scale(1.1) rotate(90deg); }

        /* ── Mobile sheet overrides ── */
        @media (max-width: 640px) {
          .gs-modal {
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            max-height: 92vh !important;
            border-top-left-radius: 28px !important;
            border-top-right-radius: 28px !important;
          }
          .gs-type { padding: 20px 14px !important; border-radius: 16px !important; }
          .gs-type .type-icon { width: 52px !important; height: 52px !important; font-size: 24px !important; }
        }
      `}</style>

      {/* ══ BACKDROP ══ */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: isMobile ? "rgba(5,15,35,0.5)" : "rgba(5,15,35,0.65)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: isEnter ? 0 : isExit ? 0 : 1,
          transition: isEnter ? "none" : "opacity 0.35s ease 0.05s",
        }}
      />

      {/* ══ POSITIONER ══ */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9991,
        /* Mobile: anchor to bottom. Desktop: center */
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? "0" : "16px",
        pointerEvents: "none",
      }}>

        {/* ══ MODAL ══ */}
        <div
          ref={contentRef}
          className="gs-scroll gs-modal"
          onClick={e => e.stopPropagation()}
          style={{
            pointerEvents: "auto",
            background: "#ffffff",
            borderRadius: 24,
            width: "100%",
            maxWidth: isMobile ? "100%" : 500,
            maxHeight: isMobile ? "92vh" : "90vh",
            overflowY: "auto",
            position: "relative",
            willChange: "transform, opacity",

            /* Shadow only when idle */
            boxShadow: isIdle
              ? isMobile
                ? "0 -8px 40px rgba(0,0,0,0.18), 0 -2px 8px rgba(0,0,0,0.08)"
                : "0 32px 80px rgba(0,0,0,0.28)"
              : "none",

            opacity: isEnter || isExit ? 0 : 1,
            transform: isMobile ? mobileTransform : desktopTransform,
            transition: sharedTransition,
          }}
        >
          {/* ── Mobile drag handle (decorative) ── */}
          {isMobile && (
            <div style={{ paddingTop: 14, paddingBottom: 0, textAlign: "center" }}>
              <div className="gs-handle" />
            </div>
          )}

          {/* ── Close button ── */}
          <button className="gs-close" onClick={handleClose}>✕</button>

          {/* ── Step content — keyed for slide-in ── */}
          <div
            key={step}
            style={{
              animation: step > 0
                ? "gs-step 0.30s cubic-bezier(0.22,1,0.36,1) both"
                : "none",
            }}
          >

            {/* ════ STEP 0 ════ */}
            {step === 0 && (
              <div style={{ padding: isMobile ? "20px 22px 40px" : "44px 28px 36px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#f0f7ff", color: "#0b76ff", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 99, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid #ddeeff" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0b76ff", boxShadow: "0 0 0 3px #0b76ff30" }} />
                    Doxez · Get Started
                  </span>
                </div>

                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: isMobile ? 22 : 26, fontWeight: 800, color: "#0b1f3a", marginBottom: 10, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
                    How can we help you?
                  </h2>
                  <p style={{ fontSize: 13.5, color: "#7a8794", lineHeight: 1.75, maxWidth: 320, margin: "0 auto" }}>
                    India's first platform connecting verified healthcare professionals with hospitals — fast, transparent, automated.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                  <div className="gs-type pro" onClick={() => { setUserType("professional"); goTo(1); }} style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                    <div className="type-icon" style={{ width: 58, height: 58, borderRadius: 16, background: "linear-gradient(135deg,#ddeeff,#bfdbfe)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>🩺</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13.5, fontWeight: 700, color: "#0b1f3a", marginBottom: 7 }}>Healthcare Professional</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, marginBottom: 14 }}>Doctor, Nurse, Pharmacist & more</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0b76ff", marginTop: "auto", }}>Join Network →</div>
                  </div>

                  <div className="gs-type hosp" onClick={() => { setUserType("hospital"); goTo(3); }} style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                    <div className="type-icon" style={{ width: 58, height: 58, borderRadius: 16, background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>🏥</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13.5, fontWeight: 700, color: "#0b1f3a", marginBottom: 7 }}>Hospital / Facility</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, marginBottom: 14 }}>Hire verified professionals fast</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#059669", marginTop: "auto", }}>Request Staff →</div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid #f0f4f8" }}>
                  {["✓ 500+ Verified Pros", "⚡ 4 hrs", "🔒 Checked"].map(txt => (
                    <span key={txt} style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 600 }}>{txt}</span>
                  ))}
                </div>
              </div>
            )}

            {/* ════ STEP 1 — Role ════ */}
            {step === 1 && (
              <div style={{ padding: isMobile ? "20px 22px 40px" : "36px 28px 32px" }}>
                <Back to={0} />
                <Bar filled={1} total={3} />
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "#0b1f3a", marginBottom: 5 }}>Select Your Role</h2>
                <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>Choose the role that best describes your profession.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ROLES.map((r, i) => (
                    <div key={r.id} className="gs-role"
                      onClick={() => { setRole(r); goTo(2); }}
                      style={{
                        borderColor: role?.id === r.id ? r.color : "#edf2f7",
                        background: role?.id === r.id ? r.bg : "#fff",
                        boxShadow: role?.id === r.id ? `0 4px 16px ${r.color}22` : "0 1px 3px rgba(0,0,0,0.04)",
                        /* Stagger in */
                        animation: `gs-step 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s both`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.background = r.bg; e.currentTarget.style.boxShadow = `0 6px 20px ${r.color}20`; }}
                      onMouseLeave={e => { if (role?.id !== r.id) { e.currentTarget.style.borderColor = "#edf2f7"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; } }}
                    >
                      <div style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `1px solid ${r.color}22` }}>
                        {r.icon}
                      </div>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#1e293b", flex: 1 }}>{r.label}</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={r.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ════ STEP 2 — Pro form ════ */}
            {step === 2 && role && (
              <div style={{ padding: isMobile ? "20px 22px 48px" : "36px 28px 32px" }}>
                <Back to={1} />
                <Bar filled={3} total={3} color={role.color} />

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "13px 15px", background: role.bg, borderRadius: 13, border: `1px solid ${role.color}22` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 2px 8px ${role.color}20` }}>
                    {role.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, color: "#0b1f3a" }}>Join as {role.label}</div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>Fill in your details to get verified and placed</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div><Lbl>Full Name *</Lbl><input className="gs-input" style={inp()} placeholder="Dr. Arjun Mehta" value={form.name || ""} onChange={e => set("name", e.target.value)} /><ErrMsg k="name" /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div><Lbl>Email *</Lbl><input className="gs-input" style={inp()} type="email" placeholder="you@email.com" value={form.email || ""} onChange={e => set("email", e.target.value)} /><ErrMsg k="email" /></div>
                    <div><Lbl>Phone *</Lbl><input className="gs-input" style={inp()} placeholder="9XXXXXXXXX" value={form.phone || ""} onChange={e => set("phone", e.target.value)} /><ErrMsg k="phone" /></div>
                  </div>
                  <div><Lbl>Address *</Lbl><input className="gs-input" style={inp()} placeholder="Street, City, State" value={form.city || ""} onChange={e => set("city", e.target.value)} /><ErrMsg k="city" /></div>
                  <SubmitBtn color={role.color}>Submit & Get Verified →</SubmitBtn>
                  <p style={{ textAlign: "center", fontSize: 11.5, color: "#b0bec8", margin: 0 }}>🔒 Your details are secure and used only for placement</p>
                </div>
              </div>
            )}

            {/* ════ STEP 3 — Hospital form ════ */}
            {step === 3 && (
              <div style={{ padding: isMobile ? "20px 22px 48px" : "36px 28px 32px" }}>
                <Back to={0} />
                <Bar filled={1} total={2} color="#059669" />

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "13px 15px", background: "#f0fdf4", borderRadius: 13, border: "1px solid #05966922" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 2px 8px #05966920" }}>🏥</div>
                  <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 800, color: "#0b1f3a" }}>Request a Professional</div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>We'll match and deploy within 4 hours</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div><Lbl>Hospital / Facility Name *</Lbl><input className="gs-input" style={inp()} placeholder="Apollo Hospital, Delhi" value={form.hospitalName || ""} onChange={e => set("hospitalName", e.target.value)} /><ErrMsg k="hospitalName" /></div>
                  <div><Lbl>Contact Person *</Lbl><input className="gs-input" style={inp()} placeholder="Dr. Sharma / HR Manager" value={form.contactPerson || ""} onChange={e => set("contactPerson", e.target.value)} /><ErrMsg k="contactPerson" /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div><Lbl>Email *</Lbl><input className="gs-input" style={inp()} type="email" placeholder="hospital@email.com" value={form.email || ""} onChange={e => set("email", e.target.value)} /><ErrMsg k="email" /></div>
                    <div><Lbl>Phone *</Lbl><input className="gs-input" style={inp()} placeholder="9XXXXXXXXX" value={form.phone || ""} onChange={e => set("phone", e.target.value)} /><ErrMsg k="phone" /></div>
                  </div>
                  <div><Lbl>Address *</Lbl><input className="gs-input" style={inp()} placeholder="Street, City, State" value={form.city || ""} onChange={e => set("city", e.target.value)} /><ErrMsg k="city" /></div>
                  <SubmitBtn color="#059669">Submit Request →</SubmitBtn>
                  <p style={{ textAlign: "center", fontSize: 11.5, color: "#b0bec8", margin: 0 }}>🔒 Details only shared with verified professionals</p>
                </div>
              </div>
            )}

            {/* ════ STEP 4 — Success ════ */}
            {step === 4 && (
              <div style={{ padding: isMobile ? "36px 22px 52px" : "52px 28px 44px", textAlign: "center" }}>
                <div style={{ width: 84, height: 84, borderRadius: "50%", background: "linear-gradient(135deg,#ddeeff,#bfdbfe)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 38, animation: "gs-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}>✅</div>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#0b1f3a", marginBottom: 10 }}>Request Submitted!</h2>
                <p style={{ fontSize: 14.5, color: "#4a6080", lineHeight: 1.8, maxWidth: 320, margin: "0 auto 24px" }}>
                  Thank you for reaching out to <strong>DoxEZ</strong>. Our team will review your details and <strong>contact you shortly</strong>.
                </p>

                <div style={{ background: "#f8fbff", border: "1.5px solid #ddeeff", borderRadius: 14, padding: "18px 20px", marginBottom: 24, textAlign: "left" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#0b76ff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>What happens next</div>
                  {[
                    "Our team will call you within 2–4 hours",
                    "Your credentials will be verified by our experts",
                    userType === "professional"
                      ? "You'll be listed in the DoxEZ network & matched with facilities"
                      : "We'll match you with the best available professional",
                  ].map((text, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 2 ? 10 : 0, animation: `gs-item 0.4s ease ${i * 0.1 + 0.2}s both`, opacity: 0 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#0b76ff", color: "white", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                      <span style={{ fontSize: 13, color: "#3d5168", lineHeight: 1.6 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 12.5, color: "#94a3b8", marginBottom: 20 }}>
                  📞 Urgent? <strong style={{ color: "#0b1f3a" }}>+91-9692949500</strong>
                </div>

                <button onClick={handleClose} style={{ padding: "13px 36px", borderRadius: 12, background: "#0b76ff", color: "white", border: "none", fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 20px rgba(11,118,255,0.35)", transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(11,118,255,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(11,118,255,0.35)"; }}
                >Done ✓</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}