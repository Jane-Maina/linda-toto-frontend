import React, { useState } from "react";
import { signupHospital } from "../api/api"; // Adjust the path if necessary

function SignUpHospital() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    location: "",
    password: "",
    documents: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "documents") {
      setFormData({ ...formData, documents: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object for the file upload
    const data = new FormData();
    // The keys below must match what your Django serializer expects.
    data.append("hospital_name", formData.hospitalName);
    data.append("email", formData.email);
    data.append("location", formData.location);
    data.append("password", formData.password);
    data.append("documents", formData.documents);

    try {
      const response = await signupHospital(data);
      console.log("Hospital Signup Response:", response.data);
      alert("Hospital signup successful!");
      // Optionally, redirect or clear the form here
    } catch (error) {
      console.error("Hospital Signup Failed:", error);
      alert("Hospital signup failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up as a Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
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
          type="text"
          name="location"
          placeholder="Location"
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
        <input
          type="file"
          name="documents"
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpHospital;
