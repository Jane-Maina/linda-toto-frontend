import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f5f5f5" }}>
      <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup-parent">Sign Up as Parent</Link>
        </li>
        <li>
          <Link to="/signup-hospital">Sign Up as Hospital</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
