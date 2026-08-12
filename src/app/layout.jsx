import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Doxez Healthcare - Smart Surgical Care & Speciality Healthcare',
  description: 'Doxez Healthcare offers end-to-end assistance for elective surgeries, specialist consultations, and seamless hospital admissions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
