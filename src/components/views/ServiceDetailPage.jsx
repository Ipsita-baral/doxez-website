'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "@/lib/router-compat";
import {
  CheckCircle2, XCircle, ShieldCheck, Clock, Activity,
  ChevronLeft, Loader2, Phone, MapPin, User, Stethoscope,
  Zap, HeartPulse, ShieldPlus, ArrowRight, MessageSquare, Calendar,
  ChevronDown, ChevronUp, AlertCircle, FileText, Check, HelpCircle,
  Building2, GraduationCap
} from 'lucide-react';
import axios from 'axios';
import { servicesData as localServicesData, CATEGORY_ID_MAP } from '@/data/servicesData';
import { toast } from 'react-toastify';
import { trackLeadSubmission, trackButtonClick } from '@/lib/gtag';
import { getServiceSlug, getTreatmentSlug, isServiceMatch, isTreatmentMatch } from '@/lib/serviceSlug';

// ── RAW TEXT / MARKDOWN CLEANER ──
function cleanMarkdownText(text) {
  if (!text) return "";
  return text
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .trim();
}

function parseBulletPoints(text) {
  if (!text) return [];
  if (Array.isArray(text)) {
    return text.map(item => (typeof item === 'string' ? cleanMarkdownText(item) : item));
  }
  return text
    .split(/\n|•|\*|(?<=\.)\s+(?=[A-Z])/)
    .map(s => cleanMarkdownText(s))
    .filter(s => s && s.length > 3);
}

// ── CLINICAL KNOWLEDGE BASE FOR EXPANDED SECTIONS ──
const CLINICAL_KNOWLEDGE = {
  "mastoidectomy": {
    name: "Mastoidectomy",
    subtitle: "Early evaluation and appropriate treatment can help protect hearing and prevent serious complications.",
    desc: "Mastoidectomy is a surgical procedure to remove infected, damaged or abnormal tissue from the mastoid bone, located behind the ear. It is usually performed to treat persistent or complicated middle-ear disease that cannot be adequately managed with medicines alone.\n\nMastoidectomy may be recommended for conditions such as cholesteatoma, chronic ear infections, mastoid infection or other destructive middle-ear problems.",
    symptoms: [
      "Persistent or recurrent ear discharge",
      "Hearing loss",
      "Ear pain",
      "Feeling of pressure or fullness in the ear",
      "Recurrent middle-ear infections",
      "Foul-smelling discharge from the ear",
      "Ringing or buzzing in the ear",
      "Dizziness or balance problems",
      "Fever in cases of active infection",
      "Swelling or tenderness behind the ear",
      "Headache associated with chronic ear disease"
    ],
    symptomNote: "Persistent ear discharge, worsening hearing loss or swelling behind the ear should be evaluated promptly by an ENT specialist.",
    causes: [
      { title: "Chronic Otitis Media", desc: "Long-standing middle-ear infection or inflammation unresponsive to medication." },
      { title: "Cholesteatoma", desc: "Abnormal skin growth in the middle ear that can gradually damage surrounding hearing bones." },
      { title: "Mastoiditis", desc: "Infection of the mastoid bone behind the ear." },
      { title: "Recurrent Ear Infections", desc: "Persistent middle-ear infections failing to clear with medical treatment." },
      { title: "Damage to Middle-Ear Bones", desc: "Erosion of sound-conducting bones causing progressive hearing loss." },
      { title: "Complications of Chronic Ear Disease", desc: "Destructive conditions affecting nearby facial nerves or balance organs." }
    ],
    diagnosis: [
      { name: "Ear Examination (Otoscopy)", desc: "The ear canal and eardrum are examined using an otoscope or microscope." },
      { name: "Ear Microscopy", desc: "Provides detailed, high-magnification visualization of the eardrum and middle-ear structures." },
      { name: "Hearing Test (Audiometry)", desc: "Evaluates the degree and type of hearing loss." },
      { name: "CT Scan of the Temporal Bone", desc: "Provides detailed cross-sectional images of the mastoid and middle-ear structures for surgical planning." },
      { name: "MRI Scan", desc: "Recommended in selected cases, particularly when cholesteatoma or soft-tissue abnormalities require further evaluation." },
      { name: "Nasal & Throat Examination", desc: "Performed to identify Eustachian tube dysfunction or contributing upper airway factors." }
    ],
    steps: [
      { step: "01", title: "Consult", desc: "Discuss persistent ear discharge, hearing loss, or recurrent infections with an ENT specialist." },
      { step: "02", title: "Diagnose", desc: "Your doctor examines the ear and recommends hearing tests and imaging to assess extent of disease." },
      { step: "03", title: "Plan", desc: "A personalized surgical plan is prepared based on the underlying condition and structures involved." },
      { step: "04", title: "Treat", desc: "The surgeon removes infected, damaged or abnormal tissue from the mastoid and middle ear while preserving healthy structures." },
      { step: "05", title: "Recover & Follow Up", desc: "Follow ear-care instructions, protect the ear from water, and attend regular follow-up appointments." }
    ],
    options: [
      "Medical Treatment: Ear drops, antibiotics or medicines used for infections when appropriate.",
      "Canal Wall Up Mastoidectomy: Diseased mastoid tissue is removed while preserving the natural ear canal wall.",
      "Canal Wall Down Mastoidectomy: Part of the canal wall is removed or modified to control extensive or recurrent disease.",
      "Mastoidectomy with Tympanoplasty: Performed when the eardrum is perforated to simultaneously repair the eardrum.",
      "Mastoidectomy with Ossiculoplasty: Hearing bones are repaired or reconstructed using micro-prostheses to improve hearing."
    ],
    recovery: "Recovery varies depending on the type and extent of surgery and whether additional procedures are performed. Temporary ear blockage, mild discomfort, dizziness or reduced hearing may occur during the early recovery period.",
    recoveryPoints: [
      "Taking prescribed medicines regularly",
      "Keeping the operated ear strictly dry",
      "Following wound and dressing care instructions",
      "Avoiding nose blowing during the initial recovery period",
      "Avoiding heavy lifting and strenuous physical activity as advised",
      "Avoiding air travel or significant pressure changes until cleared by your doctor",
      "Attending scheduled ear examinations and hearing tests"
    ],
    warningSigns: [
      "Severe dizziness or vertigo",
      "Facial weakness or asymmetrical smile",
      "Heavy bleeding or worsening foul ear discharge",
      "High fever or severe, persistent headache"
    ],
    whyDoxez: [
      "Connect with qualified ENT specialists and experienced ear surgeons",
      "Access accredited partner hospitals with advanced surgical infrastructure",
      "Dedicated support navigating consultation, diagnosis, surgery and follow-up",
      "Clear, transparent information on ear disease and available treatment options",
      "100% cashless insurance and Ayushman Bharat PM-JAY documentation assistance"
    ],
    faqs: [
      { q: "What is mastoidectomy?", a: "Mastoidectomy is a surgical procedure to remove infected, damaged or abnormal tissue from the mastoid bone behind the ear." },
      { q: "Why is mastoidectomy performed?", a: "It may be recommended for cholesteatoma, chronic ear infections, mastoiditis or other persistent middle-ear conditions that require surgical treatment." },
      { q: "What is cholesteatoma?", a: "A cholesteatoma is an abnormal collection of skin cells in the middle ear that can gradually damage nearby structures. It often requires surgical treatment." },
      { q: "Is mastoidectomy a major surgery?", a: "Mastoidectomy is a significant ear microsurgery, but modern techniques allow high precision and safe, rapid recovery." },
      { q: "Can mastoidectomy improve hearing?", a: "Hearing may improve when the underlying disease is treated and the middle-ear structures can be preserved or reconstructed. However, hearing outcomes depend on initial disease severity." },
      { q: "Can mastoidectomy stop ear discharge?", a: "Yes, treating the underlying chronic ear disease can successfully control and stop persistent ear discharge." },
      { q: "What is the difference between mastoidectomy and tympanoplasty?", a: "Mastoidectomy removes diseased tissue from the mastoid bone, while tympanoplasty repairs a damaged or perforated eardrum. Both are frequently performed together." },
      { q: "What is canal wall up mastoidectomy?", a: "In canal wall up mastoidectomy, the surgeon removes diseased mastoid tissue while preserving the ear canal wall." },
      { q: "What is canal wall down mastoidectomy?", a: "In canal wall down mastoidectomy, part of the ear canal wall is removed or modified to provide access to and control extensive or recurrent disease." },
      { q: "How long does recovery take after mastoidectomy?", a: "Most patients resume light non-strenuous daily activities in 5–7 days. Complete internal healing takes about 4–6 weeks." },
      { q: "Which doctor performs mastoidectomy?", a: "A qualified ENT specialist, otologist or neurotologist with experience in ear microsurgery performs mastoidectomy." },
      { q: "When should I consult an ENT specialist?", a: "Consult an ENT specialist if you have persistent ear discharge, recurrent ear infections, hearing loss, ear pain, dizziness or swelling behind the ear." }
    ]
  },
  "lipoma": {
    name: "Lipoma",
    subtitle: "Concerned about Lipoma? DOXEZ helps you connect with experienced surgeons for advanced treatment.",
    desc: "A lipoma is a soft, non-cancerous lump made up of fat cells that develops beneath the skin. It usually grows slowly and is often painless.\n\nLipomas can develop on different parts of the body, including the neck, shoulders, back, arms and thighs. Most lipomas are harmless, but a growing, painful or unusual lump should be evaluated by a doctor.\n\nDOXEZ helps you connect with qualified specialists and suitable treatment options.",
    symptoms: [
      "Soft and smooth or rubbery lumps under the skin",
      "Painless swelling",
      "Slow-growing lumps",
      "Lumps that may move slightly when pressed",
      "Usually skin-colored or normal-looking skin over the lump",
      "A feeling of pressure or discomfort when the lipoma becomes large",
      "Pain or tenderness when pressing on or around certain lipomas",
      "Any new or rapidly growing painful or firm lump should be evaluated by a qualified doctor."
    ],
    causes: [
      { title: "Genetic Predisposition", desc: "A family history of lipomas or familial multiple lipomatosis increases susceptibility." },
      { title: "Localized Fat Cell Growth", desc: "Benign overgrowth of adipose cells forming an encapsulated subcutaneous lump." },
      { title: "Underlying Metabolic Factors", desc: "Conditions like Gardner syndrome, Cowden syndrome, or Adiposis dolorosa." },
      { title: "Physical Trauma", desc: "Blunt soft-tissue injury may occasionally trigger a post-traumatic lipoma." }
    ],
    diagnosis: [
      { name: "Clinical Physical Examination", desc: "Doctor palpates the lump to examine its soft texture, mobility, and depth." },
      { name: "High-Frequency Soft Tissue Ultrasound", desc: "Identifies precise dimensions, depth, and margin clarity from muscle layers." },
      { name: "MRI Scan (For Deep/Large Lumps)", desc: "Differentiates deep intramuscular lipomas from other soft-tissue masses." }
    ],
    steps: [
      { step: "01", title: "Consult", desc: "Meet with an experienced surgeon for physical examination and lump assessment." },
      { step: "02", title: "Diagnose", desc: "Ultrasound scan to confirm benign lipoma and map exact anatomical depth." },
      { step: "03", title: "Plan", desc: "Choose between micro-incision excision or cosmetic liposuction approach." },
      { step: "04", title: "Treat", desc: "Day-care procedure under local anesthesia with complete capsule removal." },
      { step: "05", title: "Recover & Follow Up", desc: "Walk home within 1 hour, quick healing with cosmetic dissolvable sutures." }
    ],
    options: [
      "Surgical excision (Complete capsule removal ensuring zero recurrence)",
      "Minimal incision extraction (Small cut with cosmetic closure)",
      "Liposuction (Ideal for large or cosmetically sensitive areas)"
    ],
    recovery: "Our treatments focus on minimally invasive techniques that ensure short hospital stays and a faster return to normal life. Most patients resume office work within 24 to 48 hours.",
    recoveryPoints: [
      "Keep the dressing clean and dry for 48 hours",
      "Take prescribed mild medications as advised",
      "Avoid heavy weightlifting or strenuous stretching for 7–10 days",
      "Cosmetic sutures dissolve automatically or are removed in 7 days"
    ],
    warningSigns: [
      "Sudden swelling or hematoma at the surgical site",
      "Continuous bleeding through the dressing",
      "High fever or spreading redness"
    ],
    whyDoxez: [
      "Verified hospitals & surgery centers",
      "Experienced senior surgeons",
      "Insurance & Ayushman support",
      "Faster recovery with modern techniques"
    ],
    faqs: [
      { q: "What is a lipoma?", a: "A lipoma is a benign (non-cancerous) tumor made up of fat cells. It is soft, movable, and generally harmless, but can be removed if it causes pain, grows large, or affects appearance." },
      { q: "Can a lipoma turn into cancer?", a: "No, a standard lipoma does not become cancerous. However, any rapidly enlarging, hard, or painful lump should be evaluated to rule out rare conditions." },
      { q: "Is lipoma surgery painful?", a: "No. The procedure is performed under local anesthesia, meaning the area is completely numbed and you feel no pain during surgery." },
      { q: "Will the lipoma come back after surgery?", a: "When the lipoma is completely excised along with its outer fibrous capsule, it rarely recurs at the same site." },
      { q: "How long does recovery take?", a: "Most patients resume normal non-strenuous daily activities within 24 to 48 hours. The small surgical incision heals completely in 1 to 2 weeks." }
    ]
  }
};

// ── GET ENRICHED DATA (MATCHES SCREENSHOT & COMBINES CRM) ──
function getTreatmentData(dynamicData, categoryId, treatmentId, fallbackData) {
  const name = dynamicData?.name || dynamicData?.title || fallbackData?.name || "Surgical Treatment";
  const slugKey = (treatmentId || dynamicData?.id || name || "").toLowerCase().replace(/[^a-z0-9]/g, '-');

  let template = null;
  for (const [key, tpl] of Object.entries(CLINICAL_KNOWLEDGE)) {
    if (slugKey.includes(key) || name.toLowerCase().includes(key)) {
      template = tpl;
      break;
    }
  }

  const desc = dynamicData?.desc || fallbackData?.desc || template?.desc || `${name} involves specialized surgical care provided by experienced senior specialists.`;
  const subtitle = template?.subtitle || `Concerned about ${name}? DOXEZ helps you connect with experienced surgeons for advanced treatment.`;
  const image = dynamicData?.image || fallbackData?.image || template?.image || "/services/default.jpg";

  const symptoms = (dynamicData?.symptoms && dynamicData.symptoms.length > 0)
    ? parseBulletPoints(dynamicData.symptoms)
    : (fallbackData?.symptoms || template?.symptoms || [
        `Persistent swelling, lump, or pain related to ${name}`,
        "Discomfort interfering with daily physical activities",
        "Visible inflammation or tenderness"
      ]);

  const causes = (dynamicData?.causes && dynamicData.causes.length > 0)
    ? dynamicData.causes
    : (fallbackData?.causes || template?.causes || [
        { title: "Underlying Pathological Factors", desc: `Chronic cellular or tissue changes contributing to ${name}.` },
        { title: "Genetic & Anatomical Factors", desc: `Family history or anatomical variations predisposing to ${name}.` },
        { title: "Physical Strain or Lifestyle Influences", desc: "Environmental triggers or repetitive physical stress." }
      ]);

  const diagnosis = (dynamicData?.diagnosis && dynamicData.diagnosis.length > 0)
    ? dynamicData.diagnosis
    : (fallbackData?.diagnosis || template?.diagnosis || [
        { name: "Specialist Clinical Physical Exam", desc: "Thorough physical palpation, staging, and evaluation by a senior surgeon." },
        { name: "High-Resolution Diagnostic Imaging", desc: "Ultrasound, CT scan, or MRI imaging to precisely map anatomical boundaries." }
      ]);

  const steps = (dynamicData?.steps && dynamicData.steps.length > 0)
    ? dynamicData.steps
    : (fallbackData?.steps || template?.steps || [
        { step: "01", title: "Consult", desc: `Discuss symptoms, duration, and medical history with our senior ${name} specialist.` },
        { step: "02", title: "Diagnose", desc: "Undergo targeted diagnostic tests and imaging for precise surgical evaluation." },
        { step: "03", title: "Plan", desc: "Formulate a personalized surgical plan prioritizing minimally invasive techniques." },
        { step: "04", title: "Treat", desc: "Procedure performed in an accredited modular OT by expert surgeons." },
        { step: "05", title: "Recover & Follow Up", desc: "Guided recovery protocol with regular follow-ups and care coordination support." }
      ]);

  const options = (dynamicData?.options && dynamicData.options.length > 0)
    ? parseBulletPoints(dynamicData.options)
    : (fallbackData?.options || template?.options || [
        "Surgical excision / Minimally invasive procedure",
        "Medical therapy where clinically indicated"
      ]);

  const types = (dynamicData?.types && dynamicData.types.length > 0)
    ? dynamicData.types
    : (fallbackData?.types || template?.types || []);

  const recovery = dynamicData?.recovery || fallbackData?.recovery || template?.recovery || "Our treatments focus on minimally invasive techniques that ensure short hospital stays and a faster return to normal life.";
  const recoveryPoints = fallbackData?.recoveryPoints || template?.recoveryPoints || [
    "Taking prescribed medicines regularly",
    "Following wound care and dressing instructions",
    "Avoiding heavy lifting and strenuous physical activity for 7–10 days",
    "Attending scheduled review consultations"
  ];
  const warningSigns = fallbackData?.warningSigns || template?.warningSigns || [
    "Severe or worsening unmanageable pain",
    "High fever or persistent chills",
    "Excessive bleeding or unusual swelling at the operative site"
  ];

  const whyDoxez = (dynamicData?.whyChooseDoxez && dynamicData.whyChooseDoxez.length > 0)
    ? parseBulletPoints(dynamicData.whyChooseDoxez)
    : (fallbackData?.whyDoxez || template?.whyDoxez || [
        "Verified hospitals & surgery centers",
        "Experienced senior surgeons",
        "Insurance & Ayushman support",
        "Faster recovery with modern techniques"
      ]);

  const faqs = (dynamicData?.faqs && dynamicData.faqs.length > 0)
    ? dynamicData.faqs
    : (fallbackData?.faqs || template?.faqs || [
        { q: `What is ${name}?`, a: `${name} is an advanced medical/surgical procedure performed to treat specific conditions safely and effectively.` },
        { q: `Is ${name} covered under health insurance?`, a: "Yes, medically indicated surgical procedures are covered under private health insurance and Ayushman Bharat PM-JAY (subject to policy terms)." },
        { q: `How long does recovery take after ${name}?`, a: "With modern minimally invasive techniques, most patients recover within a few days to a couple of weeks." }
      ]);

  const insurance = {
    accepted: dynamicData?.eligibilityModes?.includes('Insurance') ?? fallbackData?.insurance?.accepted ?? true,
    ayushman: dynamicData?.eligibilityModes?.includes('Ayushman') ?? fallbackData?.insurance?.ayushman ?? true,
    cashless: (dynamicData?.eligibilityModes?.includes('Insurance') || dynamicData?.eligibilityModes?.includes('Cash')) ?? fallbackData?.insurance?.cashless ?? true
  };

  return {
    name,
    subtitle,
    desc,
    image,
    symptoms,
    symptomNote: template?.symptomNote,
    causes,
    diagnosis,
    steps,
    options,
    types,
    recovery,
    recoveryPoints,
    warningSigns,
    whyDoxez,
    faqs,
    insurance
  };
}

export default function ServiceDetailPage() {
  const { categoryId, treatmentId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", hasAyushman: false });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic API state
  const [dynamicTreatmentRaw, setDynamicTreatmentRaw] = useState(null);
  const [dynamicCategoryRaw, setDynamicCategoryRaw] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [specialistDoctors, setSpecialistDoctors] = useState([]);
  const [fetchingDoctors, setFetchingDoctors] = useState(false);

  // UI state
  const [openFaq, setOpenFaq] = useState(0);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [customDate, setCustomDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
      if (currentHour >= 17) return ["5PM - 9PM"];
      if (currentHour >= 13) return ["1PM - 5PM", "5PM - 9PM"];
      return allSlots;
    }
    return allSlots;
  };

  // Fetch API data
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setFetching(true);
        const baseUrl = "";
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(treatmentId);

        // Fetch public catalog to resolve category and sub-service by slug or id
        const catRes = await axios.get(`${baseUrl}/api/services/catalog`);
        let foundService = null;
        let foundSubService = null;

        if (catRes.data?.success && Array.isArray(catRes.data.data)) {
          const catalog = catRes.data.data;

          // 1. Match category
          if (categoryId) {
            foundService = catalog.find(c => isServiceMatch(c, categoryId)) || null;
          }

          // 2. Match sub-service within found category
          if (foundService?.subServices && treatmentId) {
            foundSubService = foundService.subServices.find(sub => isTreatmentMatch(sub, treatmentId)) || null;
          }

          // 3. If not found in category, search across entire catalog
          if (!foundSubService && treatmentId) {
            for (const c of catalog) {
              const match = (c.subServices || []).find(sub => isTreatmentMatch(sub, treatmentId));
              if (match) {
                foundSubService = match;
                if (!foundService) foundService = c;
                break;
              }
            }
          }
        }

        // 4. If treatmentId is raw Mongo ID and wasn't found in catalog, fetch directly
        if (!foundSubService && isMongoId) {
          try {
            const subRes = await axios.get(`${baseUrl}/api/sub-services/${treatmentId}`);
            if (subRes.data?.success) {
              foundSubService = subRes.data.data;
              if (!foundService) foundService = subRes.data.data.service;
            }
          } catch (e) {
            console.warn("Direct sub-service fetch error:", e);
          }
        }

        if (isMounted) {
          if (foundSubService) setDynamicTreatmentRaw(foundSubService);
          if (foundService) setDynamicCategoryRaw(foundService);

          // Canonical slug URL replacement:
          // If the user visited with raw MongoDB IDs, replace with SEO-friendly slugs in the address bar
          const isCatId = /^[0-9a-fA-F]{24}$/.test(categoryId);
          const isTreatId = /^[0-9a-fA-F]{24}$/.test(treatmentId);
          if (isCatId || isTreatId) {
            const cSlug = getServiceSlug(foundService || categoryId);
            const tSlug = getTreatmentSlug(foundSubService || treatmentId);
            if (cSlug && tSlug && (cSlug !== categoryId || tSlug !== treatmentId)) {
              navigate(`/services/${cSlug}/${tSlug}`, { replace: true });
            }
          }
        } else if (treatmentId) {
          // If treatmentId is a slug, find matching sub-service from backend
          const response = await axios.get('/api/sub-services');
          if (response.data && Array.isArray(response.data.data)) {
            const targetSlug = treatmentId.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const match = response.data.data.find(item => {
              const nameSlug = (item.name || "").toLowerCase().replace(/[^a-z0-9]/g, '-');
              return nameSlug === targetSlug || nameSlug.includes(targetSlug) || targetSlug.includes(nameSlug);
            });
            if (match) {
              setDynamicTreatmentRaw(match);
              setDynamicCategoryRaw(match.service);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching treatment details:", err);
      } finally {
        if (isMounted) setFetching(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [categoryId, treatmentId, navigate]);

  const mappedCatId = (CATEGORY_ID_MAP && categoryId && CATEGORY_ID_MAP[categoryId]) ? CATEGORY_ID_MAP[categoryId] : categoryId;
  const localCat = localServicesData.find(c => 
    isServiceMatch(c, categoryId) || 
    isServiceMatch(c, mappedCatId) ||
    c.id === categoryId || 
    c._id === categoryId || 
    c.id === mappedCatId || 
    c._id === mappedCatId ||
    (c.title && categoryId && c.title.toLowerCase().includes(categoryId.toLowerCase())) ||
    (mappedCatId && c.title && c.title.toLowerCase().includes(mappedCatId.toLowerCase()))
  ) || localServicesData[0];

  const localTreatment = localCat?.treatments?.find(t => 
    isTreatmentMatch(t, treatmentId) || 
    t.id === treatmentId || 
    t.name.toLowerCase().includes(treatmentId?.toLowerCase() || "")
  ) || localCat?.treatments?.[0];

  const category = dynamicCategoryRaw ? {
    id: dynamicCategoryRaw._id,
    title: dynamicCategoryRaw.serviceName,
    image: dynamicCategoryRaw.imageUrl
  } : localCat || { id: categoryId, title: "Surgical Care", image: "/services/default.jpg" };

  const treatment = getTreatmentData(dynamicTreatmentRaw, categoryId, treatmentId, localTreatment);

  // Fetch specialist doctors matching category and treatment
  useEffect(() => {
    let isMounted = true;
    const loadSpecialists = async () => {
      const catName = category?.title || categoryId || '';
      const treatName = treatment?.name || treatmentId || '';
      if (!catName && !treatName) return;

      try {
        setFetchingDoctors(true);
        const res = await axios.get('/api/doctors/public', {
          params: {
            category: catName,
            treatment: treatName,
            categoryId,
            treatmentId
          }
        });
        if (isMounted && res.data?.success && Array.isArray(res.data.data)) {
          setSpecialistDoctors(res.data.data);
        }
      } catch (err) {
        console.warn('Failed to fetch specialist doctors:', err);
      } finally {
        if (isMounted) setFetchingDoctors(false);
      }
    };

    loadSpecialists();
    return () => { isMounted = false; };
  }, [category?.title, treatment?.name, categoryId, treatmentId]);

  const handleConsultDoctor = (doc) => {
    const formEl = document.querySelector('.booking-card') || document.querySelector('form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const inputEl = document.querySelector('.booking-input');
    if (inputEl) inputEl.focus();
    toast.success(`Selected ${doc.name}. Please enter your details to connect.`);
  };

  const handleBookingClick = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    trackButtonClick("Service Detail - Get Free Expert Advice", {
      treatment: treatment.name,
      city: form.city,
    });
    setSelectedDate("Today");
    setCustomDate("");
    setSelectedSlot(null);
    setSelectedTime(null);
    setShowTimeModal(true);
  };

  const confirmAndSubmit = async () => {
    setLoading(true);
    try {
      const CRM_API_URL = "";
      const isMongoId = /^[0-9a-fA-F]{24}$/.test(treatmentId);
      const actualSubServiceId = dynamicTreatmentRaw?._id || (isMongoId ? treatmentId : null);

      const payload = {
        patientName: form.name,
        patientEmail: form.email,
        email: form.email,
        patientPhone: form.phone,
        city: form.city,
        hasAyushmanCard: form.hasAyushman,
        hasAyushman: form.hasAyushman,
        preferredCallTime: selectedTime,
        referralCode: localStorage.getItem('doxez_ref') || undefined
      };

      if (actualSubServiceId) {
        await axios.post(`${CRM_API_URL}/api/leads/public/web-lead`, {
          ...payload,
          subServiceId: actualSubServiceId,
          source: `DOXEZ_WEB_LEAD - ${selectedTime}`,
        });
      } else {
        await axios.post(`${CRM_API_URL}/api/leads/public/booking`, {
          ...payload,
          treatmentRequired: treatment.name,
          source: `Service Detail - ${selectedTime}`,
        });
      }

      trackLeadSubmission("Service Detail Page Form", {
        treatment: treatment.name,
        city: form.city,
        hasAyushman: form.hasAyushman,
        preferredTime: selectedTime,
      });

      localStorage.removeItem('doxez_ref');
      setShowTimeModal(false);
      setSubmitted(true);
      toast.success("Booking request submitted successfully! Our care coordinator will call you back shortly.");
    } catch (err) {
      console.error("Booking Error:", err);
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#fff", minHeight: "100vh", color: "#0b1f3a" }}>
        {/* Skeleton Hero Banner */}
        <div style={{ background: "#f8fafc", padding: "150px 20px 36px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Breadcrumb skeleton */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div className="dx-skeleton" style={{ width: 60, height: 14 }} />
              <div style={{ color: "#cbd5e1" }}>/</div>
              <div className="dx-skeleton" style={{ width: 80, height: 14 }} />
              <div style={{ color: "#cbd5e1" }}>/</div>
              <div className="dx-skeleton" style={{ width: 120, height: 14 }} />
            </div>

            {/* Badge skeleton */}
            <div className="dx-skeleton" style={{ width: 140, height: 26, borderRadius: 20, marginBottom: 16 }} />

            {/* Title & Subtitle skeleton */}
            <div className="dx-skeleton" style={{ width: "min(520px, 85%)", height: 38, marginBottom: 14, borderRadius: 8 }} />
            <div className="dx-skeleton" style={{ width: "min(700px, 95%)", height: 18, marginBottom: 8, borderRadius: 6 }} />
            <div className="dx-skeleton" style={{ width: "min(500px, 70%)", height: 18, marginBottom: 28, borderRadius: 6 }} />

            {/* 4 Benefit points skeleton */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: 900 }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div className="dx-skeleton" style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} />
                  <div className="dx-skeleton" style={{ width: "80%", height: 14 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skeleton Body Layout */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start" }}>
            {/* Left Content Column */}
            <div style={{ flex: 1 }}>
              {/* Overview block */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 28, marginBottom: 28 }}>
                <div className="dx-skeleton" style={{ width: 200, height: 24, marginBottom: 18, borderRadius: 6 }} />
                <div className="dx-skeleton" style={{ width: "100%", height: 14, marginBottom: 10 }} />
                <div className="dx-skeleton" style={{ width: "95%", height: 14, marginBottom: 10 }} />
                <div className="dx-skeleton" style={{ width: "90%", height: 14, marginBottom: 10 }} />
                <div className="dx-skeleton" style={{ width: "75%", height: 14, marginBottom: 20 }} />
                
                {/* Bullets */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="dx-skeleton" style={{ height: 36, borderRadius: 10 }} />
                  <div className="dx-skeleton" style={{ height: 36, borderRadius: 10 }} />
                </div>
              </div>

              {/* Symptoms cards block */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 28, marginBottom: 28 }}>
                <div className="dx-skeleton" style={{ width: 180, height: 22, marginBottom: 16, borderRadius: 6 }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{ background: "#f8fafc", padding: 16, borderRadius: 14, border: "1px solid #edf2f7" }}>
                      <div className="dx-skeleton" style={{ width: 36, height: 36, borderRadius: 10, marginBottom: 12 }} />
                      <div className="dx-skeleton" style={{ width: "80%", height: 16, marginBottom: 6 }} />
                      <div className="dx-skeleton" style={{ width: "60%", height: 12 }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ skeleton */}
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 28 }}>
                <div className="dx-skeleton" style={{ width: 220, height: 22, marginBottom: 16, borderRadius: 6 }} />
                {[1, 2, 3].map(q => (
                  <div key={q} style={{ borderBottom: "1px solid #f1f5f9", padding: "16px 0" }}>
                    <div className="dx-skeleton" style={{ width: "70%", height: 16, marginBottom: 8 }} />
                    <div className="dx-skeleton" style={{ width: "90%", height: 12 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sticky Card Column */}
            <div style={{ maxWidth: 440, width: "100%", margin: "0 auto" }}>
              <div style={{
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                borderRadius: 24,
                padding: "32px 26px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)"
              }}>
                <div className="dx-skeleton" style={{ width: 140, height: 24, borderRadius: 999, marginBottom: 16 }} />
                <div className="dx-skeleton" style={{ width: "85%", height: 24, marginBottom: 8, borderRadius: 6 }} />
                <div className="dx-skeleton" style={{ width: "60%", height: 14, marginBottom: 24 }} />

                {/* Form fields skeleton */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                  <div className="dx-skeleton" style={{ height: 46, borderRadius: 12 }} />
                  <div className="dx-skeleton" style={{ height: 46, borderRadius: 12 }} />
                  <div className="dx-skeleton" style={{ height: 46, borderRadius: 12 }} />
                  <div className="dx-skeleton" style={{ height: 46, borderRadius: 12 }} />
                </div>

                <div className="dx-skeleton" style={{ height: 50, borderRadius: 14, marginBottom: 18 }} />
                <div className="dx-skeleton" style={{ width: "70%", height: 12, margin: "0 auto" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#fff", minHeight: "100vh", color: "#0b1f3a" }}>
      <style>{`
        .hero-banner {
          background: #f8fafc;
          padding: 150px 20px 32px;
          border-bottom: 1px solid #e2e8f0;
        }
        @media (max-width: 640px) {
          .hero-banner { padding: 120px 16px 24px !important; }
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .benefit-point {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #1e293b;
          font-size: 14.5px;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 56px;
          position: relative;
        }
        .section-padding {
          padding: 48px 20px 80px;
        }
        .info-section {
          margin-bottom: 40px;
        }
        .info-section h3 {
          font-size: 22px;
          font-weight: 800;
          color: #0b1f3a;
          margin: 0 0 16px 0;
          line-height: 1.3;
        }
        .info-section p {
          font-size: 15px;
          color: #475569;
          line-height: 1.7;
          margin: 0 0 16px 0;
        }
        .info-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .info-section li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          color: #475569;
          font-size: 14.5px;
          line-height: 1.55;
        }
        .info-section li::before {
          content: "•";
          color: #3b82f6;
          font-weight: 900;
          font-size: 18px;
          line-height: 1;
        }

        /* 5-STEP JOURNEY STEPPER */
        .step-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }
        .step-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 20px;
          transition: all 0.2s;
        }
        .step-card:hover {
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.06);
        }
        .step-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #eef4ff;
          color: #3b82f6;
          font-size: 15px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .step-content h4 {
          font-size: 15.5px;
          font-weight: 700;
          color: #0b1f3a;
          margin: 0 0 4px 0;
        }
        .step-content p {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        /* CAUSES & DIAGNOSIS 2-COL */
        .cards-2col {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
          margin-top: 14px;
        }
        .mini-info-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
        }
        .mini-info-card h4 {
          font-size: 14.5px;
          font-weight: 700;
          color: #0b1f3a;
          margin: 0 0 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mini-info-card p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        /* INSURANCE BOX */
        .insurance-box {
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          border-radius: 20px;
          padding: 24px;
        }

        /* FAQ ACCORDION */
        .faq-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 10px;
          overflow: hidden;
          background: #fff;
        }
        .faq-question {
          width: 100%;
          padding: 16px 20px;
          background: #fff;
          border: none;
          outline: none;
          text-align: left;
          font-size: 15px;
          font-weight: 700;
          color: #0b1f3a;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .faq-question:hover {
          color: #3b82f6;
        }
        .faq-answer {
          padding: 0 20px 16px;
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }

        .sticky-form-col {
          position: -webkit-sticky;
          position: sticky;
          top: 90px;
          align-self: start;
          z-index: 20;
        }
        .booking-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 28px 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }
        .booking-input {
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .booking-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .booking-btn {
          width: 100%;
          padding: 13px;
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
          margin-top: 16px;
        }
        /* SPECIALIST DOCTORS SECTION */
        .doctor-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
          margin-top: 18px;
        }
        .doctor-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .doctor-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 12px 28px -6px rgba(59, 130, 246, 0.16);
          transform: translateY(-3px);
        }
        .doctor-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .doctor-avatar-img {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e0e7ff;
          flex-shrink: 0;
        }
        .doctor-avatar-placeholder {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          color: #1d4ed8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          border: 2px solid #bfdbfe;
          flex-shrink: 0;
        }
        .doctor-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: #ecfdf5;
          color: #059669;
          font-size: 11px;
          font-weight: 700;
          border-radius: 999px;
          border: 1px solid #a7f3d0;
          margin-top: 4px;
        }
        .doctor-details-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 12px 0 16px;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }
        .doctor-detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #475569;
          font-weight: 500;
        }
        .doctor-consult-btn {
          width: 100%;
          padding: 10px 14px;
          background: #0b1f3a;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .doctor-consult-btn:hover {
          background: #2563eb;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .booking-btn:hover {
          background: #2563eb;
        }

        @media (max-width: 960px) {
          .content-grid { grid-template-columns: 1fr; gap: 36px; }
          .sticky-form-col { position: static; margin-top: 20px; }
        }
        @media (max-width: 600px) {
          .hero-image-wrap { width: 100% !important; max-width: 320px; height: 200px !important; margin: 20px auto 0 !important; }
          .info-section h3 { font-size: 18px; }
          .booking-card { padding: 22px 18px; }
        }
      `}</style>

      {/* ══ HERO BANNER ══ */}
      <div className="hero-banner">
        <div className="container">
          <button
            onClick={() => {
              const catSlug = getServiceSlug(category);
              if (catSlug) navigate(`/services/${catSlug}`);
              else navigate('/service');
            }}
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
              <div style={{
                display: "inline-block",
                padding: "6px 12px",
                background: "#eef4ff",
                color: "#3b82f6",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "800",
                marginBottom: "16px",
                textTransform: "uppercase"
              }}>
                {category.title}
              </div>

              <h1 style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.3rem)",
                fontWeight: "800",
                marginBottom: "12px",
                color: "#0b1f3a",
                lineHeight: 1.2
              }}>
                {treatment.name} Treatment in Bhubaneswar
              </h1>

              <p style={{
                fontSize: "15px",
                color: "#475569",
                marginBottom: "20px",
                fontWeight: "500",
                lineHeight: 1.6,
                maxWidth: "600px"
              }}>
                {treatment.subtitle}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                <div className="benefit-point"><CheckCircle2 size={20} color="#16a34a" /> Free Consultation</div>
                <div className="benefit-point"><CheckCircle2 size={20} color="#16a34a" /> Insurance Support</div>
                <div className="benefit-point"><CheckCircle2 size={20} color="#16a34a" /> Faster Recovery</div>
              </div>
            </div>

            <div style={{ flex: "0 0 auto", textAlign: "center" }}>
              <div className="hero-image-wrap" style={{
                width: "360px",
                height: "280px",
                borderRadius: "20px",
                overflow: "hidden",
                margin: "0 auto",
                boxShadow: "0 20px 40px rgba(30, 75, 143, 0.1)"
              }}>
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.style.background = "#eff6ff"; }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT SECTION ══ */}
      <div className="section-padding">
        <div className="container">
          <div className="content-grid">

            {/* ── LEFT CONTENT ── */}
            <div>
              {/* 1. What is... */}
              <div className="info-section">
                <h3>What is {treatment.name}?</h3>
                {treatment.desc.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* 2. Symptoms */}
              {treatment.symptoms && treatment.symptoms.length > 0 && (
                <div className="info-section">
                  <h3>Common Symptoms</h3>
                  <ul>
                    {treatment.symptoms.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  {treatment.symptomNote && (
                    <p style={{ marginTop: "14px", fontStyle: "italic", fontSize: "14px", color: "#64748b" }}>
                      {treatment.symptomNote}
                    </p>
                  )}
                </div>
              )}

              {/* 3. Causes */}
              {treatment.causes && treatment.causes.length > 0 && (
                <div className="info-section">
                  <h3>Why May {treatment.name} Be Needed?</h3>
                  <p>Conditions that may lead to the need for treatment include:</p>
                  <div className="cards-2col">
                    {treatment.causes.map((c, i) => (
                      <div key={i} className="mini-info-card">
                        <h4>{c.title}</h4>
                        <p>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Diagnosis */}
              {treatment.diagnosis && treatment.diagnosis.length > 0 && (
                <div className="info-section">
                  <h3>How is {treatment.name} Diagnosed?</h3>
                  <p>Specialist doctors evaluate your condition using precise diagnostic methods:</p>
                  <div className="cards-2col">
                    {treatment.diagnosis.map((d, i) => (
                      <div key={i} className="mini-info-card">
                        <h4>{d.name}</h4>
                        <p>{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Treatment - 5 Simple Steps */}
              {treatment.steps && treatment.steps.length > 0 && (
                <div className="info-section">
                  <h3>Your {treatment.name} Treatment Journey</h3>
                  <div className="step-timeline">
                    {treatment.steps.map((st, i) => (
                      <div key={i} className="step-card">
                        <div className="step-badge">{st.step}</div>
                        <div className="step-content">
                          <h4>{st.title}</h4>
                          <p>{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Treatment Options */}
              <div className="info-section">
                <h3>Treatment Options</h3>
                <p>Depending on your condition, doctors may recommend:</p>
                <ul>
                  {treatment.options.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>

              {/* Types of Treatment if available */}
              {treatment.types && treatment.types.length > 0 && (
                <div className="info-section">
                  <h3>Types of {treatment.name} Procedures</h3>
                  <div style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                    {treatment.types.map((type, i) => (
                      <div key={i} style={{
                        padding: "16px 20px",
                        background: "#f8fafc",
                        borderLeft: "4px solid #3b82f6",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        borderLeftColor: "#3b82f6"
                      }}>
                        <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#0b1f3a", margin: "0 0 6px 0" }}>
                          {type.name}
                        </h4>
                        <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: "1.55", margin: 0 }}>
                          {type.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SPECIALIST DOCTORS SECTION ── */}
              {specialistDoctors && specialistDoctors.length > 0 && (
                <div className="info-section">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                    <h3 style={{ margin: 0 }}>Specialist Doctors for {treatment.name}</h3>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#2563eb", background: "#eff6ff", padding: "4px 10px", borderRadius: "999px", border: "1px solid #dbeafe" }}>
                      <ShieldCheck size={14} color="#2563eb" /> Verified Specialists
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 16px 0" }}>
                    Experienced surgeons and medical specialists verified by DOXEZ for advanced care.
                  </p>

                  <div className="doctor-cards-grid">
                    {specialistDoctors.map((doc) => {
                      const initials = doc.name ? doc.name.replace(/^Dr\.\s*/i, '').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'DR';
                      const qualificationLine = [doc.primaryQualification, doc.specialization].filter(Boolean).join(', ');
                      const specialtyLine = doc.specializationBranch || doc.doctorType || 'Specialist Surgeon';

                      return (
                        <div key={doc._id} className="doctor-card">
                          <div>
                            <div className="doctor-card-header">
                              {doc.avatar ? (
                                <img
                                  src={doc.avatar}
                                  alt={doc.name}
                                  className="doctor-avatar-img"
                                  onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
                                />
                              ) : null}
                              <div className="doctor-avatar-placeholder" style={{ display: doc.avatar ? 'none' : 'flex' }}>
                                {initials}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 style={{ fontSize: "15.5px", fontWeight: "800", color: "#0b1f3a", margin: "0 0 2px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {doc.name}
                                </h4>
                                <div style={{ fontSize: "12px", color: "#2563eb", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {specialtyLine}
                                </div>
                                <span className="doctor-verified-badge">
                                  <Check size={11} /> Verified Doctor
                                </span>
                              </div>
                            </div>

                            <div className="doctor-details-list">
                              {qualificationLine && (
                                <div className="doctor-detail-item">
                                  <GraduationCap size={14} color="#3b82f6" />
                                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{qualificationLine}</span>
                                </div>
                              )}
                              {doc.totalExperience > 0 && (
                                <div className="doctor-detail-item">
                                  <Clock size={14} color="#3b82f6" />
                                  <span>{doc.totalExperience}+ Years Experience</span>
                                </div>
                              )}
                              {doc.workingHospital && (
                                <div className="doctor-detail-item">
                                  <Building2 size={14} color="#3b82f6" />
                                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.workingHospital}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleConsultDoctor(doc)}
                            className="doctor-consult-btn"
                          >
                            <Calendar size={14} />
                            <span>Book Consultation</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 7. Why Choose DOXEZ? */}
              <div className="info-section">
                <h3>Why Choose DOXEZ?</h3>
                <ul>
                  {treatment.whyDoxez.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* 8. Insurance Support (Exact match to screenshot) */}
              <div className="info-section">
                <h3>Insurance Support</h3>
                <div className="insurance-box">
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", color: "#166534", fontSize: "14px" }}>
                      <CheckCircle2 size={18} color="#16a34a" /> Insurance Accepted
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", color: "#166534", fontSize: "14px" }}>
                      <CheckCircle2 size={18} color="#16a34a" /> Ayushman Support Available*
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", color: "#166534", fontSize: "14px" }}>
                      <CheckCircle2 size={18} color="#16a34a" /> Cashless Assistance Available
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "#166534", margin: "14px 0 0 0", fontStyle: "italic" }}>
                    *Depends on eligibility and hospital approval.
                  </p>
                </div>
              </div>

              {/* 9. Recovery */}
              <div className="info-section">
                <h3>Recovery</h3>
                <p>{treatment.recovery}</p>
                {treatment.recoveryPoints && treatment.recoveryPoints.length > 0 && (
                  <>
                    <p style={{ fontWeight: "700", color: "#0b1f3a", margin: "14px 0 8px 0" }}>Your ENT specialist may recommend:</p>
                    <ul>
                      {treatment.recoveryPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </>
                )}
                {treatment.warningSigns && treatment.warningSigns.length > 0 && (
                  <div style={{ marginTop: "16px", background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: "12px", padding: "16px 20px" }}>
                    <p style={{ fontWeight: "700", color: "#c53030", margin: "0 0 6px 0", fontSize: "14px" }}>
                      Seek urgent medical attention if you experience:
                    </p>
                    <ul style={{ margin: 0 }}>
                      {treatment.warningSigns.map((ws, i) => (
                        <li key={i} style={{ color: "#742a2a", fontSize: "13.5px", marginBottom: "6px" }}>{ws}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 10. FAQs */}
              {treatment.faqs && treatment.faqs.length > 0 && (
                <div className="info-section">
                  <h3>Frequently Asked Questions</h3>
                  <div style={{ marginTop: "16px" }}>
                    {treatment.faqs.map((faq, i) => (
                      <div key={i} className="faq-card">
                        <button
                          className="faq-question"
                          onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        >
                          <span>{faq.q}</span>
                          {openFaq === i ? <ChevronUp size={18} color="#3b82f6" /> : <ChevronDown size={18} color="#94a3b8" />}
                        </button>
                        {openFaq === i && (
                          <div className="faq-answer">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Final Consultation Note */}
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", marginTop: "40px", textAlign: "center" }}>
                <h4 style={{ fontSize: "18px", fontWeight: "800", color: "#0b1f3a", marginBottom: "8px" }}>
                  Don't Ignore Persistent Problems
                </h4>
                <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "500px", margin: "0 auto 16px", lineHeight: "1.6" }}>
                  Connect with a qualified specialist through DOXEZ and understand whether surgery or another treatment is appropriate for your condition.
                </p>
                <a
                  href="tel:+919692949500"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#3b82f6",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "14.5px",
                    textDecoration: "none"
                  }}
                >
                  <Phone size={16} /> Call +91-9692949500
                </a>
              </div>

            </div>

            {/* ── RIGHT STICKY LEAD FORM (Exact match to screenshot) ── */}
            <div className="sticky-form-col">
              <div className="booking-card">
                {!submitted ? (
                  <>
                    <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0b1f3a", margin: "0 0 6px 0" }}>
                      Get <span style={{ color: "#3b82f6" }}>Free</span> Expert Advice
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "#64748b", margin: "0 0 24px 0" }}>
                      Connect with our medical expert today.
                    </p>

                    <form onSubmit={handleBookingClick}>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          className="booking-input"
                          placeholder="Enter your name"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                        />
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          className="booking-input"
                          placeholder="your.email@example.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          mobile/whatsapp Number
                        </label>
                        <input
                          type="tel"
                          required
                          className="booking-input"
                          placeholder="10-digit mobile/whatsapp number"
                          value={form.phone}
                          onChange={e => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length > 10 && val.startsWith("91")) val = val.slice(2);
                            val = val.replace(/^0+/, "").slice(0, 10);
                            setForm({ ...form, phone: val });
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          City
                        </label>
                        <input
                          type="text"
                          required
                          className="booking-input"
                          placeholder="Your city"
                          value={form.city}
                          onChange={e => setForm({ ...form, city: e.target.value })}
                        />
                      </div>

                      <div style={{ margin: "20px 0 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                          type="checkbox"
                          id="ayushman-checkbox"
                          checked={form.hasAyushman}
                          onChange={e => setForm({ ...form, hasAyushman: e.target.checked })}
                          style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "#3b82f6" }}
                        />
                        <label htmlFor="ayushman-checkbox" style={{ fontSize: "13.5px", fontWeight: "700", color: "#0b1f3a", cursor: "pointer" }}>
                          I have an Ayushman Bharat Card
                        </label>
                      </div>

                      <button type="submit" disabled={loading} className="booking-btn">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : "Get Free Expert Advice"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <CheckCircle2 size={52} color="#16a34a" style={{ margin: "0 auto 16px" }} />
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0b1f3a", marginBottom: "6px" }}>
                      Request Submitted!
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: "1.5" }}>
                      Thank you, {form.name}. Our medical expert will connect with you at <strong>{form.phone}</strong> shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══ TIME MODAL ══ */}
      {showTimeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11, 31, 58, 0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '420px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ background: '#0b1f3a', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
              <h4 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Clock size={18} /> Select Callback Time
              </h4>
              <button onClick={() => setShowTimeModal(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <XCircle size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', textAlign: 'center' }}>
                Choose when you would like our care coordinator to call you back.
              </p>

              <button
                onClick={() => {
                  setSelectedSlot("30min");
                  setSelectedTime('Today - Call within 30 minutes');
                }}
                type="button"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${selectedSlot === "30min" ? '#3b82f6' : '#10b981'}`,
                  background: selectedSlot === "30min" ? '#eff6ff' : '#ecfdf5',
                  color: selectedSlot === "30min" ? '#3b82f6' : '#047857',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                <Phone size={18} /> Call me within 30 minutes
              </button>

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
                      if (item.key === 'Custom' && !customDate) setCustomDate(getTodayDateStr());
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
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {selectedDate === 'Custom' && (
                <div style={{ marginBottom: '16px' }}>
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
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {getAvailableSlots(selectedDate, customDate).map(time => {
                  const isSelected = selectedSlot === time;
                  return (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedSlot(time);
                        const dateLabel = selectedDate === 'Custom' ? (formatCustomDate(customDate) || 'Custom Date') : selectedDate;
                        setSelectedTime(`${dateLabel}, ${time}`);
                      }}
                      type="button"
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `1.5px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                        background: isSelected ? '#eff6ff' : '#fff',
                        color: isSelected ? '#3b82f6' : '#1e293b',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '14px'
                      }}
                    >
                      <span>{time}</span>
                      {isSelected && <CheckCircle2 size={16} color="#3b82f6" />}
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
                  padding: '14px',
                  background: (!selectedTime || loading) ? '#cbd5e1' : '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: !selectedTime || loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '15px'
                }}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Confirm Time & Book"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
