'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import SearchableDiseaseDropdown from "@/components/common/SearchableDiseaseDropdown";
import {
  X, User, Phone, MapPin, Stethoscope,
  CheckCircle2, ShieldCheck, HeartPulse,
  ChevronRight, CalendarCheck, PhoneCall, Info, Loader2, Mail, Clock, XCircle, Calendar
} from "lucide-react";
import { trackLeadSubmission, trackButtonClick } from "@/lib/gtag";

// Specialty list...
const CITIES = ["Bhubaneswar"];
const SPECIALTIES = [
  "Piles, Fissure, Fistula",
  "Hernia, Gallstone",
  "Kidney Stones, Prostate",
  "Gynecology",
  "Orthopedics"
];

export default function AppointmentModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const CRM_API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "http://localhost:8000") || "";

  // 📝 Formik Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email format"),
    age: Yup.number().typeError("Age must be a number").required("Age is required").positive("Age must be positive").integer().max(120, "Please enter a valid age"),
    gender: Yup.string().required("Required"),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, "Valid 10-digit number required").required("Phone number is required"),
    city: Yup.string().required("Please select a city"),
    otherLocation: Yup.string().when("city", {
      is: "Other City",
      then: (schema) => schema.required("Please specify your city"),
      otherwise: (schema) => schema.nullable(),
    }),
    specialty: Yup.string().required("Please select a disease"),
    otherDisease: Yup.string().when("specialty", {
      is: "Others",
      then: (schema) => schema.required("Please specify the disease"),
      otherwise: (schema) => schema.nullable(),
    }),
    ayushmanCard: Yup.string().required("Required"),
  });

  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [customDate, setCustomDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formValues, setFormValues] = useState(null);

  const getTodayDateStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatCustomDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getAvailableSlots = (date, customDateVal) => {
    const allSlots = ["8AM - 1PM", "1PM - 5PM", "5PM - 9PM"];
    const todayStr = getTodayDateStr();
    if (date === "Tomorrow" || (date === "Custom" && customDateVal && customDateVal > todayStr)) {
      return allSlots;
    }
    if (date === "Today" || (date === "Custom" && customDateVal === todayStr)) {
      const currentHour = new Date().getHours();
      if (currentHour >= 17) {
        return ["5PM - 9PM"];
      } else if (currentHour >= 13) {
        return ["1PM - 5PM", "5PM - 9PM"];
      } else {
        return allSlots;
      }
    }
    return allSlots;
  };

  const confirmAndSubmit = async () => {
    if (!formValues || !selectedTime) return;
    setLoading(true);
    try {
      await axios.post(`${CRM_API_URL}/api/leads/public/booking`, {
        patientName: formValues.name,
        patientEmail: formValues.email,
        email: formValues.email,
        patientAge: Number(formValues.age),
        patientGender: formValues.gender,
        patientPhone: formValues.phone,
        city: formValues.city === "Other City" ? formValues.otherLocation : formValues.city,
        treatmentRequired: formValues.specialty === "Others" ? formValues.otherDisease : formValues.specialty,
        hasAyushmanCard: formValues.ayushmanCard === "Yes",
        preferredCallTime: selectedTime,
        source: `Appointment Modal - ${selectedTime}`,
        referralCode: localStorage.getItem('doxez_ref') || undefined
      });

      // GA4 Event - Lead Submission
      trackLeadSubmission("Appointment Modal", {
        specialty: formValues.specialty === "Others" ? formValues.otherDisease : formValues.specialty,
        city: formValues.city === "Other City" ? formValues.otherLocation : formValues.city,
        hasAyushman: formValues.ayushmanCard === "Yes",
        preferredTime: selectedTime,
      });

      localStorage.removeItem('doxez_ref');
      setShowTimeModal(false);
      setSubmitted(true);
      setSelectedDate("Today");
      setCustomDate("");
      setSelectedSlot(null);
      setSelectedTime(null);
      formik.resetForm();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Consultation request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: "", email: "", age: "", gender: "", phone: "", city: "", otherLocation: "", specialty: "", ayushmanCard: "", otherDisease: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      // GA4 Event - Button Click
      trackButtonClick("Appointment Modal - Request Callback Now", {
        specialty: values.specialty === "Others" ? values.otherDisease : values.specialty,
        city: values.city === "Other City" ? values.otherLocation : values.city,
      });

      setFormValues(values);
      setSelectedDate("Today");
      setCustomDate("");
      setSelectedSlot(null);
      setSelectedTime(null);
      setShowTimeModal(true);
    },
  });

  const handleModalClose = () => {
    setSelectedDate("Today");
    setCustomDate("");
    setSelectedSlot(null);
    setSelectedTime(null);
    setShowTimeModal(false);
    onClose();
  };

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
          onClick={handleModalClose}
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
          <button onClick={handleModalClose} style={{ position: "absolute", top: 20, right: 20, border: "none", background: "#f1f5f9", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8", zIndex: 10 }}>
            <X size={16} />
          </button>

          {showTimeModal ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ padding: "10px 0" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: '800' }}>
                    <Clock size={20} color="#3b82f6" /> Select Callback Time
                  </h4>
                  <button onClick={() => setShowTimeModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}>
                    <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
                  </button>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                  Please choose your preferred time window for our care coordinator to reach out.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <button
                    onClick={() => {
                      setSelectedSlot("30min");
                      setSelectedTime('Today - Call within 30 minutes');
                    }}
                    type="button"
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '8px',
                      border: `1.5px solid ${selectedSlot === "30min" ? '#3b82f6' : '#10b981'}`,
                      background: selectedSlot === "30min" ? '#eff6ff' : '#ecfdf5',
                      color: selectedSlot === "30min" ? '#3b82f6' : '#047857',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <PhoneCall size={18} />
                    Call me within 30 minutes
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Or schedule later</span>
                  <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                </div>

                {/* Date Selector: Today vs Tomorrow vs Pick Date */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                  {[
                    { key: 'Today', label: 'Today' },
                    { key: 'Tomorrow', label: 'Tomorrow' },
                    { key: 'Custom', label: 'Pick Date' }
                  ].map(item => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setSelectedDate(item.key);
                        setSelectedSlot(null);
                        setSelectedTime(null);
                        if (item.key === 'Custom' && !customDate) {
                          setCustomDate(getTodayDateStr());
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '10px 6px',
                        borderRadius: '8px',
                        border: `1.5px solid ${selectedDate === item.key ? '#3b82f6' : '#e2e8f0'}`,
                        background: selectedDate === item.key ? '#eff6ff' : '#ffffff',
                        color: selectedDate === item.key ? '#3b82f6' : '#64748b',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Calendar size={14} /> {item.label}
                    </button>
                  ))}
                </div>

                {/* Custom Date Input if Pick Date selected */}
                {selectedDate === 'Custom' && (
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '6px' }}>
                      Select Date:
                    </label>
                    <input
                      type="date"
                      min={getTodayDateStr()}
                      value={customDate}
                      onChange={(e) => {
                        setCustomDate(e.target.value);
                        setSelectedSlot(null);
                        setSelectedTime(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #3b82f6',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#0f172a',
                        outline: 'none',
                        background: '#eff6ff',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {getAvailableSlots(selectedDate, customDate).map(time => {
                    const isSelected = selectedSlot === time;
                    return (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedSlot(time);
                          const dateLabel = selectedDate === 'Custom' 
                            ? (formatCustomDate(customDate) || 'Custom Date') 
                            : selectedDate;
                          setSelectedTime(`${dateLabel}, ${time}`);
                        }}
                        type="button"
                        style={{
                          padding: '14px',
                          borderRadius: '8px',
                          border: `1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                          background: isSelected ? '#eff6ff' : '#fff',
                          color: isSelected ? '#3b82f6' : '#1e293b',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          fontSize: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <span>{time}</span>
                        {isSelected && <CheckCircle2 size={18} color="#3b82f6" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={confirmAndSubmit}
                  disabled={!selectedTime || loading}
                  type="button"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: !selectedTime || loading ? '#cbd5e1' : '#ff8800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '800',
                    cursor: !selectedTime || loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    transition: 'all 0.3s'
                  }}
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Confirm Time"} <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ) : !submitted ? (
            <>
              <div style={{ marginBottom: 28, textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff6ff", color: "#1e4b8f", padding: "6px 14px", borderRadius: 99, fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 12, border: "1px solid #dbeafe" }}>
                  <HeartPulse size={12} /> Doxez Healthcare
                </div>
                <h2 className="modal-title" style={{ fontSize: 24, fontWeight: 800, color: "#0b1f3a", marginBottom: 8 }}>Get <span className="free-highlight">Free</span> Expert Advice</h2>
                <p className="modal-desc" style={{ color: "#64748b", fontSize: 13, lineHeight: 1.4 }}>Share your details. Our care expert will contact you, understand your needs, and connect you with the right specialist.</p>
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
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={3}
                      placeholder="Age"
                      disabled={loading}
                      name="age"
                      value={formik.values.age}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                        formik.setFieldValue("age", val);
                      }}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.age && formik.errors.age ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }}
                    />
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
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile"
                        disabled={loading}
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 10 && val.startsWith("91")) val = val.slice(2);
                          val = val.replace(/^0+/, "").slice(0, 10);
                          formik.setFieldValue("phone", val);
                        }}
                        style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: 12, border: `1.5px solid ${formik.touched.phone && formik.errors.phone ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }}
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.phone}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>City</label>
                    <select disabled={loading} {...formik.getFieldProps("city")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.city && formik.errors.city ? "#ef4444" : "#e2e8f0"}`, fontSize: 13 }}>
                      <option value="">Select City</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      <option value="Other City">Other City</option>
                    </select>
                    {formik.touched.city && formik.errors.city && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.city}</p>}
                  </div>
                </div>

                {formik.values.city === "Other City" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Specify City</label>
                    <input type="text" placeholder="Please specify your city" disabled={loading} {...formik.getFieldProps("otherLocation")} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${formik.touched.otherLocation && formik.errors.otherLocation ? "#ef4444" : "#e2e8f0"}`, fontSize: 13, outline: "none" }} />
                    {formik.touched.otherLocation && formik.errors.otherLocation && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4, fontWeight: 600 }}>{formik.errors.otherLocation}</p>}
                  </motion.div>
                )}

                {/* Selection Sequence: Disease -> Specify (if needed) -> Ayushman */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>Select Disease</label>
                    <SearchableDiseaseDropdown
                      name="specialty"
                      value={formik.values.specialty}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={loading}
                      hasError={formik.touched.specialty && !!formik.errors.specialty}
                    />
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
                  <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 10, lineHeight: 1.4 }}>
                    By requesting a callback, you agree to our{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "underline" }}>Terms &amp; Conditions</a>{" "}
                    and{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "underline" }}>Privacy Policy</a>.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 14, padding: "10px", background: "#f8fafc", borderRadius: 10 }}>
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
                    padding: "12px 28px",
                    background: "#0f172a",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
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
