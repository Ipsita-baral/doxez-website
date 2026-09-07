/**
 * Converts any string into a URL-friendly slug.
 * e.g., "General & Laparoscopic Surgery" -> "general-surgery"
 *       "Piles (Hemorrhoids)" -> "piles"
 */
export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const STANDARD_SERVICES = [
  { id: "proctology", title: "Proctology", aliases: ["proctology", "colorectal"] },
  { id: "urology", title: "Urology", aliases: ["urology", "andrology"] },
  { id: "general-surgery", title: "General Surgery", aliases: ["general surgery", "general & laparoscopic", "laparoscopic surgery"] },
  { id: "gynecology", title: "Gynecology", aliases: ["gynecology", "obstetrics"] },
  { id: "ent", title: "ENT", aliases: ["ent", "ear", "nose", "throat"] },
  { id: "plastic-surgery", title: "Plastic Surgery", aliases: ["plastic", "cosmetic"] },
  { id: "neurosurgery", title: "Neurosurgery", aliases: ["neuro", "neurosurgery"] },
  { id: "orthopedics", title: "Orthopedics", aliases: ["orthopedic", "orthopedics", "joint surgery", "joint replacement"] }
];

export const STANDARD_TREATMENTS = [
  // Proctology
  { id: "piles", name: "Piles", aliases: ["piles", "hemorrhoids", "bawasir"] },
  { id: "fistula", name: "Anal Fistula", aliases: ["fistula", "anal fistula"] },
  { id: "fissure", name: "Anal Fissure", aliases: ["fissure", "anal fissure"] },
  { id: "pilonidal-sinus", name: "Pilonidal Sinus", aliases: ["pilonidal", "pilonidal sinus"] },

  // Urology
  { id: "kidney-stones", name: "Kidney Stones", aliases: ["kidney stone", "kidney stones", "pathri"] },
  { id: "enlarged-prostate", name: "Enlarged Prostate (BPH)", aliases: ["enlarged prostate", "prostate", "bph", "turp"] },
  { id: "circumcision", name: "Circumcision", aliases: ["circumcision", "laser circumcision", "zsr circumcision"] },
  { id: "hydrocele", name: "Hydrocele", aliases: ["hydrocele", "hydrocelectomy"] },
  { id: "varicocele", name: "Varicocele", aliases: ["varicocele", "varicocelectomy"] },

  // General Surgery
  { id: "gallstone", name: "Gallstone", aliases: ["gallstone", "gallstones", "gall bladder", "cholecystectomy"] },
  { id: "inguinal-hernia", name: "Inguinal Hernia", aliases: ["inguinal hernia"] },
  { id: "umbilical-hernia", name: "Umbilical Hernia", aliases: ["umbilical hernia"] },
  { id: "hernia", name: "Hernia", aliases: ["hernia"] },
  { id: "lipoma", name: "Lipoma", aliases: ["lipoma", "fatty lump"] },
  { id: "sebaceous-cyst", name: "Sebaceous Cyst", aliases: ["sebaceous cyst", "cyst"] },
  { id: "appendectomy", name: "Appendectomy", aliases: ["appendectomy", "appendix"] },
  { id: "thyroidectomy", name: "Thyroidectomy", aliases: ["thyroidectomy", "thyroid"] },

  // Gynecology
  { id: "ivf", name: "IVF", aliases: ["ivf", "fertility", "test tube baby"] },
  { id: "endometriosis", name: "Endometriosis", aliases: ["endometriosis"] },
  { id: "ectopic-pregnancy", name: "Ectopic Pregnancy", aliases: ["ectopic pregnancy", "ectopic"] },
  { id: "uterine-fibroid", name: "Uterine Fibroid", aliases: ["uterine fibroid", "fibroid", "fibroids"] },
  { id: "iui", name: "IUI", aliases: ["iui"] },
  { id: "hysterectomy", name: "Hysterectomy", aliases: ["hysterectomy", "uterus removal"] },

  // ENT
  { id: "fess", name: "FESS (Sinus Surgery)", aliases: ["fess", "sinus surgery"] },
  { id: "septoplasty", name: "Septoplasty", aliases: ["septoplasty", "deviated septum", "dns"] },
  { id: "rhinoplasty", name: "Rhinoplasty", aliases: ["rhinoplasty", "nose surgery", "nose job"] },
  { id: "tonsillectomy", name: "Tonsillectomy", aliases: ["tonsillectomy", "tonsils"] },
  { id: "tympanoplasty", name: "Tympanoplasty", aliases: ["tympanoplasty", "eardrum", "ear hole"] },
  { id: "adenoidectomy", name: "Adenoidectomy", aliases: ["adenoidectomy", "adenoids"] },
  { id: "mastoidectomy", name: "Mastoidectomy", aliases: ["mastoidectomy", "mastoid"] },

  // Plastic / Cosmetic
  { id: "gynecomastia", name: "Gynecomastia", aliases: ["gynecomastia", "male breast"] },
  { id: "liposuction", name: "Liposuction", aliases: ["liposuction", "fat removal"] },
  { id: "cosmetic-breast-surgery", name: "Cosmetic Breast Surgery", aliases: ["cosmetic breast surgery", "breast augmentation", "breast lift", "breast reduction"] },

  // Orthopedics
  { id: "knee-replacement", name: "Knee Replacement", aliases: ["knee replacement", "total knee replacement", "tkr"] },
  { id: "hip-replacement", name: "Hip Replacement", aliases: ["hip replacement", "total hip replacement"] },
  { id: "acl-tear", name: "ACL Tear", aliases: ["acl tear", "acl surgery", "acl reconstruction"] },
  { id: "meniscus-tear", name: "Meniscus Tear", aliases: ["meniscus tear", "meniscus surgery"] },
  { id: "carpal-tunnel", name: "Carpal Tunnel Syndrome", aliases: ["carpal tunnel", "carpal tunnel syndrome"] },
  { id: "shoulder-arthroscopy", name: "Shoulder Arthroscopy", aliases: ["shoulder arthroscopy", "shoulder dislocation", "shoulder replacement", "shoulder"] },

  // Neurosurgery / Spine
  { id: "slip-disc-surgery", name: "Slip Disc Surgery", aliases: ["slip disc", "slip disc surgery", "discectomy", "herniated disc"] },
  { id: "cervical-spine-surgery", name: "Cervical Spine Surgery", aliases: ["cervical spine"] },
  { id: "lumbar-spine-surgery", name: "Lumbar Spine Surgery", aliases: ["lumbar spine"] },
  { id: "minimally-invasive-spine", name: "Minimally Invasive Spine Surgery", aliases: ["minimally invasive spine", "mis spine", "endoscopic spine"] },
  { id: "spine-decompression-surgery", name: "Spine Decompression Surgery", aliases: ["spine decompression"] },
  { id: "spine-surgery", name: "Spine Surgery", aliases: ["spine surgery"] }
];

function matchAlias(text, alias) {
  if (!text || !alias) return false;
  if (alias.length <= 4) {
    const escaped = alias.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(text);
  }
  return text.toLowerCase().includes(alias.toLowerCase());
}

/**
 * Returns a human-readable slug for a service category.
 */
export function getServiceSlug(service) {
  if (!service) return "";
  if (typeof service === "string") {
    if (!/^[0-9a-fA-F]{24}$/.test(service)) {
      return slugify(service);
    }
    const matched = STANDARD_SERVICES.find(s => s.id === service);
    if (matched) return matched.id;
    return service;
  }

  if (service.slug) return slugify(service.slug);

  const name = (service.serviceName || service.title || service.name || service.id || "").toLowerCase();

  for (const std of STANDARD_SERVICES) {
    if (std.aliases.some(alias => matchAlias(name, alias))) {
      return std.id;
    }
  }

  return slugify(service.serviceName || service.title || service.name || service.id || "");
}

/**
 * Returns a human-readable slug for a sub-service / treatment.
 */
export function getTreatmentSlug(subService) {
  if (!subService) return "";
  if (typeof subService === "string") {
    if (!/^[0-9a-fA-F]{24}$/.test(subService)) {
      return slugify(subService);
    }
    const matched = STANDARD_TREATMENTS.find(t => t.id === subService);
    if (matched) return matched.id;
    return subService;
  }

  if (subService.slug) return slugify(subService.slug);

  const name = (subService.name || subService.title || "").toLowerCase();

  for (const std of STANDARD_TREATMENTS) {
    if (std.aliases.some(alias => matchAlias(name, alias))) {
      return std.id;
    }
  }

  return slugify(subService.name || subService.title || subService.id || "");
}

/**
 * Checks if a service object matches a given category param (which could be a slug, name, or Mongo _id).
 */
export function isServiceMatch(service, param) {
  if (!service || !param) return false;
  const p = param.toString().toLowerCase().trim();
  const serviceId = (service._id || service.id || "").toString().toLowerCase();
  if (serviceId && serviceId === p) return true;

  const canonicalSlug = getServiceSlug(service).toLowerCase();
  if (canonicalSlug === p) return true;

  const rawSlug = slugify(service.serviceName || service.title || service.name || "").toLowerCase();
  if (rawSlug === p) return true;

  const name = (service.serviceName || service.title || service.name || "").toLowerCase();
  if (name && (name === p || name.includes(p) || p.includes(rawSlug))) return true;

  // Check aliases from STANDARD_SERVICES
  for (const std of STANDARD_SERVICES) {
    if (std.id === p || std.aliases.includes(p)) {
      if (std.aliases.some(alias => matchAlias(name, alias))) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Checks if a subService/treatment matches a given treatment param (which could be a slug, name, or Mongo _id).
 */
export function isTreatmentMatch(subService, param) {
  if (!subService || !param) return false;
  const p = param.toString().toLowerCase().trim();
  const subId = (subService._id || subService.id || "").toString().toLowerCase();
  if (subId && subId === p) return true;

  const canonicalSlug = getTreatmentSlug(subService).toLowerCase();
  if (canonicalSlug === p) return true;

  const rawSlug = slugify(subService.name || subService.title || "").toLowerCase();
  if (rawSlug === p) return true;

  const name = (subService.name || subService.title || "").toLowerCase();
  if (name && (name === p || rawSlug.includes(p) || p.includes(rawSlug))) return true;

  // Check aliases from STANDARD_TREATMENTS
  for (const std of STANDARD_TREATMENTS) {
    if (std.id === p || std.aliases.includes(p)) {
      if (std.aliases.some(alias => matchAlias(name, alias))) {
        return true;
      }
    }
  }

  // Normalized (alphanumeric only)
  const normP = p.replace(/[^a-z0-9]/g, "");
  const normName = name.replace(/[^a-z0-9]/g, "");
  if (normP && normName && (normP === normName || normName.includes(normP) || normP.includes(normName))) return true;

  return false;
}
