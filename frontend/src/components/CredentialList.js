import React, { useEffect, useState } from "react";
import axios from "axios";

const CredentialList = ({ divisionId, userRole }) => {
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(
          `/division/${divisionId}/credentials`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCredentials(response.data.credentials);
      } catch (error) {
        console.error("Error fetching credentials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCredentials();
  }, [divisionId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f7f7f7",
      }}
    >
      <h2>Credential List</h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          width: "400px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {credentials.map((credential) => (
          <li
            key={credential._id}
            style={{
              padding: "15px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <strong>Username:</strong> {credential.username}
            <strong>Password:</strong> {credential.password}
            <strong>Description:</strong> {credential.description}
          </li>
        ))}
        {credentials.length === 0 && (
          <li style={{ padding: "15px", textAlign: "center" }}>
            No credentials found.
          </li>
        )}
      </ul>

      <div style={{ marginTop: "20px" }}>
        {userRole === "management" && (
          <>
            <button
              style={{
                padding: "10px 20px",
                margin: "10px",
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
            <button
              style={{
                padding: "10px 20px",
                margin: "10px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Update Credential
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CredentialList;
