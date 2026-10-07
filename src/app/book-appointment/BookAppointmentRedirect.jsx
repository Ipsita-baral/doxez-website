'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function BookAppointmentRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Fast redirect to homepage with appointment parameter to open modal and scroll to form
    const timer = setTimeout(() => {
      router.replace('/?appointment=true#hero-form');
    }, 150);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{
      minHeight: '75vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      background: 'linear-gradient(180deg, #f8fbff 0%, #f1f7fe 100%)'
    }}>
      <div style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '24px',
        padding: '40px 32px',
        maxWidth: '460px',
        width: '100%',
        boxShadow: '0 25px 60px -15px rgba(11, 31, 58, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00afef',
          marginBottom: '20px',
          boxShadow: '0 8px 20px -4px rgba(0, 175, 239, 0.25)'
        }}>
          <Calendar size={30} />
        </div>

        <h1 style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#0b1f3a',
          margin: '0 0 10px 0',
          fontFamily: "'Bricolage Grotesque', sans-serif"
        }}>
          Book Doctor Appointment
        </h1>

        <p style={{
          fontSize: '14px',
          color: '#64748b',
          margin: '0 0 24px 0',
          lineHeight: 1.6
        }}>
          Redirecting to DOXEZ consultation portal to connect you with verified specialist doctors...
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          borderRadius: '999px',
          background: '#eff6ff',
          color: '#0284c7',
          fontSize: '13.5px',
          fontWeight: 700,
          marginBottom: '24px'
        }}>
          <Loader2 className="animate-spin" size={16} />
          <span>Opening Appointment Portal...</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '12px',
          color: '#059669',
          fontWeight: 600,
          marginBottom: '20px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={15} /> 100% Free Consultation
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={15} /> Verified Specialists
          </span>
        </div>

        <a 
          href="/?appointment=true#hero-form"
          style={{
            fontSize: '13px',
            color: '#00afef',
            textDecoration: 'underline',
            fontWeight: 600
          }}
        >
          Click here if not redirected automatically
        </a>
      </div>
    </div>
  );
}
