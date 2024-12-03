// **frontend/src/components/AddCredentialForm.js**: Add Credential Form
import React, { useState } from "react";
import axios from "axios";

const AddCredentialForm = ({ divisionId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/division/${divisionId}/credentials`,
        { username, password, description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Credential added successfully");
    } catch (error) {
      console.error("Error adding credential", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Credential</button>
    </form>
  );
};

export default AddCredentialForm;
