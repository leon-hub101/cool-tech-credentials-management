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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin Control Panel</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - Role: {user.role}
            <button onClick={() => assignUser(user._id, "divisionId", "ouId")}>
              Assign to Division/OU
            </button>
            <button onClick={() => unassignUser(user._id)}>
              Unassign from Division/OU
            </button>
            <button onClick={() => changeUserRole(user._id, "management")}>
              Change Role to Management
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminControlPanel;
