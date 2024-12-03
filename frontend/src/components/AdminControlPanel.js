import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminControlPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const assignUser = async (userId, divisionId, ouId) => {
    try {
      await axios.post(
        "/assign-user",
        { userId, divisionId, ouId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("User assigned successfully");
    } catch (error) {
      console.error("Error assigning user", error);
    }
  };

  const unassignUser = async (userId) => {
    try {
      await axios.delete("/unassign-user", {
        data: { userId },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("User unassigned successfully");
    } catch (error) {
      console.error("Error unassigning user", error);
    }
  };

  const changeUserRole = async (userId, role) => {
    try {
      await axios.put(
        `/user/${userId}/role`,
        { role },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("User role updated successfully");
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

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
      <h2>Admin Control Panel</h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          width: "600px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {users.map((user) => (
          <li
            key={user._id}
            style={{
              padding: "20px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => assignUser(user._id, "divisionId", "ouId")}
                style={{
                  padding: "10px 15px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Assign to Division/OU
              </button>
              <button
                onClick={() => unassignUser(user._id)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Unassign
              </button>
              <button
                onClick={() => changeUserRole(user._id, "management")}
                style={{
                  padding: "10px 15px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Change Role to Management
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminControlPanel;
