// src/components/AddChild.js
import React, { useState } from 'react';
import { addChild } from '../api/api';

function AddChild({ token }) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [lastAdministeredVaccine, setLastAdministeredVaccine] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const childData = {
      name,
      date_of_birth: dateOfBirth, // Ensure the key matches what your backend expects
      weight: parseFloat(weight),
      last_administered_vaccine: lastAdministeredVaccine,
    };
    try {
      const response = await addChild(childData, token);
      console.log("Child added", response.data);
      alert("Child added successfully!");
      // Optionally clear the form
      setName("");
      setDateOfBirth("");
      setWeight("");
      setLastAdministeredVaccine("");
    } catch (error) {
      console.error("Error adding child", error);
      alert("Error adding child. Please try again.");
    }
  };
  
  return (
    <div>
      <h2>Add Child</h2>
      <form onSubmit={handleSubmit}>
         <input 
            type="text" 
            placeholder="Child's Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
         />
         <br />
         <input 
            type="date" 
            placeholder="Date of Birth" 
            value={dateOfBirth} 
            onChange={e => setDateOfBirth(e.target.value)} 
         />
         <br />
         <input 
            type="number" 
            step="0.1"
            placeholder="Weight" 
            value={weight} 
            onChange={e => setWeight(e.target.value)} 
         />
         <br />
         <input 
            type="text" 
            placeholder="Last Administered Vaccine" 
            value={lastAdministeredVaccine} 
            onChange={e => setLastAdministeredVaccine(e.target.value)} 
         />
         <br />
         <button type="submit">Add Child</button>
      </form>
    </div>
  );
}

export default AddChild;
