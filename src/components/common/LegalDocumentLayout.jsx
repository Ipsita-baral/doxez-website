'use client';

import React from 'react';
import { Link } from "@/lib/router-compat";
import { ArrowLeft, Calendar, Building2 } from "lucide-react";
import LogoRaw from "@/assets/relogo.png";

const Logo = typeof LogoRaw === 'object' && LogoRaw !== null && LogoRaw.src ? LogoRaw.src : LogoRaw;

export default function LegalDocumentLayout({ title, lastUpdated, children }) {
  return (
    <div style={{ background: "#ffffff", color: "#1e293b", minHeight: "100vh", fontFamily: "'DM Sans', 'Inter', -apple-system, sans-serif" }}>
      <style>{`
        .legal-topbar {
          border-bottom: 1px solid #e2e8f0;
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .legal-topbar-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .legal-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .legal-brand-divider {
          width: 1px;
          height: 20px;
          background: #cbd5e1;
        }
        .legal-brand-subtitle {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.02em;
        }
        .legal-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          transition: all 0.2s ease;
        }
        .legal-back-link:hover {
          color: #0f172a;
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        .legal-page-container {
          max-width: 860px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .legal-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f1f5f9;
        }
        .legal-header h1 {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          line-height: 1.25;
        }
        .legal-header-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: #64748b;
          flex-wrap: wrap;
        }
        .legal-body {
          color: #334155;
          font-size: 15px;
          line-height: 1.85;
        }
        .legal-body h2 {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 36px 0 14px;
          letter-spacing: -0.01em;
        }
        .legal-body h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin: 24px 0 10px;
        }
        .legal-body h4 {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
          margin: 18px 0 6px;
        }
        .legal-body p {
          margin-bottom: 16px;
        }
        .legal-body ul {
          margin: 0 0 20px 24px;
        }
        .legal-body li {
          margin-bottom: 10px;
        }
        .legal-body strong {
          color: #0f172a;
        }
        .legal-body a {
          color: #0284c7;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .legal-body a:hover {
          color: #0369a1;
        }
        .legal-note-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 3px solid #0f172a;
          border-radius: 6px;
          padding: 16px 20px;
          margin: 20px 0;
          font-size: 14px;
        }
        .legal-contact-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          margin-top: 40px;
        }

        @media (max-width: 640px) {
          .legal-page-container {
            padding: 24px 16px 60px;
          }
          .legal-header h1 {
            font-size: 24px;
          }
          .legal-brand-subtitle {
            display: none;
          }
          .legal-brand-divider {
            display: none;
          }
        }
      `}</style>

      {/* Top Bar with Minimal Header */}
      <header className="legal-topbar">
        <div className="legal-topbar-inner">
          <Link to="/" className="legal-brand">
            <img src={Logo} alt="Doxez" style={{ height: 36, objectFit: "contain" }} />
            <div className="legal-brand-divider"></div>
            <span className="legal-brand-subtitle">Legal &amp; Compliance</span>
          </Link>
          <Link to="/" className="legal-back-link">
            <ArrowLeft size={14} /> Back to Website
          </Link>
        </div>
      </header>

      {/* Document Container */}
      <main className="legal-page-container">
        {/* Document Header */}
        <div className="legal-header">
          <h1>{title}</h1>
          <div className="legal-header-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Calendar size={14} /> {lastUpdated}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Building2 size={14} /> Hedena Healthcare Pvt. Ltd.
            </span>
          </div>
        </div>

        {/* Document Content */}
        <article className="legal-body">
          {children}
        </article>
      </main>
    </div>
  );
}
