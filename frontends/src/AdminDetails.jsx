import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./AdminDetails.css";
import picture3 from "./assets/Houselogo.png";

function AdminDetails() {
  const navigate = useNavigate();
  const [adminID, setAdminID] = useState("");
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setAdminData(null);

    if (!adminID.trim()) {
      setError("Please enter an Admin ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/api/admins/${adminID}`);
      setAdminData(response.data); 
    } catch (err) {
      setError("Admin not found. Please check the ID.");
    }
  };

  return (
    <div className="adminadmin-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={() => navigate("/")}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate("/adminprofile")}>
            Quarters details
          </li>
          <li className="menu-item" onClick={() => navigate("/addDetails")}>Add Details</li>
          <li className="menu-item" onClick={() => navigate("/admincomplaint")}>
            Complain registration
          </li>
          <li className="menu-item" onClick={() => navigate("/adminGuest")}>
            Guest check-in details
          </li>
          <li className="menu-item" onClick={() => navigate("/AdminInmate")}>
            Inmates checkout details
          </li>
          <li className="menu-item" onClick={() => navigate("/adminAnnouncements")}>
            Announcements
          </li>
          <li className="menu-item active" onClick={() => navigate("/admindetails")}>Add admin</li>
          <br />
          <br />
          <li className="logout" onClick={() => navigate("/")}>Log out</li>
        </ul>
      </aside>

      <div className="addsearch-container"><br></br><br></br><br></br><br></br><br></br><br></br>
        <input
          type="text"
          placeholder="Enter Admin ID"
          value={adminID}
          onChange={(e) => setAdminID(e.target.value)}
          className="search-input"
        /><br></br><br></br>
        <button onClick={handleSearch} className="addsearch-button">
          Search
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      {adminData && (
        <div className="admin-details">
          <h2>Admin Details</h2>
          <p><strong>Name:</strong> {adminData.name}</p>
          <p><strong>Age:</strong> {adminData.age}</p>
          <p><strong>Role:</strong> {adminData.role}</p>
          <p><strong>Admin ID:</strong> {adminData.adminID}</p>
        </div>
      )}

      <div className="adminmail">
        <button onClick={() => navigate("/Newadmin")} className="newadmin">New Admin</button>
      </div>
    </div>
  );
}

export default AdminDetails;
