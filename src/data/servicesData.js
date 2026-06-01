import pilesImg from '../assets/piles.jpeg';
import fistulaImg from '../assets/fistula.jpeg';
// import fissureImg from '../assets/fissure.jpeg';
// import pilonidalImg from '../assets/pilonidal-sinus.jpeg';
import kidneystone from '../assets/kidneystones.jpeg';
import harnia from '../assets/harnia.jpeg';
import Enlargedprostate from '../assets/Enlarged.jpeg';
import proctologyIcon from '../assets/proctologii.png';
import urology from "../assets/urology.png";
import Gynecology from "../assets/Gynecology.png";
import ENT from "../assets/ENT.png";
import orthopedics from "../assets/orthopedics.png";
import appendectomy from '../assets/Appendectomy.jpeg';
import IVF from '../assets/IVF.jpeg';
import leaserCircumcision from '../assets/leasercircumsion.jpeg';
import zsrcircumcision from '../assets/zsrcircumsion.jpeg';
import varicocele from '../assets/vericocele.jpeg';
import thyroidectomy from '../assets/thiroid.png';
import lipoma from '../assets/lipoma.jpeg';
import breastreduction from '../assets/breastreduction.png';
import liposuction from '../assets/liposuction.png'
import Endometriosis from '../assets/Endometriosis.jpg'
import cosmeticIcon from '../assets/cumaaticc.png';
import generalSurgeryIcon from '../assets/generalsurgery.png';
import slipDiscImg from '../assets/SlipDisc.jpeg';
import cervicalSpineImg from '../assets/cirvicalspine.jpeg';
import LumberSpine from '../assets/lmberspine.jpeg';
import Acltearimg from '../assets/ACLtear.jpeg';
import meniscusImg from '../assets/menisous.jpeg';







export const servicesData = [
  {
    id: "proctology",
    title: "Proctology & Colorectal Surgery",
    icon: "Activity",
    iconImage: proctologyIcon,
    image: "/services/proctology.jpg",
    shortDesc: "Advanced treatment for Piles, Fistula, Fissure and other rectal conditions.",
    treatments: [
      { id: "piles", name: "Piles (Hemorrhoids)", image: pilesImg, desc: "Piles are swollen veins near the anus that can cause pain, bleeding, itching, or discomfort.", symptoms: ["Pain while passing stool", "Bleeding after toilet", "Itching or burning", "Swelling near anus"], options: ["Medicines", "Lifestyle changes", "Laser treatment", "Surgery"], insurance: { accepted: true, ayushman: true, cashless: true }, recovery: "Short hospital stays, faster recovery, minimally invasive options available." },
      { id: "fistula", name: "Anal Fistula", image: fistulaImg, desc: "A small tunnel that connects an infected gland inside the anus to an opening on the skin around the anus.", options: ["Medicines", "Fistulotomy", "Laser treatment"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "fissure", name: "Anal Fissure", image: "/services/fissure.jpg", desc: "A small tear in the thin, moist tissue (mucosa) that lines the anus.", options: ["Medicines", "Botox injection", "Lateral sphincterotomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "pilonidal-sinus", name: "Pilonidal Sinus", image: "/services/pilonidal-sinus.jpg", desc: "A small hole or tunnel in the skin, typically at the top of the cleft of the buttocks.", options: ["Surgery", "Laser treatment"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "urology",
    title: "Urology & Andrology",
    icon: "Shield",
    iconImage: urology,
    image: "/services/urology.jpg",
    shortDesc: "Comprehensive care for kidney stones, prostate and male reproductive health.",
    treatments: [
      { id: "kidney-stones", name: "Kidney Stones", image: kidneystone, desc: "Hard deposits made of minerals and salts that form inside your kidneys.", symptoms: ["Severe back or side pain", "Blood in urine", "Nausea", "Frequent urination"], options: ["Medicines", "ESWL (Shock wave)", "Laser surgery", "PCNL"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "enlarged-prostate", name: "Enlarged Prostate (BPH)", image: Enlargedprostate, desc: "A condition in men in which the prostate gland is enlarged and not cancerous.", options: ["Medicines", "TURP surgery", "Laser prostatectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      {
        id: "laser-circumcision", name: "Laser Circumcision", image: leaserCircumcision, desc: "A modern, bloodless procedure for removing the foreskin.", options: ["Laser circumcision", "Stapler circumcision"], insurance: { accepted: false, emi: true }
      },
      { id: "zsr-circumcision", name: "ZSR Circumcision", image: zsrcircumcision, desc: "A stitchless, painless circumcision using a stapler device.", options: ["ZSR stapler device procedure"], insurance: { accepted: false, emi: true } },
      { id: "hydrocelectomy", name: "Hydrocele", image: "/services/hydrocele.jpg", desc: "Surgical procedure to remove a hydrocele (fluid-filled sac around a testicle).", options: ["Surgical drainage", "Hydrocelectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "varicocele", name: "Varicocele", image: varicocele, desc: "Enlargement of the veins within the loose bag of skin that holds your testicles.", options: ["Varicocelectomy", "Laparoscopic surgery"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "general-surgery",
    title: "General & Laparoscopic Surgery",
    icon: "Stethoscope",
    iconImage: generalSurgeryIcon,
    image: "/services/general-surgery.jpg",
    shortDesc: "Expert laparoscopic procedures for gallstones, hernia and appendicitis.",
    treatments: [
      { id: "gallstone", name: "Gallstone", image: "/services/gallstone.jpg", desc: "Hardened deposits of digestive fluid that can form in your gallbladder.", symptoms: ["Sudden pain in upper abdomen", "Nausea", "Vomiting", "Back pain"], options: ["Laparoscopic cholecystectomy", "Open surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "hernia", name: "Hernia", image: harnia, desc: "Occurs when an organ pushes through an opening in the muscle or tissue that holds it in place.", options: ["Laparoscopic repair", "Open hernioplasty"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "inguinal-hernia", name: "Inguinal Hernia", image: "/services/inguinal-hernia.jpg", desc: "Occurs in the groin area when fatty tissue or a part of your bowel pokes through your lower abdominal wall.", options: ["Laparoscopic TEP/TAPP", "Open repair"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "umbilical-hernia", name: "Umbilical Hernia", image: "/services/umbilical-hernia.jpg", desc: "Creates a soft swelling or bulge near the navel.", options: ["Laparoscopic repair", "Open surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "appendectomy", name: "Appendectomy", image: appendectomy, desc: "Surgical removal of the appendix.", options: ["Laparoscopic appendectomy", "Open surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "lipoma", name: "Lipoma", image: lipoma, desc: "A fatty lump most often situated between your skin and the underlying muscle layer.", options: ["Surgical excision", "Liposuction"], insurance: { accepted: false, emi: true } },
      { id: "sebaceous-cyst", name: "Sebaceous Cyst", image: "/services/sebaceous-cyst.jpg", desc: "Small bumps or lumps that are not cancerous, most common on the face, neck, and trunk.", options: ["Surgical removal"], insurance: { accepted: false, emi: true } },
      { id: "thyroidectomy", name: "Thyroidectomy", image: thyroidectomy, desc: "Surgical removal of all or part of your thyroid gland.", options: ["Total thyroidectomy", "Partial thyroidectomy"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "gynecology",
    title: "Gynecology & Women's Health",
    icon: "Heart",
    iconImage: Gynecology,
    image: "/services/gynecology.jpg",
    shortDesc: "Advanced care for uterine fibroids, fertility and maternity needs.",
    treatments: [
      { id: "uterine-fibroid", name: "Uterine Fibroid", image: "/services/fibroid.jpg", desc: "Noncancerous growths of the uterus that often appear during childbearing years.", symptoms: ["Heavy periods", "Pelvic pain", "Frequent urination", "Back pain"], options: ["Medicines", "Myomectomy", "Hysterectomy", "Laparoscopic surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "ivf", name: "IVF", image: IVF, desc: "In vitro fertilization is a complex series of procedures used to help with fertility.", options: ["IVF cycle", "ICSI", "Embryo transfer"], insurance: { accepted: false, emi: true } },
      { id: "iui", name: "IUI", image: "/services/iui.jpg", desc: "Intrauterine insemination is a type of artificial insemination.", options: ["IUI procedure"], insurance: { accepted: false, emi: true } },
      { id: "hymenoplasty", name: "Hymenoplasty", image: "/services/hymenoplasty.jpg", desc: "A surgical procedure to restore the hymen.", options: ["Hymen repair surgery"], insurance: { accepted: false, emi: true } },
      { id: "vaginoplasty", name: "Vaginoplasty", image: "/services/vaginoplasty.jpg", desc: "A procedure that aims to tighten the vagina.", options: ["Surgical tightening", "Laser vaginoplasty"], insurance: { accepted: false, emi: true } },
      { id: "labiaplasty", name: "Labiaplasty", image: "/services/labiaplasty.jpg", desc: "A surgical procedure that shortens or reshapes the labia minora.", options: ["Labiaplasty surgery"], insurance: { accepted: false, emi: true } },
      { id: "abortion", name: "Abortion", image: "/services/abortion.jpg", desc: "The termination of a pregnancy by removal or expulsion of an embryo or fetus.", options: ["Medical abortion", "Surgical abortion (MVA/D&C)"], insurance: { accepted: false, emi: true } },
      { id: "mtp", name: "MTP (Medical Termination of Pregnancy)", image: "/services/mtp.jpg", desc: "Termination of pregnancy using medicines.", options: ["MTP pills", "Surgical MTP"], insurance: { accepted: false, emi: true } },
      { id: "hysterectomy", name: "Hysterectomy", image: "/services/hysterectomy.jpg", desc: "Surgical removal of the uterus.", options: ["Laparoscopic hysterectomy", "Open hysterectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "ectopic-pregnancy", name: "Ectopic Pregnancy", image: "/services/ectopic.jpg", desc: "Occurs when a fertilized egg implants and grows outside the main cavity of the uterus.", options: ["Medicines", "Laparoscopic surgery", "Open surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "endometriosis", name: "Endometriosis", image: Endometriosis, desc: "An often painful disorder in which tissue similar to the tissue that lines the uterus grows outside it.", options: ["Medicines", "Hormonal therapy", "Laparoscopic surgery"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "ent",
    title: "ENT (Ear, Nose & Throat)",
    icon: "Mic",
    iconImage: ENT,
    image: "/services/ent.jpg",
    shortDesc: "Specialized treatment for sinus, septoplasty and tonsil conditions.",
    treatments: [
      { id: "fess", name: "FESS (Sinus Surgery)", image: "/services/sinus.jpg", desc: "Functional Endoscopic Sinus Surgery is a minimally invasive surgical treatment for sinusitis.", symptoms: ["Blocked nose", "Facial pain", "Loss of smell", "Frequent headaches"], options: ["FESS endoscopic surgery", "Balloon sinuplasty"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "septoplasty", name: "Septoplasty", image: "/services/septoplasty.jpg", desc: "Surgical procedure to straighten the bone and cartilage dividing the space between your two nostrils.", options: ["Septoplasty", "Combined septorhinoplasty"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "rhinoplasty", name: "Rhinoplasty", image: "/services/rhinoplasty.jpg", desc: "Surgery that changes the shape of the nose.", options: ["Open rhinoplasty", "Closed rhinoplasty"], insurance: { accepted: false, emi: true } },
      { id: "tonsillectomy", name: "Tonsillectomy", image: "/services/tonsillectomy.jpg", desc: "Surgical removal of the tonsils.", options: ["Laser tonsillectomy", "Conventional tonsillectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "tympanoplasty", name: "Tympanoplasty", image: "/services/tympanoplasty.jpg", desc: "Surgical operation performed for the reconstruction of the eardrum.", options: ["Type I-IV tympanoplasty"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "adenoidectomy", name: "Adenoidectomy", image: "/services/adenoidectomy.jpg", desc: "Surgical removal of the adenoids.", options: ["Adenoidectomy surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "mastoidectomy", name: "Mastoidectomy", image: "/services/mastoidectomy.jpg", desc: "Procedure to remove diseased mastoid air cells.", options: ["Simple mastoidectomy", "Radical mastoidectomy"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "cosmetic",
    title: "Cosmetic & Plastic Surgery",
    icon: "Sparkles",
    iconImage: cosmeticIcon,
    image: "/services/cosmetic.jpg",
    shortDesc: "Precision cosmetic procedures including gynecomastia and liposuction.",
    treatments: [
      { id: "gynecomastia", name: "Gynecomastia", image: breastreduction, desc: "Gynecomastia is enlargement of male breast tissue that can affect confidence and comfort.", symptoms: ["Enlarged chest in males", "Breast tenderness", "Swelling", "Asymmetry"], options: ["Medicines", "Liposuction", "Gland excision surgery"], insurance: { accepted: false, emi: true }, recovery: "Short recovery times, high privacy focus." },
      { id: "liposuction", name: "Liposuction", image: liposuction, desc: "A surgical procedure that uses a suction technique to remove fat from specific areas of the body.", options: ["Tumescent liposuction", "Laser liposuction", "VASER liposuction"], insurance: { accepted: false, emi: true } },
      { id: "breast-augmentation", name: "Breast Augmentation", image: "/services/breast-augmentation.jpg", desc: "Surgery to increase breast size.", options: ["Implant-based augmentation", "Fat transfer augmentation"], insurance: { accepted: false, emi: true } },
      { id: "breast-lift", name: "Breast Lift", image: "/services/breast-lift.jpg", desc: "Surgery to raise and firm the breasts by removing excess skin and tightening the surrounding tissue.", options: ["Mastopexy surgery"], insurance: { accepted: false, emi: true } },
      { id: "breast-reduction", name: "Breast Reduction", image: "/services/breast-reduction.jpg", desc: "Surgical procedure to remove excess breast fat, glandular tissue and skin.", options: ["Reduction mammoplasty"], insurance: { accepted: true, ayushman: false, cashless: true } }
    ]
  },
  {
    id: "breast-surgery",
    title: "Breast Surgery",
    icon: "ShieldPlus",
    image: "/services/breast-surgery.jpg",
    shortDesc: "Compassionate care for breast lumps and clinical breast health.",
    treatments: [
      { id: "breast-lump", name: "Breast Lump", image: "/services/breast-lump.jpg", desc: "A growth or mass that develops in the breast.", symptoms: ["Lump in breast", "Change in shape", "Skin changes", "Nipple discharge"], options: ["Lumpectomy", "Biopsy", "Mastectomy if required"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "orthopedics",
    title: "Orthopedics & Joint Surgery",
    icon: "Bone",
    iconImage: orthopedics,
    image: "/services/orthopedics.jpg",
    shortDesc: "Expert care for ACL, meniscus tears and joint replacement surgeries.",
    treatments: [
      { id: "acl-tear", name: "ACL Tear", image: Acltearimg, desc: "Injury to the anterior cruciate ligament, one of the major ligaments in your knee.", symptoms: ["Knee pain", "Swelling", "Instability", "Popping sound at injury"], options: ["Physiotherapy", "ACL reconstruction surgery"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "meniscus-tear", name: "Meniscus Tear", image: meniscusImg, desc: "A common knee injury involving the C-shaped discs that provide cushioning between your femur and tibia.", options: ["Physiotherapy", "Arthroscopic meniscus repair"], insurance: { accepted: true, ayushman: true, cashless: true } },

      { id: "spine-surgery-ortho", name: "Spine Surgery", image: "/services/spine.jpg", desc: "Procedures to treat various back and neck conditions.", options: ["Discectomy", "Spinal fusion", "Laminectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "knee-replacement", name: "Knee Replacement", image: "/services/knee-replacement.jpg", desc: "Surgical procedure to replace the weight-bearing surfaces of the knee joint.", options: ["Total knee replacement", "Partial knee replacement"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "hip-replacement", name: "Hip Replacement", image: "/services/hip-replacement.jpg", desc: "Surgical procedure in which the hip joint is replaced by a prosthetic implant.", options: ["Total hip replacement", "Hemi hip replacement"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "shoulder-dislocation", name: "Shoulder Dislocation", image: "/services/shoulder-dislocation.jpg", desc: "An injury in which your upper arm bone pops out of the cup-shaped socket that's part of your shoulder blade.", options: ["Closed reduction", "Arthroscopic stabilization"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "shoulder-replacement", name: "Shoulder Replacement", image: "/services/shoulder-replacement.jpg", desc: "Surgical procedure in which all or part of the glenohumeral joint is replaced by a prosthetic implant.", options: ["Total shoulder replacement", "Reverse shoulder replacement"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "carpal-tunnel", name: "Carpal Tunnel Syndrome", image: "/services/carpal-tunnel.jpg", desc: "A condition that causes numbness, tingling, or weakness in your hand.", options: ["Splinting", "Steroid injection", "Carpal tunnel release surgery"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  },
  {
    id: "neurosurgery",
    title: "Neurosurgery & Spine Surgery",
    icon: "Brain",
    image: "/services/neurosurgery.jpg",
    shortDesc: "Advanced neurological care for slip disc, sciatica and spine decompression.",
    treatments: [
      { id: "slip-disc", name: "Slip Disc Surgery", image: slipDiscImg, desc: "Procedure to treat a herniated disc in the spine.", symptoms: ["Severe back pain", "Leg pain/numbness", "Weakness in legs", "Loss of bladder control"], options: ["Microdiscectomy", "Endoscopic discectomy", "Spinal fusion"], insurance: { accepted: true, ayushman: true, cashless: true } },

      { id: "spine-decompression", name: "Spine Decompression Surgery", image: cervicalSpineImg, desc: "Procedure to relieve pressure on the spinal cord or nerves.", options: ["Laminectomy", "Foraminotomy", "Discectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      // { id: "cervical-spine", name: "Cervical Spine Surgery", image: cervicalSpineImg, desc: "Surgery performed on the neck portion of the spine.", options: ["ACDF", "Cervical laminoplasty"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "lumbar-spine", name: "Lumbar Spine Surgery", image: LumberSpine, desc: "Surgery performed on the lower back portion of the spine.", options: ["Lumbar fusion", "TLIF/PLIF", "Microdiscectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "sciatica", name: "Sciatica Surgery", image: "/services/sciatica.jpg", desc: "Procedure to relieve nerve pain caused by compression or irritation of the sciatic nerve.", options: ["Microdiscectomy", "Laminectomy"], insurance: { accepted: true, ayushman: true, cashless: true } },
      { id: "minimally-invasive-spine", name: "Minimally Invasive Spine Surgery", image: "/services/mis-spine.jpg", desc: "Modern techniques to treat spine conditions with smaller incisions.", options: ["MIS-TLIF", "Percutaneous pedicle screw fixation", "Endoscopic spine surgery"], insurance: { accepted: true, ayushman: true, cashless: true } }
    ]
  }
];
