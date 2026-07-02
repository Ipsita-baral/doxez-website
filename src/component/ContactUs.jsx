import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

export default function ContactUs() {
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "", org: "", email: "", phone: "", role: "", message: ""
  });
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroRef, heroInView] = useInView(0.1);
  const [cardRef, cardInView] = useInView(0.1);
  const [infoRef, infoInView] = useInView(0.1);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Valid 10-digit number required";
    }
    
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    const CRM_API_URL = import.meta.env.VITE_API_URL;
    
    try {
      const res = await axios.post(`${CRM_API_URL}/api/enquiry/demo`, {
        name: formData.name,
        email: formData.email,
        org: formData.org,
        phoneNumber: formData.phone,
        role: formData.role,
        message: formData.message,
      });

      if (res.data.success) {
        setSubmitted(true);
        setShowPopup(true);
        setFormData({ name: "", org: "", email: "", phone: "", role: "", message: "" });
        setTimeout(() => { setShowPopup(false); setSubmitted(false); }, 4000);
      }
    } catch (error) {
      console.error("Contact Form Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { label: "Main Office", value: "IIT-Bhubaneswar Research & Entrepreneurship Park (REP), Behind Janata Maidan, Samantapuri, Bhubaneswar – 751013", delay: "0.1s" },
    { label: "Contact Number", value: "+91-9692949500", delay: "0.2s" },
    { label: "General Inquiries", value: "support@doxez.in", delay: "0.3s" },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-root {
          min-height: 100vh;
          background: #ffffff;
          color: #1a1a2e;
        }

        .content-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 140px 24px 80px;
        }

        @media (max-width: 640px) {
          .content-wrap { padding: 110px 16px 40px; }
        }

        /* Hero */
        .hero {
          margin-bottom: 64px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .hero.visible { opacity: 1; transform: translateY(0); }

        .hero-title {
          font-size: clamp(2.2rem, 6vw, 4.8rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
          color: #0f1923;
        }
        .hero-title span {
          background: linear-gradient(135deg, #137fec 0%, #0a5bbf 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.05rem);
          color: #5a6a7a;
          max-width: 520px;
          line-height: 1.7;
          font-weight: 400;
        }

        @media (max-width: 640px) {
          .hero { margin-bottom: 40px; }
        }

        /* Grid */
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .grid-layout { grid-template-columns: 1fr; gap: 32px; }
        }

        /* Info panel */
        .info-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .info-panel.visible { opacity: 1; transform: translateX(0); }

        .info-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px;
        }
        @media (max-width: 640px) {
          .info-card { padding: 24px 20px; border-radius: 16px; }
        }

        .info-card h2 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0f1923;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .contact-item:last-child { border-bottom: none; }
        .contact-item.visible { opacity: 1; transform: translateX(0); }

        .contact-label {
          font-size: 11px;
          font-weight: 600;
          color: #137fec;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .contact-value {
          font-size: 0.88rem;
          color: #4a5568;
          line-height: 1.6;
          white-space: pre-line;
        }

        /* Map */
        .map-card {
          background: #f0f6ff;
          border: 1px solid #dbeafe;
          border-radius: 20px;
          overflow: hidden;
          height: 200px;
        }
        @media (max-width: 640px) {
          .map-card { border-radius: 16px; height: 180px; }
        }

        /* Form card */
        .form-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px;
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .form-card.visible { opacity: 1; transform: translateX(0); }

        @media (max-width: 640px) {
          .form-card { padding: 24px 18px; border-radius: 18px; }
        }

        .form-card h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f1923;
          margin-bottom: 28px;
          letter-spacing: -0.02em;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr; gap: 0; margin-bottom: 0; }
          .form-row .field-group { margin-bottom: 18px; }
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 18px;
        }

        label {
          font-size: 12px;
          font-weight: 600;
          color: #4a5568;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        input, select, textarea {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 0.9rem;
          color: #1a202c;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          appearance: none;
          font-family: inherit;
        }
        input::placeholder, textarea::placeholder { color: #a0aec0; }
        input:focus, select:focus, textarea:focus {
          border-color: #137fec;
          background: #f0f7ff;
          box-shadow: 0 0 0 3px rgba(19,127,236,0.12);
        }
        select option { background: #ffffff; color: #1a202c; }
        textarea { resize: vertical; min-height: 110px; }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #137fec 0%, #0a5bbf 100%);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.3s, filter 0.3s;
          box-shadow: 0 4px 24px rgba(19,127,236,0.35);
          margin-top: 8px;
          position: relative;
          overflow: hidden;
          font-family: inherit;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:hover { background: #0056b3; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13, 110, 253, 0.3); }
        .submit-btn.success { background: #10b981; pointer-events: none; }
        .submit-btn.loading { 
          background: #0056b3; 
          pointer-events: none; 
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .skeleton-bar {
          width: 140px;
          height: 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.25);
          position: relative;
          overflow: hidden;
        }

        .skeleton-bar::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: translateX(-100%);
          animation: shimmer 1.5s infinite ease-in-out;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .success-msg { animation: fadeIn 0.4s ease; display: inline-block; }

        .privacy-note {
          text-align: center;
          font-size: 11px;
          color: #718096;
          margin-top: 14px;
        }
        .privacy-note a { color: #137fec; text-decoration: underline; text-underline-offset: 2px; }

        @keyframes success-pop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-msg {
          animation: success-pop 0.5s ease forwards;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
        }

        /* Popup responsive */
        .toast-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #1db97a;
          color: white;
          padding: 16px 24px;
          border-radius: 10px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          z-index: 999;
          font-size: 14px;
          max-width: calc(100vw - 40px);
        }
        @media (max-width: 480px) {
          .toast-popup { top: auto; bottom: 20px; right: 16px; left: 16px; text-align: center; }
        }
      `}</style>

      <div className="contact-root">
        <div className="content-wrap">
          {/* Hero */}
          <div ref={heroRef} className={`hero ${heroInView ? "visible" : ""}`}>
            <h1 className="hero-title">
              Get in <span>Touch</span>
            </h1>
            <p className="hero-sub">
              We're here to help you with your surgical journey and Ayushman Bharat coordination.
              Reach out to our team of experts today.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid-layout">
            {/* Left: Info + Map */}
            <div ref={infoRef} className={`info-panel ${infoInView ? "visible" : ""}`}>
              <div className="info-card">
                <h2>Contact Information</h2>
                {contactItems.map((item, i) => (
                  <div
                    key={i}
                    className={`contact-item ${infoInView ? "visible" : ""}`}
                    style={{ transitionDelay: item.delay }}
                  >
                    <div>
                      <div className="contact-label">{item.label}</div>
                      <div className="contact-value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="map-card">
                <iframe
                  title="map"
                  src="https://maps.google.com/maps?q=bhubaneswar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div ref={cardRef} className={`form-card ${cardInView ? "visible" : ""}`}>
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name" type="text" placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                    />
                    {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
                  </div>
                  <div className="field-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="org">Preferred Hospital (Optional)</label>
                    <input
                      id="org" type="text" placeholder="e.g. AIIMS or nearby hospital"
                      value={formData.org}
                      onChange={e => setFormData({ ...formData, org: e.target.value })}
                      onFocus={() => setFocused("org")} onBlur={() => setFocused("")}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email" type="email" placeholder="john@hospital.org"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                  />
                  {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone" type="tel" placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <span style={{ color: "red", fontSize: "12px" }}>{errors.phone}</span>}
                </div>

                <div className="field-group">
                  <label htmlFor="role">Your Status</label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    onFocus={() => setFocused("role")} onBlur={() => setFocused("")}
                  >
                    <option value="">I am a...</option>
                    <option value="patient">Patient</option>
                    <option value="caretaker">Caretaker/Family Member</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" placeholder="How can we help you?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                  />
                  {errors.message && <span style={{ color: "red", fontSize: "12px" }}>{errors.message}</span>}
                </div>

                <button type="submit" style={{ height: 52 }} className={`submit-btn ${submitted ? "success" : ""} ${loading ? "loading" : ""}`} disabled={loading || submitted}>
                  {loading ? (
                    <div className="skeleton-bar"></div>
                  ) : submitted ? (
                    <span className="success-msg">✓ Message Sent Successfully!</span>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                <p className="privacy-note">
                  By submitting, you agree to our <a href="#">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="toast-popup">
            Thank you! Our team will contact you soon.
          </div>
        )}
      </div>
    </>
  );
}
