// import { useState, useEffect, useRef } from "react";

// const steps = [
//   {
//     id: 0,
//     tag: "Step 01",
//     title: "Book Free Consultation",
//     desc: "Talk to a DOXEZ care advisor instantly — no fees, no paperwork to start.",
//     tagStyle: { background: "#E1F5EE", color: "#085041" },
//     scene: (
//       <svg width="340" height="180" viewBox="0 0 340 180">
//         <rect x="90" y="20" width="160" height="110" rx="12" fill="#E1F5EE" stroke="#5DCAA5" strokeWidth="0.5" />
//         <rect x="105" y="35" width="130" height="18" rx="4" fill="#9FE1CB" opacity="0.6" />
//         <text x="170" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#085041">Free Consultation</text>
//         <rect x="105" y="60" width="80" height="8" rx="3" fill="#ccc" opacity="0.7" />
//         <rect x="105" y="73" width="110" height="8" rx="3" fill="#ccc" opacity="0.5" />
//         <rect x="105" y="86" width="60" height="8" rx="3" fill="#ccc" opacity="0.5" />
//         <rect x="155" y="105" width="70" height="18" rx="5" fill="#1D9E75" />
//         <text x="190" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="#E1F5EE">Book Now</text>
//         <circle cx="66" cy="75" r="18" fill="#5DCAA5" style={{ animation: "float1 3s ease-in-out infinite" }} />
//         <text x="66" y="80" textAnchor="middle" fontSize="15" fill="#085041">👤</text>
//         <line x1="84" y1="75" x2="90" y2="75" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="3,2" />
//         <circle cx="66" cy="75" r="18" fill="none" stroke="#1D9E75" strokeWidth="1">
//           <animate attributeName="r" from="18" to="32" dur="2s" repeatCount="indefinite" />
//           <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
//         </circle>
//         <rect x="196" y="58" width="50" height="28" rx="6" fill="#085041" style={{ animation: "float2 2.5s ease-in-out infinite" }} />
//         <text x="221" y="70" textAnchor="middle" fontSize="8" fill="#9FE1CB">Chat</text>
//         <text x="221" y="81" textAnchor="middle" fontSize="8" fill="#9FE1CB">with us</text>
//         <polygon points="196,74 190,70 190,78" fill="#085041" />
//         <rect x="115" y="144" width="110" height="14" rx="4" fill="#E1F5EE" stroke="#9FE1CB" strokeWidth="0.5" />
//         <text x="170" y="154" textAnchor="middle" fontSize="9" fill="#085041">100% Free · No commitment</text>
//       </svg>
//     ),
//   },
//   {
//     id: 1,
//     tag: "Step 02",
//     title: "Diagnosis & Treatment Plan",
//     desc: "Specialists review your case and build a clear, personalised treatment roadmap.",
//     tagStyle: { background: "#E6F1FB", color: "#0C447C" },
//     scene: (
//       <svg width="340" height="180" viewBox="0 0 340 180">
//         <rect x="20" y="25" width="90" height="120" rx="8" fill="#E6F1FB" stroke="#85B7EB" strokeWidth="0.5" />
//         <circle cx="65" cy="55" r="16" fill="#378ADD" opacity="0.15" />
//         <circle cx="65" cy="55" r="10" fill="#378ADD" />
//         <line x1="65" y1="47" x2="65" y2="63" stroke="white" strokeWidth="1.5" />
//         <line x1="57" y1="55" x2="73" y2="55" stroke="white" strokeWidth="1.5" />
//         <text x="65" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0C447C">Dr. Sharma</text>
//         <text x="65" y="93" textAnchor="middle" fontSize="8" fill="#185FA5">Specialist</text>
//         <rect x="27" y="100" width="76" height="5" rx="2" fill="#B5D4F4" />
//         <rect x="27" y="110" width="60" height="5" rx="2" fill="#B5D4F4" opacity="0.6" />
//         <rect x="27" y="120" width="70" height="5" rx="2" fill="#B5D4F4" opacity="0.4" />
//         <line x1="110" y1="85" x2="140" y2="85" stroke="#378ADD" strokeWidth="1" strokeDasharray="4,3" />
//         <polygon points="140,82 147,85 140,88" fill="#378ADD" />
//         <rect x="150" y="30" width="170" height="130" rx="10" fill="#E6F1FB" stroke="#85B7EB" strokeWidth="0.5" />
//         <rect x="160" y="42" width="150" height="12" rx="3" fill="#378ADD" />
//         <text x="235" y="52" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Treatment Plan</text>
//         <rect x="160" y="60" width="16" height="16" rx="3" fill="#1D9E75" />
//         <text x="168" y="72" textAnchor="middle" fontSize="9" fill="white">✓</text>
//         <rect x="182" y="64" width="80" height="7" rx="2" fill="#B5D4F4" />
//         <rect x="160" y="82" width="16" height="16" rx="3" fill="#1D9E75" />
//         <text x="168" y="94" textAnchor="middle" fontSize="9" fill="white">✓</text>
//         <rect x="182" y="86" width="95" height="7" rx="2" fill="#B5D4F4" />
//         <rect x="160" y="104" width="16" height="16" rx="3" fill="#EF9F27" />
//         <text x="168" y="116" textAnchor="middle" fontSize="9" fill="white">→</text>
//         <rect x="182" y="108" width="70" height="7" rx="2" fill="#FAC775" />
//         <rect x="160" y="126" width="150" height="22" rx="5" fill="#185FA5" />
//         <text x="235" y="141" textAnchor="middle" fontSize="10" fontWeight="600" fill="white">Personalised roadmap ready</text>
//       </svg>
//     ),
//   },
//   {
//     id: 2,
//     tag: "Step 03",
//     title: "Hospital Selection & Ayushman Check",
//     desc: "We find the nearest empanelled hospital and instantly verify your Ayushman coverage.",
//     tagStyle: { background: "#EEEDFE", color: "#3C3489" },
//     scene: (
//       <svg width="340" height="180" viewBox="0 0 340 180">
//         <rect x="30" y="30" width="120" height="110" rx="8" fill="#EEEDFE" stroke="#AFA9EC" strokeWidth="0.5" />
//         <rect x="75" y="30" width="30" height="18" rx="3" fill="#7F77DD" />
//         <rect x="45" y="48" width="90" height="60" rx="4" fill="#CECBF6" opacity="0.5" />
//         <rect x="50" y="52" width="35" height="25" rx="3" fill="white" stroke="#AFA9EC" strokeWidth="0.5" />
//         <rect x="90" y="52" width="35" height="25" rx="3" fill="white" stroke="#AFA9EC" strokeWidth="0.5" />
//         <rect x="50" y="82" width="35" height="22" rx="3" fill="white" stroke="#AFA9EC" strokeWidth="0.5" />
//         <rect x="90" y="82" width="35" height="22" rx="3" fill="white" stroke="#AFA9EC" strokeWidth="0.5" />
//         <rect x="65" y="108" width="50" height="26" rx="3" fill="#7F77DD" />
//         <text x="90" y="125" textAnchor="middle" fontSize="9" fill="white">Entrance</text>
//         <text x="90" y="154" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3C3489">City Hospital</text>
//         <rect x="190" y="25" width="120" height="70" rx="8" fill="#E1F5EE" stroke="#5DCAA5" strokeWidth="0.5" />
//         <text x="250" y="44" textAnchor="middle" fontSize="10" fontWeight="600" fill="#085041">Ayushman Bharat</text>
//         <rect x="200" y="50" width="100" height="14" rx="3" fill="#1D9E75" />
//         <text x="250" y="61" textAnchor="middle" fontSize="8" fill="white">Eligibility Check</text>
//         <circle cx="215" cy="80" r="8" fill="#1D9E75">
//           <animate attributeName="r" values="8;11;8" dur="1.5s" repeatCount="indefinite" />
//         </circle>
//         <text x="215" y="84" textAnchor="middle" fontSize="9" fill="white">✓</text>
//         <text x="232" y="82" textAnchor="start" fontSize="9" fill="#085041">Approved!</text>
//         <rect x="190" y="105" width="120" height="48" rx="8" fill="#FAEEDA" stroke="#FAC775" strokeWidth="0.5" />
//         <text x="250" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#633806">Best Match Found</text>
//         <text x="250" y="135" textAnchor="middle" fontSize="8" fill="#854F0B">AIIMS affiliated</text>
//         <text x="250" y="146" textAnchor="middle" fontSize="8" fill="#854F0B">3.8 km from you</text>
//         <line x1="150" y1="85" x2="190" y2="85" stroke="#7F77DD" strokeWidth="1" strokeDasharray="3,3" />
//         <polygon points="190,82 196,85 190,88" fill="#7F77DD" />
//       </svg>
//     ),
//   },
//   {
//     id: 3,
//     tag: "Step 04",
//     title: "Admission & Surgery Coordination",
//     desc: "Our coordinators handle all logistics — paperwork, scheduling, and real-time updates.",
//     tagStyle: { background: "#FAEEDA", color: "#633806" },
//     scene: (
//       <svg width="340" height="180" viewBox="0 0 340 180">
//         <rect x="20" y="20" width="100" height="140" rx="8" fill="#FAEEDA" stroke="#FAC775" strokeWidth="0.5" />
//         <rect x="30" y="32" width="80" height="10" rx="3" fill="#EF9F27" opacity="0.6" />
//         <rect x="30" y="48" width="35" height="8" rx="2" fill="#FAC775" />
//         <rect x="70" y="48" width="35" height="8" rx="2" fill="#FAC775" opacity="0.5" />
//         <rect x="30" y="62" width="20" height="20" rx="3" fill="#EF9F27" />
//         <rect x="55" y="62" width="20" height="20" rx="3" fill="#EF9F27" opacity="0.6" />
//         <rect x="80" y="62" width="20" height="20" rx="3" fill="#1D9E75" />
//         <text x="90" y="76" textAnchor="middle" fontSize="9" fill="white">✓</text>
//         <text x="70" y="100" textAnchor="middle" fontSize="8" fill="#633806">Admission date</text>
//         <text x="70" y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill="#412402">Apr 22</text>
//         <rect x="30" y="120" width="80" height="18" rx="4" fill="#BA7517" />
//         <text x="70" y="133" textAnchor="middle" fontSize="9" fill="white">Confirmed ✓</text>
//         <rect x="145" y="15" width="175" height="155" rx="10" fill="#E6F1FB" stroke="#85B7EB" strokeWidth="0.5" />
//         <rect x="155" y="25" width="155" height="30" rx="6" fill="#185FA5" />
//         <text x="232" y="38" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">DOXEZ Care Coordinator</text>
//         <text x="232" y="50" textAnchor="middle" fontSize="8" fill="#85B7EB">On ground support activated</text>
//         <rect x="155" y="62" width="115" height="20" rx="5" fill="#B5D4F4" opacity="0.5" />
//         <text x="212" y="76" textAnchor="middle" fontSize="8" fill="#0C447C">Pre-op paperwork filed</text>
//         <circle cx="280" cy="72" r="7" fill="#1D9E75" />
//         <text x="280" y="76" textAnchor="middle" fontSize="8" fill="white">✓</text>
//         <rect x="155" y="88" width="115" height="20" rx="5" fill="#B5D4F4" opacity="0.5" />
//         <text x="212" y="102" textAnchor="middle" fontSize="8" fill="#0C447C">Surgeon briefed</text>
//         <circle cx="280" cy="98" r="7" fill="#1D9E75" />
//         <text x="280" y="102" textAnchor="middle" fontSize="8" fill="white">✓</text>
//         <rect x="155" y="114" width="115" height="20" rx="5" fill="#B5D4F4" opacity="0.5" />
//         <text x="212" y="128" textAnchor="middle" fontSize="8" fill="#0C447C">Family notified</text>
//         <circle cx="280" cy="124" r="7" fill="#1D9E75" />
//         <text x="280" y="128" textAnchor="middle" fontSize="8" fill="white">✓</text>
//         <rect x="155" y="140" width="155" height="22" rx="5" fill="#0C447C" />
//         <text x="232" y="155" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">Surgery scheduled — all set</text>
//       </svg>
//     ),
//   },
//   {
//     id: 4,
//     tag: "Step 05",
//     title: "Recovery & Follow-up Support",
//     desc: "We monitor your recovery daily — reminders, check-ins, and care until you're fully well.",
//     tagStyle: { background: "#FBEAF0", color: "#72243E" },
//     scene: (
//       <svg width="340" height="180" viewBox="0 0 340 180">
//         <rect x="15" y="30" width="90" height="120" rx="8" fill="#FBEAF0" stroke="#ED93B1" strokeWidth="0.5" />
//         <rect x="30" y="44" width="60" height="8" rx="3" fill="#ED93B1" opacity="0.6" />
//         <rect x="30" y="57" width="50" height="5" rx="2" fill="#F4C0D1" />
//         <rect x="30" y="66" width="55" height="5" rx="2" fill="#F4C0D1" opacity="0.7" />
//         <rect x="30" y="75" width="45" height="5" rx="2" fill="#F4C0D1" opacity="0.5" />
//         <rect x="30" y="90" width="60" height="35" rx="5" fill="white" stroke="#ED93B1" strokeWidth="0.5" />
//         <text x="60" y="103" textAnchor="middle" fontSize="8" fill="#993556">Recovery</text>
//         <rect x="33" y="108" width="10" height="12" rx="2" fill="#D4537E" />
//         <rect x="47" y="104" width="10" height="16" rx="2" fill="#D4537E" opacity="0.8" />
//         <rect x="61" y="100" width="10" height="20" rx="2" fill="#1D9E75" />
//         <rect x="75" y="96" width="10" height="24" rx="2" fill="#1D9E75" opacity="0.8" />
//         <text x="60" y="142" textAnchor="middle" fontSize="9" fontWeight="500" fill="#993556">Progress tracked</text>
//         <rect x="125" y="20" width="200" height="150" rx="10" fill="#E1F5EE" stroke="#5DCAA5" strokeWidth="0.5" />
//         <circle cx="170" cy="58" r="20" fill="#1D9E75" opacity="0.15" />
//         <circle cx="170" cy="58" r="13" fill="#1D9E75">
//           <animate attributeName="r" values="13;15;13" dur="1.5s" repeatCount="indefinite" />
//         </circle>
//         <text x="170" y="63" textAnchor="middle" fontSize="14" fill="white">♥</text>
//         <text x="200" y="48" textAnchor="start" fontSize="9" fontWeight="600" fill="#085041">Rajan, 54</text>
//         <text x="200" y="60" textAnchor="start" fontSize="8" fill="#0F6E56">Post-op Day 3</text>
//         <text x="200" y="72" textAnchor="start" fontSize="8" fill="#1D9E75">Recovering well ✓</text>
//         <line x1="135" y1="88" x2="315" y2="88" stroke="#9FE1CB" strokeWidth="0.5" />
//         <rect x="135" y="96" width="170" height="18" rx="4" fill="#9FE1CB" opacity="0.4" />
//         <text x="220" y="109" textAnchor="middle" fontSize="8" fill="#085041">Next follow-up: Tomorrow 10am</text>
//         <rect x="135" y="120" width="170" height="18" rx="4" fill="#9FE1CB" opacity="0.3" />
//         <text x="220" y="133" textAnchor="middle" fontSize="8" fill="#085041">Medicine reminder sent ✓</text>
//         <rect x="135" y="142" width="170" height="20" rx="5" fill="#1D9E75" />
//         <text x="220" y="156" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">DOXEZ with you till full recovery</text>
//       </svg>
//     ),
//   },
// ];

// const AUTO_ADVANCE_MS = 5000;

// export default function DoxezAnimation() {
//   const [current, setCurrent] = useState(0);
//   const timerRef = useRef(null);

//   const goTo = (index) => {
//     if (index < 0 || index >= steps.length) return;
//     setCurrent(index);
//   };

//   useEffect(() => {
//     clearTimeout(timerRef.current);
//     if (current < steps.length - 1) {
//       timerRef.current = setTimeout(() => setCurrent((c) => c + 1), AUTO_ADVANCE_MS);
//     }
//     return () => clearTimeout(timerRef.current);
//   }, [current]);

//   const isLast = current === steps.length - 1;
//   const step = steps[current];

//   return (
//     <>
//       <style>{`
//         @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
//         @keyframes float2 { 0%,100%{transform:translateY(-3px)} 50%{transform:translateY(3px)} }
//         .doxez-scene-enter { animation: doxezFadeIn 0.6s ease forwards; }
//         @keyframes doxezFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
//       `}</style>

//       <div style={{
//         background: "#fff",
//         borderRadius: 16,
//         border: "1px solid #e5e5e5",
//         width: "100%",
//         maxWidth: 680,
//         overflow: "hidden",
//         boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
//         fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       }}>

//         {/* Top bar */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px", borderBottom: "1px solid #f0f0f0" }}>
//           <div>
//             <div style={{ fontSize: 20, fontWeight: 700, color: "#0F6E56", letterSpacing: 2 }}>DOXEZ</div>
//             <div style={{ fontSize: 11, color: "#888", letterSpacing: 0.5 }}>Healthcare made simple</div>
//           </div>
//           <div style={{ fontSize: 12, color: "#888" }}>Step {current + 1} of {steps.length}</div>
//         </div>

//         {/* Scene area */}
//         <div style={{ position: "relative", height: 330, background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
//           <div key={current} className="doxez-scene-enter" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, width: "100%" }}>
//             <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
//               {step.scene}
//             </div>
//             <div style={{ textAlign: "center", paddingTop: 10 }}>
//               <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, padding: "3px 10px", borderRadius: 20, marginBottom: 5, ...step.tagStyle }}>
//                 {step.tag}
//               </span>
//               <div style={{ fontSize: 16, fontWeight: 600, color: "#111", marginBottom: 4 }}>{step.title}</div>
//               <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5, maxWidth: 440 }}>{step.desc}</div>
//             </div>
//           </div>
//         </div>

//         {/* Progress pips */}
//         <div style={{ display: "flex", gap: 4, padding: "14px 20px 10px", borderTop: "1px solid #f0f0f0" }}>
//           {steps.map((_, i) => (
//             <div
//               key={i}
//               onClick={() => goTo(i)}
//               style={{
//                 flex: 1, height: 3, borderRadius: 2, cursor: "pointer",
//                 background: i < current ? "#1D9E75" : i === current ? "#5DCAA5" : "#e5e5e5",
//                 transition: "background 0.4s ease",
//               }}
//             />
//           ))}
//         </div>

//         {/* Nav row */}
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 16px" }}>
//           <button
//             onClick={() => goTo(current - 1)}
//             disabled={current === 0}
//             style={{ padding: "8px 20px", fontSize: 13, borderRadius: 8, cursor: current === 0 ? "default" : "pointer", border: "1px solid #ddd", background: "transparent", color: "#333", opacity: current === 0 ? 0.3 : 1, fontFamily: "inherit" }}
//           >
//             ← Back
//           </button>
//           <span style={{ fontSize: 12, color: "#888" }}>
//             {isLast ? "Journey complete!" : "Auto-advances in 5s"}
//           </span>
//           <button
//             onClick={() => isLast ? goTo(0) : goTo(current + 1)}
//             style={{ padding: "8px 20px", fontSize: 13, borderRadius: 8, cursor: "pointer", border: "1px solid #0F6E56", background: "#0F6E56", color: "#fff", fontFamily: "inherit" }}
//           >
//             {isLast ? "↺ Restart" : "Next →"}
//           </button>
//         </div>

//       </div>
//     </>
//   );
// }
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   KEYFRAME STYLES (injected once)
═══════════════════════════════════════════ */
const CSS = `
@keyframes twinkle    { 0%,100%{opacity:.04;transform:scale(1)}  50%{opacity:.45;transform:scale(1.5)} }
@keyframes blobF      { 0%,100%{transform:scale(1) translate(0,0)} 33%{transform:scale(1.08) translate(20px,-15px)} 66%{transform:scale(.95) translate(-15px,20px)} }
@keyframes msgPop     { from{opacity:0;transform:scale(.4) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes tdot       { 0%,100%{transform:translateY(0);opacity:.3} 50%{transform:translateY(-5px);opacity:1} }
@keyframes radarPulse { 0%{r:15;opacity:.8} 100%{r:90;opacity:0} }
@keyframes fadeUp     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes dashRev    { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
@keyframes audioBar   { from{transform:scaleY(1)} to{transform:scaleY(3.5)} }
@keyframes scoreBar   { from{width:0} to{width:100px} }
@keyframes payPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.75;transform:scale(.97)} }
@keyframes timerArc   { from{stroke-dashoffset:0} to{stroke-dashoffset:125.6} }
@keyframes stampIn    { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }
@keyframes confetti   { from{transform:translateY(-10px) rotate(0deg);opacity:1} to{transform:translateY(130px) rotate(540deg);opacity:0} }
@keyframes pulse      { 0%,100%{opacity:.25} 50%{opacity:.7} }
@keyframes matchedPop { 0%{opacity:0;transform:scale(.3) translateY(8px)} 70%{transform:scale(1.12) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }

/* ════ WORKFLOW MOBILE ════ */
@media (max-width: 768px) {
  .wf-section { padding: 48px 16px 80px !important; }
  .wf-header  { margin-bottom: 48px !important; }
  .wf-header h2 { font-size: clamp(20px, 6vw, 28px) !important; }
  .wf-header p  { font-size: 14px !important; }
  .wf-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .wf-stage  { order: -1 !important; aspect-ratio: 1/1 !important; border-radius: 20px !important; }
  .wf-steps  { order: 1 !important; }
  .wf-step-row { padding: 12px 12px !important; border-radius: 12px !important; }
  .wf-step-num { width: 24px !important; height: 24px !important; border-radius: 7px !important; font-size: 10px !important; }
  .wf-step-title { font-size: 13px !important; }
  .wf-step-tag { display: none !important; }
  .wf-step-desc { font-size: 12px !important; }
  .wf-connector { display: none !important; }
}
@media (max-width: 480px) {
  .wf-section { padding: 40px 12px 60px !important; }
  .wf-stage { aspect-ratio: 1/1.05 !important; }
}
`;

/* ═══════════════════════════════════════════
   SCENE 1 – WhatsApp request
   • WhatsApp-style timestamps (11:30 AM ✓✓)
   • Reply = "Thank you for contacting Doxez…"
═══════════════════════════════════════════ */
function SceneWhatsapp() {
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    let t1 = setTimeout(() => setMsgs([0]), 300);
    let t2 = setTimeout(() => setMsgs([0, 1]), 1000);
    let t3 = setTimeout(() => setTyping(true), 1700);
    let t4 = setTimeout(() => { setTyping(false); setMsgs([0, 1, 2]); }, 2700);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      {/* Phone frame */}
      <rect x="115" y="6" width="168" height="308" rx="22" fill="#0d1829" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
      <rect x="128" y="22" width="142" height="278" rx="13" fill="#111c2e" />
      <rect x="166" y="13" width="68" height="10" rx="5" fill="#0a1220" />
      {/* Chat header */}
      <rect x="128" y="22" width="142" height="34" fill="#0f1f35" rx="4" />
      <circle cx="147" cy="39" r="10" fill="#25d36625" stroke="#25d36640" strokeWidth="1" />
      <text x="147" y="44" textAnchor="middle" fontSize="11">💬</text>
      <text x="165" y="36" fontSize="8.5" fill="#f1f5f9" fontWeight="700" fontFamily="Syne,sans-serif">DOXEZ</text>
      <circle cx="162" cy="46" r="3" fill="#22c55e" />
      <text x="167" y="49" fontSize="6.5" fill="#22c55e" fontFamily="DM Sans,sans-serif">Online</text>

      {/* MSG 0 — hospital message with WhatsApp timestamp */}
      {msgs.includes(0) && (
        <g style={{ animation: "msgPop .4s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="133" y="62" width="118" height="46" rx="10" fill="#1e3a5f" />
          <text x="142" y="75" fontSize="7.5" fill="#cbd5e1" fontFamily="DM Sans,sans-serif">Hi Doxez — need an</text>
          <text x="142" y="87" fontSize="7.5" fill="#38bdf8" fontWeight="700" fontFamily="DM Sans,sans-serif">anaesthesiologist</text>
          {/* WhatsApp-style timestamp bottom-right of bubble */}
          <text x="245" y="103" textAnchor="end" fontSize="5.5" fill="#94a0b1" fontFamily="DM Sans,sans-serif">11:30 AM ✓✓</text>
        </g>
      )}

      {/* MSG 1 — urgency */}
      {msgs.includes(1) && (
        <g style={{ animation: "msgPop .4s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="133" y="114" width="108" height="34" rx="10" fill="#1e3a5f" />
          <text x="142" y="126" fontSize="7.5" fill="#cbd5e1" fontFamily="DM Sans,sans-serif">Urgency: HIGH</text>
          <text x="142" y="138" fontSize="7" fill="#94a3b8" fontFamily="DM Sans,sans-serif">~2 hrs · Appendectomy</text>
          <text x="235" y="144" textAnchor="end" fontSize="5.5" fill="#94a0b1" fontFamily="DM Sans,sans-serif">11:30 AM ✓✓</text>
        </g>
      )}

      {/* Typing dots */}
      {typing && (
        <g>
          <rect x="133" y="154" width="44" height="20" rx="10" fill="#1e293b" />
          {[0, 1, 2].map(i => (
            <circle key={i} cx={144 + i * 11} cy="164" r="3" fill="#475569"
              style={{ animation: `tdot 1.2s ease ${i * .2}s infinite` }} />
          ))}
        </g>
      )}

      {/* MSG 2 — Doxez auto-reply "Thank you for contacting…" */}
      {msgs.includes(2) && (
        <g style={{ animation: "msgPop .4s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="133" y="154" width="130" height="74" rx="10"
            fill="rgba(14,165,233,.1)" stroke="rgba(14,165,233,.28)" strokeWidth="1" />
          {/* Small Doxez avatar */}
          <circle cx="143" cy="164" r="7" fill="#0ea5e9" opacity=".85" />
          <text x="143" y="167" textAnchor="middle" fontSize="7" fill="white" fontWeight="900">D</text>
          <text x="154" y="165" fontSize="6.5" fill="#38bdf8" fontWeight="700" fontFamily="DM Sans,sans-serif">DOXEZ</text>
          {/* Message lines */}
          <text x="156" y="177" fontSize="6.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Thank you for contacting</text>
          <text x="156" y="188" fontSize="6.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Doxez! We have received</text>
          <text x="156" y="199" fontSize="6.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">your request. We will</text>
          <text x="156" y="210" fontSize="6.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">update you shortly 🙏</text>
          {/* Timestamp */}
          <text x="258" y="223" textAnchor="end" fontSize="5.5" fill="#94a0b1" fontFamily="DM Sans,sans-serif">11:32 AM ✓✓</text>
        </g>
      )}

      {/* Case ID pill */}
      {msgs.includes(2) && (
        <g style={{ animation: "fadeUp .4s ease .4s both", opacity: 0 }}>
          <rect x="145" y="233" width="106" height="14" rx="7" fill="#0ea5e9" />
          <text x="198" y="243" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="800"
            fontFamily="DM Sans,sans-serif">Case #DXZ-0047 · FLAGGED</text>
        </g>
      )}

      <rect x="168" y="293" width="64" height="4" rx="2" fill="rgba(255,255,255,.15)" />

      {/* Left WhatsApp bubble */}
      <circle cx="52" cy="155" r="28" fill="rgba(37,211,102,.1)" stroke="rgba(37,211,102,.3)" strokeWidth="1" />
      <text x="52" y="163" textAnchor="middle" fontSize="22">💬</text>
      <circle cx="52" cy="155" r="42" fill="none" stroke="rgba(37,211,102,.15)" strokeWidth="1"
        style={{ animation: "radarPulse 2s ease-out infinite" }} />
      <circle cx="52" cy="155" r="58" fill="none" stroke="rgba(37,211,102,.08)" strokeWidth="1"
        style={{ animation: "radarPulse 2s ease-out .6s infinite" }} />
      <path d="M80 155 Q98 155 114 155" stroke="#25d366" strokeWidth="1.5" strokeDasharray="4 3"
        style={{ animation: "dashRev 1s ease .5s both" }} />
      <polygon points="112,151 118,155 112,159" fill="#25d366"
        style={{ animation: "fadeUp .3s ease 1.4s both", opacity: 0 }} />

      {/* Right SYS LOG */}
      <rect x="308" y="56" width="82" height="192" rx="14" fill="#0d1829" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
      <text x="349" y="76" textAnchor="middle" fontSize="8" fill="#38bdf8" fontWeight="700" fontFamily="Syne,sans-serif">SYS LOG</text>
      <line x1="316" y1="82" x2="382" y2="82" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
      {[["09:14:01", "Rx ✓", "#22c55e"], ["09:14:02", "Flagged", "#f59e0b"], ["09:14:02", "ID gen", "#38bdf8"], ["09:14:03", "Queued", "#8b5cf6"]].map(([t, l, c], i) => (
        <g key={i} style={{ animation: `fadeUp .4s ease ${.4 + i * .2}s both`, opacity: 0 }}>
          <text x="318" y={98 + i * 34} fontSize="6" fill="#334155" fontFamily="DM Sans,sans-serif">{t}</text>
          <circle cx="318" cy={109 + i * 34} r="2.5" fill={c} />
          <text x="325" y={112 + i * 34} fontSize="7.5" fill={c} fontWeight="600" fontFamily="DM Sans,sans-serif">{l}</text>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 2 – Verify dashboard (unchanged)
═══════════════════════════════════════════ */
function SceneVerify() {
  const [filled, setFilled] = useState([]);
  const [showRoster, setShowRoster] = useState(false);
  const fields = [["Case Type", "Appendectomy"], ["ASA Status", "Class II"], ["Duration", "~2 Hours"], ["Surgery Plan", "Laparoscopic"]];
  useEffect(() => {
    fields.forEach((_, i) => setTimeout(() => setFilled(p => [...p, i]), 400 + i * 400));
    setTimeout(() => setShowRoster(true), 2400);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      <circle cx="60" cy="130" r="44" fill="rgba(139,92,246,.08)" stroke="rgba(139,92,246,.25)" strokeWidth="1.5" />
      <text x="60" y="140" textAnchor="middle" fontSize="32">🎧</text>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={42 + i * 10} y="186" width="7" height="6" rx="3" fill="#8b5cf6"
          style={{ animation: `audioBar .6s ease ${i * .15}s infinite alternate`, transformOrigin: `${45 + i * 10}px 189px` }} />
      ))}
      <text x="60" y="210" textAnchor="middle" fontSize="8" fill="#8b5cf6" fontWeight="700" fontFamily="DM Sans,sans-serif">Customer Care</text>
      <text x="60" y="222" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="DM Sans,sans-serif">Calling hospital</text>
      <text x="60" y="233" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="DM Sans,sans-serif">Verifying case</text>
      <path d="M104 160 Q140 160 162 160" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 3"
        style={{ animation: "dashRev .8s ease .3s both" }} />

      <rect x="162" y="18" width="222" height="284" rx="16" fill="#0d1829" stroke="rgba(255,255,255,.07)" strokeWidth="1.5" />
      <rect x="162" y="18" width="222" height="36" rx="16" fill="#0f1f35" />
      <rect x="162" y="40" width="222" height="14" fill="#0f1f35" />
      {[0, 1, 2].map(i => <circle key={i} cx={176 + i * 13} cy="36" r="5" fill={["#ef4444", "#f59e0b", "#22c55e"][i]} opacity=".6" />)}
      <text x="273" y="40" textAnchor="middle" fontSize="7.5" fill="#475569" fontFamily="DM Sans,sans-serif">Case Verification · #DXZ-0047</text>

      {fields.map(([label, val], i) => (
        <g key={i} style={{ animation: `fadeUp .4s ease ${.2 + i * .15}s both`, opacity: 0 }}>
          <text x="178" y={72 + i * 50} fontSize="8" fill="#64748b" fontFamily="DM Sans,sans-serif">{label}</text>
          <rect x="178" y={78 + i * 50} width="194" height="28" rx="8" fill="#111c2e" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          {filled.includes(i) ? (
            <>
              <text x="190" y={97 + i * 50} fontSize="10" fill="#f1f5f9" fontWeight="600" fontFamily="DM Sans,sans-serif">{val}</text>
              <circle cx="358" cy={92 + i * 50} r="8" fill="#22c55e20" stroke="#22c55e60" strokeWidth="1" />
              <text x="358" y={96 + i * 50} textAnchor="middle" fontSize="9" fill="#22c55e">✓</text>
            </>
          ) : (
            <rect x="190" y={88 + i * 50} width="40" height="7" rx="3.5" fill="rgba(255,255,255,.05)"
              style={{ animation: "pulse 1.5s ease infinite" }} />
          )}
        </g>
      ))}

      {showRoster && (
        <g style={{ animation: "fadeUp .5s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="178" y="268" width="194" height="18" rx="9" fill="rgba(34,197,94,.12)" stroke="rgba(34,197,94,.4)" strokeWidth="1" />
          <text x="275" y="281" textAnchor="middle" fontSize="7.5" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">✓ Roster checked · 4 doctors available</text>
        </g>
      )}
      {filled.length === 4 && (
        <g style={{ animation: "fadeUp .5s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="260" y="290" width="110" height="22" rx="11" fill="#8b5cf6" />
          <text x="315" y="305" textAnchor="middle" fontSize="8.5" fill="white" fontWeight="700"
            fontFamily="DM Sans,sans-serif">✓ Save & Confirm</text>
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 3 – Smart Matching & Broadcast
   • MATCHED pill: bigger, cleaner, nicely stacked above Dr. Arjun
   • Bottom chips: equal widths, better balanced
═══════════════════════════════════════════ */
function SceneMatch() {
  const [phase, setPhase] = useState(0);
  const docs = [
    { x: 88, y: 90, name: "Dr. Arjun Kumar", dist: "1.2km" },
    { x: 316, y: 102, name: "Dr. Priya", dist: "2.8km" },
    { x: 72, y: 234, name: "Dr. Ravi", dist: "4.1km" },
    { x: 324, y: 240, name: "Dr. Meera", dist: "5.3km" },
  ];
  useEffect(() => {
    let t1 = setTimeout(() => setPhase(1), 500);
    let t2 = setTimeout(() => setPhase(2), 1400);
    let t3 = setTimeout(() => setPhase(3), 2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      {/* Radar rings */}
      <circle cx="200" cy="153" r="30" fill="rgba(245,158,11,.06)" stroke="rgba(245,158,11,.2)" strokeWidth="1"
        style={{ animation: "radarPulse 2s ease-out infinite" }} />
      <circle cx="200" cy="153" r="70" fill="none" stroke="rgba(245,158,11,.12)" strokeWidth="1"
        style={{ animation: "radarPulse 2s ease-out .5s infinite" }} />
      <circle cx="200" cy="153" r="112" fill="none" stroke="rgba(245,158,11,.06)" strokeWidth="1"
        style={{ animation: "radarPulse 2s ease-out 1s infinite" }} />
      {/* Centre hospital */}
      <circle cx="200" cy="153" r="24" fill="rgba(245,158,11,.14)" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="200" y="159" textAnchor="middle" fontSize="18">🏥</text>

      {/* Lines */}
      {phase >= 1 && docs.map((d, i) => (
        <line key={i} x1="200" y1="153" x2={d.x} y2={d.y}
          stroke={i === 0 && phase >= 3 ? "#f59e0b" : "rgba(245,158,11,.2)"}
          strokeWidth={i === 0 && phase >= 3 ? 2 : 1} strokeDasharray="5 4"
          style={{ animation: `dashRev .8s ease ${i * .2}s both` }} />
      ))}

      {/* Doctor nodes */}
      {docs.map((d, i) => (
        <g key={i} style={{ opacity: phase >= 1 ? 1 : 0, transition: "opacity .4s" }}>
          <circle cx={d.x} cy={d.y}
            r={i === 0 && phase >= 3 ? 24 : 17}
            fill={i === 0 && phase >= 3 ? "rgba(245,158,11,.22)" : "rgba(255,255,255,.04)"}
            stroke={i === 0 && phase >= 3 ? "#f59e0b" : "rgba(255,255,255,.14)"}
            strokeWidth={i === 0 && phase >= 3 ? 2 : 1.5}
            style={{ transition: "all .5s" }} />
          <text x={d.x} y={d.y + 5} textAnchor="middle" fontSize={i === 0 && phase >= 3 ? 15 : 12}>👨‍⚕️</text>
          {phase >= 2 && (
            <g style={{ animation: "fadeUp .3s ease both" }}>
              <text x={d.x} y={d.y + 31} textAnchor="middle" fontSize="7.5"
                fill={i === 0 && phase >= 3 ? "#fbbf24" : "#94a3b8"}
                fontWeight={i === 0 && phase >= 3 ? "700" : "400"}
                fontFamily="DM Sans,sans-serif">{d.name}</text>
              <text x={d.x} y={d.y + 41} textAnchor="middle" fontSize="7" fill="#64748b"
                fontFamily="DM Sans,sans-serif">{d.dist}</text>
            </g>
          )}

          {/* MATCHED badge — clean stacked design */}
          {phase >= 3 && i === 0 && (
            <g style={{ animation: "matchedPop .55s cubic-bezier(.34,1.56,.64,1) both" }}>
              {/* "Case intimation sent" pill above MATCHED */}
              <rect x={d.x - 40} y={d.y - 72} width="80" height="16" rx="8"
                fill="rgba(245,158,11,.18)" stroke="rgba(245,158,11,.55)" strokeWidth="1" />
              <text x={d.x} y={d.y - 61} textAnchor="middle" fontSize="7" fill="#fbbf24" fontWeight="700"
                fontFamily="DM Sans,sans-serif">Case intimation sent</text>
              {/* MATCHED pill */}
              <rect x={d.x - 30} y={d.y - 48} width="60" height="22" rx="11" fill="#f59e0b" />
              <text x={d.x} y={d.y - 48 + 11} dominantBaseline="middle" textAnchor="middle" fontSize="8.5" fill="#1a0a00" fontWeight="900"
                fontFamily="Syne,sans-serif">MATCHED</text>
            </g>
          )}
        </g>
      ))}

      {/* Bottom two chips — equal width, balanced */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .5s ease both" }}>
          {/* Hospital chip */}
          <rect x="10" y="272" width="182" height="40" rx="10"
            fill="#0d1f1a" stroke="rgba(34,197,94,.35)" strokeWidth="1.2" />
          <text x="101" y="287" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">🏥 Hospital</text>
          <text x="101" y="300" textAnchor="middle" fontSize="7" fill="#4ade80"
            fontFamily="DM Sans,sans-serif">✓ Accepted case · Reports shared</text>

          {/* Best match chip */}
          <rect x="200" y="272" width="190" height="40" rx="10"
            fill="#0d1829" stroke="rgba(245,158,11,.3)" strokeWidth="1.2" />
          <text x="295" y="285" textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="700"
            fontFamily="Syne,sans-serif">BEST MATCH</text>
          {/* Score bar track */}
          <rect x="215" y="292" width="100" height="6" rx="3" fill="rgba(255,255,255,.07)" />
          {/* Score bar fill */}
          <rect x="215" y="292" width="0" height="6" rx="3" fill="#f59e0b"
            style={{ animation: "scoreBar 1s ease .7s forwards" }} />
          <text x="322" y="298" fontSize="7.5" fill="#fbbf24" fontWeight="700"
            fontFamily="DM Sans,sans-serif">94/100</text>
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 4 – Hospital Notification & Payment
   • Removed "Workflow Steps" from both panels
   • Added handwritten content from notes image
═══════════════════════════════════════════ */
function ScenePayment() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let t1 = setTimeout(() => setPhase(1), 400);
    let t2 = setTimeout(() => setPhase(2), 1300);
    let t3 = setTimeout(() => setPhase(3), 2200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>

      {/* ── LEFT: DOXEZ ADMIN ── */}
      <rect x="6" y="12" width="184" height="298" rx="14" fill="#0d1829" stroke="rgba(14,165,233,.25)" strokeWidth="1.5" />
      <rect x="6" y="12" width="184" height="28" rx="14" fill="#0b2040" />
      <rect x="6" y="28" width="184" height="12" fill="#0b2040" />
      <text x="98" y="29" textAnchor="middle" fontSize="8" fill="#38bdf8" fontWeight="800"
        fontFamily="Syne,sans-serif">🛡 DOXEZ ADMIN</text>

      {/* Doxez System message */}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .5s ease both" }}>
          <circle cx="22" cy="57" r="10" fill="#1e3a5f" />
          <text x="22" y="61" textAnchor="middle" fontSize="9">💬</text>
          <text x="37" y="53" fontSize="7.5" fill="#38bdf8" fontWeight="700" fontFamily="DM Sans,sans-serif">Doxez System</text>
          <text x="37" y="63" fontSize="6.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">"Doctor confirmed.</text>
          <text x="37" y="72" fontSize="6.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Proceed with payment"</text>
        </g>
      )}

      {/* Payment Link */}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease .15s both", opacity: 0 }}>
          <rect x="14" y="82" width="168" height="22" rx="7" fill="#1a3040" stroke="rgba(245,158,11,.3)" strokeWidth="1" />
          <text x="98" y="97" textAnchor="middle" fontSize="7.5" fill="#f59e0b" fontWeight="700"
            fontFamily="DM Sans,sans-serif">💳 Payment Link · send to Hospital</text>
        </g>
      )}

      {/* Payment Received */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .4s ease both" }}>
          <rect x="14" y="110" width="168" height="20" rx="10" fill="rgba(34,197,94,.12)" stroke="rgba(34,197,94,.4)" strokeWidth="1" />
          <text x="98" y="124" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">✓ Payment Received</text>
        </g>
      )}

      {/* Booking ID */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .5s cubic-bezier(.34,1.56,.64,1) .1s both", opacity: 0 }}>
          <rect x="14" y="136" width="168" height="32" rx="10" fill="rgba(245,158,11,.1)"
            stroke="rgba(245,158,11,.4)" strokeWidth="1.5" />
          <text x="98" y="149" textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="700"
            fontFamily="Syne,sans-serif">BOOKING ID</text>
          <text x="98" y="161" textAnchor="middle" fontSize="7.5" fill="#fbbf24" fontWeight="800"
            fontFamily="Syne,sans-serif">#BK-20240319-047</text>
        </g>
      )}

      {/* Admin detail list — from handwritten notes */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .4s ease .2s both", opacity: 0 }}>
          <line x1="14" y1="176" x2="182" y2="176" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          {[
            ["→ Doctor Assigned: Dr. Arjun Kumar", "#94a3b8"],
            ["→ Login OTP – 4052", "#38bdf8"],
            ["→ Logout OTP – 7391", "#8b5cf6"],
            ["→ Duration: Est. 3 hrs", "#64748b"],
            ["→ Schedule confirmed", "#64748b"],
          ].map(([txt, c], i) => (
            <g key={i} style={{ animation: `fadeUp .3s ease ${.25 + i * .12}s both`, opacity: 0 }}>
              <text x="16" y={188 + i * 19} fontSize="7.5" fill={c} fontFamily="DM Sans,sans-serif">{txt}</text>
            </g>
          ))}
        </g>
      )}

      {/* Arrow */}
      {phase >= 1 && (
        <path d="M192 158 Q197 158 204 158" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2"
          style={{ animation: "dashRev .5s ease .5s both" }} />
      )}

      {/* ── RIGHT: HOSPITAL ── */}
      <rect x="206" y="12" width="188" height="298" rx="14" fill="#0d1f1a" stroke="rgba(16,185,129,.25)" strokeWidth="1.5" />
      <rect x="206" y="12" width="188" height="28" rx="14" fill="#0a2018" />
      <rect x="206" y="28" width="188" height="12" fill="#0a2018" />
      <text x="300" y="29" textAnchor="middle" fontSize="8" fill="#10b981" fontWeight="800"
        fontFamily="Syne,sans-serif">🏥 Hospital</text>

      {/* Amount */}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .5s ease .1s both", opacity: 0 }}>
          <text x="300" y="62" textAnchor="middle" fontSize="24" fill="#f1f5f9" fontWeight="900"
            fontFamily="Syne,sans-serif">₹4,500</text>
          <text x="300" y="74" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">Charges (All taxes inclusive)</text>
          <text x="300" y="84" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">Lap. Appendectomy</text>
        </g>
      )}

      {/* Payment link */}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease .25s both", opacity: 0 }}>
          <rect x="214" y="92" width="172" height="20" rx="7" fill="rgba(245,158,11,.12)"
            stroke="rgba(245,158,11,.35)" strokeWidth="1" />
          <text x="300" y="106" textAnchor="middle" fontSize="7.5" fill="#f59e0b" fontWeight="700"
            fontFamily="DM Sans,sans-serif">💳 Payment Link · Proceed for Payment</text>
        </g>
      )}

      {/* Booking ID hospital */}
      {phase >= 2 && (
        <g style={{ animation: "stampIn .4s cubic-bezier(.34,1.56,.64,1) .1s both", opacity: 0 }}>
          <rect x="214" y="118" width="172" height="30" rx="9" fill="rgba(245,158,11,.1)"
            stroke="rgba(245,158,11,.4)" strokeWidth="1.5" />
          <text x="300" y="131" textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="700"
            fontFamily="Syne,sans-serif">🔖 BOOKING ID</text>
          <text x="300" y="142" textAnchor="middle" fontSize="7.5" fill="#fbbf24" fontWeight="800"
            fontFamily="Syne,sans-serif">#BK-20240319-047</text>
        </g>
      )}

      {/* Hospital doctor details — from handwritten notes */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .4s ease .2s both", opacity: 0 }}>
          <line x1="214" y1="156" x2="386" y2="156" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          <text x="218" y="167" fontSize="8" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">Dr. Arjun Kumar · Regd. No-2033</text>
          <text x="218" y="178" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">Anaesthesiologist</text>
          <text x="218" y="190" fontSize="7" fill="#94a3b8" fontFamily="DM Sans,sans-serif">→ 4 years of experience</text>
          <text x="218" y="201" fontSize="7" fill="#94a3b8" fontFamily="DM Sans,sans-serif">→ Doxez Verified Specialist</text>
        </g>
      )}

      {/* OTP share section — from notes */}
      {phase >= 3 && (
        <g style={{ animation: "fadeUp .4s ease both" }}>
          <line x1="214" y1="213" x2="386" y2="213" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          <rect x="214" y="218" width="172" height="48" rx="9" fill="rgba(239,68,68,.08)"
            stroke="rgba(239,68,68,.3)" strokeWidth="1" />
          <text x="300" y="231" textAnchor="middle" fontSize="7.5" fill="#ef4444" fontWeight="700"
            fontFamily="DM Sans,sans-serif">🔐 Receive &amp; Share OTP</text>
          <text x="218" y="244" fontSize="7" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Login OTP  : 4052 → share with Doctor</text>
          <text x="218" y="256" fontSize="7" fill="#8b5cf6" fontFamily="DM Sans,sans-serif">Logout OTP : 7391 → share with Doctor</text>
        </g>
      )}

      {/* Payment Confirmed */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .4s ease .3s both", opacity: 0 }}>
          <rect x="214" y="272" width="172" height="22" rx="11" fill="rgba(34,197,94,.12)"
            stroke="rgba(34,197,94,.4)" strokeWidth="1" />
          <text x="300" y="287" textAnchor="middle" fontSize="8.5" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">✓ Payment Confirmed</text>
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 5 – Arrival Verification (OTP #1 Login)
═══════════════════════════════════════════ */
function SceneOtpLogin() {
  const [phase, setPhase] = useState(0);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const OTP = ["4", "0", "5", "2"];
  useEffect(() => {
    let t1 = setTimeout(() => setPhase(1), 500);
    let t2 = setTimeout(() => setDigits(["4", "", "", ""]), 1200);
    let t3 = setTimeout(() => setDigits(["4", "0", "", ""]), 1600);
    let t4 = setTimeout(() => setDigits(["4", "0", "5", ""]), 2000);
    let t5 = setTimeout(() => setDigits(["4", "0", "5", "2"]), 2400);
    let t6 = setTimeout(() => setPhase(2), 3000);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      {/* Top Badge */}
      <rect x="10" y="10" width="380" height="22" rx="11"
        fill="rgba(34,197,94,.1)" stroke="rgba(34,197,94,.3)" strokeWidth="1" />
      <text x="200" y="25" textAnchor="middle" fontSize="7.5" fill="#22c55e" fontWeight="700"
        fontFamily="DM Sans,sans-serif">🔖 Booking ID #BK-20240319-047 → OTP Triggered</text>

      {/* LEFT: HOSPITAL */}
      <rect x="10" y="40" width="172" height="200" rx="14"
        fill="#0d1829" stroke="rgba(34,197,94,.2)" strokeWidth="1.5" />
      <text x="96" y="60" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="700"
        fontFamily="Syne,sans-serif">🏥 HOSPITAL</text>
      <text x="96" y="73" textAnchor="middle" fontSize="7.5" fill="#94a3b8"
        fontFamily="DM Sans,sans-serif">Login OTP Received</text>

      {/* OTP Box */}
      <rect x="22" y="80" width="148" height="50" rx="12"
        fill="#0f1f17" stroke="rgba(34,197,94,.3)" strokeWidth="1.5" />

      {OTP.map((d, i) => (
        <g key={i}>
          <rect x={28 + i * 34} y="86" width="28" height="38" rx="6"
            fill={digits[i] ? "rgba(34,197,94,.14)" : "rgba(255,255,255,.03)"}
            stroke={digits[i] ? "rgba(34,197,94,.5)" : "rgba(255,255,255,.06)"} strokeWidth="1" />
          <text x={42 + i * 34} y="111" textAnchor="middle" fontSize="18" fill="#22c55e" fontWeight="900"
            fontFamily="Syne,sans-serif"
            style={{ opacity: digits[i] ? 1 : 0, transition: "opacity .2s" }}>
            {d}
          </text>
        </g>
      ))}

      <text x="96" y="148" textAnchor="middle" fontSize="7.5" fill="#475569"
        fontFamily="DM Sans,sans-serif">Shared with doctor on arrival</text>

      {/* Timer */}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease both" }}>
          <circle cx="96" cy="192" r="20" fill="none"
            stroke="rgba(34,197,94,.15)" strokeWidth="3" />
          <circle cx="96" cy="192" r="20" fill="none"
            stroke="#22c55e" strokeWidth="3"
            strokeDasharray="125.6" strokeLinecap="round"
            style={{ animation: "timerArc 10s linear forwards", transformOrigin: "96px 192px", transform: "rotate(-90deg)" }} />
          <text x="96" y="196" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">OTP</text>
          <text x="96" y="207" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">valid 10m</text>
        </g>
      )}

      {/* Connector */}
      <path d="M184 150 Q192 150 200 150"
        stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3"
        style={{ animation: "dashRev .8s ease .5s both" }} />

      {/* RIGHT: DOCTOR */}
      <rect x="202" y="40" width="192" height="200" rx="14"
        fill="#0d1829" stroke="rgba(34,197,94,.14)" strokeWidth="1.5" />

      <text x="298" y="60" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="700"
        fontFamily="Syne,sans-serif">👨‍⚕️ DOCTOR ENTRY</text>
      <text x="298" y="72" textAnchor="middle" fontSize="7.5" fill="#94a3b8"
        fontFamily="DM Sans,sans-serif">Doctor Arrives and</text>
      <text x="298" y="82" textAnchor="middle" fontSize="7" fill="#64748b"
        fontFamily="DM Sans,sans-serif">Collect OTP from hospital</text>

      {OTP.map((d, i) => (
        <g key={i} style={{ animation: `fadeUp .3s ease ${.1 + i * .1}s both`, opacity: 0 }}>
          <rect x={210 + i * 42} y="92" width="36" height="42" rx="8"
            fill={digits[i] ? "rgba(34,197,94,.12)" : "rgba(255,255,255,.03)"}
            stroke={digits[i] ? "#22c55e" : "rgba(255,255,255,.08)"} strokeWidth="1.5" />
          <text x={228 + i * 42} y="119" textAnchor="middle" fontSize="20"
            fill={digits[i] ? "#22c55e" : "#1e293b"} fontWeight="900"
            fontFamily="Syne,sans-serif">
            {digits[i] || "·"}
          </text>
        </g>
      ))}

      {/* Verify Button */}
      <rect x="212" y="145" width="170" height="26" rx="13"
        fill={digits[3] ? "#22c55e" : "rgba(34,197,94,.12)"}
        stroke={digits[3] ? "none" : "rgba(34,197,94,.3)"} strokeWidth="1"
        style={{ transition: "all .3s" }} />

      <text x="297" y="162" textAnchor="middle" fontSize="9"
        fill={digits[3] ? "white" : "#22c55e"} fontWeight="700"
        fontFamily="DM Sans,sans-serif">
        {phase >= 2 ? "✓ OTP Verified" : "Verify OTP →"}
      </text>

      {/* Success Card */}
      {phase >= 2 && (
        <g style={{ animation: "stampIn .6s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="212" y="177" width="170" height="46" rx="10"
            fill="rgba(34,197,94,.1)" stroke="rgba(34,197,94,.4)" strokeWidth="1.5" />
          <text x="297" y="194" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">⏱ TIME-IN RECORDED</text>
          <text x="297" y="208" textAnchor="middle" fontSize="13" fill="#4ade80" fontWeight="800"
            fontFamily="Syne,sans-serif">09:32 AM</text>
          <text x="297" y="220" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">Job Started</text>
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 6 – Job Completion (Logout OTP)
═══════════════════════════════════════════ */
function SceneOtpLogout() {
  const [phase, setPhase] = useState(0);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const OTP = ["7", "3", "9", "1"];
  useEffect(() => {
    let t1 = setTimeout(() => setPhase(1), 500);
    let t2 = setTimeout(() => setDigits(["7", "", "", ""]), 1200);
    let t3 = setTimeout(() => setDigits(["7", "3", "", ""]), 1600);
    let t4 = setTimeout(() => setDigits(["7", "3", "9", ""]), 2000);
    let t5 = setTimeout(() => setDigits(["7", "3", "9", "1"]), 2400);
    let t6 = setTimeout(() => setPhase(2), 3000);
    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      {/* Top Badge */}
      <rect x="10" y="10" width="380" height="22" rx="11"
        fill="rgba(245,158,11,.1)" stroke="rgba(245,158,11,.3)" strokeWidth="1" />
      <text x="200" y="25" textAnchor="middle" fontSize="7.5" fill="#f59e0b" fontWeight="700"
        fontFamily="DM Sans,sans-serif">🏥 Surgery Complete → Logout OTP Auto-Issued to Hospital</text>

      {/* LEFT: HOSPITAL */}
      <rect x="10" y="40" width="172" height="210" rx="14"
        fill="#0d1829" stroke="rgba(245,158,11,.2)" strokeWidth="1.5" />
      <text x="96" y="60" textAnchor="middle" fontSize="9" fill="#f97316" fontWeight="700"
        fontFamily="Syne,sans-serif">🏥 HOSPITAL</text>
      <text x="96" y="73" textAnchor="middle" fontSize="7.5" fill="#94a3b8"
        fontFamily="DM Sans,sans-serif">Logout OTP Received</text>

      <rect x="22" y="80" width="148" height="50" rx="12"
        fill="#1a120a" stroke="rgba(245,158,11,.3)" strokeWidth="1.5" />

      {OTP.map((d, i) => (
        <g key={i}>
          <rect x={28 + i * 34} y="86" width="28" height="38" rx="6"
            fill={digits[i] ? "rgba(245,158,11,.14)" : "rgba(255,255,255,.03)"}
            stroke={digits[i] ? "rgba(245,158,11,.5)" : "rgba(255,255,255,.06)"} strokeWidth="1" />
          <text x={42 + i * 34} y="111" textAnchor="middle" fontSize="18" fill="#f97316" fontWeight="900"
            fontFamily="Syne,sans-serif"
            style={{ opacity: digits[i] ? 1 : 0, transition: "opacity .2s" }}>
            {d}
          </text>
        </g>
      ))}

      <text x="96" y="148" textAnchor="middle" fontSize="7.5" fill="#475569"
        fontFamily="DM Sans,sans-serif">Doctor collects OTP from hospital staff</text>

      {/* Timer */}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease both" }}>
          <circle cx="96" cy="192" r="20" fill="none"
            stroke="rgba(245,158,11,.15)" strokeWidth="3" />
          <circle cx="96" cy="192" r="20" fill="none"
            stroke="#f97316" strokeWidth="3"
            strokeDasharray="125.6" strokeLinecap="round"
            style={{ animation: "timerArc 10s linear forwards", transformOrigin: "96px 192px", transform: "rotate(-90deg)" }} />
          <text x="96" y="196" textAnchor="middle" fontSize="8" fill="#f97316" fontWeight="700"
            fontFamily="DM Sans,sans-serif">OTP</text>
          <text x="96" y="207" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">valid 15m</text>
        </g>
      )}

      {/* Connector */}
      <path d="M184 155 Q192 155 200 155"
        stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 3"
        style={{ animation: "dashRev .8s ease .5s both" }} />

      {/* RIGHT: DOCTOR */}
      <rect x="202" y="40" width="192" height="210" rx="14"
        fill="#0d1829" stroke="rgba(245,158,11,.14)" strokeWidth="1.5" />

      <text x="298" y="60" textAnchor="middle" fontSize="9" fill="#f59e0b" fontWeight="700"
        fontFamily="Syne,sans-serif">👨‍⚕️ DOCTOR</text>
      <text x="298" y="72" textAnchor="middle" fontSize="7.5" fill="#94a3b8"
        fontFamily="DM Sans,sans-serif">Surgery Completed</text>
      <text x="298" y="82" textAnchor="middle" fontSize="7" fill="#64748b"
        fontFamily="DM Sans,sans-serif">Enter Logout OTP for work complete</text>

      {OTP.map((d, i) => (
        <g key={i} style={{ animation: `fadeUp .3s ease ${.1 + i * .1}s both`, opacity: 0 }}>
          <rect x={210 + i * 42} y="92" width="36" height="42" rx="8"
            fill={digits[i] ? "rgba(245,158,11,.12)" : "rgba(255,255,255,.03)"}
            stroke={digits[i] ? "#f97316" : "rgba(255,255,255,.08)"} strokeWidth="1.5" />
          <text x={228 + i * 42} y="119" textAnchor="middle" fontSize="20"
            fill={digits[i] ? "#f59e0b" : "#1e293b"} fontWeight="900"
            fontFamily="Syne,sans-serif">
            {digits[i] || "·"}
          </text>
        </g>
      ))}

      {/* Verify Button */}
      <rect x="212" y="145" width="170" height="26" rx="13"
        fill={digits[3] ? "#f97316" : "rgba(245,158,11,.12)"}
        stroke={digits[3] ? "none" : "rgba(245,158,11,.3)"} strokeWidth="1"
        style={{ transition: "all .3s" }} />

      <text x="297" y="162" textAnchor="middle" fontSize="9"
        fill={digits[3] ? "white" : "#f59e0b"} fontWeight="700"
        fontFamily="DM Sans,sans-serif">
        {phase >= 2 ? "✓ OTP Verified" : "Verify OTP →"}
      </text>

      {/* Success Card */}
      {phase >= 2 && (
        <g style={{ animation: "stampIn .6s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="212" y="177" width="170" height="46" rx="10"
            fill="rgba(245,158,11,.1)" stroke="rgba(245,158,11,.4)" strokeWidth="1.5" />
          <text x="297" y="194" textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="700"
            fontFamily="DM Sans,sans-serif">⏱ TIME-OUT RECORDED</text>
          <text x="297" y="208" textAnchor="middle" fontSize="13" fill="#fdba74" fontWeight="800"
            fontFamily="Syne,sans-serif">11:46 AM</text>
          <text x="297" y="220" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">Job Complete · 2h 14m</text>
        </g>
      )}

      {/* Bottom System Actions */}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .5s ease .3s both", opacity: 0 }}>
          <rect x="10" y="258" width="380" height="52" rx="12"
            fill="rgba(239,68,68,.08)" stroke="rgba(239,68,68,.25)" strokeWidth="1" />
          <text x="200" y="273" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="700"
            fontFamily="Syne,sans-serif">System Actions:</text>
          <text x="200" y="286" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">· Job Completed · End Time captured · Fee calculation triggered</text>
          <text x="200" y="298" textAnchor="middle" fontSize="7" fill="#64748b"
            fontFamily="DM Sans,sans-serif">· Payout initiated automatically · Statement generated</text>
          <text x="200" y="310" textAnchor="middle" fontSize="8" fill="#f97316" fontWeight="700"
            fontFamily="DM Sans,sans-serif">💰 BILLING TRIGGERED — Invoice auto-generated · Commission deducted</text>
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 7 – Auto Billing & Payout
═══════════════════════════════════════════ */
function SceneBilling() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let t1 = setTimeout(() => setPhase(1), 400);
    let t2 = setTimeout(() => setPhase(2), 1300);
    let t3 = setTimeout(() => setPhase(3), 2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      <rect x="10" y="18" width="182" height="284" rx="14" fill="#0d1829" stroke="rgba(56,189,248,.18)" strokeWidth="1.5" />
      <rect x="10" y="18" width="182" height="32" rx="14" fill="#0f2030" />
      <rect x="10" y="38" width="182" height="12" fill="#0f2030" />
      <text x="101" y="34" textAnchor="middle" fontSize="9" fill="#38bdf8" fontWeight="700"
        fontFamily="Syne,sans-serif">🏥 Hospital Invoice</text>
      <text x="101" y="46" textAnchor="middle" fontSize="7" fill="#475569"
        fontFamily="DM Sans,sans-serif">#DXZ-0047 · #BK-20240319-047</text>

      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease both" }}>
          <rect x="20" y="54" width="162" height="22" rx="8" fill="rgba(245,158,11,.1)" stroke="rgba(245,158,11,.3)" strokeWidth="1" />
          <text x="101" y="68" textAnchor="middle" fontSize="8.5" fill="#f59e0b" fontWeight="700"
            fontFamily="DM Sans,sans-serif">🔒 Logout OTP entered</text>
        </g>
      )}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease .1s both", opacity: 0 }}>
          <rect x="20" y="82" width="162" height="22" rx="8" fill="rgba(34,197,94,.1)" stroke="rgba(34,197,94,.3)" strokeWidth="1" />
          <text x="101" y="96" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">⏱ TIME-OUT: 11:46 AM · Job Complete</text>
        </g>
      )}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease .2s both", opacity: 0 }}>
          <text x="22" y="122" fontSize="8.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Base Plan</text>
          <text x="180" y="122" textAnchor="end" fontSize="9" fill="#f1f5f9" fontWeight="600" fontFamily="DM Sans,sans-serif">₹4,200</text>
          <line x1="22" y1="128" x2="180" y2="128" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          <text x="22" y="142" fontSize="8.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Taxes</text>
          <text x="180" y="142" textAnchor="end" fontSize="9" fill="#f1f5f9" fontWeight="600" fontFamily="DM Sans,sans-serif">₹300</text>
          <line x1="22" y1="148" x2="180" y2="148" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
        </g>
      )}
      {phase >= 1 && (
        <g style={{ animation: "fadeUp .5s ease .3s both", opacity: 0 }}>
          <text x="22" y="165" fontSize="9" fill="#64748b" fontFamily="DM Sans,sans-serif">TOTAL</text>
          <text x="180" y="168" textAnchor="end" fontSize="20" fill="#38bdf8" fontWeight="800"
            fontFamily="Syne,sans-serif">₹4,500</text>
        </g>
      )}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .4s ease both" }}>
          <text x="22" y="190" fontSize="8.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">👨‍⚕️ Dr. Arjun Kumar</text>
          <text x="22" y="202" fontSize="7.5" fill="#64748b" fontFamily="DM Sans,sans-serif">Anaesthesiologist</text>
          <text x="22" y="212" fontSize="7.5" fill="#64748b" fontFamily="DM Sans,sans-serif">Procedure: Lap Appendectomy</text>
          <text x="22" y="223" fontSize="7.5" fill="#64748b" fontFamily="DM Sans,sans-serif">09:32 AM → 11:46 AM</text>
        </g>
      )}
      {phase >= 3 && (
        <g style={{ animation: "stampIn .6s cubic-bezier(.34,1.56,.64,1) both" }}>
          <text x="22" y="250" fontSize="7.5" fill="#475569" fontFamily="DM Sans,sans-serif">Start:</text>
          <text x="48" y="250" fontSize="7.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">09:32 AM</text>
          <text x="101" y="250" fontSize="7.5" fill="#475569" fontFamily="DM Sans,sans-serif">End:</text>
          <text x="118" y="250" fontSize="7.5" fill="#94a3b8" fontFamily="DM Sans,sans-serif">11:46 AM</text>
          <rect x="20" y="240" width="162" height="18" rx="9" fill="rgba(245,158,11,.1)"
            stroke="rgba(245,158,11,.3)" strokeWidth="1" />
          <text x="101" y="281" textAnchor="middle" fontSize="8" fill="#f59e0b" fontWeight="700"
            fontFamily="DM Sans,sans-serif">Invoice Sent</text>
        </g>
      )}

      <rect x="206" y="18" width="186" height="284" rx="14" fill="#0d1f1a" stroke="rgba(34,197,94,.14)" strokeWidth="1.5" />
      <rect x="206" y="18" width="186" height="32" rx="14" fill="#0a2018" />
      <rect x="206" y="38" width="186" height="12" fill="#0a2018" />
      <text x="299" y="34" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="700"
        fontFamily="Syne,sans-serif">💰 Doctor Payout</text>

      {phase >= 2 && (
        <g style={{ animation: "fadeUp .5s ease .2s both", opacity: 0 }}>
          <text x="299" y="72" textAnchor="middle" fontSize="22">💰</text>
          <text x="299" y="100" textAnchor="middle" fontSize="11" fill="#22c55e" fontWeight="700"
            fontFamily="Syne,sans-serif">Dr. Arjun Kumar</text>
          <text x="299" y="122" textAnchor="middle" fontSize="26" fill="#22c55e" fontWeight="900"
            fontFamily="Syne,sans-serif">₹4,050</text>
          <text x="299" y="136" textAnchor="middle" fontSize="8" fill="#64748b"
            fontFamily="DM Sans,sans-serif">Transferred · UPI</text>
        </g>
      )}
      {phase >= 2 && (
        <g style={{ animation: "fadeUp .4s ease .4s both", opacity: 0 }}>
          <line x1="218" y1="148" x2="384" y2="148" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          {[["Amount Paid", "₹4,500", "#94a3b8"], ["Platform Fee (10%)", "₹450", "#ef4444"], ["Net Payout", "₹4,050", "#22c55e"]].map(([label, val, c], i) => (
            <g key={i}>
              <text x="220" y={163 + i * 18} fontSize="8" fill="#64748b" fontFamily="DM Sans,sans-serif">{label}</text>
              <text x="384" y={163 + i * 18} textAnchor="end" fontSize="8.5" fill={c} fontWeight="600"
                fontFamily="DM Sans,sans-serif">{val}</text>
            </g>
          ))}
          <text x="220" y="222" fontSize="8" fill="#64748b" fontFamily="DM Sans,sans-serif">Status</text>
          <text x="384" y="222" textAnchor="end" fontSize="8.5" fill="#22c55e" fontWeight="700"
            fontFamily="DM Sans,sans-serif">Success ✓</text>
        </g>
      )}
      {phase >= 3 && (
        <>
          {/* {[...Array(8)].map((_,i)=>(
            <circle key={i} cx={216+i*18} cy="234" r="3"
              fill={["#f59e0b","#10b981","#0ea5e9","#8b5cf6","#ef4444","#22c55e","#38bdf8","#fbbf24"][i]}
              style={{ animation:`confetti ${.8+i*.08}s ease ${i*.1}s both` }}/>
          ))} */}
          <g style={{ animation: "fadeUp .5s ease .2s both", opacity: 0 }}>
            <rect x="218" y="240" width="168" height="26" rx="13" fill="rgba(34,197,94,.12)"
              stroke="rgba(34,197,94,.4)" strokeWidth="1" />
            <text x="302" y="257" textAnchor="middle" fontSize="9" fill="#22c55e" fontWeight="700"
              fontFamily="DM Sans,sans-serif">✓ JOB COMPLETED</text>
          </g>
          <g style={{ animation: "fadeUp .4s ease .4s both", opacity: 0 }}>
            <rect x="218" y="272" width="168" height="20" rx="10" fill="rgba(56,189,248,.08)"
              stroke="rgba(56,189,248,.25)" strokeWidth="1" />
            <text x="302" y="286" textAnchor="middle" fontSize="7.5" fill="#38bdf8" fontWeight="700"
              fontFamily="DM Sans,sans-serif">📋 Full statement sent</text>
          </g>
        </>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE 8 – Rating
═══════════════════════════════════════════ */

function SceneRating() {
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [catRatings, setCatRatings] = useState([0, 0, 0, 0]);

  const cats = [
    { label: "Punctuality", icon: "⏱" },
    { label: "Communication", icon: "💬" },
    { label: "Skill", icon: "🩺" },
    { label: "Behaviour", icon: "🤝" },
  ];

  useEffect(() => {
    let t1 = setTimeout(() => setPhase(1), 400);
    let t2 = setTimeout(() => setSelected(1), 1400);
    let t3 = setTimeout(() => setSelected(2), 1900);
    let t4 = setTimeout(() => setSelected(3), 2400);
    let t5 = setTimeout(() => setSelected(4), 2900);
    let t6 = setTimeout(() => setSelected(5), 3400);
    let t7 = setTimeout(() => setCatRatings([5, 0, 0, 0]), 3900);
    let t8 = setTimeout(() => setCatRatings([5, 4, 0, 0]), 4300);
    let t9 = setTimeout(() => setCatRatings([5, 4, 5, 0]), 4700);
    let t10 = setTimeout(() => setCatRatings([5, 4, 5, 5]), 5100);
    let t11 = setTimeout(() => { setPhase(2); setSubmitted(true); }, 2000);
    return () => [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11].forEach(clearTimeout);
  }, []);

  const avg = catRatings.filter(r => r > 0).length
    ? (catRatings.reduce((a, b) => a + b, 0) / catRatings.filter(r => r > 0).length).toFixed(1)
    : "0.0";

  return (
    <svg viewBox="0 0 400 320" style={{ width: "100%", height: "100%" }}>
      <rect x="8" y="14" width="184" height="298" rx="14" fill="#0d1829" stroke="rgba(251,191,36,.25)" strokeWidth="1.5" />
      <rect x="8" y="14" width="184" height="28" rx="14" fill="#1a1500" />
      <rect x="8" y="30" width="184" height="12" fill="#1a1500" />
      <text x="100" y="31" textAnchor="middle" fontSize="8" fill="#fbbf24" fontWeight="800" fontFamily="Syne,sans-serif">🏥 Hospital Feedback</text>

      {phase >= 1 && (
        <g style={{ animation: "fadeUp .5s ease both" }}>
          <circle cx="100" cy="67" r="22" fill="rgba(251,191,36,.1)" stroke="rgba(251,191,36,.35)" strokeWidth="1.5" />
          <text x="100" y="74" textAnchor="middle" fontSize="22">👨‍⚕️</text>
          <text x="100" y="99" textAnchor="middle" fontSize="9" fill="#f1f5f9" fontWeight="700" fontFamily="Syne,sans-serif">Dr. Arjun Kumar</text>
          <text x="100" y="110" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="DM Sans,sans-serif">Anaesthesiologist</text>
        </g>
      )}

      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease .2s both", opacity: 0 }}>
          <text x="100" y="128" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="DM Sans,sans-serif">Overall Rating</text>
          {[1, 2, 3, 4, 5].map(s => (
            <text key={s} x={48 + s * 20} y="150" textAnchor="middle" fontSize="22"
              fill={s <= selected ? "#fbbf24" : "#1e293b"}
              style={{ transition: "fill .2s", filter: s <= selected ? "drop-shadow(0 0 4px rgba(251,191,36,.6))" : "none" }}>★</text>
          ))}
          {selected > 0 && (
            <text x="100" y="164" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="700" fontFamily="DM Sans,sans-serif">
              {["", "Poor", "Fair", "Good", "Great", "Excellent!"][selected]}
            </text>
          )}
        </g>
      )}

      {phase >= 1 && (
        <g style={{ animation: "fadeUp .4s ease .35s both", opacity: 0 }}>
          <line x1="16" y1="174" x2="184" y2="174" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          {cats.map(({ label, icon }, i) => (
            <g key={i} style={{ animation: `fadeUp .3s ease ${.4 + i * .1}s both`, opacity: 0 }}>
              <text x="18" y={188 + i * 22} fontSize="8" fill="#64748b" fontFamily="DM Sans,sans-serif">{icon} {label}</text>
              {[1, 2, 3, 4, 5].map(s => (
                <text key={s} x={118 + s * 12} y={189 + i * 22} textAnchor="middle" fontSize="11"
                  fill={s <= catRatings[i] ? "#fbbf24" : "#1e293b"} style={{ transition: "fill .25s" }}>★</text>
              ))}
            </g>
          ))}
        </g>
      )}

      {submitted ? (
        <g style={{ animation: "stampIn .5s cubic-bezier(.34,1.56,.64,1) both" }}>
          <rect x="16" y="268" width="168" height="24" rx="12" fill="rgba(251,191,36,.12)" stroke="rgba(251,191,36,.4)" strokeWidth="1" />
          <text x="100" y="284" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="800" fontFamily="DM Sans,sans-serif">✓ Rating Submitted</text>
        </g>
      ) : (
        <g style={{ animation: "fadeUp .4s ease .5s both", opacity: 0 }}>
          <rect x="16" y="268" width="168" height="24" rx="12" fill="#fbbf24" />
          <text x="100" y="284" textAnchor="middle" fontSize="9" fill="#1a1000" fontWeight="800" fontFamily="DM Sans,sans-serif">Submit Rating →</text>
        </g>
      )}

      <rect x="204" y="14" width="188" height="298" rx="14" fill="#100e00" stroke="rgba(251,191,36,.2)" strokeWidth="1.5" />
      <rect x="204" y="14" width="188" height="28" rx="14" fill="#1a1500" />
      <rect x="204" y="30" width="188" height="12" fill="#1a1500" />
      <text x="298" y="31" textAnchor="middle" fontSize="8" fill="#fbbf24" fontWeight="800" fontFamily="Syne,sans-serif">⭐ Doctor Score Card</text>

      {phase >= 1 && (
        <g style={{ animation: "fadeUp .5s ease .1s both", opacity: 0 }}>
          <circle cx="298" cy="80" r="34" fill="none" stroke="rgba(251,191,36,.1)" strokeWidth="6" />
          <circle cx="298" cy="80" r="34" fill="none" stroke="#fbbf24" strokeWidth="6"
            strokeDasharray="213.6" strokeLinecap="round"
            strokeDashoffset={submitted ? 213.6 - 213.6 * (parseFloat(avg) / 5) : 213.6}
            style={{ transition: "stroke-dashoffset 1.2s ease .5s", transformOrigin: "298px 80px", transform: "rotate(-90deg)" }} />
          <text x="298" y="76" textAnchor="middle" fontSize="18" fill="#fbbf24" fontWeight="900" fontFamily="Syne,sans-serif">{submitted ? avg : "—"}</text>
          <text x="298" y="89" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="DM Sans,sans-serif">out of 5.0</text>
        </g>
      )}

      {submitted && (
        <g style={{ animation: "fadeUp .5s ease .3s both", opacity: 0 }}>
          <line x1="212" y1="126" x2="384" y2="126" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
          {[["Total Jobs", "47", "#38bdf8"], ["Avg Rating", "4.8 ⭐", "#fbbf24"], ["Response Time", "< 5 min", "#a78bfa"]].map(([label, val, c], i) => (
            <g key={i} style={{ animation: `fadeUp .3s ease ${.35 + i * .1}s both`, opacity: 0 }}>
              <text x="216" y={141 + i * 20} fontSize="7.5" fill="#64748b" fontFamily="DM Sans,sans-serif">{label}</text>
              <text x="382" y={141 + i * 20} textAnchor="end" fontSize="8.5" fill={c} fontWeight="700" fontFamily="DM Sans,sans-serif">{val}</text>
            </g>
          ))}
        </g>
      )}

      {submitted && (
        <g style={{ animation: "stampIn .7s cubic-bezier(.34,1.56,.64,1) .4s both", opacity: 0 }}>
          <rect x="212" y="210" width="172" height="44" rx="10" fill="rgba(251,191,36,.08)" stroke="rgba(251,191,36,.35)" strokeWidth="1.5" />
          <text x="298" y="226" textAnchor="middle" fontSize="14">🏆</text>
          <text x="298" y="240" textAnchor="middle" fontSize="8.5" fill="#fbbf24" fontWeight="800" fontFamily="Syne,sans-serif">Top Rated Specialist</text>
          <text x="298" y="251" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="DM Sans,sans-serif">Doxez Verified</text>
        </g>
      )}

      {/* {submitted && (
        <g style={{ animation:"fadeUp .4s ease .6s both", opacity:0 }}>
          <rect x="212" y="262" width="172" height="20" rx="10" fill="rgba(34,197,94,.08)" stroke="rgba(34,197,94,.25)" strokeWidth="1"/>
          <text x="298" y="276" textAnchor="middle" fontSize="7.5" fill="#22c55e" fontWeight="700" fontFamily="DM Sans,sans-serif">📋 Review saved to CRM</text>
        </g>
      )} */}

      {submitted && (
        <g style={{ animation: "fadeUp .4s ease .7s both", opacity: 0 }}>
          <rect x="212" y="266" width="172" height="20" rx="10" fill="rgba(56,189,248,.08)" stroke="rgba(56,189,248,.25)" strokeWidth="1" />
          <text x="298" y="280" textAnchor="middle" fontSize="7.5" fill="#38bdf8" fontWeight="700" fontFamily="DM Sans,sans-serif">✅ Case Fully Closed</text>
        </g>
      )}
    </svg>
  );
}

const SCENES = [SceneWhatsapp, SceneVerify, SceneMatch, ScenePayment, SceneOtpLogin, SceneOtpLogout, SceneBilling, SceneRating];

/* ═══════════════════════════════════════════
   STEPS DATA — left side unchanged
═══════════════════════════════════════════ */
const STEPS = [
  {
    id: "01", phase: "Request", title: "Hospital Sends Request",
    desc: "Hospital contacts Doxez via WhatsApp or Phone Call. Case summary, patient info & urgency entered.",
    color: "#0ea5e9", glow: "rgba(14,165,233,.3)", icon: "💬", tag: "WhatsApp Bot"
  },
  {
    id: "02", phase: "Verification", title: "Customer Care Verification",
    desc: "Care team calls hospital to verify ASA status, case type, duration & surgery plan. Doctor roster checked for availability.",
    color: "rgb(139, 92, 246)", glow: "rgba(139,92,246,.3)", icon: "🎧", tag: "Dashboard Entry"
  },
  {
    id: "03", phase: "AI Matching", title: "Smart Matching & Broadcast",
    desc: "System matches doctors on specialty, proximity & availability. Initial intimation sent — no investigations shared. First to accept gets the case.",
    color: "#f59e0b", glow: "rgba(245,158,11,.3)", icon: "⚡", tag: "AI Matching"
  },
  {
    id: "04", phase: "Payment", title: "Hospital Notification & Payment",
    desc: "Doctor confirmed → hospital notified. Payment link sent via WhatsApp.",
    color: "#10b981", glow: "rgba(16,185,129,.3)", icon: "💳", tag: "Doxez Pay"
  },
  {
    id: "05", phase: "OTP Login", title: "Arrival Verification (Login OTP)",
    desc: "Booking ID triggers OTP. Hospital receives Login OTP & shares it with doctor on arrival. Doctor enters it → Time-IN recorded → Job Started.",
    color: "#68de93", glow: "rgba(68, 239, 108, 0.3)", icon: "🔐", tag: "OTP Login"
  },
  {
    id: "06", phase: "OTP Logout", title: "Job Completion (Logout OTP)",
    desc: "After surgery, hospital receives Logout OTP. Doctor enters it → Time-OUT recorded → job marked complete. Billing triggered automatically.",
    color: "#f6c55c", glow: "rgba(246, 169, 92, 0.3)", icon: "✅", tag: "OTP Logout"
  },
  {
    id: "07", phase: "Completion", title: "Auto Billing & Payout",
    desc: "Fee calculated, 10% platform charge deducted. Invoice generated. Payout statement sent. Job Completed.",
    color: "#38bdf8", glow: "rgba(56,189,248,.3)", icon: "💰", tag: "Auto Billing"
  },
  {
    id: "08", phase: "Rating", title: "Hospital Rates Doctor",
    desc: "After job completion, hospital submits a star rating across Punctuality, Communication, Skill & Behaviour. Score updates doctor's Doxez profile instantly.",
    color: "#fbbf24", glow: "rgba(251,191,36,.3)", icon: "⭐", tag: "Rating"
  },

];

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function DoxezWorkflow() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const progRef = useRef(null);
  const DURATION = 7000;

  const goTo = (i) => {
    clearTimeout(timerRef.current);
    clearInterval(progRef.current);
    setActive(i); setKey(k => k + 1); setProgress(0);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let wasHidden = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (wasHidden) {
          clearTimeout(timerRef.current); clearInterval(progRef.current);
          setActive(0); setKey(k => k + 1); setProgress(0);
          wasHidden = false;
        }
        setIsVisible(true);
      } else { wasHidden = true; setIsVisible(false); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    clearInterval(progRef.current);
    let start = Date.now();
    progRef.current = setInterval(() => setProgress(Math.min(100, ((Date.now() - start) / DURATION) * 100)), 40);
    timerRef.current = setTimeout(() => {
      setActive(p => { const next = (p + 1) % STEPS.length; setKey(k => k + 1); return next; });
      setProgress(0);
    }, DURATION);
    return () => { clearTimeout(timerRef.current); clearInterval(progRef.current); };
  }, [active, isVisible]);

  const step = STEPS[active];
  const SceneNow = SCENES[active];

  return (
    <>
      <style>{CSS}</style>
      <div ref={sectionRef} style={{ minHeight: 920, overflow: "hidden", position: "relative" }}>
        <section className="wf-section"
          style={{
            padding: "60px 24px 130px", background: "#f4f8fc", position: "relative",
            overflow: "hidden", fontFamily: "'DM Sans',sans-serif"
          }}>

          {[...Array(70)].map((_, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%", background: "white",
              width: Math.random() < .7 ? "1px" : "2px"
            }} />
          ))}
          <div style={{
            position: "absolute", width: 700, height: 700, borderRadius: "50%", filter: "blur(90px)",
            pointerEvents: "none", background: "radial-gradient(circle,rgba(11,118,255,.08),transparent 70%)",
            top: "-180px", left: "-250px", animation: "blobF 9s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", width: 560, height: 560, borderRadius: "50%", filter: "blur(90px)",
            pointerEvents: "none", background: "radial-gradient(circle,rgba(139,92,246,.06),transparent 70%)",
            bottom: "-140px", right: "-180px", animation: "blobF 9s ease-in-out infinite", animationDelay: "-4s"
          }} />

          <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 2 }}>

            {/* HEADER */}
            <div className="wf-header" style={{ textAlign: "center", marginBottom: 88 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, background: "#ddeeff",
                border: "1px solid #b3d4ff", color: "#0b76ff", padding: "7px 20px", borderRadius: 999,
                fontSize: 11, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 26
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#0b6ff3",
                  animation: "twinkle 1.5s ease infinite"
                }} />
                How Doxez Works
              </div>
              <h2 style={{
                fontFamily: "'Syne',sans-serif", fontSize: "clamp(22px,3vw,36px)",
                fontWeight: 800, lineHeight: 1.08, color: "#0b1f3a", marginBottom: 18, letterSpacing: "-.02em"
              }}>
                End-to-End <span style={{ color: "#0b76ff" }}>Automated</span>
              </h2>
              <p style={{ fontSize: 16, color: "#4a6080", maxWidth: 520, margin: "0 auto", lineHeight: 1.85 }}>
                From a single WhatsApp message to verified payout — seven seamless steps powered by
                automation, AI matching, and OTP confirmation.
              </p>
            </div>

            {/* GRID */}
            <div className="wf-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 60, alignItems: "center"
            }}>

              {/* LEFT: steps */}
              <div className="wf-steps" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {STEPS.map((s, i) => (
                  <div key={i} onClick={() => goTo(i)} style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                    border: `1.5px solid ${active === i ? s.color + "45" : "transparent"}`,
                    background: active === i ? `${s.color}0a` : "transparent",
                    transition: "all .35s", position: "relative"
                  }}>
                    {i < STEPS.length - 1 && (
                      <div className="wf-connector" style={{
                        position: "absolute", left: 29, bottom: -14,
                        width: 2, height: 26, borderRadius: 999,
                        background: `linear-gradient(to bottom,${s.color}45,transparent)`
                      }} />
                    )}
                    <div className="wf-step-num" style={{
                      width: 28, height: 28, borderRadius: 9, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 11, fontWeight: 900, flexShrink: 0, marginTop: 1,
                      background: active === i ? s.color : active > i ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.04)",
                      color: active === i ? "#fff" : active > i ? s.color : "#94a3b8",
                      boxShadow: active === i ? `0 0 0 5px ${s.glow}` : "none", transition: "all .35s"
                    }}>
                      {active > i ? "✓" : s.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 10, fontWeight: 800, letterSpacing: ".08em",
                        textTransform: "uppercase", color: active === i ? s.color : "#94a3b8", marginBottom: 2, transition: ".3s"
                      }}>
                        {s.phase}
                      </div>
                      <div className="wf-step-title" style={{
                        fontFamily: "'Syne',sans-serif", fontSize: 14,
                        fontWeight: 700, color: active === i ? "#0b1f3a" : "#4a6080", lineHeight: 1.3, transition: ".3s"
                      }}>
                        {s.title}
                      </div>
                      <div className="wf-step-desc" style={{
                        fontSize: 12.5, color: "#64748b", lineHeight: 1.65, marginTop: 3,
                        maxHeight: active === i ? "80px" : 0, overflow: "hidden",
                        opacity: active === i ? 1 : 0, transition: "max-height .45s ease, opacity .4s ease"
                      }}>
                        {s.desc}
                      </div>
                      {active === i && (
                        <div style={{
                          height: 2, borderRadius: 999, background: "rgba(255,255,255,.07)",
                          marginTop: 10, overflow: "hidden"
                        }}>
                          <div style={{
                            height: "100%", borderRadius: 999, background: s.color,
                            width: `${progress}%`, transition: "width .04s linear"
                          }} />
                        </div>
                      )}
                    </div>
                    <div className="wf-step-tag" style={{
                      padding: "3px 9px", borderRadius: 999, flexShrink: 0, marginTop: 2,
                      background: `${s.color}14`, border: `1px solid ${s.color}30`,
                      fontSize: 10, fontWeight: 700, color: s.color,
                      opacity: active === i ? 1 : .25, transition: "opacity .3s"
                    }}>
                      {s.tag}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT: visual stage */}
              <div className="wf-stage" style={{
                borderRadius: 28, overflow: "hidden",
                background: "linear-gradient(135deg,#0d1829 0%,#091120 100%)",
                border: "1.5px solid rgba(255,255,255,.06)",
                boxShadow: `0 40px 100px rgba(0,0,0,.55), 0 0 0 1px ${step.color}18, inset 0 1px 0 rgba(255,255,255,.04)`,
                position: "relative", aspectRatio: "1/0.85", transition: "box-shadow .7s ease"
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(ellipse at 70% 25%,${step.glow},transparent 65%)`,
                  transition: "background .9s ease", pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute", top: 18, left: 18, display: "flex",
                  alignItems: "center", gap: 8, zIndex: 10
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: step.color,
                    animation: "twinkle 1.2s ease infinite"
                  }} />
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
                    textTransform: "uppercase", color: step.color, opacity: .8
                  }}>{step.tag}</span>
                </div>
                <div style={{
                  position: "absolute", top: 16, right: 16, width: 34, height: 34,
                  borderRadius: 10, background: `${step.color}1a`, border: `1px solid ${step.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
                }}>
                  {step.icon}
                </div>
                <div key={key} style={{
                  position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center", padding: 10
                }}>
                  <SceneNow />
                </div>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 22px",
                  background: "linear-gradient(to top,rgba(0,0,0,.85),transparent)",
                  borderTop: "1px solid rgba(255,255,255,.04)"
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: "#f1f5f9",
                    fontFamily: "'Syne',sans-serif", marginBottom: 2
                  }}>{step.title}</div>
                  <div style={{ fontSize: 11, color: "#334155" }}>Phase {step.id} of {STEPS.length}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}