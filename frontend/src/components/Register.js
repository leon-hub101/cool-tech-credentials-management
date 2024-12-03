import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // State to handle form input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to handle loading state for the form submission
  const [loading, setLoading] = useState(false);

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting request
    try {
      // Send registration request to backend
      const res = await axios.post("http://localhost:5000/api/users/register", {
        username,
        password,
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
