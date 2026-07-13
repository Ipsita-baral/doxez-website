import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Global Axios Interceptor for CRM API Calls (adds referral code to request body)
axios.interceptors.request.use((config) => {
  if (config.url && config.url.includes('crm.doxez.in') && config.method === 'post') {
    const referralCode = localStorage.getItem('dxz_ref_code');
    if (referralCode) {
      config.data = {
        ...config.data,
        referralCode: referralCode
      };
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
