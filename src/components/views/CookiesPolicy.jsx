'use client';

import React from 'react';
import LegalDocumentLayout from "@/components/common/LegalDocumentLayout";
import { Mail, Phone, Globe } from "lucide-react";

export default function CookiesPolicy() {
  return (
    <LegalDocumentLayout
      activeDoc="cookies"
      title="Cookies Policy"
      lastUpdated="Last updated: August 22, 2026"
    >
      <p>
        This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.
      </p>
      <p>
        Cookies do not typically contain any information that personally identifies a user, but personal information that We store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy, if and when We make it available within the Website or on our website.
      </p>
      <div className="legal-note-box">
        <strong>Privacy Assurance:</strong> We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.
      </div>

      <h2>Interpretation and Definitions</h2>
      <h3>Interpretation</h3>
      <p>
        The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
      </p>

      <h3>Definitions</h3>
      <p>For the purposes of this Cookies Policy:</p>
      <ul>
        <li>
          <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to <strong>Headena healthcare pvt ltd</strong>, Bhubaneswar.
        </li>
        <li>
          <strong>Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.
        </li>
        <li>
          <strong>Website</strong> refers to <strong>doxez</strong>, accessible from <a href="https://doxez.in" rel="external nofollow noopener" target="_blank">doxez.in</a>.
        </li>
        <li>
          <strong>You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.
        </li>
      </ul>

      <h2>The use of the Cookies</h2>
      <h3>Type of Cookies We Use</h3>
      <p>
        Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
      </p>
      <p>
        Where required by law, We will request your consent before using Cookies that are not strictly necessary. Strictly necessary Cookies are used to provide the Website and cannot be switched off in our systems.
      </p>
      <p>We use both session and persistent Cookies for the purposes set out below:</p>
      <ul>
        <li>
          <strong>Necessary / Essential Cookies</strong>
          <p style={{ margin: "4px 0 2px", color: "#64748b", fontSize: 13 }}>Type: Session Cookies | Administered by: Us</p>
          <p style={{ margin: "2px 0 10px" }}>
            Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
          </p>
        </li>
        <li>
          <strong>Functionality Cookies</strong>
          <p style={{ margin: "4px 0 2px", color: "#64748b", fontSize: 13 }}>Type: Persistent Cookies | Administered by: Us</p>
          <p style={{ margin: "2px 0 10px" }}>
            Purpose: These Cookies allow Us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
          </p>
        </li>
      </ul>

      <h2>Your Choices Regarding Cookies</h2>
      <p>
        If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with the Website. You may use this option for preventing the use of Cookies at any time.
      </p>
      <p>
        If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.
      </p>
      <p>
        If You&apos;d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser:
      </p>
      <ul>
        <li>
          <strong>Google Chrome:</strong> <a href="https://support.google.com/accounts/answer/32050" rel="external nofollow noopener" target="_blank">https://support.google.com/accounts/answer/32050</a>
        </li>
        <li>
          <strong>Microsoft Edge:</strong> <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" rel="external nofollow noopener" target="_blank">https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09</a>
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" rel="external nofollow noopener" target="_blank">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a>
        </li>
        <li>
          <strong>Apple Safari:</strong> <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" rel="external nofollow noopener" target="_blank">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a>
        </li>
      </ul>
      <p>For any other web browser, please visit your web browser&apos;s official web pages.</p>

      <h2>Changes to this Cookies Policy</h2>
      <p>
        We may update this Cookies Policy from time to time. The &quot;Last updated&quot; date at the top indicates when it was last revised.
      </p>

      <div className="legal-contact-card">
        <h3 style={{ margin: "0 0 12px", color: "#0f172a", fontSize: 18, fontWeight: 700 }}>Contact Us</h3>
        <p style={{ margin: "0 0 12px", fontSize: 14 }}>If you have any questions about this Cookies Policy, You can contact us:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Mail size={16} color="#64748b" />
            <a href="mailto:support@doxez.in">support@doxez.in</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Phone size={16} color="#64748b" />
            <a href="tel:+919692949500">+91 96929 49500</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Globe size={16} color="#64748b" />
            <a href="https://doxez.in" target="_blank" rel="noopener noreferrer">doxez.in</a>
          </div>
        </div>
      </div>
    </LegalDocumentLayout>
  );
}
