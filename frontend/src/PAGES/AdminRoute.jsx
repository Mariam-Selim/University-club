import { Navigate } from "react-router-dom";
import React from "react";
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin" || user.status !== "approved") {
    return <Navigate to="/Home" />; 
  }

  return children;
};

export default AdminRoute;
