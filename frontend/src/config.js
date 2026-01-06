// config.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  // Authentication
  STUDENT_LOGIN: `${API_BASE}/api/auth/student/login`,
  ADMIN_LOGIN: `${API_BASE}/api/auth/admin/login`,
  STUDENT_REGISTER: `${API_BASE}/api/auth/student/register`,
  ADMIN_REGISTER: `${API_BASE}/api/auth/admin/register`,
  GOOGLE_AUTH: `${API_BASE}/api/auth/google`,
  
  // Data
  EVENTS: `${API_BASE}/api/events`,
  ANNOUNCEMENTS: `${API_BASE}/api/announcements`,
  TEAM: `${API_BASE}/api/team`,
  GALLERY: `${API_BASE}/api/gallery`,
  CONTACT: `${API_BASE}/api/contact`,
  LOST_FOUND: `${API_BASE}/api/lost-found`,
};

export default API_ENDPOINTS;