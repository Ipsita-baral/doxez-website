import './globals.css';
import ClientLayout from './ClientLayout';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'Doxez Healthcare - Smart Surgical Care & Speciality Healthcare',
  description: 'Doxez Healthcare offers end-to-end assistance for elective surgeries, specialist consultations, and seamless hospital admissions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <GoogleAnalytics gaId="G-4LK5G3W8PS" />
      </body>
    </html>
  );
}
