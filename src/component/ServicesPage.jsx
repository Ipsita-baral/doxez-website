import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Stethoscope, Activity, Shield, Heart, Mic, Sparkles, ShieldCheck, Bone,
  ChevronRight, ArrowRight, Star, Loader2, Brain, Search, X, ChevronLeft
} from 'lucide-react';
import { servicesData as localServicesData } from '../data/servicesData';
import axios from 'axios';


const iconMap = {
  Stethoscope, Activity, Shield, Heart, Mic, Sparkles, ShieldCheck, Bone, Brain
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || "";

  const [search, setSearch] = useState(initialSearch);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("servicePage")

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const response = await axios.get(`${baseUrl}/api/services/catalog`);
        if (response.data.success) {
          // Map backend data to frontend structure if necessary
          const mappedData = response.data.data.map(service => ({
            ...service,
            id: service._id,
            title: service.serviceName,
            treatments: service.subServices.map(sub => ({
              ...sub,
              id: sub._id,
              name: sub.name,
              image: sub.image ? (sub.image.startsWith('http') ? sub.image : `${baseUrl}${sub.image}`) : ""
            }))
          }));
          setServicesData(mappedData);
        } else {
          setServicesData(localServicesData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServicesData(localServicesData);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);


  // If a categoryId is present, find the category in either local or fetched data
  const activeCategory = categoryId ? (servicesData.find(c => c.id === categoryId) || localServicesData.find(c => c.id === categoryId)) : null;

  // ── CATEGORY DETAIL VIEW ──
  // If we have a categoryId, we ONLY show the Category Detail View (or the loader)
  if (categoryId) {
    if (loading) return (
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
        <style>{`
          @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
          .skel { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite; border-radius: 8px; }
        `}</style>
        {/* Hero skeleton */}
        <div style={{ background: "#fff", padding: "150px 24px 24px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
            <div className="skel" style={{ width: 100, height: 14, marginBottom: 20 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div className="skel" style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="skel" style={{ width: "40%", height: 22, marginBottom: 8 }} />
                <div className="skel" style={{ width: "70%", height: 14 }} />
              </div>
            </div>
          </div>
        </div>
        {/* Cards skeleton */}
        <div style={{ maxWidth: 1200, margin: "48px auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1.5px solid #f1f5f9" }}>
              <div className="skel" style={{ height: 165, borderRadius: 0 }} />
              <div style={{ padding: "20px" }}>
                <div className="skel" style={{ width: "70%", height: 18, marginBottom: 10 }} />
                <div className="skel" style={{ width: "90%", height: 12, marginBottom: 6 }} />
                <div className="skel" style={{ width: "60%", height: 12 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    if (!activeCategory) {
      return <div style={{ padding: 180, textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <h3>Category not found</h3>
        <button onClick={() => navigate('/service')} style={{ marginTop: 20, color: '#3b82f6', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}>View all services</button>
      </div>;
    }

    const IconComp = iconMap[activeCategory.icon] || Stethoscope;
    return (
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

          .treat-card-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px 80px;
          }
          .treat-card {
            background: #fff;
            border-radius: 24px;
            overflow: hidden;
            border: 1.5px solid #f1f5f9;
            cursor: pointer;
            transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            display: flex;
            flex-direction: column;
          }
          .treat-card:hover {
            transform: translateY(-10px);
            border-color: #3b82f6;
            box-shadow: 0 24px 50px rgba(59,130,246,0.12);
          }
          .treat-card-img {
            height: 165px;
            background: #fff;
            position: relative;
            overflow: hidden;
          }
          .treat-card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s;
          }
          .treat-card:hover .treat-card-img img { transform: scale(1.05); }
          .treat-card-icon {
            position: absolute;
            bottom: -20px;
            left: 20px;
            width: 44px;
            height: 44px;
            background: #fff;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(59,130,246,0.15);
            border: 2px solid #eff6ff;
          }
          .treat-card-body {
            padding: 32px 20px 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .treat-card-arrow {
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 700;
            color: #3b82f6;
            padding-top: 16px;
            border-top: 1px solid #f1f5f9;
          }

          @media (max-width: 1024px) { .treat-card-grid { grid-template-columns: repeat(2, 1fr); padding: 0 24px 60px; } }
          @media (max-width: 640px)  { 
            .treat-card-grid { grid-template-columns: 1fr; padding: 0 16px 40px; }
            .svc-cat-hero { padding: 108px 16px 16px !important; }
          }
        `}</style>

        {/* Hero */}
        <div className="svc-cat-hero" style={{ background: "#fff", padding: "150px 24px 24px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
            <button
              onClick={() => navigate('/')}
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
                fontSize: 12,
                padding: 0
              }}
            >
              <ChevronLeft size={16} /> Back to Home
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 48, height: 48, background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6", flexShrink: 0, overflow: "hidden" }}>
                {activeCategory.iconUrl ? (
                  <img src={activeCategory.iconUrl} alt={activeCategory.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                ) : (
                  <IconComp size={22} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: "clamp(1.2rem, 3.2vw, 1.8rem)", fontWeight: 800, color: "#0b1f3a", margin: 0, lineHeight: 1.1 }}>{activeCategory.title}</h1>
                <p style={{ color: "#64748b", margin: "2px 0 0", fontSize: 13, lineHeight: 1.4, maxWidth: 600 }}>{activeCategory.shortDesc}</p>
              </div>
            </div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.02em", marginTop: 8 }}>
              {activeCategory.treatments.length} Treatments Available
            </p>
          </div>
        </div>

        {/* Treatment Card Grid */}
        <div style={{ padding: "48px 0 0" }}>
          <div className="treat-card-grid">
            {activeCategory.treatments.map((t) => {
              const TreatIcon = iconMap[t.icon] || IconComp;
              return (
                <div
                  key={t.id}
                  className="treat-card"
                  onClick={() => navigate(`/services/${activeCategory.id}/${t.id}`)}
                >
                  <div className="treat-card-img">
                    {t.image
                      ? <img src={t.image} alt={t.name} onError={e => { e.currentTarget.style.display = "none"; }} />
                      : null
                    }
                    {/* <div className="treat-card-icon">
                      <TreatIcon size={20} color="#3b82f6" />
                    </div> */}
                  </div>
                  <div className="treat-card-body">
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0b1f3a", margin: "0 0 6px" }}>{t.name}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
                      {t.desc ? t.desc.slice(0, 70) + (t.desc.length > 70 ? "..." : "") : "Advanced surgical treatment available."}
                    </p>
                    <div className="treat-card-arrow">
                      Know More <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const filteredCategories = (servicesData.length > 0 ? servicesData : localServicesData).filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase()) ||
    cat.treatments.some(t => t.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#0f172a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        .srv-hero {
          padding: 150px 24px 60px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          text-align: center;
        }

        @media (max-width: 640px) {
          .srv-hero { padding: 108px 16px 40px !important; }
        }

        .search-bar-large {
          max-width: 700px;
          margin: 40px auto 0;
          position: relative;
          display: flex;
          align-items: center;
          background: #f1f5f9;
          padding: 12px 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .search-bar-large input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 18px;
          padding-left: 12px;
          color: #1e293b;
        }

        .category-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .category-card:hover {
          transform: translateY(-10px);
          border-color: #3b82f6;
          box-shadow: 0 30px 60px -12px rgba(30, 75, 143, 0.1);
        }

        .circular-icon {
          width: 64px;
          height: 64px;
          background: #f8fafc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .treatment-link-clinical {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f8fafc;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #f1f5f9;
        }
        .treatment-link-clinical:hover {
          background: #fff;
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateX(5px);
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 60px auto;
          padding: 0 24px;
        }
      `}</style>

      <div className="srv-hero">
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900", marginBottom: "16px", color: "#0b1f3a" }}>All Surgical Treatments</h1>
        <p style={{ fontSize: "18px", color: "#64748b", maxWidth: "600px", margin: "0 auto" }}>
          Explore our wide range of specialized surgeries facilitated by experienced surgeons across India.
        </p>

        <div className="search-bar-large">
          <Search size={24} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search for surgery (e.g. Laser Piles, Kidney Stone, Hernia)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
        </div>
      </div>

      <div className="grid-container">
        {loading ? (
          <>
            <style>{`
              @keyframes shimmer { 0%{background-position:-800px 0} 100%{background-position:800px 0} }
              .skel { background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite; border-radius: 8px; }
            `}</style>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 32, padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="skel" style={{ height: 160, borderRadius: 16, marginBottom: 8 }} />
                <div className="skel" style={{ width: "60%", height: 20 }} />
                <div className="skel" style={{ width: "90%", height: 14 }} />
                <div className="skel" style={{ width: "75%", height: 14 }} />
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[1, 2, 3].map(j => <div key={j} className="skel" style={{ height: 40, borderRadius: 12 }} />)}
                </div>
                <div className="skel" style={{ height: 48, borderRadius: 14, marginTop: 16 }} />
              </div>
            ))}
          </>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => {
            const IconComp = iconMap[cat.icon] || Stethoscope;
            return (
              <div key={cat.id} className="category-card">
                {/* Category image */}
                <div style={{
                  height: "160px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: "24px",
                  background: "#eff6ff",
                  position: "relative"
                }}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.style.display = "flex";
                      e.currentTarget.parentElement.style.alignItems = "center";
                      e.currentTarget.parentElement.style.justifyContent = "center";
                    }}
                  />
                  <div style={{
                    position: "absolute", bottom: 12, left: 12,
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                    padding: "6px 12px", borderRadius: "8px",
                    fontSize: "11px", fontWeight: "800", color: "#3b82f6", textTransform: "uppercase"
                  }}>
                    {cat.treatments.length} Treatments
                  </div>
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0b1f3a", marginBottom: "10px" }}>{cat.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "28px", lineHeight: "1.6" }}>{cat.shortDesc}</p>

                <div style={{ flexGrow: 1 }}>
                  {cat.treatments.map((t) => (
                    <a
                      key={t.id}
                      href={`/services/${cat.id}/${t.id}`}
                      className="treatment-link-clinical"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/services/${cat.id}/${t.id}`);
                      }}
                    >
                      {t.name} <ChevronRight size={16} />
                    </a>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/services/${cat.id}`)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "#0f172a",
                    color: "#fff",
                    borderRadius: "14px",
                    border: "none",
                    fontWeight: "800",
                    cursor: "pointer",
                    marginTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  View Details <ArrowRight size={18} />
                </button>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
            <h3 style={{ color: '#64748b' }}>No treatments found for "{search}"</h3>
            <button onClick={() => setSearch('')} style={{ marginTop: '20px', color: '#3b82f6', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
}
