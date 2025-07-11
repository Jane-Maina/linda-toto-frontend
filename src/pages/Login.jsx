import React, { useState } from "react";
import { loginUser } from "../api/api"; // Adjust the path if necessary

function Login({ setUser, setToken }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API with the form data
      const response = await loginUser(formData);
      const { token, user_type } = response.data;

      // Save token and user info using props (or update your global state)
      setToken(token);
      setUser({ email: formData.email, userType: user_type });

      // Optionally, save these values in localStorage for persistence
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email, userType: user_type }));

      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
