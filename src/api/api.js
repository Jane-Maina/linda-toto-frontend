// src/api/api.js
import axios from 'axios';

const API_BASE_URL = "http://localhost:8000";


export const signupParent = (parentData) => {
  return axios.post(`${API_BASE_URL}/api/parent/signup/`, parentData);
};

export const signupHospital = (hospitalData) => {
  return axios.post(`${API_BASE_URL}/api/hospital/signup/`, hospitalData);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_BASE_URL}/api/login/`, credentials);
};

export const addChild = (childData, token) => {
  return axios.post(`${API_BASE_URL}/api/child/add/`, childData, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    }
  });
};

export const addVaccineRecord = (childUniqueId, vaccineData, token) => {
  return axios.post(`${API_BASE_URL}/api/vaccine/${childUniqueId}/`, vaccineData, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    }
  });
};
