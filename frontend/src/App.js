import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminControlPanel from "./components/AdminControlPanel";
import CredentialList from "./components/CredentialList";
import AddCredentialForm from "./components/AddCredentialForm";
import Register from "./components/Register"; 
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminControlPanel />} />
          <Route path="/credentials" element={<CredentialList />} />
          <Route path="/add-credential" element={<AddCredentialForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
