'use client';

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  Search, ShieldCheck, Check, GraduationCap, Clock, 
  Stethoscope, Award, Sparkles, UserCheck, PhoneCall, 
  ArrowRight, Filter, ChevronRight, Activity, HeartPulse
} from 'lucide-react';
import { Link } from '@/lib/router-compat';
import AppointmentModal from '@/components/modals/AppointmentModal';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
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

  // Compute unique clean specialities for filter pills (excluding anesthesiology)
  const specialties = useMemo(() => {
    const list = new Set(['All']);
    doctors.forEach(doc => {
      const spec = doc.specializationBranch || doc.specialization;
      if (spec && typeof spec === 'string') {
        const clean = spec.trim();
        // Exclude anesthesiology / anesthetist
        if (/an[ae]sth/i.test(clean)) return;
        // Skip junk test data
        if (clean.length > 2 && !/^[a-z, ]{6,}$/i.test(clean)) {
          list.add(clean.charAt(0).toUpperCase() + clean.slice(1));
        } else if (clean.length > 2 && !clean.includes('fgh') && !clean.includes('wert')) {
          list.add(clean.charAt(0).toUpperCase() + clean.slice(1));
        }
      }
    });
    return Array.from(list).slice(0, 10);
  }, [doctors]);

  // Filtered doctors list based on search and selected specialty (excluding anesthesiologists)
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const checkStr = `${doc.doctorType || ''} ${doc.specialization || ''} ${doc.specializationBranch || ''} ${doc.name || ''} ${doc.optionalExpertise || ''}`.toLowerCase();
      if (/an[ae]sth/i.test(checkStr)) return false;

      const name = (doc.name || '').toLowerCase();
      const spec = (doc.specialization || '').toLowerCase();
      const branch = (doc.specializationBranch || '').toLowerCase();
      const qual = (doc.primaryQualification || '').toLowerCase();
      const type = (doc.doctorType || '').toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        name.includes(query) || 
        spec.includes(query) || 
        branch.includes(query) || 
        qual.includes(query) ||
        type.includes(query);

      const matchesSpecialty = selectedSpecialty === 'All' || 
        spec.includes(selectedSpecialty.toLowerCase()) || 
        branch.includes(selectedSpecialty.toLowerCase());

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchQuery, selectedSpecialty]);

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

      {/* Hero Section */}
      <section className="doctors-hero">
        <div className="doctors-hero-glow glow-1" />
        <div className="doctors-hero-glow glow-2" />
        
        <div className="doctors-container hero-content">
          <div className="hero-badge">
            <ShieldCheck size={16} className="text-blue-500" />
            <span>DOXEZ VERIFIED MEDICAL FACULTY</span>
          </div>

          <h1 className="hero-title">
            Our Specialist Doctors &amp; <span className="text-gradient">Surgical Experts</span>
          </h1>

          <p className="hero-subtitle">
            Connect with board-certified surgeons and specialists from the DOXEZ healthcare network. 
            Every onboarded practitioner undergoes rigorous credential verification to ensure clinical excellence.
          </p>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics">
            <div className="metric-pill">
              <Sparkles size={18} color="#00afef" />
              <span><strong>100%</strong> Verified Credentials</span>
            </div>
            <div className="metric-pill">
              <Award size={18} color="#00afef" />
              <span><strong>Multi-Specialty</strong> Expertise</span>
            </div>
            <div className="metric-pill">
              <HeartPulse size={18} color="#00afef" />
              <span><strong>Cashless</strong> Surgery Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Controls & Content */}
      <section className="doctors-main-section">
        <div className="doctors-container">
          {/* Search & Filter Header */}
          <div className="directory-toolbar">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialization, or qualification..."
                aria-label="Search doctors"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  &times;
                </button>
              )}
            </div>

            <div className="results-counter">
              <span>Showing <strong>{filteredDoctors.length}</strong> onboarded doctors</span>
            </div>
          </div>

          {/* Specialty Filter Pills */}
          {specialties.length > 1 && (
            <div className="specialty-pills-row">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`specialty-pill ${selectedSpecialty === spec ? 'active' : ''}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          )}

          {/* Doctors Grid */}
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading verified doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="no-doctors-state">
              <div className="no-doctors-icon">
                <Stethoscope size={40} color="#64748b" />
              </div>
              <h3>No doctors match your search</h3>
              <p>Try searching for a different name, specialty, or clear your filters.</p>
              <button 
                type="button"
                className="reset-filters-btn"
                onClick={() => { setSearchQuery(''); setSelectedSpecialty('All'); }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doc) => {
                const initials = doc.name 
                  ? doc.name.replace(/^Dr.s*/i, '').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase()
                  : 'DR';
                
                const qualificationLine = [doc.primaryQualification, doc.specialization].filter(Boolean).join(', ');
                const specialtyLine = doc.specializationBranch || doc.doctorType || 'Specialist Doctor';
                const experienceText = doc.totalExperience > 0 
                  ? `${doc.totalExperience}+ Years Experience`
                  : 'Senior Specialist';

                return (
                  <div 
                    key={doc._id}
                    className="doctor-card"
                    itemScope
                    itemType="https://schema.org/Physician"
                  >
                    {/* Top Header */}
                    <div className="doctor-card-top">
                      <div className="doctor-avatar-wrapper">
                        {doc.avatar ? (
                          <img
                            src={doc.avatar}
                            alt={doc.name}
                            itemProp="image"
                            className="doctor-avatar-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="doctor-avatar-initials" 
                          style={{ display: doc.avatar ? 'none' : 'flex' }}
                        >
                          {initials}
                        </div>
                      </div>

                      <div className="doctor-meta">
                        <span className="verified-tag">
                          <Check size={12} /> Verified Specialist
                        </span>
                        <h3 className="doctor-name" itemProp="name">
                          {doc.name}
                        </h3>
                        <div className="doctor-specialty-badge" itemProp="medicalSpecialty">
                          {specialtyLine}
                        </div>
                      </div>
                    </div>

                    {/* Information List */}
                    <div className="doctor-card-details">
                      {qualificationLine && (
                        <div className="detail-row">
                          <div className="detail-icon-wrap">
                            <GraduationCap size={15} color="#00afef" />
                          </div>
                          <div className="detail-text-wrap">
                            <span className="detail-label">Qualification</span>
                            <span className="detail-value" itemProp="hasCredential">{qualificationLine}</span>
                          </div>
                        </div>
                      )}

                      <div className="detail-row">
                        <div className="detail-icon-wrap">
                          <Clock size={15} color="#00afef" />
                        </div>
                        <div className="detail-text-wrap">
                          <span className="detail-label">Total Experience</span>
                          <span className="detail-value" itemProp="description">{experienceText}</span>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-icon-wrap">
                          <Stethoscope size={15} color="#00afef" />
                        </div>
                        <div className="detail-text-wrap">
                          <span className="detail-label">Practice Focus</span>
                          <span className="detail-value">{doc.doctorType || 'Consultant Surgeon'}</span>
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

        /* ── HERO ── */
        .doctors-hero {
          position: relative;
          background: linear-gradient(135deg, #0b1f3a 0%, #0d274c 50%, #08172c 100%);
          padding: 80px 0 60px;
          overflow: hidden;
          color: #ffffff;
        }

        .doctors-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: 0.35;
        }

        .glow-1 {
          width: 400px;
          height: 400px;
          background: #00afef;
          top: -100px;
          right: -80px;
        }

        .glow-2 {
          width: 350px;
          height: 350px;
          background: #2563eb;
          bottom: -100px;
          left: -50px;
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
          padding: 6px 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #38bdf8;
          margin-bottom: 20px;
          backdrop-filter: blur(8px);
        }

        .hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 44px;
          line-height: 1.15;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 18px;
        }

        .text-gradient {
          background: linear-gradient(135deg, #38bdf8 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 17px;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0 auto 32px;
          max-width: 720px;
        }

        .hero-metrics {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .metric-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          font-size: 14px;
          color: #f1f5f9;
          backdrop-filter: blur(8px);
        }

        /* ── DIRECTORY MAIN SECTION ── */
        .doctors-main-section {
          padding: 40px 0 20px;
        }

        .directory-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 300px;
          max-width: 600px;
        }

        .search-box input {
          width: 100%;
          padding: 14px 44px 14px 48px;
          border-radius: 14px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 15px;
          color: #0b1f3a;
          outline: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .search-box input:focus {
          border-color: #00afef;
          box-shadow: 0 0 0 4px rgba(0, 175, 239, 0.12);
        }

        .search-box :global(.search-icon) {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .clear-search-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 20px;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
        }

        .clear-search-btn:hover {
          color: #0f172a;
        }

        .results-counter {
          font-size: 14px;
          color: #64748b;
        }

        .results-counter strong {
          color: #0b1f3a;
          font-weight: 700;
        }

        /* ── SPECIALTY PILLS ── */
        .specialty-pills-row {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 32px;
          scrollbar-width: thin;
        }

        .specialty-pill {
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #475569;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .specialty-pill:hover {
          border-color: #00afef;
          color: #00afef;
          background: #f0f9ff;
        }

        .specialty-pill.active {
          background: #0b1f3a;
          color: #ffffff;
          border-color: #0b1f3a;
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.18);
        }

        /* ── GRID & CARDS ── */
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .doctor-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .doctor-card:hover {
          border-color: #00afef;
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(0, 175, 239, 0.15);
        }

        .doctor-card-top {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .doctor-avatar-wrapper {
          flex-shrink: 0;
        }

        .doctor-avatar-img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e0f2fe;
        }

        .doctor-avatar-initials {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0b1f3a 0%, #1e3a8a 100%);
          color: #38bdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          border: 3px solid #e0f2fe;
        }

        .doctor-meta {
          flex: 1;
          min-width: 0;
        }

        .verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 2px 8px;
          border-radius: 999px;
          margin-bottom: 6px;
        }

        .doctor-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0b1f3a;
          margin: 0 0 6px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .doctor-specialty-badge {
          display: inline-block;
          font-size: 12.5px;
          font-weight: 700;
          color: #0284c7;
          background: #f0f9ff;
          padding: 3px 10px;
          border-radius: 8px;
          border: 1px solid #bae6fd;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .doctor-card-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid #f1f5f9;
        }

        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .detail-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f0fdf4;
          background: #f0f9ff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .detail-text-wrap {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .detail-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .detail-value {
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          line-height: 1.4;
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
          margin: 0 0 20px;
        }

        .reset-filters-btn {
          padding: 10px 20px;
          background: #0b1f3a;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .reset-filters-btn:hover {
          background: #00afef;
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
          .hero-title {
            font-size: 32px;
          }
          .hero-subtitle {
            font-size: 15px;
          }
          .directory-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            max-width: 100%;
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
