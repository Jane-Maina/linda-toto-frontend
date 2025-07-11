import React, { useState } from "react"
import { signupParent } from "../api/api";

function SignUpParent() {
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
    first_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data payload.
    // Here, we map "name" to "first_name" so that it matches what your backend expects.
    const data = {
      email: formData.email,
      phone_number: formData.phone, // backend expects phone_number
      password: formData.password,
      first_name: formData.name,    // backend expects first_name (or name)
    };

    try {
      const response = await signupParent(data);
      console.log("Parent Signup Response:", response.data);
      alert("Parent signup successful!");
      // Optionally, redirect the user to login or clear the form here.
    } catch (error) {
      console.error("Parent Signup Failed:", error.response ? error.response.data : error);
      alert("Parent signup failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up as a Parent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first name"
          placeholder="first_name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone number"
          placeholder="Phone Number"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpParent;
