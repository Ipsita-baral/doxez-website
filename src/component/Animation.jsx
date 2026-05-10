import { useEffect, useRef, useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes bob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes pulse-ring{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.9);opacity:0}}
@keyframes dash-flow{to{stroke-dashoffset:-40}}
@keyframes fade-up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes ping{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:0.8}}
@keyframes check-pop{0%{transform:scale(0) rotate(-20deg);opacity:0}70%{transform:scale(1.2) rotate(4deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes shimmer-line{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
@keyframes float-doc{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(2deg)}}
@keyframes rotate-gear{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

.scene{background:linear-gradient(160deg,#0b1628 0%,#0f2040 60%,#0b1628 100%);min-height:100vh;padding:40px 24px 60px;color:white;font-family:'DM Sans',sans-serif}
.hero-label{display:inline-flex;align-items:center;gap:8px;background:rgba(11,118,255,0.15);border:1px solid rgba(11,118,255,0.3);border-radius:99px;padding:6px 16px;font-size:12px;font-weight:600;color:#7ab8ff;letter-spacing:0.07em;text-transform:uppercase;margin-bottom:20px}
.dot-live{width:7px;height:7px;border-radius:50%;background:#00c2a8;animation:ping 1.4s infinite}
.hero-title{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(1.7rem,4vw,2.8rem);font-weight:800;line-height:1.1;letter-spacing:-0.03em;margin-bottom:12px}
.hero-sub{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.8;max-width:520px;margin-bottom:40px}
.timeline-wrap{position:relative;max-width:900px;margin:0 auto}
.tl-spine{position:absolute;left:50%;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.06);transform:translateX(-50%)}
.tl-spine-fill{position:absolute;left:0;top:0;width:100%;background:linear-gradient(to bottom,#0b76ff,#7c3aed,#00c2a8);transition:height 0.8s ease;border-radius:2px}
.tl-step{display:grid;grid-template-columns:1fr 56px 1fr;align-items:start;margin-bottom:48px;opacity:0;transition:opacity 0.6s ease,transform 0.6s cubic-bezier(0.22,1,0.36,1)}
.tl-step.vis{opacity:1;transform:none!important}
.tl-step:nth-child(odd) .step-card-r{visibility:hidden}
.tl-step:nth-child(even) .step-card-l{visibility:hidden}
.step-card-l,.step-card-r{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:22px 22px 20px;transition:border-color 0.3s,background 0.3s;cursor:default}
.step-card-l:hover,.step-card-r:hover{background:rgba(255,255,255,0.07);border-color:rgba(11,118,255,0.35)}
.step-card-l{text-align:right}.step-card-r{text-align:left}
.step-spacer{display:flex;align-items:flex-start;justify-content:center;padding-top:18px}
.step-node{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;border:3px solid;position:relative;z-index:2;background:#0b1628;flex-shrink:0}
.step-node::after{content:'';position:absolute;inset:-6px;border-radius:50%;animation:pulse-ring 2s ease infinite;border:2px solid currentColor;opacity:0.4}
.step-tag{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;opacity:0.7}
.step-title{font-family:'Bricolage Grotesque',sans-serif;font-size:1rem;font-weight:800;line-height:1.25;margin-bottom:8px}
.step-desc{font-size:13px;line-height:1.75;color:rgba(255,255,255,0.5);margin-bottom:12px}
.step-checks{display:flex;flex-direction:column;gap:5px}
.step-check-l,.step-check-r{display:flex;align-items:center;gap:7px;font-size:12px;color:rgba(255,255,255,0.65)}
.step-check-l{flex-direction:row-reverse;justify-content:flex-start}
.check-dot{width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;flex-shrink:0}
.badge{display:inline-flex;align-items:center;gap:5px;border-radius:8px;padding:4px 10px;font-size:11px;font-weight:700;margin-bottom:10px}
.illus-wrap{margin-bottom:12px;height:72px;display:flex;align-items:center}
.step-card-l .illus-wrap{justify-content:flex-end}
.step-card-r .illus-wrap{justify-content:flex-start}
.char-figure{display:flex;flex-direction:column;align-items:center;gap:3px}
.char-head{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;border:2px solid}
.char-body{width:20px;height:22px;border-radius:8px 8px 4px 4px;display:flex;align-items:center;justify-content:center;font-size:9px}
.char-label{font-size:9px;font-weight:700;opacity:0.6;letter-spacing:0.05em;text-transform:uppercase}
.building{display:flex;flex-direction:column;align-items:center;gap:2px}
.bld-top{width:44px;height:10px;border-radius:4px 4px 0 0;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;letter-spacing:0.05em}
.bld-body{width:52px;height:36px;border-radius:2px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px;padding:4px;position:relative}
.bld-win{background:rgba(255,255,255,0.2);border-radius:1px}
.bld-win.lit{background:rgba(255,220,80,0.6);animation:ping 2s infinite}
.bld-cross{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;font-weight:900;color:rgba(255,80,80,0.9)}
.bld-label{font-size:8px;font-weight:700;opacity:0.55;letter-spacing:0.07em;text-transform:uppercase;margin-top:2px}
.doc-figure{animation:bob 3s ease-in-out infinite}
.doc-figure2{animation:bob2 3.4s ease-in-out infinite}
.search-icon{width:32px;height:32px;border-radius:50%;border:2.5px solid #7c3aed;display:flex;align-items:center;justify-content:center;font-size:14px;animation:bob 2.5s ease-in-out infinite}
.doc-icon{font-size:28px;animation:float-doc 3s ease-in-out infinite}
.timer-badge{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:99px;padding:5px 12px;font-size:11px;font-weight:600;color:rgba(255,255,255,0.55);margin-top:10px}
.final-bar{background:rgba(0,194,168,0.08);border:1px solid rgba(0,194,168,0.25);border-radius:16px;padding:20px 24px;display:flex;align-items:center;gap:16px;max-width:600px;margin:16px auto 0;animation:fade-up 0.8s ease both}
.final-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,194,168,0.15);border:1.5px solid rgba(0,194,168,0.3);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.final-title{font-family:'Bricolage Grotesque',sans-serif;font-size:1rem;font-weight:800;color:white;margin-bottom:3px}
.final-sub{font-size:12.5px;color:rgba(255,255,255,0.45);line-height:1.6}
@media(max-width:640px){
  .tl-spine{left:28px}
  .tl-step{grid-template-columns:28px 1fr!important}
  .step-card-l,.step-card-r{grid-column:2!important;text-align:left!important;visibility:visible!important}
  .step-spacer{grid-column:1!important;padding-top:22px;align-items:flex-start}
  .step-check-l{flex-direction:row!important;justify-content:flex-start!important}
  .illus-wrap{justify-content:flex-start!important}
  .step-node{width:36px;height:36px;font-size:16px}
}
`;

const steps = [
  {
    id: "s1", side: "left", nodeColor: "#0b76ff", nodeIcon: "📋",
    badgeBg: "rgba(11,118,255,0.12)", badgeColor: "#7ab8ff", badgeIcon: "📋", badgeLabel: "Step 01",
    title: "Hospital raises a request",
    desc: "Share the role, shift timing, duration. Phone, email or online — we respond within minutes.",
    checks: ["Role, shift & urgency captured", "One-time or recurring — both", "Hospital, clinic or nursing home"],
    checkBg: "rgba(11,118,255,0.2)", checkColor: "#7ab8ff",
    timer: "⚡ Response in < 5 min",
    illus: (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        <div className="building" style={{ animation: "bob 3.2s ease-in-out infinite" }}>
          <div className="bld-top" style={{ background: "#0b76ff", color: "white" }}>HOSP</div>
          <div className="bld-body" style={{ background: "rgba(11,118,255,0.2)", border: "1.5px solid rgba(11,118,255,0.4)" }}>
            <div className="bld-win lit" /><div className="bld-win" /><div className="bld-win lit" />
            <div className="bld-win" /><div className="bld-win lit" /><div className="bld-win" />
            <div className="bld-cross">+</div>
          </div>
          <div className="bld-label">City Hospital</div>
        </div>
        <div className="char-figure doc-figure" style={{ marginBottom: 8 }}>
          <div className="char-head" style={{ background: "rgba(11,118,255,0.15)", borderColor: "rgba(11,118,255,0.5)" }}>👨‍💼</div>
          <div className="char-body" style={{ background: "rgba(11,118,255,0.2)", border: "1.5px solid rgba(11,118,255,0.4)" }} />
          <div className="char-label">Admin</div>
        </div>
      </div>
    ),
  },
  {
    id: "s2", side: "right", nodeColor: "#3b82f6", nodeIcon: "✅",
    badgeBg: "rgba(59,130,246,0.12)", badgeColor: "#93c5fd", badgeIcon: "✅", badgeLabel: "Step 02",
    title: "Request reviewed & confirmed",
    desc: "Our team reviews and confirms details within 15 minutes. No ambiguity before we search.",
    checks: ["Requirement fully validated", "Urgency level set", "Search initiated immediately"],
    checkBg: "rgba(59,130,246,0.2)", checkColor: "#93c5fd",
    timer: "🕐 Within 15 minutes",
    illus: (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        <div className="char-figure" style={{ animation: "bob 2.8s ease-in-out infinite", marginBottom: 6 }}>
          <div className="char-head" style={{ background: "rgba(59,130,246,0.15)", borderColor: "rgba(59,130,246,0.5)" }}>👩‍💼</div>
          <div className="char-body" style={{ background: "rgba(59,130,246,0.2)", border: "1.5px solid rgba(59,130,246,0.4)" }}>
            <span style={{ color: "rgba(59,130,246,0.9)", fontSize: 9, fontWeight: 900 }}>DX</span>
          </div>
          <div className="char-label">DoxEZ</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "#93c5fd" }}>Request received ✓</div>
          <div style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Reviewing now...</div>
        </div>
      </div>
    ),
  },
  {
    id: "s3", side: "left", nodeColor: "#7c3aed", nodeIcon: "🔍",
    badgeBg: "rgba(124,58,237,0.12)", badgeColor: "#c4b5fd", badgeIcon: "🔍", badgeLabel: "Step 03",
    title: "Team finds the best match",
    desc: "We search the Doxez network — role, proximity, availability, specialization. Every credential verified.",
    checks: ["Proximity-first matching", "Licence & credential verified", "Specialization aligned"],
    checkBg: "rgba(124,58,237,0.2)", checkColor: "#c4b5fd",
    timer: "🔍 ~1–2 hours",
    illus: (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="search-icon">🔍</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="char-head" style={{ width: 22, height: 22, fontSize: 12, background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.5)" }}>👩‍⚕️</div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Dr. Priya — Cardiology</span>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00c2a8", animation: "ping 1.2s infinite" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="char-head" style={{ width: 22, height: 22, fontSize: 12, background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.5)" }}>👨‍⚕️</div>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Dr. Arjun — General</span>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "s4", side: "right", nodeColor: "#d97706", nodeIcon: "📤",
    badgeBg: "rgba(217,119,6,0.12)", badgeColor: "#fbbf24", badgeIcon: "📤", badgeLabel: "Step 04",
    title: "Confirmation & payment link",
    desc: "Doxez sends the professional's full profile and a secure payment link. You review, approve, and pay.",
    checks: ["Full profile & ratings shared", "GST-compliant invoice", "Secure payment gateway"],
    checkBg: "rgba(217,119,6,0.2)", checkColor: "#fbbf24",
    timer: "💳 ~2 hours mark",
    illus: (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="doc-icon">📄</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ background: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#fbbf24" }}>Profile shared</div>
          <div style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Payment link sent 🔗</div>
        </div>
      </div>
    ),
  },
  {
    id: "s5", side: "left", nodeColor: "#db2777", nodeIcon: "💳",
    badgeBg: "rgba(219,39,119,0.12)", badgeColor: "#f9a8d4", badgeIcon: "💳", badgeLabel: "Step 05",
    title: "Hospital completes payment",
    desc: "Payment confirmed through DoxEZ's secure gateway. Booking locked. Provider notified.",
    checks: ["Secure payment gateway", "Booking locked & confirmed", "Provider instantly notified"],
    checkBg: "rgba(219,39,119,0.2)", checkColor: "#f9a8d4",
    timer: "✅ ~3 hours mark",
    illus: (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="char-figure" style={{ animation: "bob2 3s ease-in-out infinite" }}>
          <div className="char-head" style={{ background: "rgba(219,39,119,0.15)", borderColor: "rgba(219,39,119,0.5)" }}>🏥</div>
          <div className="char-body" style={{ background: "rgba(219,39,119,0.15)", border: "1.5px solid rgba(219,39,119,0.3)" }} />
          <div className="char-label">Hospital</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 18 }}>💳</span>
          <div style={{ width: 40, height: 3, borderRadius: 2, background: "rgba(219,39,119,0.5)", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "40%", background: "#db2777", animation: "shimmer-line 1.5s linear infinite", borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 10, color: "rgba(219,39,119,0.7)", fontWeight: 700 }}>Processing</span>
        </div>
        <span style={{ fontSize: 20, animation: "check-pop 0.6s ease 1.5s both" }}>✅</span>
      </div>
    ),
  },
  {
    id: "s6", side: "right", nodeColor: "#00c2a8", nodeIcon: "🚀",
    badgeBg: "rgba(0,194,168,0.12)", badgeColor: "#5eead4", badgeIcon: "🚀", badgeLabel: "Step 06",
    title: "Provider assigned & deployed",
    desc: "Your professional arrives briefed and prepared. DoxEZ supports throughout — arrival to billing to feedback.",
    checks: ["Arrives briefed & prepared", "DoxEZ support throughout", "Digital records & rating"],
    checkBg: "rgba(0,194,168,0.2)", checkColor: "#5eead4",
    timer: "🚀 Under 4 hours total",
    illus: (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
        <div className="char-figure doc-figure2">
          <div className="char-head" style={{ background: "rgba(0,194,168,0.15)", borderColor: "rgba(0,194,168,0.5)" }}>👩‍⚕️</div>
          <div className="char-body" style={{ background: "rgba(0,194,168,0.2)", border: "1.5px solid rgba(0,194,168,0.4)" }}>
            <span style={{ color: "rgba(0,194,168,0.9)", fontSize: 8, fontWeight: 900 }}>MD</span>
          </div>
          <div className="char-label">Doctor</div>
        </div>
        <span style={{ fontSize: 22 }}>→</span>
        <div className="building" style={{ animation: "bob2 3.5s ease-in-out infinite" }}>
          <div className="bld-top" style={{ background: "#00c2a8", color: "#04342C" }}>HOSP</div>
          <div className="bld-body" style={{ background: "rgba(0,194,168,0.15)", border: "1.5px solid rgba(0,194,168,0.4)" }}>
            {[...Array(6)].map((_, i) => <div key={i} className="bld-win lit" style={{ background: "rgba(0,194,168,0.5)" }} />)}
            <div className="bld-cross" style={{ color: "rgba(0,194,168,0.9)" }}>+</div>
          </div>
          <div className="bld-label" style={{ color: "rgba(0,194,168,0.7)" }}>Deployed</div>
        </div>
      </div>
    ),
  },
];

export default function DoxezAnimatedWorkflow() {
  const [visible, setVisible] = useState({});
  const [spineH, setSpineH] = useState(0);
  const refs = useRef({});

  useEffect(() => {
    const check = () => {
      let count = 0;
      steps.forEach((s) => {
        const el = refs.current[s.id];
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.82) {
          setVisible(prev => ({ ...prev, [s.id]: true }));
          count++;
        }
      });
      setSpineH(Math.min(100, (count / steps.length) * 100));
    };
    window.addEventListener("scroll", check, { passive: true });
    setTimeout(check, 400);
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div className="scene">
      <style>{CSS}</style>

      <div style={{ textAlign: "center", marginBottom: 48, animation: "fade-up 0.7s ease both" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div className="hero-label"><span className="dot-live" /> How DoxEZ works</div>
        </div>
        <h1 className="hero-title">
          From request to bedside —<br />
          <span style={{ color: "#0b76ff" }}>in under 4 hours</span>
        </h1>
        <p className="hero-sub" style={{ margin: "0 auto" }}>
          Hospitals raise a need. DoxEZ matches, verifies, and deploys the right healthcare professional — fast, transparent, every time.
        </p>
      </div>

      <div className="timeline-wrap">
        <div className="tl-spine">
          <div className="tl-spine-fill" style={{ height: `${spineH}%` }} />
        </div>

        {steps.map((s) => {
          const isLeft = s.side === "left";
          const Card = (
            <div className={isLeft ? "step-card-l" : "step-card-r"}>
              <div className="illus-wrap">{s.illus}</div>
              <div className="badge" style={{ background: s.badgeBg, color: s.badgeColor }}>
                <span style={{ fontSize: 12 }}>{s.badgeIcon}</span> {s.badgeLabel}
              </div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              <div className="step-checks">
                {s.checks.map((c) => (
                  <div key={c} className={isLeft ? "step-check-l" : "step-check-r"}>
                    <div className="check-dot" style={{ background: s.checkBg, color: s.checkColor }}>✓</div>
                    {c}
                  </div>
                ))}
              </div>
              <div className="timer-badge" style={{ justifyContent: isLeft ? "flex-end" : "flex-start" }}>
                <span className="timer-icon">{s.timer.split(" ")[0]}</span>
                {s.timer.split(" ").slice(1).join(" ")}
              </div>
            </div>
          );

          return (
            <div
              key={s.id}
              ref={(el) => (refs.current[s.id] = el)}
              className={`tl-step${visible[s.id] ? " vis" : ""}`}
              style={{ transform: isLeft ? "translateX(-30px)" : "translateX(30px)" }}
            >
              {isLeft ? Card : <div className="step-card-l" />}
              <div className="step-spacer">
                <div className="step-node" style={{ color: s.nodeColor, borderColor: s.nodeColor }}>
                  {s.nodeIcon}
                </div>
              </div>
              {isLeft ? <div className="step-card-r" /> : Card}
            </div>
          );
        })}
      </div>

      <div className="final-bar">
        <div className="final-icon">🏥</div>
        <div>
          <div className="final-title">Patient care never stops</div>
          <div className="final-sub">
            Every deployment is backed by DoxEZ support — from request to completion. GST-compliant billing. Transparent ratings. Always.
          </div>
        </div>
      </div>
    </div>
  );
}