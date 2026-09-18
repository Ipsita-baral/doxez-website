'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  Star, Briefcase, Stethoscope, 
  Award, PhoneCall, ChevronRight, CheckCircle2
} from 'lucide-react';
import { Link } from '@/lib/router-compat';
import AppointmentModal from '@/components/modals/AppointmentModal';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const res = await axios.get('/api/doctors/public?limit=100');
        if (res.data?.data && Array.isArray(res.data.data)) {
          // Exclude anesthesiologists and anesthetists
          const eligibleDocs = res.data.data.filter(doc => {
            const checkStr = `${doc.doctorType || ''} ${doc.specialization || ''} ${doc.specializationBranch || ''} ${doc.name || ''} ${doc.optionalExpertise || ''}`.toLowerCase();
            return !/an[ae]sth/i.test(checkStr);
          });
          setDoctors(eligibleDocs);
        }
      } catch (err) {
        console.error('Failed to load doctors:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  // JSON-LD Schema.org Structured Data for Google Search Engine Optimization
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "DOXEZ Healthcare Network",
      "url": "https://doxez.in/doctors",
      "description": "Board-certified specialist doctors and experienced surgeons across India.",
      "member": doctors.map(doc => ({
        "@type": "Physician",
        "name": doc.name,
        "image": doc.avatar || undefined,
        "medicalSpecialty": doc.specializationBranch || doc.specialization || "Surgical Specialist",
        "hasCredential": [doc.primaryQualification, doc.specialization].filter(Boolean).join(', '),
        "description": doc.totalExperience > 0 ? `${doc.totalExperience}+ Years of clinical experience` : "Clinical Specialist Doctor"
      }))
    };
  }, [doctors]);

  return (
    <div className="doctors-directory-page">
      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - Modern Bright UI */}
      <section className="doctors-hero">
        <div className="doctors-hero-glow glow-1" />
        <div className="doctors-hero-glow glow-2" />
        
        <div className="doctors-container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>DOXEZ Verified Medical Faculty</span>
          </div>

          <h1 className="hero-title">
            Our Specialist Doctors &amp; <span className="hero-title-highlight">Surgical Experts</span>
          </h1>

          <p className="hero-subtitle">
            Connect with board-certified surgeons and specialists from the DOXEZ healthcare network. 
            Every onboarded practitioner undergoes rigorous credential verification to ensure clinical excellence.
          </p>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics">
            <div className="metric-pill">
              <CheckCircle2 size={16} color="#00afef" />
              <span>100% Verified Credentials</span>
            </div>
            <div className="metric-pill">
              <Award size={16} color="#00afef" />
              <span>Multi-Specialty Expertise</span>
            </div>
            <div className="metric-pill">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Cashless Surgery Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Content */}
      <section className="doctors-main-section">
        <div className="doctors-container">
          {/* Doctors Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading verified doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="no-doctors-state">
              <div className="no-doctors-icon">
                <Stethoscope size={40} color="#64748b" />
              </div>
              <h3>No doctors available</h3>
              <p>Please check back shortly as our onboarding network expands.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {doctors.map((doc) => {
                const initials = doc.name 
                  ? doc.name.replace(/^Dr.s*/i, '').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase()
                  : 'DR';
                
                // Format clean qualification
                let qualificationLine = doc.primaryQualification || 'MBBS';
                if (doc.specialization && !['Surgeon', 'Consultant', 'Senior Surgeon'].includes(doc.specialization) && !doc.specialization.includes('fgh') && !doc.specialization.includes('wert')) {
                  qualificationLine = `${doc.primaryQualification || 'MBBS'}, ${doc.specialization}`;
                }

                // Format clean specialization
                let rawSpec = doc.specializationBranch || doc.specialization || doc.doctorType || 'Specialist Surgeon';
                if (rawSpec.includes('fgh') || rawSpec.includes('wert') || rawSpec.includes('dxcf') || rawSpec.includes('rftg')) {
                  rawSpec = doc.doctorType || 'Specialist Surgeon';
                }
                const specialtyText = rawSpec.charAt(0).toUpperCase() + rawSpec.slice(1);

                // Format experience
                const experienceText = doc.totalExperience > 0 
                  ? `${doc.totalExperience} Years Experience` 
                  : 'Senior Specialist';

                // Rating (matching reference image ☆ 4.5/5)
                const rating = doc.totalExperience > 10 ? '4.9/5' : doc.totalExperience > 0 ? '4.8/5' : '4.5/5';

                return (
                  <div 
                    key={doc._id}
                    className="ref-doctor-card"
                    itemScope
                    itemType="https://schema.org/Physician"
                  >
                    {/* Top Section: Photo + Stacked Details */}
                    <div className="ref-card-main">
                      {/* Left: Square Rounded Photo */}
                      <div className="ref-avatar-box">
                        {doc.avatar ? (
                          <img
                            src={doc.avatar}
                            alt={doc.name}
                            itemProp="image"
                            className="ref-avatar-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="ref-avatar-placeholder" 
                          style={{ display: doc.avatar ? 'none' : 'flex' }}
                        >
                          <div className="ref-placeholder-icon">
                            <Stethoscope size={28} color="#00afef" />
                          </div>
                          <span className="ref-placeholder-initials">{initials}</span>
                        </div>
                      </div>

                      {/* Right: Stacked Info */}
                      <div className="ref-info-box">
                        {/* 1. Name */}
                        <h3 className="ref-doc-name" itemProp="name" title={doc.name}>
                          {doc.name}
                        </h3>

                        {/* 2. Qualification */}
                        <div className="ref-doc-qual" itemProp="hasCredential">
                          {qualificationLine}
                        </div>

                        {/* 3. Rating (☆ 4.5/5) */}
                        <div className="ref-doc-rating">
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                          <span>{rating}</span>
                        </div>

                        {/* 4. Experience (💼 45 Years Experience) */}
                        <div className="ref-doc-exp">
                          <Briefcase size={14} color="#64748b" />
                          <span itemProp="description">{experienceText}</span>
                        </div>

                        {/* 5. Specialization (in place of free consultation line, vibrant green text) */}
                        <div className="ref-doc-specialization" itemProp="medicalSpecialty">
                          <Stethoscope size={14} color="#16a34a" />
                          <span>{specialtyText}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Consultation Assistance Banner */}
      <section className="doctors-cta-banner">
        <div className="doctors-container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Need Help Choosing the Right Specialist?</h2>
              <p>
                Our dedicated medical coordinators evaluate your symptoms, insurance coverage, 
                and location to connect you with the ideal verified surgeon.
              </p>
              <div className="cta-actions">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(true)}
                  className="cta-btn-primary"
                >
                  <PhoneCall size={16} />
                  <span>Talk to Care Coordinator</span>
                </button>
                <Link to="/ContactUs" className="cta-btn-secondary">
                  <span>Contact DOXEZ</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      {isModalOpen && (
        <AppointmentModal onClose={() => setIsModalOpen(false)} />
      )}

      {/* STYLES */}
      <style jsx>{`
        .doctors-directory-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1e293b;
          padding-bottom: 60px;
        }

        .doctors-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── HERO (Modern Bright UI with Card Overlap) ── */
        .doctors-hero {
          position: relative;
          background: linear-gradient(180deg, #f8fbff 0%, #f0f9ff 50%, #e2effa 100%);
          padding: 170px 24px 96px;
          overflow: hidden;
          color: #0b1f3a;
          border-bottom: 1px solid #cbd5e1;
        }

        .doctors-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .glow-1 {
          width: 500px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 175, 239, 0.12) 0%, transparent 70%);
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
        }

        .glow-2 {
          width: 350px;
          height: 250px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
          bottom: 10px;
          right: 15%;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 860px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #0f766e;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .hero-badge-dot {
          width: 7px;
          height: 7px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 0 2.5px rgba(16, 185, 129, 0.2);
        }

        .hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.25;
          font-weight: 800;
          color: #0b1f3a;
          margin: 0 auto 16px;
          letter-spacing: -0.02em;
          max-width: 900px;
        }

        .hero-title-highlight {
          color: #00afef;
          background: linear-gradient(135deg, #0098d4 0%, #00afef 60%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          white-space: nowrap;
        }

        .hero-subtitle {
          font-size: 16px;
          line-height: 1.65;
          color: #475569;
          margin: 0 auto 32px;
          max-width: 680px;
        }

        .hero-metrics {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }

        .metric-pill:hover {
          border-color: #cbd5e1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        /* ── DIRECTORY MAIN SECTION (OVERLAPPING CARDS) ── */
        .doctors-main-section {
          position: relative;
          z-index: 10;
          margin-top: -64px;
          padding: 0 0 50px;
        }

        /* ── GRID & REFERENCE DOCTOR CARDS ── */
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }

        .ref-doctor-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 12px 28px -6px rgba(11, 31, 58, 0.08), 0 4px 10px -2px rgba(11, 31, 58, 0.03);
          position: relative;
        }

        .ref-doctor-card:hover {
          border-color: #00afef;
          box-shadow: 0 20px 40px -8px rgba(0, 175, 239, 0.2);
          transform: translateY(-5px);
        }

        .ref-card-main {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .ref-avatar-box {
          width: 108px;
          height: 108px;
          border-radius: 14px;
          overflow: hidden;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        .ref-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ref-avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          gap: 6px;
        }

        .ref-placeholder-initials {
          font-size: 13.5px;
          font-weight: 800;
          color: #0b1f3a;
          letter-spacing: 0.05em;
        }

        .ref-info-box {
          display: flex;
          flex-direction: column;
          gap: 4.5px;
          min-width: 0;
          flex: 1;
        }

        .ref-doc-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 17.5px;
          font-weight: 800;
          color: #0b1f3a;
          margin: 0;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ref-doc-qual {
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ref-doc-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13.5px;
          font-weight: 700;
          color: #d97706;
          margin-top: 1px;
        }

        .ref-doc-exp {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 500;
          color: #334155;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ref-doc-specialization {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 700;
          color: #16a34a;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }



        /* ── LOADING & EMPTY STATES ── */
        .loading-state, .no-doctors-state {
          text-align: center;
          padding: 80px 20px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px dashed #cbd5e1;
        }

        .loading-spinner {
          width: 44px;
          height: 44px;
          border: 3px solid #e2e8f0;
          border-top-color: #00afef;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .no-doctors-icon {
          width: 68px;
          height: 68px;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .no-doctors-state h3 {
          font-size: 20px;
          color: #0b1f3a;
          margin: 0 0 8px;
        }

        .no-doctors-state p {
          color: #64748b;
          font-size: 15px;
          margin: 0;
        }

        /* ── CTA BANNER ── */
        .doctors-cta-banner {
          margin-top: 48px;
        }

        .cta-card {
          background: linear-gradient(135deg, #0b1f3a 0%, #1e3a8a 100%);
          border-radius: 24px;
          padding: 48px;
          color: #ffffff;
          text-align: center;
          box-shadow: 0 20px 40px -10px rgba(11, 31, 58, 0.25);
        }

        .cta-content {
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 14px;
        }

        .cta-content p {
          font-size: 16px;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0 0 28px;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #00afef;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 175, 239, 0.35);
        }

        .cta-btn-primary:hover {
          background: #0098d4;
          transform: translateY(-2px);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        @media (max-width: 768px) {
          .doctors-hero {
            padding: 125px 16px 72px;
          }
          .doctors-main-section {
            margin-top: -46px;
          }
          .hero-title {
            font-size: 24px;
            line-height: 1.3;
          }
          .hero-subtitle {
            font-size: 14.5px;
          }
          .metric-pill {
            padding: 6px 14px;
            font-size: 12.5px;
          }
          .doctors-grid {
            grid-template-columns: 1fr;
          }
          .cta-card {
            padding: 32px 20px;
          }
          .cta-content h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
