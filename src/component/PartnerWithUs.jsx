import { useState, useRef } from "react";
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  LayoutDashboard,
  PieChart,
  Users,
  Lock,
  Hospital
} from "lucide-react";
import { motion } from "framer-motion";

const FACILITY_TYPES = [
  "Multi-Specialty hospital",
  "Super-Specialty Centre",
  "Private Nursing Home",
  "Government Medical College",
  "Diagnostic Chain",
  "Others"
];

const HOSPITAL_BENEFITS = [
  { icon: "📈", title: "Increase Bed Turnover", desc: "Never delay a surgery or discharge due to staff unavailability." },
  { icon: "🛡️", title: "Compliance Managed", desc: "NABH-ready documentation and automated credential tracking." },
  { icon: "💰", title: "Lower Admin Cost", desc: "Automated billing and time-sheets reduce your HR administrative load." },
  { icon: "⚡", title: "Scale Overnight", desc: "Activate emergency backup teams in under 4 hours via our dashboard." },
];

export default function PartnerWithUs() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fbff", padding: 20 }}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="success-card"
          style={{ textAlign: "center", maxWidth: 540, background: "#fff", padding: "64px 48px", borderRadius: 32, boxShadow: "0 32px 80px -12px rgba(30,75,143,0.12)" }}
        >
          <div style={{ width: 88, height: 88, background: "#dcfce7", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <CheckCircle2 size={44} />
          </div>
          <h2 className="success-title" style={{ fontSize: 32, fontWeight: 800, color: "#0b1f3a", marginBottom: 16 }}>Registration Received</h2>
          <p style={{ color: "#64748b", lineHeight: 1.8, marginBottom: 36, fontSize: 16 }}>
            Our Institutional Partnerships team has been notified. We will reach out to the Administrative Contact provided to schedule a platform walkthrough and verify your registration.
          </p>
          <button onClick={() => setSubmitted(false)} style={{ background: "#1e4b8f", color: "#fff", padding: "16px 48px", borderRadius: 14, fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#111827", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        
        .pwu-btn-p { background: #1e4b8f; color: #fff; padding: 16px 36px; border-radius: 12px; font-weight: 700; transition: all 0.3s; display: inline-flex; align-items: center; gap: 10px; border: none; cursor: pointer; }
        .pwu-btn-p:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(30,75,143,0.3); }

        .form-input { 
          width: 100%; 
          padding: 13px 18px; 
          border: 1.5px solid #e5e7eb; 
          border-radius: 12px; 
          font-size: 14px; 
          outline: none; 
          transition: all 0.2s;
          background: #fcfdfe;
          box-sizing: border-box;
        }
        .form-input:focus { border-color: #1e4b8f; box-shadow: 0 0 0 4px rgba(30,75,143,0.06); background: #fff; }
        .form-label { display: block; font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.08em; }

        .db-card { background: #fff; border-radius: 16px; border: 1px solid #edf2f7; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }

        @media (max-width: 768px) {
          .pwu-hero { padding: 40px 20px 60px !important; }
          .pwu-inner { gap: 32px !important; }
          .benefits-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .form-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .hospital-form-card { padding: 28px 20px !important; border-radius: 24px !important; }
          .pwu-stats-grid { grid-template-columns: 1fr !important; }
          .success-card { padding: 40px 24px !important; border-radius: 24px !important; }
          .success-title { font-size: 24px !important; }
        }
      `}</style>

      {/* ── HERO & ENTERPRISE FORM ── */}
      <section className="pwu-hero" style={{
        padding: "100px 24px 140px",
        background: "linear-gradient(to bottom, #fcfdfe 0%, #fff 100%)",
        borderBottom: "1px solid #f3f4f6"
      }}>
        <div className="pwu-inner" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px 100px", alignItems: "start" }}>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2rem, 3vw, 2.4rem)", fontWeight: 800, color: "#0b1f3a", lineHeight: 1.12, marginBottom: 28, letterSpacing: "-0.03em" }}>
              Struggling with Staff Shortages? <br /><span style={{ color: "#1e4b8f" }}>We Fix That.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.8, marginBottom: 44, maxWidth: 540 }}>
              From doctors to ICU nurses, Doxez connects you with verified healthcare professionals on demand. Manage staffing, reduce delays, and ensure smooth hospital operations — all in one place            </p>

            <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
              {HOSPITAL_BENEFITS.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ fontSize: 24 }}>{b.icon}</div>
                  <div>
                    <h4 style={{ fontWeight: 800, color: "#0b1f3a", fontSize: 14, marginBottom: 4 }}>{b.title}</h4>
                    <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Dashboard Preview */}
            <div style={{ background: "#f8fbff", borderRadius: 24, padding: 24, border: "1px solid #eef4ff", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <LayoutDashboard size={18} color="#1e4b8f" />
                <span style={{ fontWeight: 800, fontSize: 12, color: "#1e4b8f", textTransform: "uppercase" }}>Hospital Admin Management Dashboard</span>
              </div>
              <div className="pwu-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="db-card">
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Active Staff</div>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>42 Professionals</div>
                </div>
                <div className="db-card">
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 4 }}>Shift Completion</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#16a34a" }}>99.2%</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="hospital-form-card"
            style={{
              background: "#fff",
              padding: "32px 36px",
              borderRadius: 36,
              border: "1.5px solid #f1f5f9",
              boxShadow: "0 40px 100px -15px rgba(30,75,143,0.15)"
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: "#0b1f3a", marginBottom: 6 }}>Register with Us</h3>
              <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.5 }}>Please share your Details we will reach out to you.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Hospital / Facility Name *</label>
                <input required className="form-input" name="hospitalName" placeholder="Apollo Hospital, Delhi" value={formData.hospitalName} onChange={handleChange} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Contact Person *</label>
                <input required className="form-input" name="contactPerson" placeholder="Dr. Sharma / HR Manager" value={formData.contactPerson} onChange={handleChange} />
              </div>

              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="form-label">Email *</label>
                  <input required type="email" className="form-input" name="email" placeholder="hospital@email.com" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">Phone *</label>
                  <input required type="tel" className="form-input" name="phone" placeholder="9XXXXXXXXX" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label className="form-label">Address *</label>
                <input required className="form-input" name="address" placeholder="Street, City, State" value={formData.address} onChange={handleChange} />
              </div>

              <button type="submit" disabled={isSubmitting} className="pwu-btn-p" style={{ width: "100%", justifyContent: "center", fontSize: 17, background: "#0f9d6a", padding: 14 }}>
                {isSubmitting ? "Processing..." : "Submit Request →"}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* ── FOOTER-READY PADDING ── */}
      <div style={{ height: 80 }} />

    </div>
  );
}
