import { redirect } from 'next/navigation';

export const metadata = {
  title: "Book Doctor Appointment Online | Consult Specialist Doctors - DOXEZ Healthcare",
  description: "Book free online doctor consultation & surgical appointment with verified specialist surgeons at DOXEZ. Transparent care, cashless hospitalization, and end-to-end medical assistance.",
  keywords: [
    "DOXEZ Appointment Booking",
    "Book Doctor Appointment",
    "Online Doctor Consultation",
    "Book Specialist Surgeon",
    "Free Medical Consultation",
    "Surgical Care Consultation",
    "DOXEZ Healthcare Network",
    "Consult Surgeon Online"
  ],
  alternates: {
    canonical: "https://doxez.in/book-appointment"
  },
  openGraph: {
    title: "Book Doctor Appointment Online | Free Consultation - DOXEZ Healthcare",
    description: "Book an appointment online with verified specialist surgeons and doctors at DOXEZ. Free consultation, hassle-free hospitalization, and cashless insurance support.",
    url: "https://doxez.in/book-appointment",
    siteName: "DOXEZ Healthcare",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Doctor Appointment Online | Free Consultation - DOXEZ Healthcare",
    description: "Book an appointment online with verified specialist surgeons and doctors at DOXEZ."
  }
};

export default function BookAppointmentPage() {
  redirect('/?appointment=true#hero-form');
}
