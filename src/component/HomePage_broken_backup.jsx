import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  Menu,
  X,
  ChevronRight,
  Handshake,
  UserPlus,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Stethoscope,
  CreditCard,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Smartphone
} from "lucide-react";

// Local Assets
import nurse from "../assets/nurse.webp";
import img1 from "../assets/IITBBSR.png";
import img2 from "../assets/StartupIndia.png";
import img3 from "../assets/StartupOdisha.png";
import imgH from "../assets/prev.png";
import Priya from "../assets/Priya.jpg";
import Arjun from "../assets/Arjun.jpg";
// import sneha from "../assets/Snhea.jpg";
import Prof from "../assets/prof.jpg";

/* ── Testimonials data ── */
const TESTIMONIALS = [
  { name: "Dr. Priya Sharma", dept: "Cardiology", rating: 5, msg: "DoxEZ connected me with 3 placements in just one week. The verification process was smooth and facilities trusted my credentials instantly.", avatar: Priya, color: "#1E1B4B" },
  { name: "Dr. Arjun Mehta", dept: "Anaesthesiology", rating: 5, msg: "Best platform for locum doctors in India. Got my first case within 24 hours of registration. The automated workflow is brilliant.", avatar: Arjun, color: "#2DD4BF" },
  // { name: "Dr. Sneha Patel", dept: "Paediatrics", rating: 5, msg: "The automatic billing and transparent payout made everything stress-free. I focus on patients, DoxEZ handles the rest.", avatar: sneha, color: "#10B981" },
];

const PARTNER_LOGOS = [img1, img2, img3, img1, img2, img3];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-indigo-950 rounded-xl flex items-center justify-center group-hover:bg-indigo-900 transition-colors">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-indigo-950">DOXEZ</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-indigo-950/80">
            <a href="#services" className="hover:text-teal-500 transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-teal-500 transition-colors">How it Works</a>
            <a href="#partners" className="hover:text-teal-500 transition-colors">Partnerships</a>
          </div>

          <div className="hidden md:block">
            <a href="https://wa.me/919692949500" className="bg-indigo-950 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-slate-800 hover:scale-105 transition-all shadow-lg active:scale-95">
              <MessageSquare size={18} />
              WhatsApp Connect
            </a>
          </div>

          <button className="md:hidden text-indigo-950" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl py-8 px-6 flex flex-col gap-5 md:hidden"
            >
              {["Services", "How it Works", "Partnerships"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/ /g, "-")}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-indigo-950 flex justify-between items-center border-b border-slate-50 pb-2">
                  {link} <ChevronRight size={18} className="text-teal-500" />
                </a>
              ))}
              <a href="https://wa.me/919692949500" className="bg-indigo-950 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 shadow-xl mt-4">
                <MessageSquare size={20} />
                Connect on WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-teal-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-950/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/10 text-sm font-bold mb-8">
              <Zap size={14} className="fill-teal-600" />
              <span>Digital Health Staffing Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-indigo-950 leading-[1.05] mb-8 tracking-tight">
              Anesthesia on Demand, <br />
              <span className="bg-gradient-to-r from-indigo-950 to-teal-500 bg-clip-text text-transparent italic">Via WhatsApp.</span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              India's first automated healthcare staffing platform. No complex apps or forms—just instant expert matching directly where you chat.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a href="tel:+919692949500" className="bg-indigo-950 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-950/20 active:translate-y-0">
                <Phone size={22} />
                Book a Specialist
              </a>
              <button className="bg-white text-indigo-950 border-2 border-indigo-950 px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-indigo-50 hover:-translate-y-1 transition-all active:translate-y-0">
                Join as Doctor
                <ArrowRight size={22} />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8 py-6 border-t border-slate-100">
              <div className="flex items-center gap-3 text-indigo-950 font-bold">
                <ShieldCheck className="text-teal-500" size={24} />
                <span className="text-lg">100+ Verified Staff</span>
              </div>
              <div className="flex items-center gap-3 text-indigo-950 font-bold">
                <ShieldCheck className="text-teal-500" size={24} />
                <span className="text-lg">15+ Partner Hospitals</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden bg-slate-100 shadow-3xl border-[12px] border-white relative">
              <img src={imgH} alt="Modern Surgeon" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-indigo-950/10 mix-blend-multiply" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-10 left-10 right-10 bg-white/40 backdrop-blur-2xl p-6 rounded-3xl border border-white/30 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-indigo-950 text-xs uppercase tracking-widest mb-1">Live Case Match</h4>
                    <p className="text-indigo-950/80 font-bold">Apollo Hospitals — Verified Specialist Assigned</p>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-400/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-600/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-6">Simplified Workflow</h2>
            <p className="text-lg text-slate-600 font-medium">We've removed the barriers. No apps to learn, just immediate healthcare logistics.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { icon: <Smartphone size={40} />, title: "Request", desc: "Hospitals send case details via a quick WhatsApp chat to our bot." },
              { icon: <UserSwitch size={40} />, title: "Match", desc: "Engine alerts verified specialists within minutes based on distance/skills." },
              { icon: <Zap size={40} />, title: "Success", desc: "Case confirmed instantly. Integrated billing & automated payouts follow." }
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center group transition-all"
              >
                <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-950 mb-8 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-indigo-950 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{step.desc}</p>
                <div className="absolute top-10 right-12 text-7xl font-black text-indigo-950/5 select-none font-outfit">0{i + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-950 text-white text-xs font-black uppercase tracking-widest mb-8">For Hospitals</div>
              <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-10 leading-tight">Effortless Surgical <br />Department Scaling</h2>
              <div className="space-y-6">
                {[
                  { icon: <Clock />, title: "Instant Shift Coverage", desc: "Emergency or routine, get verified staff in under 4 hours." },
                  { icon: <ShieldCheck />, title: "100% Credentialing", desc: "Every professional is license-verified and skill-assessed." },
                  { icon: <Building2 />, title: "Centralized Billing", desc: "One invoice for all your temporary staffing needs." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl border border-slate-50 hover:border-indigo-100 hover:bg-slate-50/50 transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div>
                      <h4 className="text-xl font-black text-indigo-950 mb-2">{s.title}</h4>
                      <p className="text-slate-600 font-medium">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-xs font-black uppercase tracking-widest mb-8 border border-teal-500/10">For Specialists</div>
              <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-10 leading-tight">Work With <br />Unmatched Freedom</h2>
              <div className="space-y-6">
                {[
                  { icon: <MapPin />, title: "Location-Based Case Alerts", desc: "Receive alerts for high-value cases within your preferred radius." },
                  { icon: <CreditCard />, title: "Instant Post-Case Payout", desc: "Automatic digital payouts as soon as the case is closed." },
                  { icon: <Stethoscope />, title: "Build Your Reputation", desc: "Work with top-tier hospitals and build a verified career profile." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl border border-slate-50 hover:border-teal-100 hover:bg-teal-50/10 transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <div>
                      <h4 className="text-xl font-black text-indigo-950 mb-2">{s.title}</h4>
                      <p className="text-slate-600 font-medium">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING ── */}
      <section id="partners" className="py-24 bg-indigo-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/40 -skew-x-[30deg] translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Join Indias First <br />Staffing Revolution</h2>
              <p className="text-xl text-indigo-200 mb-12 font-medium">Over 100 professionals and 15 hospitals are already optimizing their operations with DOXEZ.</p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-teal-500 text-indigo-950 px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-400 hover:scale-105 transition-all shadow-xl shadow-teal-500/20">
                  <Handshake size={22} />
                  Register Hospital
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  <UserPlus size={22} />
                  Apply as Doctor
                </button>
              </div>

              <div className="mt-16 flex items-center gap-12 border-t border-white/10 pt-10">
                <div>
                  <div className="text-4xl font-black text-teal-400 mb-1">2.4k+</div>
                  <div className="text-indigo-300 text-sm font-bold tracking-widest uppercase">Cases Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-1">0%</div>
                  <div className="text-indigo-300 text-sm font-bold tracking-widest uppercase">Billing Disputes</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "Dr. Priya Sharma", msg: "Verified placements in under a week.", avatar: Priya },
                { name: "Dr. Arjun Mehta", msg: "Automated payouts are a game changer.", avatar: Arjun },
                { name: "Dr. Rajesh Kumar", msg: "Matched within 2km of my home.", avatar: Prof },
                // { name: "Dr. Sneha Patel", msg: "Transparent and stress-free.", avatar: sneha }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-500" />
                    <div>
                      <div className="text-sm font-black">{t.name}</div>
                      <div className="text-[10px] uppercase text-teal-500 font-bold">Verified Professional</div>
                    </div>
                  </div>
                  <p className="text-indigo-100 text-sm italic">"{t.msg}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS ── */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-12">Recognized & Incubated By</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
            <img src={img1} alt="IIT Bhubaneswar" className="h-12 md:h-16 object-contain" />
            <img src={img2} alt="Startup India" className="h-16 md:h-20 object-contain" />
            <img src={img3} alt="Startup Odisha" className="h-16 md:h-20 object-contain" />
          </div>
        </div>
      </section>

    </div>
  );
}

// Icons not native to Lucide or needing custom size
function UserSwitch({ size = 24, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 3h5v5" /><path d="M8 21H3v-5" /><path d="M12 22a9 9 0 0 0 9-9" /><path d="M12 2a9 9 0 0 0-9 9" />
    </svg>
  );
}
