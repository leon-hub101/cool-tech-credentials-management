import axios from "axios";

// Set base URL for API requests
const API = axios.create({
  baseURL: "http://localhost:5000", // Update to your backend URL
});

// Add token to requests if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User Services
export const registerUser = (userData) =>
  API.post("/api/users/register", userData);
export const loginUser = (userData) => API.post("/api/users/login", userData);

// Credential Management Services
export const getCredentials = (divisionId) =>
  API.get(`/division/${divisionId}/credentials`);
export const addCredential = (divisionId, credentialData) =>
  API.post(`/division/${divisionId}/credentials`, credentialData);
export const updateCredential = (credentialId, credentialData) =>
  API.put(`/credentials/${credentialId}`, credentialData);

// User Management Services
export const assignUserToDivision = (userData) =>
  API.post("/assign-user", userData);
export const unassignUserFromDivision = (userId) =>
  API.delete("/unassign-user", { data: { userId } });
export const changeUserRole = (userId, role) =>
  API.put(`/user/${userId}/role`, { role });
