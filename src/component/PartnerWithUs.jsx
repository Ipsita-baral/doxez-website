import { useState } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const HOSPITAL_BENEFITS = [
  {
    icon: "👥",
    title: "Patient Facilitation Support",
    desc: "Doxez helps streamline patient enquiries, appointment coordination, surgical scheduling, and treatment journey support.",
  },
  {
    icon: "�",
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
  {
    icon: "🩺",
    title: "For Doctors & Specialists",
    desc: "Expand your visibility, receive coordinated patient referrals, and reduce non-clinical administrative burden.",
  },
  {
    icon: "🤝",
    title: "Dedicated Coordination Team",
    desc: "Our support team works closely with providers and patients to improve communication and care continuity.",
  },
  {
    icon: "🔐",
    title: "Secure & Professional Process",
    desc: "Patient coordination handled through structured workflows with professionalism and compliance-focused processes.",
  },
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

  const CRM_API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${CRM_API_URL}/api/onboarding-requests/public/hospital`, {
        hospitalName: formData.hospitalName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Hospital partner submission failed:", error);
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
          <h2 className="success-title">Registration Received</h2>
          <p className="success-desc">
            Our Institutional Partnerships team has been notified. We will reach out to the Administrative Contact provided to schedule a platform walkthrough and verify your registration.
          </p>
          <button onClick={() => setSubmitted(false)} className="success-btn">
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#fff",
        color: "#111827",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap');

        .pwu-btn-p {
          background: #1e4b8f; color: #fff; padding: 16px 36px; border-radius: 12px;
          font-weight: 700; transition: all 0.3s; display: inline-flex; align-items: center;
          gap: 10px; border: none; cursor: pointer;
        }
        .pwu-btn-p:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(30,75,143,0.3); }

        .form-input {
          width: 100%; padding: 13px 18px; border: 1.5px solid #e5e7eb; border-radius: 12px;
          font-size: 14px; outline: none; transition: all 0.2s; background: #fcfdfe; box-sizing: border-box;
        }
        .form-input:focus { border-color: #1e4b8f; box-shadow: 0 0 0 4px rgba(30,75,143,0.06); background: #fff; }
        .form-label {
          display: block; font-size: 11px; font-weight: 800; color: #64748b;
          margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.08em;
        }

        @media (max-width: 768px) {
          .pwu-hero { padding: 130px 20px 60px !important; }
          .pwu-inner { gap: 32px !important; }
          .benefits-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .form-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .hospital-form-card { padding: 28px 20px !important; border-radius: 24px !important; }
          .success-card { padding: 40px 24px !important; border-radius: 24px !important; }
          .success-title { font-size: 24px !important; }
        }
      `}</style>

      {/* ── HERO & FORM ── */}
      <section
        className="pwu-hero"
        style={{
          padding: "160px 24px 140px",
          background: "linear-gradient(to bottom, #fcfdfe 0%, #fff 100%)",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div
          className="pwu-inner"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px 100px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2rem, 3vw, 2.6rem)",
                fontWeight: 800,
                color: "#0b1f3a",
                lineHeight: 1.12,
                marginBottom: 12,
                letterSpacing: "-0.03em",
              }}
            >
              Partner With Doxez
            </h1>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                fontWeight: 700,
                color: "#1e4b8f",
                lineHeight: 1.3,
                marginBottom: 20,
              }}
            >
              Grow Your Practice. Simplify Patient Coordination.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#475569",
                lineHeight: 1.8,
                marginBottom: 44,
                maxWidth: 560,
              }}
            >
              Doxez partners with hospitals, clinics, and doctors to simplify patient
              coordination, documentation support, and care facilitation—helping healthcare
              providers focus on delivering quality treatment.
            </p>

            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: "#0b1f3a",
                marginBottom: 24,
              }}
            >
              Why Partner With Doxez
            </h3>

            <div
              className="benefits-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                marginBottom: 48,
              }}
            >
              {HOSPITAL_BENEFITS.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ fontSize: 24, flexShrink: 0 }}>{b.icon}</div>
                  <div>
                    <h4
                      style={{
                        fontWeight: 800,
                        color: "#0b1f3a",
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                    >
                      {b.title}
                    </h4>
                    <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — FORM ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hospital-form-card"
            style={{
              background: "#fff",
              padding: "32px 36px",
              borderRadius: 36,
              border: "1.5px solid #f1f5f9",
              boxShadow: "0 40px 100px -15px rgba(30,75,143,0.15)",
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#0b1f3a",
                  marginBottom: 8,
                }}
              >
                Partner With Doxez Today
              </h3>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>
                Join a growing healthcare facilitation ecosystem connecting patients with trusted
                healthcare providers.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
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

              <div style={{ marginBottom: 16 }}>
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

              <div
                className="form-grid"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
              >
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
              </div>

              <div style={{ marginBottom: 24 }}>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="pwu-btn-p"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 17,
                  background: "#0f9d6a",
                  padding: 14,
                }}
              >
                {isSubmitting ? "Processing..." : "Submit Request →"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <div style={{ height: 80 }} />
    </div>
  );
}
