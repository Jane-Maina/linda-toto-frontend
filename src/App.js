import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignupParent from "./pages/SignupParent.jsx";
import SignupHospital from "./pages/SignupHospital.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  // For demonstration, immunizations state is preserved.
  const [immunizations, setImmunizations] = useState([]);
  // State for authenticated user and token.
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Retrieve user details from localStorage on app load if available.
  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  return (
    <Router>
      {/* Pass user info to Navbar if needed */}
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home immunizations={immunizations} />} />
        <Route path="/signup-parent" element={<SignupParent />} />
        <Route path="/signup-hospital" element={<SignupHospital />} />
        {/* Pass setUser and setToken to Login so it can update auth state */}
        <Route path="/login" element={<Login setUser={setUser} setToken={setToken} />} />
        {/* Pass user and token to Dashboard for protected views */}
        <Route path="/dashboard" element={<Dashboard user={user} token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
