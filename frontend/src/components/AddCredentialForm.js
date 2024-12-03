import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCredentialForm = ({ divisionId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [descriptions, setDescriptions] = useState([]); // Store available descriptions

  // Fetch descriptions from backend when component mounts
  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/credentials/descriptions" // Ensure this matches the backend route to fetch descriptions
        );
        if (response.data) {
          setDescriptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching descriptions", error);
      }
    };

    fetchDescriptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!divisionId) {
      alert("Please provide a valid divisionId");
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/division/${divisionId}/credentials`,
        { username, password, description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Credential added successfully");
    } catch (error) {
      console.error("Error adding credential", error);
      alert("Error adding credential. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f7f7",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Credential</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Dropdown to select description */}
        <select
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Description</option>
          {descriptions.map((desc) => (
            <option key={desc._id} value={desc.name}>
              {desc.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Credential
        </button>
      </form>
    </div>
  );
};

export default AddCredentialForm;
