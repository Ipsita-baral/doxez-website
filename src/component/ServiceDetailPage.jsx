import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, XCircle, ShieldCheck, Clock, Activity,
  ChevronLeft, Loader2, Phone, MapPin, User, Stethoscope,
  Zap, HeartPulse, ShieldPlus, ArrowRight, MessageSquare
} from 'lucide-react';
import axios from 'axios';
import { servicesData } from '../data/servicesData';
import { toast } from 'react-toastify';

export default function ServiceDetailPage() {
  const { categoryId, treatmentId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", hasAyushman: false });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic data states
  const [dynamicTreatment, setDynamicTreatment] = useState(null);
  const [dynamicCategory, setDynamicCategory] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", city: "", hasAyushman: false });
        setSelectedTime(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        // Check if treatmentId looks like a MongoDB ID (24 chars)
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(treatmentId);

        if (isMongoId) {
          const baseUrl = import.meta.env.VITE_API_URL;
          const response = await axios.get(`${baseUrl}/api/sub-services/${treatmentId}`);
          if (response.data.success) {
            const data = response.data.data;
            setDynamicTreatment({
              id: data._id,
              name: data.name,
              image: data.image ? (data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`) : null,
              desc: data.desc,
              symptoms: data.symptoms,
              options: data.options,
              recovery: data.recovery,
              types: data.types,
              insurance: {
                accepted: data.eligibilityModes?.includes('Insurance'),
                ayushman: data.eligibilityModes?.includes('Ayushman'),
                cashless: data.eligibilityModes?.includes('Insurance') || data.eligibilityModes?.includes('Cash')
              }
            });
            setDynamicCategory({
              id: data.service?._id,
              title: data.service?.serviceName,
              image: data.service?.imageUrl ? (data.service.imageUrl.startsWith('http') ? data.service.imageUrl : `${baseUrl}${data.service.imageUrl}`) : null
            });
          }
        }
      } catch (err) {
        console.error("Error fetching treatment details:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [treatmentId]);

  // Fallback to static data
  const staticCategory = servicesData.find(c => c.id === categoryId);
  const staticTreatment = staticCategory?.treatments.find(t => t.id === treatmentId) || staticCategory?.treatments[0];

  const category = dynamicCategory || staticCategory;
  const treatment = dynamicTreatment || staticTreatment;

  if (fetching) return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#fff", minHeight: "100vh" }}>
      <style>{`
        @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
        .skel { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite; border-radius: 8px; }
      `}</style>

      {/* Hero skeleton */}
      <div style={{ background: "#f8fafc", padding: "150px 20px 32px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="skel" style={{ width: 60, height: 14, marginBottom: 20 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div className="skel" style={{ width: 120, height: 28, borderRadius: 8, marginBottom: 16 }} />
              <div className="skel" style={{ width: "80%", height: 32, marginBottom: 10 }} />
              <div className="skel" style={{ width: "60%", height: 32, marginBottom: 20 }} />
              <div className="skel" style={{ width: "90%", height: 16, marginBottom: 8 }} />
              <div className="skel" style={{ width: "70%", height: 16, marginBottom: 24 }} />
              <div style={{ display: "flex", gap: 16 }}>
                <div className="skel" style={{ width: 140, height: 20 }} />
                <div className="skel" style={{ width: 140, height: 20 }} />
                <div className="skel" style={{ width: 120, height: 20 }} />
              </div>
            </div>
            <div className="skel" style={{ width: 380, height: 320, borderRadius: 24, flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div style={{ padding: "48px 24px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60 }}>
        <div>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ marginBottom: 48 }}>
              <div className="skel" style={{ width: "40%", height: 24, marginBottom: 16 }} />
              <div className="skel" style={{ width: "100%", height: 14, marginBottom: 8 }} />
              <div className="skel" style={{ width: "90%", height: 14, marginBottom: 8 }} />
              <div className="skel" style={{ width: "75%", height: 14 }} />
            </div>
          ))}
        </div>
        <div>
          <div style={{ border: "1px solid #e2e8f0", borderRadius: 24, padding: 32 }}>
            <div className="skel" style={{ width: "70%", height: 24, marginBottom: 10 }} />
            <div className="skel" style={{ width: "90%", height: 14, marginBottom: 24 }} />
            {[1, 2, 3].map(i => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div className="skel" style={{ width: "30%", height: 12, marginBottom: 6 }} />
                <div className="skel" style={{ width: "100%", height: 44, borderRadius: 10 }} />
              </div>
            ))}
            <div className="skel" style={{ width: "100%", height: 52, borderRadius: 12, marginTop: 8 }} />
          </div>
        </div>
      </div>
    </div>
  );

  if (!category) return <div style={{ padding: 100, textAlign: 'center' }}>Service not found</div>;

  const handleBookingClick = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setShowTimeModal(true);
  };

  const confirmAndSubmit = async () => {
    setLoading(true);
    try {
      const CRM_API_URL = import.meta.env.VITE_API_URL || "https://crm.doxez.in";

      // Determine if we are using a dynamic sub-service ID
      const isMongoId = /^[0-9a-fA-F]{24}$/.test(treatmentId);

      const payload = {
        patientName: form.name,
        patientEmail: form.email,
        email: form.email,
        patientPhone: form.phone,
        city: form.city,
        hasAyushmanCard: form.hasAyushman,
        hasAyushman: form.hasAyushman, // For static API compat
        preferredCallTime: selectedTime,
        referralCode: localStorage.getItem('doxez_ref') || undefined
      };

      if (isMongoId) {
        // Use the professional Web-Lead API for better CRM routing
        await axios.post(`${CRM_API_URL}/api/leads/public/web-lead`, {
          ...payload,
          subServiceId: treatmentId,
          source: `DOXEZ_WEB_DETAIL - ${selectedTime}`,
        });
      } else {
        // Fallback for static data if needed
        await axios.post(`${CRM_API_URL}/api/leads/public/booking`, {
          ...payload,
          treatmentRequired: treatment?.name || category.title,
          source: `Service Detail Page (Static) - ${selectedTime}`,
        });
      }

      localStorage.removeItem('doxez_ref');
      setShowTimeModal(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Booking Error:", err);
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#fff", color: "#0f172a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .section-padding { padding: 48px 24px; }
        .container { max-width: 1200px; margin: 0 auto; }
        
        .treatment-type-card {
          transition: all 0.3s ease;
        }
        .treatment-type-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.08), 0 8px 10px -6px rgba(59, 130, 246, 0.08) !important;
          border-color: #3b82f6 !important;
        }
        
        .hero-banner {
          background: #f8fafc;
          padding: 150px 20px 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        @media (max-width: 640px) {
          .hero-banner { padding: 120px 16px 20px !important; }
        }
        
        .benefit-point {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
          font-size: 15px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
        }

        .info-section { margin-bottom: 48px; }
        .info-section h3 { 
          font-size: 24px; 
          font-weight: 800; 
          color: #0b1f3a; 
          margin-bottom: 20px; 
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .info-section p { font-size: 16px; color: #475569; lineHeight: 1.7; }
        .info-section ul { list-style: none; padding: 0; }
        .info-section li { 
          display: flex; 
          align-items: flex-start; 
          gap: 10px; 
          margin-bottom: 12px; 
          color: #475569; 
          font-size: 15px;
        }
        .info-section li::before {
          content: "•";
          color: #3b82f6;
          font-weight: 900;
          font-size: 20px;
          line-height: 1;
        }

        .booking-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.05);
          position: sticky;
          top: 100px;
        }

        .insurance-box {
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          border-radius: 20px;
          padding: 24px;
        }

        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr; gap: 32px !important; }
          .booking-card { position: static; margin-top: 10px !important; }
        }
        @media (max-width: 600px) {
          .hero-image-wrap { width: 200px !important; height: 160px !important; border-radius: 16px !important; }
          .section-padding { padding: 32px 20px !important; }
          .info-section h3 { font-size: 18px !important; margin-bottom: 12px !important; gap: 8px !important; }
          .info-section p { font-size: 13.5px !important; line-height: 1.5 !important; }
          .info-section li { font-size: 13.5px !important; margin-bottom: 6px !important; }
          .info-section { margin-bottom: 28px !important; }
          .insurance-box { padding: 16px !important; }
          
          .hero-banner h1 { font-size: 1.2rem !important; }
          .hero-banner p { font-size: 12px !important; line-height: 1.4 !important; }
          .benefit-point { font-size: 12px !important; gap: 8px !important; margin-bottom: 8px !important; }
          .benefit-point svg { width: 14px !important; height: 14px !important; }
          
          .booking-card { padding: 24px !important; }
          .booking-card h3 { font-size: 18px !important; }
          .booking-card p { font-size: 13px !important; margin-bottom: 16px !important; }
          .booking-card label { font-size: 12px !important; margin-bottom: 4px !important; }
          .booking-card input[type="text"], .booking-card input[type="tel"] { padding: 10px !important; font-size: 14px !important; }
          .booking-card button { padding: 14px !important; font-size: 14px !important; }
          .ayushman-label { font-size: 13px !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="hero-banner">
        <div className="container">
          <button
            onClick={() => navigate(`/services/${category.id}`)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#64748b",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 16,
              fontSize: 13,
              padding: 0
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "40px" }}>
            <div style={{ flex: "1 1 500px" }}>
              <div style={{ display: "inline-block", padding: "6px 12px", background: "#eef4ff", color: "#3b82f6", borderRadius: "8px", fontSize: "12px", fontWeight: "800", marginBottom: "16px", textTransform: "uppercase" }}>
                {category.title}
              </div>
              <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: "800", marginBottom: "12px", color: "#0b1f3a", lineHeight: 1.2 }}>
                {treatment?.name || category.title} Treatment in Bhubaneswar
              </h1>
              <p style={{ fontSize: "15px", color: "#475569", marginBottom: "20px", fontWeight: "500", lineHeight: 1.6 }}>
                Concerned about {treatment?.name}? <br />
                DOXEZ helps you connect with experienced surgeons for advanced treatment.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                <div className="benefit-point"><CheckCircle2 size={20} color="#16a34a" /> Free Consultation</div>
                <div className="benefit-point"><CheckCircle2 size={20} color="#16a34a" /> Insurance Support</div>
                <div className="benefit-point"><CheckCircle2 size={20} color="#16a34a" /> Faster Recovery</div>
              </div>
            </div>

            <div style={{ flex: "0 0 auto", textAlign: "center" }}>
              <div className="hero-image-wrap" style={{
                width: "380px",
                height: "320px",
                borderRadius: "24px",
                overflow: "hidden",
                margin: "0 auto",
                boxShadow: "0 20px 50px rgba(30,75,143,0.12)"
              }}>
                <img
                  src={treatment?.image || category.image || "/services/default.jpg"}
                  alt={treatment?.name || category.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.style.background = "#eff6ff"; }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="section-padding">
        <div className="container">
          <div className="content-grid">

            {/* Left Content */}
            <div>
              {/* What is... */}
              <div className="info-section">
                <h3>What is {treatment?.name || category.title}?</h3>
                <p>{treatment?.desc || `Advanced ${category.title} involves specialized surgical care for various conditions using modern techniques.`}</p>
              </div>

              {/* Symptoms */}
              {treatment?.symptoms && treatment.symptoms.length > 0 && (
                <div className="info-section">
                  <h3>Common Symptoms</h3>
                  <ul>
                    {treatment.symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatment Options */}
              <div className="info-section">
                <h3>Treatment Options</h3>
                <p>Depending on your condition, doctors may recommend:</p>
                <ul>
                  {(treatment?.options || ["Medicines", "Lifestyle changes", "Minimally invasive surgery", "Laser treatment"]).map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>

              {/* Types of Treatment */}
              {treatment?.types && treatment.types.length > 0 && (
                <div className="info-section">
                  <h3>Types of {treatment?.name || category.title}</h3>
                  <p style={{ marginBottom: "16px" }}>There are several advanced surgical methods available:</p>
                  <div style={{ display: "grid", gap: "16px" }}>
                    {treatment.types.map((type, i) => (
                      <div key={i} className="treatment-type-card" style={{
                        padding: "20px 24px",
                        background: "#f8fafc",
                        borderLeft: "4px solid #3b82f6",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
                        border: "1px solid #e2e8f0",
                        borderLeftColor: "#3b82f6"
                      }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#0b1f3a", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ display: "inline-flex", width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }}></span>
                          {type.name}
                        </h4>
                        <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
                          {type.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose DOXEZ */}
              <div className="info-section">
                <h3>Why Choose DOXEZ?</h3>
                <ul>
                  <li>Verified hospitals & surgery centers</li>
                  <li>Experienced senior surgeons</li>
                  <li>Insurance & Ayushman support</li>
                  <li>Faster recovery with modern techniques</li>
                </ul>
              </div>

              {/* Insurance Support */}
              <div className="info-section">
                <h3>Insurance Support</h3>
                <div className="insurance-box">
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div className="benefit-point">
                      {treatment?.insurance?.accepted !== false ? <CheckCircle2 size={18} color="#16a34a" /> : <XCircle size={18} color="#ef4444" />}
                      Insurance Accepted
                    </div>
                    <div className="benefit-point">
                      {treatment?.insurance?.ayushman !== false ? <CheckCircle2 size={18} color="#16a34a" /> : <XCircle size={18} color="#ef4444" />}
                      Ayushman Support Available*
                    </div>
                    <div className="benefit-point">
                      {treatment?.insurance?.cashless !== false ? <CheckCircle2 size={18} color="#16a34a" /> : <XCircle size={18} color="#ef4444" />}
                      Cashless Assistance Available
                    </div>
                  </div>
                  <p style={{ marginTop: "16px", fontSize: "12px", color: "#166534", fontWeight: "600" }}>
                    *Depends on eligibility and hospital approval.
                  </p>
                </div>
              </div>

              {/* Recovery */}
              <div className="info-section">
                <h3>Recovery</h3>
                <p>{treatment?.recovery || "Our treatments focus on minimally invasive techniques that ensure short hospital stays and a faster return to normal life."}</p>
              </div>
            </div>

            {/* Right Sidebar - Form */}
            <div>
              <div className="booking-card">
                {!submitted ? (
                  <>
                    <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>Book FREE Consultation</h3>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px" }}>Connect with our medical expert today.</p>

                    <form onSubmit={handleBookingClick}>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>Full Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>Email Address (Optional)</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>mobile/whatsapp Number</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setForm({ ...form, phone: val });
                          }}
                          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                          placeholder="10-digit mobile/whatsapp number"
                        />
                      </div>
                      <div style={{ marginBottom: "24px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>City</label>
                        <input
                          type="text"
                          required
                          value={form.city}
                          onChange={e => setForm({ ...form, city: e.target.value })}
                          style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0", outline: "none" }}
                          placeholder="Your city"
                        />
                      </div>

                      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                          type="checkbox"
                          id="ayushman-check"
                          checked={form.hasAyushman}
                          onChange={e => setForm({ ...form, hasAyushman: e.target.checked })}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <label htmlFor="ayushman-check" className="ayushman-label" style={{ fontSize: "14px", fontWeight: "700", color: "#0b1f3a", cursor: "pointer" }}>
                          I have an Ayushman Bharat Card
                        </label>
                      </div>

                      <button
                        disabled={loading}
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "16px",
                          background: "#3b82f6",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          fontWeight: "800",
                          fontSize: "15px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px"
                        }}
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Book Free Consultation"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <CheckCircle2 size={50} color="#16a34a" style={{ display: "block", margin: "0 auto 16px" }} />
                    <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>Booking Confirmed!</h3>
                    <p style={{ fontSize: "14px", color: "#64748b" }}>Our team will contact you shortly.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {showTimeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', width: '100%', maxWidth: '400px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ background: '#0f172a', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
              <h4 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> Select Callback Time
              </h4>
              <button onClick={() => setShowTimeModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}>
                <XCircle size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', textAlign: 'center' }}>
                Please choose your preferred time window for our care coordinator to reach out.
              </p>
              
              <div style={{ marginBottom: '20px' }}>
                <button
                  onClick={() => setSelectedTime('Call within 30 minutes')}
                  type="button"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: `1.5px solid ${selectedTime === 'Call within 30 minutes' ? '#3b82f6' : '#10b981'}`,
                    background: selectedTime === 'Call within 30 minutes' ? '#eff6ff' : '#ecfdf5',
                    color: selectedTime === 'Call within 30 minutes' ? '#3b82f6' : '#047857',
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
                  <Phone size={18} />
                  Call me within 30 minutes
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Or schedule later</span>
                <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {['8AM - 1PM', '1PM - 5PM', '5PM - 9PM'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    type="button"
                    style={{
                      padding: '14px',
                      borderRadius: '8px',
                      border: `1px solid ${selectedTime === time ? '#3b82f6' : '#e2e8f0'}`,
                      background: selectedTime === time ? '#eff6ff' : '#fff',
                      color: selectedTime === time ? '#3b82f6' : '#1e293b',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      fontSize: '15px'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              
              <button
                onClick={confirmAndSubmit}
                disabled={!selectedTime || loading}
                type="button"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: (!selectedTime || loading) ? '#cbd5e1' : '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: !selectedTime || loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '15px'
                }}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Confirm Time"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
