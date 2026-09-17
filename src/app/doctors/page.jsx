import DoctorsPage from "@/components/views/DoctorsPage";

export const metadata = {
  title: "Our Specialist Doctors & Surgeons | DOXEZ Healthcare Network",
  description: "Explore the verified medical specialists, surgeons, and healthcare practitioners across the DOXEZ network. Comprehensive qualifications, clinical experience, and surgical specialties.",
  keywords: [
    "DOXEZ Doctors",
    "Specialist Doctors India",
    "Best Surgeons",
    "Orthopedic Surgeons",
    "Urology Specialists",
    "Laparoscopic Surgeons",
    "Cardiologists",
    "Verified Doctors Network"
  ],
  alternates: {
    canonical: "https://doxez.in/doctors"
  },
  openGraph: {
    title: "Our Specialist Doctors & Surgeons | DOXEZ Healthcare Network",
    description: "Meet verified specialist doctors and surgeons across the DOXEZ healthcare ecosystem.",
    url: "https://doxez.in/doctors",
    siteName: "DOXEZ Healthcare",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Specialist Doctors & Surgeons | DOXEZ Healthcare Network",
    description: "Meet verified specialist doctors and surgeons across the DOXEZ healthcare ecosystem."
  }
};

export default function Page() {
  return <DoctorsPage />;
}
