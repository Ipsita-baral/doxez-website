import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { Search, ChevronDown } from 'lucide-react';

export default function SearchableDiseaseDropdown({
  value,
  onChange,
  onBlur,
  name = "disease",
  disabled = false,
  hasError = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  const CRM_API_URL = import.meta.env.VITE_API_URL || "https://crm.doxez.in";

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(`${CRM_API_URL}/api/sub-services`);
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          // Sort alphabetically
          const sorted = response.data.data.sort((a, b) => a.name.localeCompare(b.name));
          // Filter out duplicates if any
          const uniqueDiseases = Array.from(new Map(sorted.map(item => [item.name, item])).values());
          setDiseases(uniqueDiseases);
        }
      } catch (error) {
        console.error("Error fetching diseases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, [CRM_API_URL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onBlur) onBlur({ target: { name } }); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [name, onBlur]);

  const staticDefaults = [
    { _id: 'piles', name: 'Piles, Fissure, Fistula' },
    { _id: 'hernia', name: 'Hernia, Gallstone' },
    { _id: 'kidney', name: 'Kidney Stones, Prostate' },
    { _id: 'gynecology', name: 'Gynecology' },
    { _id: 'orthopedics', name: 'Orthopedics' }
  ];

  const displayList = diseases.length > 0 ? diseases : staticDefaults;
  
  // We don't want to duplicate "Others", we always append it
  const allOptions = [...displayList.filter(d => d.name.toLowerCase() !== 'others'), { _id: 'others', name: 'Others' }];

  const filteredOptions = allOptions.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (diseaseName) => {
    onChange({ target: { name, value: diseaseName } });
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="searchable-dropdown" style={{ width: '100%' }}>
      <div 
        onClick={() => !disabled && setIsOpen(true)}
        style={{
          width: "100%", padding: "11px 14px", borderRadius: 10, 
          border: `1.5px solid ${hasError ? "#ef4444" : isOpen ? "#3b82f6" : "#e2e8f0"}`, 
          fontSize: 13, color: value ? "#0f172a" : "#475569", background: "#f8fafc", 
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: disabled ? "not-allowed" : "pointer", boxSizing: "border-box",
          minHeight: "44px"
        }}
      >
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {value || "Select Disease / Treatment"}
        </span>
        <ChevronDown size={16} color="#94a3b8" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>

      {isOpen && createPortal(
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)",
          zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20
        }}>
          <div ref={dropdownRef} style={{
            background: "#fff", width: "100%", maxWidth: 380, borderRadius: 20,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", overflow: "hidden",
            display: "flex", flexDirection: "column", maxHeight: "85vh",
            animation: "modalFadeIn 0.2s ease-out"
          }}>
            <style>{`
              @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>
            
            {/* Header / Search Area */}
            <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid #f1f5f9", background: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={16} color="#64748b" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input 
                  type="text" 
                  placeholder="Search Disease by Name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  style={{
                    width: "100%", padding: "10px 14px 10px 38px", borderRadius: 10,
                    border: "2px solid #e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box",
                    color: "#0f172a", background: "#f8fafc", transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                  onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                style={{ 
                  background: "#f1f5f9", border: "none", width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  color: "#64748b", transition: "background 0.2s", fontSize: 14, flexShrink: 0
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#e2e8f0"; e.currentTarget.style.color = "#0f172a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#64748b"; }}
              >
                ✕
              </button>
            </div>
            
            {/* List Area */}
            <div style={{ overflowY: "auto", padding: "12px 0 20px" }}>
              {loading ? (
                <div style={{ padding: "40px 20px", fontSize: 15, color: "#64748b", textAlign: "center" }}>Loading diseases...</div>
              ) : filteredOptions.length > 0 ? (
                <>
                  <div style={{ padding: "8px 28px", fontSize: 12, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                    Available Treatments
                  </div>
                  {filteredOptions.map((opt) => (
                    <div 
                      key={opt._id || opt.name}
                      onClick={(e) => { e.stopPropagation(); handleSelect(opt.name); }}
                      style={{
                        padding: "14px 28px", fontSize: 15, color: value === opt.name ? "#2563eb" : "#1e293b",
                        cursor: "pointer", background: value === opt.name ? "#eff6ff" : "transparent",
                        transition: "all 0.2s", fontWeight: value === opt.name ? 700 : 500,
                        borderLeft: value === opt.name ? "4px solid #3b82f6" : "4px solid transparent",
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                      }}
                      onMouseEnter={(e) => {
                        if (value !== opt.name) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.paddingLeft = "32px"; }
                      }}
                      onMouseLeave={(e) => {
                        if (value !== opt.name) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "28px"; }
                      }}
                    >
                      {opt.name}
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ padding: "40px 20px", fontSize: 15, color: "#64748b", textAlign: "center" }}>No diseases found</div>
              )}
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  );
}
