import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // State to handle form input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    division: "",
  });

  // State to handle divisions fetched from backend
  const [divisions, setDivisions] = useState([]);

  // State to handle loading state for the form submission
  const [loading, setLoading] = useState(false);

  const { username, password, division } = formData;

  useEffect(() => {
    // Fetch available divisions from backend
    const fetchDivisions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/divisions");
        if (res.data) {
          setDivisions(res.data);
        }
      } catch (err) {
        console.error("Error fetching divisions:", err);
        toast.error("Could not fetch divisions, please try again later.");
      }
    };

    fetchDivisions();
  }, []);

  // Unified onChange function for inputs and select
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation for password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!division) {
      toast.error("Please select a division");
      return;
    }
    setLoading(true); // Set loading state to true when starting request
    try {
      // Send registration request to backend
      const res = await axios.post("http://localhost:5000/api/users/register", {
        username,
        password,
        divisions: [division], // Include the selected division
      });

      // If response is successful, handle accordingly
      if (res && res.data) {
        toast.success("Registration successful");
        console.log(res.data.token);
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (err) {
      console.error("Error:", err);
      // Use optional chaining to safely access error messages
      toast.error(err.response?.data?.msg || "Registration failed");
    } finally {
      // Reset loading state regardless of success or failure
      setLoading(false);
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
        onSubmit={onSubmit}
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
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
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
          name="password"
          value={password}
          onChange={onChange}
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <select
          name="division"
          value={division}
          onChange={onChange}
          required
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Division</option>
          {divisions.map((div) => (
            <option key={div._id} value={div._id}>
              {div.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: loading ? "#999" : "#007bff",
            color: "#fff",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
