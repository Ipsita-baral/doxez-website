import './globals.css';
import Script from 'next/script';
import ClientLayout from './ClientLayout';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'Doxez Healthcare - Smart Surgical Care & Speciality Healthcare',
  description: 'Doxez Healthcare offers end-to-end assistance for elective surgeries, specialist consultations, and seamless hospital admissions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Ads Base Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18320136087"
        />
        <Script
          id="google-ads-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18320136087');

              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined' && url) {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-18320136087/xTtcCO6I6eIcEJev3J9E',
                    'event_callback': callback
                });
                return false;
              }
              window.gtag_report_conversion = gtag_report_conversion;
            `,
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <GoogleAnalytics gaId="G-4LK5G3W8PS" />
      </body>
    </html>
  );
}

