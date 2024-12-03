import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Credential Management System</h1>
      <p>Select an option to proceed:</p>

      <div style={{ margin: "20px" }}>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>

      <div style={{ margin: "20px" }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>

      <div style={{ margin: "20px" }}>
        <Link to="/credentials">
          <button>View Credentials</button>
        </Link>
      </div>

      <div style={{ margin: "20px" }}>
        <Link to="/add-credentials">
          <button>Add Credentials</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
