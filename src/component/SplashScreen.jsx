import { useEffect, useState, useRef } from "react";
import logoImg from "../assets/DOXEZ_LOGHO.png";

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // Canvas particle heartbeat
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let t = 0;

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    // ECG-like pulse line
    const drawPulse = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Soft radial gradient background glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340);
      grd.addColorStop(0, "rgba(11,118,255,0.07)");
      grd.addColorStop(0.5, "rgba(11,118,255,0.03)");
      grd.addColorStop(1, "rgba(11,118,255,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Heartbeat / ECG line
      const lineY = cy + 180;
      const lineLen = 320;
      const startX = cx - lineLen / 2;

      ctx.beginPath();
      ctx.moveTo(startX, lineY);

      for (let i = 0; i <= lineLen; i++) {
        const x = startX + i;
        const progress = i / lineLen;
        const wave = progress * Math.PI * 2 - t * 1.8;

        let y = lineY;
        // ECG spike in the middle
        if (progress > 0.38 && progress < 0.62) {
          const spike = Math.sin((progress - 0.38) / 0.24 * Math.PI);
          y = lineY - spike * spike * 38 * Math.sin(t * 2.5 + 1);
        } else {
          y = lineY + Math.sin(wave) * 2.5;
        }
        ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(startX, 0, startX + lineLen, 0);
      grad.addColorStop(0, "rgba(11,118,255,0)");
      grad.addColorStop(0.3, "rgba(11,118,255,0.5)");
      grad.addColorStop(0.5, "rgba(56,189,248,0.9)");
      grad.addColorStop(0.7, "rgba(11,118,255,0.5)");
      grad.addColorStop(1, "rgba(11,118,255,0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Traveling dot on the line
      const dotProgress = ((t * 0.3) % 1);
      const dotX = startX + dotProgress * lineLen;
      const dotWave = dotProgress * Math.PI * 2 - t * 1.8;
      let dotY = lineY;
      if (dotProgress > 0.38 && dotProgress < 0.62) {
        const spike = Math.sin((dotProgress - 0.38) / 0.24 * Math.PI);
        dotY = lineY - spike * spike * 38 * Math.sin(t * 2.5 + 1);
      } else {
        dotY = lineY + Math.sin(dotWave) * 2.5;
      }

      ctx.beginPath();
      ctx.arc(dotX, dotY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,189,248,0.9)";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#38bdf8";
      ctx.fill();
      ctx.shadowBlur = 0;

      t += 0.012;
      rafRef.current = requestAnimationFrame(drawPulse);
    };

    drawPulse();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => setPhase(5), 3300),
      setTimeout(() => onDone?.(), 4100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;600;700;800&display=swap');

    @keyframes sp_bgIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes sp_logoIn {
      0%   { opacity: 0; transform: scale(0.6) translateY(16px); }
      60%  { opacity: 1; transform: scale(1.04) translateY(-2px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes sp_circlePulse {
      0%   { transform: scale(1);    opacity: 0.5; }
      50%  { transform: scale(1.06); opacity: 0.8; }
      100% { transform: scale(1);    opacity: 0.5; }
    }
    @keyframes sp_ringOut {
      0%   { transform: scale(0.9); opacity: 0.7; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    @keyframes sp_nameIn {
      0%   { opacity: 0; transform: translateY(22px); filter: blur(6px); }
      100% { opacity: 1; transform: translateY(0);    filter: blur(0); }
    }
    @keyframes sp_lineExpand {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes sp_tagIn {
      0%   { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes sp_dotIn {
      0%   { opacity: 0; transform: scale(0); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes sp_dotPulse {
      0%,100% { opacity: 0.35; transform: scaleY(0.5); }
      50%      { opacity: 1;    transform: scaleY(1); }
    }
    @keyframes sp_exit {
      0%   { opacity: 1; transform: scale(1); }
      30%  { opacity: 1; transform: scale(1.01); }
      100% { opacity: 0; transform: scale(1.05); }
    }
    @keyframes sp_shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }

    .sp_root {
      position: fixed; inset: 0; z-index: 99999;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      font-family: 'Sora', sans-serif;
      overflow: hidden;
      background: #ffffff;
      animation: sp_bgIn 0.4s ease both;
    }
    .sp_exit { animation: sp_exit 0.85s cubic-bezier(0.4,0,0.2,1) both; }

    .sp_canvas {
      position: absolute; inset: 0;
      pointer-events: none; z-index: 1;
    }

    /* Subtle background texture */
    .sp_bg_texture {
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 50% 40%, rgba(11,118,255,0.04) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 20% 80%, rgba(56,189,248,0.03) 0%, transparent 60%),
        radial-gradient(ellipse 40% 30% at 80% 20%, rgba(11,118,255,0.025) 0%, transparent 60%);
    }

    /* Logo area */
    .sp_logo_container {
      position: relative; z-index: 10;
      display: flex; flex-direction: column;
      align-items: center;
    }

    .sp_ring_wrap {
   display: none;
    }

    .sp_ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(11,118,255,0.15);
      animation: sp_ringOut 2.2s ease-out infinite;
      pointer-events: none;
    }
    .sp_ring:nth-child(2) { animation-delay: 0.7s; }
    .sp_ring:nth-child(3) { animation-delay: 1.4s; }

    .sp_logo_circle {
      width: 100px; height: 100px; border-radius: 50%;
      background: #ffffff;
      border: 1.5px solid rgba(11,118,255,0.12);
      display: flex; align-items: center; justify-content: center;
      box-shadow:
        0 0 0 8px rgba(11,118,255,0.04),
        0 0 0 18px rgba(11,118,255,0.025),
        0 20px 60px rgba(11,118,255,0.12),
        0 4px 16px rgba(0,0,0,0.06);
      animation: sp_logoIn 0.9s cubic-bezier(0.22,1,0.36,1) both, sp_circlePulse 3s ease 1s infinite;
      position: relative; z-index: 2; overflow: hidden;
    }
    .sp_logo_circle::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 60%);
      background-size: 200% 200%;
      animation: sp_shimmer 2.5s ease 1s both;
    }
    .sp_logo_img {
      width: 62px; height: 62px;
      object-fit: contain;
      position: relative; z-index: 1;
    }

    /* Brand + tagline */
    .sp_text_block {
      text-align: center; position: relative; z-index: 10;
    }
    .sp_brand {
      font-size: 56px; font-weight: 800; line-height: 1;
      color: #0b1f3a;
      letter-spacing: -0.04em;
      animation: sp_nameIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
    }
    .sp_logo_main {
      width: 220px;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
      animation: sp_nameIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
    }
    @media (max-width: 640px) {
      .sp_logo_main {
        width: 150px;
      }
    }
    .sp_brand_accent {
      color: #0b76ff;
    }

    .sp_divider_wrap {
      display: flex; align-items: center; justify-content: center;
      gap: 10px; margin: 14px 0 12px;
    }
    .sp_divider_line {
      height: 1px; width: 48px;
      background: linear-gradient(90deg, transparent, #0b76ff);
      transform-origin: right;
      animation: sp_lineExpand 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .sp_divider_line.right {
      background: linear-gradient(90deg, #0b76ff, transparent);
      transform-origin: left;
    }
    .sp_divider_dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: #0b76ff;
      animation: sp_dotIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
    }

    .sp_tagline {
      font-size: 11.5px; font-weight: 300;
      color: #6b87a8;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      animation: sp_tagIn 0.6s ease both;
    }

    /* Loading bar */
    .sp_loader_wrap {
      position: absolute; bottom: 56px;
      display: flex; flex-direction: column;
      align-items: center; gap: 10px;
      z-index: 10;
    }
    .sp_bars {
      display: flex; align-items: center; gap: 5px; height: 18px;
    }
    .sp_bar {
      width: 3px; border-radius: 99px;
      background: #0b76ff;
      animation: sp_dotPulse 1.1s ease infinite;
    }
    .sp_bar:nth-child(1) { height: 8px;  animation-delay: 0s; }
    .sp_bar:nth-child(2) { height: 14px; animation-delay: 0.1s; background: #3b9eff; }
    .sp_bar:nth-child(3) { height: 18px; animation-delay: 0.2s; }
    .sp_bar:nth-child(4) { height: 14px; animation-delay: 0.3s; background: #3b9eff; }
    .sp_bar:nth-child(5) { height: 8px;  animation-delay: 0.4s; }
    .sp_bar:nth-child(6) { height: 12px; animation-delay: 0.15s; }
    .sp_bar:nth-child(7) { height: 18px; animation-delay: 0.25s; background: #3b9eff; }
    .sp_bar:nth-child(8) { height: 10px; animation-delay: 0.35s; }

    .sp_loader_text {
      font-size: 10px; font-weight: 400;
      color: rgba(107,135,168,0.6);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    /* Top subtle line */
    .sp_top_line {
      position: absolute; top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent 0%, #0b76ff 40%, #38bdf8 60%, transparent 100%);
      z-index: 20;
    }
  `;

  return (
    <>
      <style>{CSS}</style>
      <div className={`sp_root${phase === 5 ? " sp_exit" : ""}`}>

        <div className="sp_bg_texture" />
        <canvas ref={canvasRef} className="sp_canvas" />

        {/* Top accent line */}
        {phase >= 2 && <div className="sp_top_line" />}

        {/* Logo with rings */}
        {phase >= 1 && (
          <div className="sp_logo_container">
            <div className="sp_ring_wrap">
            </div>

            {/* Brand name */}
            {phase >= 2 && (
              <div className="sp_text_block">
                <img src={logoImg} alt="DoxEZ" className="sp_logo_main" />
              </div>
            )}
          </div>
        )}

        {/* Audio-bar loader */}
        {phase >= 3 && phase < 5 && (
          <div className="sp_loader_wrap">
            <div className="sp_bars">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="sp_bar" />
              ))}
            </div>
            <div className="sp_loader_text">Loading</div>
          </div>
        )}

      </div>
    </>
  );
}


