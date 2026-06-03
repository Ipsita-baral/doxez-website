import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, User, Phone, MapPin, Stethoscope,
  CheckCircle2, ShieldCheck, HeartPulse,
  ChevronRight, CalendarCheck, PhoneCall, Info, Loader2, Mail
} from "lucide-react";

// Specialty list...
const CITIES = ["Bhubaneswar"];
const SPECIALTIES = [
  "General Physician", "Orthopedics", "Cardiology",
  "Pediatrics", "Gynecology", "Dermatology",
  "Neurology", "Gastroenterology"
];

export default function AppointmentModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const CRM_API_URL = import.meta.env.VITE_API_URL || "https://crm.doxez.in";

  // 📝 Formik Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email format"),
    age: Yup.number().typeError("Age must be a number").required("Age is required").positive().integer(),
    gender: Yup.string().required("Required"),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, "Valid 10-digit number required").required("Phone number is required"),
    city: Yup.string().required("Please select a city"),
    specialty: Yup.string().required("Please select a disease"),
    otherDisease: Yup.string().when("specialty", {
      is: "Others",
      then: (schema) => schema.required("Please specify the disease"),
      otherwise: (schema) => schema.nullable(),
    }),
    ayushmanCard: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", age: "", gender: "", phone: "", city: "", specialty: "", ayushmanCard: "", otherDisease: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(`${CRM_API_URL}/api/leads/public/booking`, {
          patientName: values.name,
          patientEmail: values.email,
          email: values.email,
          patientAge: Number(values.age),
          patientGender: values.gender,
          patientPhone: values.phone,
          city: values.city,
          treatmentRequired: values.specialty === "Others" ? values.otherDisease : values.specialty,
          hasAyushmanCard: values.ayushmanCard === "Yes"
        });
        setSubmitted(true);
      } catch (err) {
        console.error("Booking failed:", err);
        alert("Consultation request failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <AnimatePresence mode="wait">
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'Inter', sans-serif"
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: "absolute", inset: 0, background: "rgba(10, 25, 48, 0.4)", backdropFilter: "blur(12px)" }}
        />

        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 15 }}
          className="modal-container"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 500,
            maxHeight: "92vh",
            overflowY: "auto",
            background: "#ffffff",
            borderRadius: 24,
            padding: "32px",
            boxShadow: "0 40px 100px -15px rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.2)",
            msOverflowStyle: "none",
            scrollbarWidth: "none"
          }}
        >
          <style>{`
            .modal-container { padding: 32px !important; }
            .modal-container::-webkit-scrollbar { display: none; }
            .form-grid-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 12px; }
            .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            
            @media (max-width: 640px) {
              .modal-container { padding: 24px 16px !important; border-radius: 20px !important; }
              .form-grid-3, .form-grid-2 { grid-template-columns: 1fr !important; gap: 10px !important; }
              .modal-title { font-size: 19px !important; }
              .modal-desc { font-size: 12px !important; }
            }

            .appointment-letter {
              text-align: left;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 24px;
              margin-top: 20px;
              position: relative;
              overflow: hidden;
            }
            .letter-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 20px;
              border-bottom: 1px dashed #cbd5e1;
              padding-bottom: 15px;
            }
            .letter-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 13px;
            }
            .letter-label { color: #64748b; font-weight: 600; }
            .letter-value { color: #0f172a; font-weight: 700; }
            .letter-footer {
              margin-top: 20px;
              padding-top: 15px;
              border-top: 1px dashed #cbd5e1;
              font-size: 12px;
              color: #64748b;
              text-align: center;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 40px;
              font-weight: 900;
              color: rgba(30, 75, 143, 0.03);
              white-space: nowrap;
              pointer-events: none;
              text-transform: uppercase;
            }
          `}</style>
          {/* Close button... */}
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, border: "none", background: "#f1f5f9", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8", zIndex: 10 }}>
            <X size={16} />
          </button>

          {!submitted ? (
            <>
              <div style={{ marginBottom: 28, textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", color: "#1e4b8f", padding: "6px 14px", borderRadius: 99, fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 12, border: "1px solid #dbeafe" }}>
                  <HeartPulse size={12} /> Doxez Healthcare
                </div>
                <h2 className="modal-title" style={{ fontSize: 24, fontWeight: 800, color: "#0b1f3a", marginBottom: 8 }}>Book Your Appointment</h2>
                <p className="modal-desc" style={{ color: "#64748b", fontSize: 13, lineHeight: 1.4 }}>Request a callback from our medical experts. We'll contact you shortly to confirm your visit.</p>
              </div>

              <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Patient Name, Age & Gender */}
                <div className="form-grid-3">
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Patient Full Name</label>
                    <div style={{ position: "relative" }}>
                      <User size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                      <input type="text" placeholder="John Doe" disabled={loading} {...formik.getFieldProps("name")} style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: 12, border: `1.5px solid ${formik.touched.name && formik.errors.name ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }} />
                    </div>
                    {formik.touched.name && formik.errors.name && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Age</label>
                    <input type="text" placeholder="Age" disabled={loading} {...formik.getFieldProps("age")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.age && formik.errors.age ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }} />
                    {formik.touched.age && formik.errors.age && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.age}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Gender</label>
                    <select disabled={loading} {...formik.getFieldProps("gender")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.gender && formik.errors.gender ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }}>
                      <option value="">Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.gender}</p>}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Email Address (Optional)</label>
                  <div style={{ position: "relative" }}>
                    <Mail size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input type="email" placeholder="your.email@example.com" disabled={loading} {...formik.getFieldProps("email")} style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: 12, border: `1.5px solid ${formik.touched.email && formik.errors.email ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }} />
                  </div>
                  {formik.touched.email && formik.errors.email && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.email}</p>}
                </div>

                {/* Mobile & City */}
                <div className="form-grid-2">
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Mobile No.</label>
                    <div style={{ position: "relative" }}>
                      <Phone size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                      <input type="tel" placeholder="10-digit mobile" disabled={loading} {...formik.getFieldProps("phone")} style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: 12, border: `1.5px solid ${formik.touched.phone && formik.errors.phone ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }} />
                    </div>
                    {formik.touched.phone && formik.errors.phone && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.phone}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>City</label>
                    <select disabled={loading} {...formik.getFieldProps("city")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.city && formik.errors.city ? "#ef4444" : "#e2e8f0"}`, fontSize: 13 }}>
                      <option value="">Select City</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {formik.touched.city && formik.errors.city && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.city}</p>}
                  </div>
                </div>

                {/* Selection Sequence: Disease -> Specify (if needed) -> Ayushman */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Select Disease</label>
                    <select disabled={loading} {...formik.getFieldProps("specialty")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.specialty && formik.errors.specialty ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }}>
                      <option value="">Select Disease</option>
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                      <option value="Others">Others</option>
                    </select>
                    {formik.touched.specialty && formik.errors.specialty && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.specialty}</p>}
                  </div>

                  {formik.values.specialty === "Others" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Specify Disease</label>
                      <input type="text" placeholder="Please specify the disease or symptoms" disabled={loading} {...formik.getFieldProps("otherDisease")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.otherDisease && formik.errors.otherDisease ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }} />
                      {formik.touched.otherDisease && formik.errors.otherDisease && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.otherDisease}</p>}
                    </motion.div>
                  )}

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Ayushman Card</label>
                    <select disabled={loading} {...formik.getFieldProps("ayushmanCard")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.ayushmanCard && formik.errors.ayushmanCard ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }}>
                      <option value="">Select Option</option>
                      <option value="Yes">Yes, I have it</option>
                      <option value="No">No</option>
                    </select>
                    {formik.touched.ayushmanCard && formik.errors.ayushmanCard && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.ayushmanCard}</p>}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%", padding: "16px", borderRadius: 12, background: loading ? "#94a3b8" : "#ff8800", color: "#fff", border: "none", fontSize: 14, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                    }}
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Request Callback Now"} <ChevronRight size={16} />
                  </button>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20, padding: "10px", background: "#f8fafc", borderRadius: 10 }}>
                    <ShieldCheck size={14} color="#059669" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b" }}>Verified Medical Support</span>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ padding: "40px 32px 32px", textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: "#10b981",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
                  boxShadow: "0 8px 16px -4px rgba(16, 185, 129, 0.3)"
                }}>
                  <CheckCircle2 size={32} color="#ffffff" />
                </div>
                <h2 style={{ color: "#0f172a", fontWeight: 700, fontSize: 22, margin: "0 0 12px" }}>
                  Request Submitted
                </h2>
                <p style={{ color: "#475569", fontSize: 15, margin: "0 0 32px", lineHeight: 1.6 }}>
                  Thank you for choosing us. Our customer care will call you shortly.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    transition: "all 0.3s ease",
                    outline: "none"
                  }}
                >
                  Close Portal
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
