// src/components/AddVaccineRecord.js
import React, { useState } from 'react';
import { addVaccineRecord } from '../api/api';

function AddVaccineRecord({ token }) {
  const [childUniqueId, setChildUniqueId] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const vaccineData = { vaccine_name: vaccineName };
    try {
      const response = await addVaccineRecord(childUniqueId, vaccineData, token);
      console.log("Vaccine record added", response.data);
      alert("Vaccine record added successfully!");
      setChildUniqueId("");
      setVaccineName("");
    } catch (error) {
      console.error("Error adding vaccine record", error);
      alert("Error adding vaccine record. Please try again.");
    }
  };
  
  return (
    <div>
      <h2>Add Vaccine Record</h2>
      <form onSubmit={handleSubmit}>
         <input 
            type="text" 
            placeholder="Child Unique ID" 
            value={childUniqueId} 
            onChange={e => setChildUniqueId(e.target.value)} 
         />
         <br />
         <input 
            type="text" 
            placeholder="Vaccine Name" 
            value={vaccineName} 
            onChange={e => setVaccineName(e.target.value)} 
         />
         <br />
         <button type="submit">Add Vaccine Record</button>
      </form>
    </div>
  );
}

export default AddVaccineRecord;
