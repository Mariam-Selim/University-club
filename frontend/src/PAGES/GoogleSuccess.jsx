import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
      
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      })
      .catch(err => console.error("Error fetching user:", err))
      .finally(() => {
        navigate("/");
        window.location.reload();
      });
      
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging in...</p>;
}
