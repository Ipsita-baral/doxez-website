import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './component/HomePage';
import ContactUs from './component/ContactUs';
import Header from './component/Header';
import Footer from './component/Footer';
import AboutUs from './component/AboutUs';
import Service from './component/Service';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HowItWorks from './component/HowItWorks';
import ScrollToTop from "./component/ScrollToTop";
import SplashScreen from './component/SplashScreen';
import Animation from './component/Animation'
import PartnerOnboarding from './component/PartnerOnboarding'
import Careers from './component/Careers'
import ServicesPage from './component/ServicesPage';
import ServiceDetailPage from './component/ServiceDetailPage';

function App() {
  const [splashDone, setSplashDone] = useState(() => {
    return sessionStorage.getItem('doxez_splash_done') === 'true';
  });

  if (!splashDone) {
    return <SplashScreen onDone={() => {
      sessionStorage.setItem('doxez_splash_done', 'true');
      setSplashDone(true);
    }} />;
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/HowItWorks" element={<HowItWorks />} />
          <Route path="/Animation" element={<Animation />} />
          <Route path="/partner-onboard" element={<PartnerOnboarding />} />
          <Route path="/careers" element={<Careers />} />
          {/* <Route path="/services" element={<ServicesPage />} /> */}
          <Route path="/services/:categoryId" element={<ServicesPage />} />
          <Route path="/services/:categoryId/:treatmentId" element={<ServiceDetailPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </>
  )
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919692949500"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 9999,
        width: "60px",
        height: "60px",
        backgroundColor: "#25D366",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)",
        textDecoration: "none",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer"
      }}
      className="whatsapp-fab"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1) translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(37, 211, 102, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 211, 102, 0.3)";
      }}
    >
      <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <style>{`
        @media (max-width: 768px) {
          .whatsapp-fab {
            width: 50px !important;
            height: 50px !important;
            bottom: 24px !important;
            right: 24px !important;
          }
          .whatsapp-fab svg {
            width: 28px !important;
            height: 28px !important;
          }
        }
      `}</style>
    </a>
  );
}

export default App
