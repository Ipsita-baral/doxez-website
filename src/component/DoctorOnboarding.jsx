import { useState } from "react";
import axios from "axios";
import {
  UserPlus,
  Stethoscope,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Zap,
  Globe,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const DOCTOR_BENEFITS = [
  {
    icon: <Clock size={24} />,
    title: "Complete Flexibility",
    desc: "Choose from per-diem shifts, short-term assignments, or permanent roles that fit your life.",
    color: "#7c3aed",
    bg: "#f5f3ff"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Verified Hospitals",
    desc: "Work exclusively at vetted, high-quality medical facilities across India with safe environments.",
    color: "#059669",
    bg: "#f0fdf4"
  },
  {
    icon: <Zap size={24} />,
    title: "Instant Payouts",
    desc: "Transparent earnings tracking with automated, timely payouts directly to your account.",
    color: "#d97706",
    bg: "#fffbeb"
  },
  {
    icon: <Users size={24} />,
    title: "Direct Facility Connect",
    desc: "Skip the middlemen. Interact directly with hospital administrators and HR heads through the platform.",
    color: "#0b76ff",
    bg: "#eaf4ff"
  },
];

const STEPS = [
  { num: "01", icon: <UserPlus size={22} />, title: "Apply Online", desc: "Fill out the registration form with your basic credentials." },
  { num: "02", icon: <ShieldCheck size={22} />, title: "Verification", desc: "Our team conducts a quick digital vetting of your profile." },
  { num: "03", icon: <Briefcase size={22} />, title: "Start Working", desc: "Access the dashboard and start picking flexible shifts." },
];

export default function DoctorOnboarding() {
  const [formData, setFormData] = useState({
    fullName: "",
    degree: "",
    otherDegree: "",
    specialization: "",
    otherSpecialization: "",
    superSpecialization: "",
    otherSuperSpecialization: "",
    experience: "",
    phone: "",
    email: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const CRM_API_URL = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${CRM_API_URL}/api/onboarding-requests/public/doctor`, {
        fullName: formData.fullName,
        degree: formData.degree,
        otherDegree: formData.otherDegree,
        specialization: formData.specialization,
        otherSpecialization: formData.otherSpecialization,
        superSpecialization: formData.superSpecialization,
        otherSuperSpecialization: formData.otherSuperSpecialization,
        experience: formData.experience,
        phone: formData.phone,
        email: formData.email,
        city: formData.city
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Doctor onboarding submission failed:", error);
      alert("Submission failed. Please try again or call support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="success-container">
        <style>{`
          .success-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 50%, #f4f8ff, #f8fbff);
            padding: 140px 20px 80px;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }
          .success-card {
            text-align: center;
            max-width: 520px;
            width: 100%;
            background: #ffffff;
            padding: 40px 24px;
            border-radius: 24px;
            box-shadow: 0 20px 60px -10px rgba(11, 31, 58, 0.12);
            border: 1px solid rgba(11, 31, 58, 0.05);
            box-sizing: border-box;
          }
          .success-badge-circle {
            width: 72px;
            height: 72px;
            background: #dcfce7;
            color: #16a34a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          .success-title {
            font-family: 'Bricolage Grotesque', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #0b1f3a;
            margin-bottom: 16px;
          }
          .success-desc {
            color: #64748b;
            line-height: 1.7;
            margin-bottom: 32px;
            font-size: 14px;
          }
          .success-btn {
            background: #1e4b8f;
            color: #fff;
            padding: 14px 36px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 14.5px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            width: 100%;
            box-sizing: border-box;
          }
          .success-btn:hover {
            background: #15386b;
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(30, 75, 143, 0.2);
          }
          @media (min-width: 640px) {
            .success-container {
              padding-top: 180px;
            }
            .success-card {
              padding: 56px 40px;
              border-radius: 32px;
            }
            .success-badge-circle {
              width: 88px;
              height: 88px;
              margin-bottom: 28px;
            }
            .success-title {
              font-size: 32px;
            }
            .success-desc {
              font-size: 15px;
            }
            .success-btn {
              width: auto;
              padding: 14px 44px;
            }
          }
        `}</style>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="success-card"
        >
          <div className="success-badge-circle">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="success-title">Welcome to Doxez!</h2>
          <p className="success-desc">
            Thank you for registering, Dr. {formData.fullName ? formData.fullName.split(' ')[0] : 'Partner'}. Our onboarding team will call you within the next 24 hours to complete your profile verification.
          </p>
          <button onClick={() => setSubmitted(false)} className="success-btn">
            Back to Page
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#111827", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        
        .doc-btn-p { background: #1e4b8f; color: #fff; padding: 16px 36px; border-radius: 12px; font-weight: 700; transition: all 0.3s; display: inline-flex; align-items: center; gap: 10px; border: none; cursor: pointer; }
        .doc-btn-p:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(30,75,143,0.3); }

        .form-input { 
          width: 100%; 
          padding: 11px 16px; 
          border: 1.5px solid #e5e7eb; 
          border-radius: 10px; 
          font-size: 13.5px; 
          outline: none; 
          transition: all 0.2s;
          background: #fcfdfe;
          box-sizing: border-box;
        }
        .form-input:focus { border-color: #1e4b8f; box-shadow: 0 0 0 4px rgba(30,75,143,0.06); background: #fff; }
        .form-label { display: block; font-size: 10px; font-weight: 800; color: #64748b; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.08em; }

        .benefit-card { background: #fff; border-radius: 20px; border: 1px solid #f1f5f9; padding: 24px; transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .benefit-card:hover { transform: translateY(-8px); border-color: #1e4b8f; box-shadow: 0 20px 40px -12px rgba(30,75,143,0.1); }

        /* Hero responsive */
        .hero-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 60px 100px; align-items: center; }
        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-section { padding: 120px 16px 50px !important; }
          .hero-stats { justify-content: space-between !important; gap: 10px !important; }
          .stat-item { flex: 1 !important; }
          .stat-num { font-size: 18px !important; }
          .stat-label { font-size: 8px !important; }
        }

        /* Form grid responsive */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
        @media (max-width: 520px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .form-grid .span-2 { grid-column: span 1 !important; }
          .form-card { padding: 24px 18px !important; border-radius: 20px !important; }
        }

        /* Benefits grid */
        .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; }
        @media (max-width: 640px) {
          .benefits-section { padding: 40px 16px !important; }
          .benefits-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .benefit-card { padding: 20px !important; }
        }

        /* Steps grid */
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; position: relative; }
        @media (max-width: 640px) {
          .steps-section { padding: 40px 16px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .desktop-timeline-line { display: none !important; }
          .steps-section h2 { font-size: 1.7rem !important; }
          .steps-section p { font-size: 15px !important; }
        }

        /* CTA section */
        .cta-inner { padding: 64px 32px !important; }
        @media (max-width: 640px) {
          .cta-section { padding: 32px 16px !important; }
          .cta-inner { padding: 48px 24px !important; border-radius: 24px !important; }
          .cta-inner h2 { font-size: 1.6rem !important; }
          .cta-inner p { font-size: 15px !important; }
          .cta-btn { padding: 14px 24px !important; font-size: 14px !important; width: 100% !important; justify-content: center !important; }
        }

        /* Section titles */
        @media (max-width: 640px) {
          .benefits-title { font-size: 24px !important; }
          .benefits-sub { font-size: 15px !important; }
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section className="hero-section" style={{
        padding: "160px 24px 120px",
        background: "radial-gradient(circle at 100% 0%, rgba(30,75,143,0.08) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(30,75,143,0.03) 0%, transparent 40%), #fff",
        borderBottom: "1px solid #f1f5f9",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, background: "rgba(30,75,143,0.02)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eef4ff", color: "#1e4b8f", padding: "6px 20px", borderRadius: 99, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 32 }}>
                <Stethoscope size={13} fill="currentColor" /> Medical Professionals Only
              </div>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3.4rem)", fontWeight: 800, color: "#0b1f3a", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
                Work On Your Terms. <br /> Get Rewarded For Your <span style={{ color: "#1e4b8f" }}>Expertise.</span>
              </h1>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 40, maxWidth: 500 }}>
                Doxez connects top-tier doctors with high-growth hospitals across India. Join our network to unlock flexible shifts, premium payouts, and professional freedom.
              </p>

              <div className="hero-stats" style={{ display: "flex", flexWrap: "nowrap", gap: 32 }}>
                <div className="stat-item" style={{ textAlign: "center" }}>
                  <div className="stat-num" style={{ fontSize: 24, fontWeight: 800, color: "#0b1f3a" }}>100+</div>
                  <div className="stat-label" style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Doctors</div>
                </div>
                <div className="stat-item" style={{ textAlign: "center" }}>
                  <div className="stat-num" style={{ fontSize: 24, fontWeight: 800, color: "#0b1f3a" }}>15+</div>
                  <div className="stat-label" style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Partner Hospitals</div>
                </div>
                <div className="stat-item" style={{ textAlign: "center" }}>
                  <div className="stat-num" style={{ fontSize: 24, fontWeight: 800, color: "#0b1f3a" }}>4.8/5</div>
                  <div className="stat-label" style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Doctor Rating</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="form-card"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              style={{
                background: "#fff",
                padding: "32px 36px",
                borderRadius: 28,
                border: "1.5px solid #f1f5f9",
                boxShadow: "0 30px 80px -15px rgba(30,75,143,0.12)"
              }}
            >
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: "#0b1f3a", marginBottom: 8 }}>Join the Doxez Network</h3>
                <p style={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.5 }}>Complete your 30-second application to access premium medical opportunities.</p>
              </div>

              <form onSubmit={handleSubmit} className="form-grid">
                <div className="span-2" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Full Name</label>
                  <input required className="form-input" name="fullName" placeholder="Dr. Rahul Sharma" value={formData.fullName} onChange={handleChange} />
                </div>

                <div className="span-2" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Undergraduate Degree</label>
                  <select required className="form-input" name="degree" value={formData.degree} onChange={handleChange}>
                    <option value="">Select Degree</option>
                    <option>MBBS</option>
                    <option>BDS</option>
                    <option>BAMS</option>
                    <option>BPT</option>
                    <option>BHMS</option>
                    <option>Others</option>
                  </select>
                  {formData.degree === "Others" && (
                    <motion.input
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      required className="form-input" style={{ marginTop: 10 }}
                      name="otherDegree" placeholder="Please specify your degree"
                      value={formData.otherDegree} onChange={handleChange}
                    />
                  )}
                </div>

                <div>
                  <label className="form-label">Post-Graduation / Specialization</label>
                  <select required className="form-input" name="specialization" value={formData.specialization} onChange={handleChange}>
                    <option value="">Select Specialization</option>
                    <option>None</option>
                    <option>MD</option>
                    <option>MS</option>
                    <option>DNB</option>
                    <option>Diploma</option>
                    <option>Fellowship</option>
                    <option>Others</option>
                  </select>
                  {formData.specialization === "Others" && (
                    <motion.input
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      required className="form-input" style={{ marginTop: 10 }}
                      name="otherSpecialization" placeholder="Specify specialization"
                      value={formData.otherSpecialization} onChange={handleChange}
                    />
                  )}
                </div>

                <div>
                  <label className="form-label">Super-Specialization</label>
                  <select required className="form-input" name="superSpecialization" value={formData.superSpecialization} onChange={handleChange}>
                    <option value="">Select Super-Specialization</option>
                    <option>None</option>
                    <option>MCh</option>
                    <option>DM</option>
                    <option>Fellowship</option>
                    <option>Others</option>
                  </select>
                  {formData.superSpecialization === "Others" && (
                    <motion.input
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      required className="form-input" style={{ marginTop: 10 }}
                      name="otherSuperSpecialization" placeholder="Specify super-specialization"
                      value={formData.otherSuperSpecialization} onChange={handleChange}
                    />
                  )}
                </div>

                <div>
                  <label className="form-label">Years of Experience</label>
                  <input required type="number" className="form-input" name="experience" placeholder="e.g. 5" value={formData.experience} onChange={handleChange} />
                </div>

                <div>
                  <label className="form-label">Mobile Number</label>
                  <input required type="tel" className="form-input" name="phone" placeholder="+91" value={formData.phone} onChange={handleChange} />
                </div>

                <div>
                  <label className="form-label">Work City</label>
                  <input required className="form-input" name="city" placeholder="Current Location" value={formData.city} onChange={handleChange} />
                </div>

                <div className="span-2" style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Email Address</label>
                  <input required type="email" className="form-input" name="email" placeholder="rahul@example.com" value={formData.email} onChange={handleChange} />
                </div>

                <div className="span-2" style={{ gridColumn: "span 2", marginTop: 12 }}>
                  <button type="submit" disabled={isSubmitting} className="doc-btn-p" style={{ width: "100%", justifyContent: "center", fontSize: 16 }}>
                    {isSubmitting ? "Starting Your Journey..." : "Begin Onboarding"} <ChevronRight size={20} />
                  </button>
                  <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 16 }}>
                    By joining, you agree to our <span style={{ color: "#1e4b8f", fontWeight: 700 }}>Doctor Partner Policy</span>.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY DOXEZ? ── */}
      <section className="benefits-section" style={{ padding: "100px 24px", background: "#fcfdfe" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="benefits-title" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: "#0b1f3a", marginBottom: 16 }}>Why Doctors Choose Doxez</h2>
            <p className="benefits-sub" style={{ color: "#64748b", fontSize: 17, maxWidth: 640, margin: "0 auto" }}>We focus on your professional comfort and growth, so you can focus on delivering excellent patient care.</p>
          </div>

          <div className="benefits-grid">
            {DOCTOR_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "white",
                  padding: "32px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)"
                }}
              >
                <div style={{ width: 60, height: 60, background: b.bg, color: b.color, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0b1f3a", marginBottom: 14 }}>{b.title}</h3>
                <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.8 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="steps-section" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.7rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0b1f3a", marginBottom: 16 }}>3 Steps to Better Work-Life Balance</h2>
            <p style={{ color: "#64748b", fontSize: 17, maxWidth: 600, margin: "0 auto" }}>Your journey transitions from registration to shift-completion in record time.</p>
          </div>

          <div className="steps-grid">
            <div className="desktop-timeline-line" style={{
              position: "absolute", top: 40, left: "15%", right: "15%", height: 2,
              background: "linear-gradient(90deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)",
              zIndex: 0,
            }} />

            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                style={{ textAlign: "center", position: "relative", zIndex: 1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div style={{
                  width: 80, height: 80, background: "#fff", border: "2px solid #f1f5f9",
                  color: "#1e4b8f", borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 10px 25px -5px rgba(30,75,143,0.1)",
                  position: "relative"
                }}>
                  <div style={{ position: "absolute", top: -4, right: -4, width: 28, height: 28, background: "#1e4b8f", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>
                    {s.num}
                  </div>
                  {s.icon}
                </div>
                <h4 style={{ fontSize: 20, fontWeight: 800, color: "#0b1f3a", marginBottom: 12, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{s.title}</h4>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="cta-section" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="cta-inner" style={{
            background: "#1e4b8f",
            borderRadius: 40,
            padding: "80px 40px",
            textAlign: "center",
            color: "#fff",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: 24, position: "relative" }}>Ready to Join India's Smartest Medical Network?</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px", position: "relative" }}>
              Download the Doxez Doctor App or register via the form above to explore shifts near you today.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", position: "relative" }}>
              <a href="tel:+919692949500" className="cta-btn" style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", color: "#1e4b8f", padding: "16px 36px", borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                <Phone size={20} /> Call for Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 80 }} />
    </div>
  );
}