export const GA_TRACKING_ID = 'G-4LK5G3W8PS';
export const GOOGLE_ADS_ID = 'AW-18320136087';
export const GOOGLE_ADS_CONVERSION_ID = 'AW-18320136087/xTtcCO6I6eIcEJev3J9E';

// Conversion reporter for Google Ads (Book appointment / Consultation)
export const gtag_report_conversion = (url) => {
  if (typeof window !== 'undefined') {
    const callback = () => {
      if (typeof url !== 'undefined' && url) {
        window.location = url;
      }
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION_ID,
        event_callback: callback,
      });
    } else if (window.dataLayer) {
      window.dataLayer.push({
        event: 'conversion',
        send_to: GOOGLE_ADS_CONVERSION_ID,
      });
      callback();
    }
    return false;
  }
};

// Log custom GA4 events safely
export const trackEvent = ({ action, category, label, value, ...rest }) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    const payload = {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, payload);
    } else {
      window.dataLayer.push({ event: action, ...payload });
    }
  }
};

// Track Form Lead Submissions (uses GA4 standard generate_lead + form_submit & Google Ads conversion)
export const trackLeadSubmission = (formName, details = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    const payload = {
      event_category: 'Lead',
      event_label: formName,
      form_name: formName,
      ...details,
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', payload);
      window.gtag('event', 'form_submit', payload);
      // Automatically report conversion to Google Ads
      window.gtag('event', 'conversion', {
        send_to: GOOGLE_ADS_CONVERSION_ID,
      });
    } else {
      window.dataLayer.push({ event: 'generate_lead', ...payload });
      window.dataLayer.push({ event: 'form_submit', ...payload });
      window.dataLayer.push({
        event: 'conversion',
        send_to: GOOGLE_ADS_CONVERSION_ID,
      });
    }
  }
};

// Track Button Clicks
export const trackButtonClick = (buttonName, details = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    const payload = {
      event_category: 'Engagement',
      event_label: buttonName,
      button_name: buttonName,
      page_path: window.location.pathname,
      ...details,
    };
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'button_click', payload);
    } else {
      window.dataLayer.push({ event: 'button_click', ...payload });
    }
  }
};

// Set Custom User Properties (for "Active users by User property" card)
export const setUserProperties = (properties = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === 'function') {
      window.gtag('set', 'user_properties', properties);
    } else {
      window.dataLayer.push({ user_properties: properties });
    }
  }
};
