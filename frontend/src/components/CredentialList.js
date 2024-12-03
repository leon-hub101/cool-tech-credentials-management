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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Credential List</h2>
      <ul>
        {credentials.map((credential) => (
          <li key={credential._id}>
            Username: {credential.username}, Password: {credential.password},
            Description: {credential.description}
          </li>
        ))}
      </ul>
      {userRole === "management" && <button>Add Credential</button>}
      {userRole === "management" && <button>Update Credential</button>}
    </div>
  );
};

export default CredentialList;
