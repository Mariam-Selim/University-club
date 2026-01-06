import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "../src/PAGES/Home";
import About_us from "../src/PAGES/About_us";
import Contact_us from "./PAGES/Contact_us";
import Admindashboard from "./PAGES/Admindashboard";
import Join from "./PAGES/Join";
import Login from "./PAGES/Login";
import Signin from "./PAGES/Signin";
import GoogleSuccess from "./PAGES/GoogleSuccess";
import React from "react";
import AdminRoute from "./PAGES/AdminRoute";
function App() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} setIsAdmin={setIsAdmin} />} />
        <Route path="/signin" element={<Signin setUser={setUser} setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={<Home user={user} isAdmin={isAdmin} />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Admindashboard />
            </AdminRoute>
          }
        />
        <Route path="/about" element={<About_us />} />
        <Route path="/contact" element={<Contact_us />} />
        <Route path="/Join" element={<Join />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/auth/callback" element={<GoogleSuccess />} />
      </Routes>
    </>
  );
}
export default App;