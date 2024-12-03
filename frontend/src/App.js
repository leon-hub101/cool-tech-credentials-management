import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register"; 
import Login from "./components/Login"; 
import Home from "./components/Home"; 
import Credentials from "./components/CredentialList"; 
import AddCredentials from "./components/AddCredentialForm"; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Register page */}
          <Route path="/register" element={<Register />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* View credentials page */}
          <Route path="/credentials" element={<Credentials />} />

          {/* Add credentials page */}
          <Route path="/add-credentials" element={<AddCredentials />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
