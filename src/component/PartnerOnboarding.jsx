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
  Users,
  Building2,
  Hospital
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

const HOSPITAL_BENEFITS = [
  {
    icon: "👥",
    title: "Patient Facilitation Support",
    desc: "Doxez helps streamline patient enquiries, appointment coordination, surgical scheduling, and treatment journey support.",
  },
  {
    icon: "📋",
    title: "Documentation Assistance",
    desc: "Support for PM-JAY (Ayushman Bharat), insurance coordination, admission documentation, and required administrative workflows.",
  },
  {
    icon: "⚡",
    title: "Operational Efficiency",
    desc: "Reduce delays in scheduling, approvals, patient communication, and discharge coordination through structured workflow support.",
  },
  {
    icon: "🏥",
    title: "For Hospitals & Healthcare Facilities",
    desc: "Optimize case coordination, bed utilization, and administrative efficiency with dedicated facilitation support.",
  },
];

const STEPS = [
  { num: "01", icon: <UserPlus size={22} />, title: "Apply Online", desc: "Fill out the registration form with your basic credentials." },
  { num: "02", icon: <ShieldCheck size={22} />, title: "Verification", desc: "Our team conducts a quick digital vetting of your profile." },
  { num: "03", icon: <Briefcase size={22} />, title: "Start Working", desc: "Access the dashboard and start picking flexible shifts." },
];

export default function PartnerOnboarding() {
  const [partnerType, setPartnerType] = useState("doctor");
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
    hospitalName: "",
    contactPerson: "",
    address: "",
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
      if (partnerType === "doctor") {
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
      } else {
        await axios.post(`${CRM_API_URL}/api/onboarding-requests/public/hospital`, {
          hospitalName: formData.hospitalName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        });
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Partner submission failed:", error);
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
          <h2 className="success-title">
            {partnerType === "doctor" ? "Welcome to Doxez!" : "Registration Received"}
          </h2>
          <p className="success-desc">
            {partnerType === "doctor"
              ? `Thank you for registering, Dr. ${formData.fullName ? formData.fullName.split(' ')[0] : 'Partner'}. Our onboarding team will call you within the next 24 hours to complete your profile verification.`
              : "Our Institutional Partnerships team has been notified. We will reach out to the Administrative Contact provided to schedule a platform walkthrough and verify your registration."}
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

        .type-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .type-btn {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 14px;
          background: #fff;
          font-weight: 700;
          font-size: 14px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .type-btn:hover {
          border-color: #cbd5e1;
          background: #f8fbff;
        }
        .type-btn.active {
          border-color: #1e4b8f;
          background: #eef4ff;
          color: #1e4b8f;
        }

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

        /* Hero Trust Indicators */
        .hero-trust-row {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }
        .hero-trust-icon {
          width: 30px;
          height: 30px;
          background: #eef4ff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Hero Stats */
        .hero-stats-row {
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 24px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 32px;
        }
        .hero-stat h4 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #0b1f3a;
          margin: 0 0 2px;
          line-height: 1;
        }
        .hero-stat p {
          font-size: 10px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }
        .hero-stat-divider {
          width: 1px;
          height: 36px;
          background: #e2e8f0;
          flex-shrink: 0;
        }

        /* Hero Feature Mini Cards */
        .hero-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-feature-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: #fff;
          border: 1px solid #f1f5f9;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          max-width: 380px;
        }
        .hero-feature-card:hover {
          border-color: #dbeafe;
          box-shadow: 0 8px 24px -6px rgba(30,75,143,0.08);
          transform: translateX(4px);
        }
        .hero-feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hero-feature-card h5 {
          font-size: 14px;
          font-weight: 800;
          color: #0b1f3a;
          margin: 0 0 2px;
        }
        .hero-feature-card p {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }

        /* Hero responsive */
        .hero-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 60px 100px; align-items: start; }
        @media (max-width: 1024px) {
          .hero-grid { gap: 40px 60px; }
          .benefits-section { padding: 70px 24px !important; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .steps-section { padding: 70px 24px !important; }
        }

        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-section { padding: 120px 16px 50px !important; }
          .hero-trust-row { gap: 10px; justify-content: center; flex-wrap: nowrap; }
          .hero-trust-item { font-size: 11px; gap: 5px; }
          .hero-trust-icon { width: 24px; height: 24px; border-radius: 6px; }
          .hero-stats-row { gap: 20px; justify-content: center; flex-wrap: nowrap; }
          .hero-stat h4 { font-size: 22px; }
          .hero-stat p { font-size: 8px; }
          .hero-stat-divider { height: 28px; }
          .hero-features { align-items: center; }
          .hero-feature-card { max-width: 100%; }
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
          .benefits-section { padding: 48px 16px !important; }
          .benefits-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .benefit-card { padding: 20px !important; }
          .benefits-title { font-size: 24px !important; margin-bottom: 10px !important; }
          .benefits-sub { font-size: 14px !important; }
          .benefit-card h3 { font-size: 17px !important; margin-bottom: 10px !important; }
          .benefit-card p { font-size: 13px !important; }
          .benefit-card div[style*="width: 60"] { width: 48px !important; height: 48px !important; border-radius: 14px !important; margin-bottom: 18px !important; }
        }

        /* Steps grid */
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; position: relative; }

        @media (max-width: 640px) {
          .steps-section { padding: 48px 16px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .desktop-timeline-line { display: none !important; }
          .steps-section h2 { font-size: 1.5rem !important; }
          .steps-section p { font-size: 14px !important; }
          .steps-section div[style*="marginBottom: 80"] { margin-bottom: 40px !important; }
          .steps-section h4 { font-size: 17px !important; }
        }

        /* Ultra-small screens */
        @media (max-width: 400px) {
          .hero-section { padding: 110px 12px 40px !important; }
          .hero-trust-row { gap: 6px; }
          .hero-trust-item { font-size: 10px; gap: 4px; }
          .hero-trust-icon { width: 20px; height: 20px; border-radius: 5px; }
          .hero-stats-row { gap: 12px; padding: 18px 0; }
          .hero-stat h4 { font-size: 18px; }
          .hero-stat p { font-size: 7px; letter-spacing: 0.05em; }
          .hero-stat-divider { height: 22px; }
          .hero-feature-card { padding: 12px 14px !important; }
          .hero-feature-card h5 { font-size: 13px; }
          .hero-feature-card p { font-size: 11px; }
          .form-card { padding: 20px 14px !important; border-radius: 18px !important; }
          .form-input { padding: 10px 14px !important; font-size: 13px !important; }
          .form-label { font-size: 9px !important; }
          .type-btn { padding: 10px 12px !important; font-size: 13px !important; }
          .doc-btn-p { padding: 14px 24px !important; font-size: 14px !important; }
          .benefits-section { padding: 36px 12px !important; }
          .benefit-card { padding: 16px !important; border-radius: 14px !important; }
          .steps-section { padding: 36px 12px !important; }
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
              {/* <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eef4ff", color: "#1e4b8f", padding: "6px 20px", borderRadius: 99, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 32 }}>
                <Building2 size={13} fill="currentColor" /> Join Our Network
              </div> */}
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.4rem, 2.6vw, 2.05rem)", fontWeight: 800, color: "#0b1f3a", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em", marginTop: 32 }}>
                Connect With India's Trusted <span style={{ color: "#1e4b8f" }}>Healthcare Network.</span>
              </h1>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}>
                Empowering Hospitals and Medical Professionals through Seamless Clinical Collaboration, Verified Credentialing, and Quality Patient Care Solutions.
              </p>

              {/* Trust Indicators */}
              <div className="hero-trust-row">
                <div className="hero-trust-item">
                  <div className="hero-trust-icon"><ShieldCheck size={15} color="#1e4b8f" /></div>
                  Verified Network
                </div>
                <div className="hero-trust-item">
                  <div className="hero-trust-icon"><Zap size={15} color="#d97706" /></div>
                  Fast Onboarding
                </div>
                <div className="hero-trust-item">
                  <div className="hero-trust-icon"><Users size={15} color="#059669" /></div>
                  Trusted by 500+
                </div>
              </div>

              {/* Stats Row */}
              <div className="hero-stats-row">
                <div className="hero-stat">
                  <h4>500+</h4>
                  <p>Doctors</p>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <h4>15+</h4>
                  <p>Partner Hospitals</p>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                  <h4>4.8</h4>
                  <p>Google Rating</p>
                </div>
              </div>

              {/* Feature Mini Cards */}
              <div className="hero-features">
                <div className="hero-feature-card">
                  <div className="hero-feature-icon" style={{ background: "#f5f3ff", color: "#7c3aed" }}><Clock size={18} /></div>
                  <div>
                    <h5>Flexible Shifts</h5>
                    <p>Pick schedules that work for you</p>
                  </div>
                </div>
                <div className="hero-feature-card">
                  <div className="hero-feature-icon" style={{ background: "#f0fdf4", color: "#059669" }}><ShieldCheck size={18} /></div>
                  <div>
                    <h5>Insurance Support</h5>
                    <p>Ayushman & cashless assistance</p>
                  </div>
                </div>
                <div className="hero-feature-card">
                  <div className="hero-feature-icon" style={{ background: "#eaf4ff", color: "#0b76ff" }}><Globe size={18} /></div>
                  <div>
                    <h5>Growth Dashboard</h5>
                    <p>Track performance & earnings</p>
                  </div>
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
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: "#0b1f3a", marginBottom: 8 }}>Join the Doxez Network</h3>
                <p style={{ color: "#64748b", fontSize: 13.5, lineHeight: 1.5 }}>Complete your application to access premium medical opportunities.</p>
              </div>

              <div className="type-toggle">
                <button
                  className={`type-btn ${partnerType === "doctor" ? "active" : ""}`}
                  onClick={() => setPartnerType("doctor")}
                >
                  <Stethoscope size={18} />
                  Doctor
                </button>
                <button
                  className={`type-btn ${partnerType === "hospital" ? "active" : ""}`}
                  onClick={() => setPartnerType("hospital")}
                >
                  <Hospital size={18} />
                  Hospital
                </button>
              </div>

              <form onSubmit={handleSubmit} className="form-grid">
                {partnerType === "doctor" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="span-2" style={{ gridColumn: "span 2" }}>
                      <label className="form-label">Hospital / Facility Name *</label>
                      <input
                        required
                        className="form-input"
                        name="hospitalName"
                        placeholder="Apollo Hospital, Delhi"
                        value={formData.hospitalName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="span-2" style={{ gridColumn: "span 2" }}>
                      <label className="form-label">Contact Person *</label>
                      <input
                        required
                        className="form-input"
                        name="contactPerson"
                        placeholder="Dr. Sharma / HR Manager"
                        value={formData.contactPerson}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="form-label">Email *</label>
                      <input
                        required
                        type="email"
                        className="form-input"
                        name="email"
                        placeholder="hospital@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="form-label">Phone *</label>
                      <input
                        required
                        type="tel"
                        className="form-input"
                        name="phone"
                        placeholder="9XXXXXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="span-2" style={{ gridColumn: "span 2" }}>
                      <label className="form-label">Address *</label>
                      <input
                        required
                        className="form-input"
                        name="address"
                        placeholder="Street, City, State"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="span-2" style={{ gridColumn: "span 2", marginTop: 12 }}>
                  <button type="submit" disabled={isSubmitting} className="doc-btn-p" style={{ width: "100%", justifyContent: "center", fontSize: 16 }}>
                    {isSubmitting ? "Submitting..." : "Begin Onboarding"} <ChevronRight size={20} />
                  </button>
                  <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 16 }}>
                    By joining, you agree to our <span style={{ color: "#1e4b8f", fontWeight: 700 }}>Partner Policy</span>.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="benefits-section" style={{ padding: "100px 24px", background: "#fcfdfe" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="benefits-title" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: "#0b1f3a", marginBottom: 16 }}>
              Why Partner With Doxez
            </h2>
            <p className="benefits-sub" style={{ color: "#64748b", fontSize: 17, maxWidth: 640, margin: "0 auto" }}>
              We help both doctors and hospitals grow and provide better patient care.
            </p>
          </div>

          <div style={{ marginBottom: 80 }}>
            <h3 style={{ textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: "#0b1f3a", marginBottom: 40 }}>For Doctors</h3>
            <div className="benefits-grid">
              {DOCTOR_BENEFITS.map((b, i) => (
                <motion.div
                  key={`doc-${i}`}
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
                  <div style={{
                    width: 60, height: 60,
                    background: b.bg || "#eef4ff",
                    color: b.color || "#1e4b8f",
                    borderRadius: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 28,
                    fontSize: 28
                  }}>
                    {b.icon}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0b1f3a", marginBottom: 14 }}>{b.title}</h3>
                  <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.8 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: "#0b1f3a", marginBottom: 40 }}>For Hospitals</h3>
            <div className="benefits-grid">
              {HOSPITAL_BENEFITS.map((b, i) => (
                <motion.div
                  key={`hosp-${i}`}
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
                  <div style={{
                    width: 60, height: 60,
                    background: "#eef4ff",
                    color: "#1e4b8f",
                    borderRadius: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 28,
                    fontSize: 28
                  }}>
                    {b.icon}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0b1f3a", marginBottom: 14 }}>{b.title}</h3>
                  <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.8 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STEPS SECTION (Always visible) ── */}
      <section className="steps-section" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.7rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0b1f3a", marginBottom: 16 }}>How It Works</h2>
            <p style={{ color: "#64748b", fontSize: 17, maxWidth: 600, margin: "0 auto" }}>Your journey from registration to partnership is simple and straightforward.</p>
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

      <div style={{ height: 80 }} />
    </div>
  );
}
