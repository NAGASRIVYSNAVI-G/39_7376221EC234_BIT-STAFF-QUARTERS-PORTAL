import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminprofile.css";
import picture3 from "./assets/Houselogo.png";

function Adminprofile() {
  const navigate = useNavigate();
  const [facultyId, setFacultyId] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [updatedProfile, setUpdatedProfile] = useState({}); 

  const goTologin = () => {
    navigate("/");
  };

  const handleSearch = async () => {
    if (!facultyId) {
      setError("Faculty ID is required!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/profiles/${facultyId}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data.data); 
        setUpdatedProfile(data.data.personDetails);
        setError("");
      } else {
        setProfile(null);
        setError("Profile not found!");
      }
    } catch (error) {
      setProfile(null);
      setError("Error fetching profile!");
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!facultyId) {
      setError("Faculty ID is required!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/profiles/${facultyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personDetails: updatedProfile }), 
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data);
        setIsEditing(false);
        setError("");
        alert("Profile updated successfully!");
      } else {
        setError("Error updating profile!");
      }
    } catch (error) {
      setError("Error updating profile!");
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteProfile = async () => {
    if (!facultyId) {
      setError("Faculty ID is required!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/profiles/${facultyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProfile(null);
        setFacultyId("");
        setError("");
        alert("Profile deleted successfully!");
      } else {
        setError("Error deleting profile!");
      }
    } catch (error) {
      setError("Error deleting profile!");
      console.error("Error deleting profile:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="adminprofile-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={goTologin}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item active">Quarters details</li>
          <li className="menu-item" onClick={() => navigate("/addDetails")}>Add Details</li>
          <li className="menu-item" onClick={() => navigate("/Admincomplaint")}>Complain registration</li>
          <li className="menu-item" onClick={() => navigate("/AdminGuest")}>Guest check-in details</li>
          <li className="menu-item" onClick={() => navigate("/AdminInmate")}>Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate("/AdminAnnouncements")}>Announcements</li>
          <li className="menu-item" onClick={() => navigate("/admindetails")}>Add admin</li>
          <br />
          <li className="logout" onClick={() => navigate("/")}>Log out</li>
        </ul>
      </aside>

      <div className="content">
        <br /><br /><br /><br />
        <div className="adsearch-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter Faculty Id..."
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
          /><br></br><br></br>
          <button className="adselect-member-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {profile && (
          <div className="adprofile-details">
            <h3>Profile Details</h3>
            {isEditing ? (
  <div className="update-form">
    <p><strong>Name:</strong><input type="text" name="name" value={updatedProfile.name || ""} onChange={handleEditChange} placeholder="Enter Name" /></p>
    <p><strong>Age:</strong><input type="text" name="age" value={updatedProfile.age || ""} onChange={handleEditChange} placeholder="Enter Age" />
    <p><strong>Quarters number:</strong><input type="text" name="quartersNumber" value={updatedProfile.quartersNumber || ""} onChange={handleEditChange} placeholder="Enter Quarters Number" /></p></p>
    <p><strong>Department:</strong> <input type="text" name="department" value={updatedProfile.department || ""} onChange={handleEditChange} placeholder="Enter Department" /></p>
    <p><strong>Quarters check in date:</strong><input type="text" name="quartersCheckInDate" value={updatedProfile.quartersCheckInDate || ""} onChange={handleEditChange} placeholder="Enter Quarters Check-in Date" /></p>
    <p><strong>DOB:</strong> <input type="text" name="dob" value={updatedProfile.dob || ""} onChange={handleEditChange} placeholder="Enter DOB" /></p>
    <p><strong>Mobile no:</strong> <input type="text" name="mobileNo" value={updatedProfile.mobileNo || ""} onChange={handleEditChange} placeholder="Enter Mobile No" /></p>
    <p><strong>Mail id:</strong> <input type="text" name="mailId" value={updatedProfile.mailId || ""} onChange={handleEditChange} placeholder="Enter Mail ID" /></p>
    <p><strong>Blood group:</strong> <input type="text" name="bloodGroup" value={updatedProfile.bloodGroup || ""} onChange={handleEditChange} placeholder="Enter Blood Group" /></p>
    <p><strong>Aadhar number:</strong><input type="text" name="aadharNumber" value={updatedProfile.aadharNumber || ""} onChange={handleEditChange} placeholder="Enter Aadhar Number" /></p>
    <p><strong>Pan number:</strong><input type="text" name="panNumber" value={updatedProfile.panNumber || ""} onChange={handleEditChange} placeholder="Enter PAN Number" /></p>
    <p><strong>Permanent Address:</strong><input type="text" name="permanentAddress" value={updatedProfile.permanentAddress || ""} onChange={handleEditChange} placeholder="Enter Permanent Address" /></p>
    
    <button onClick={handleUpdateProfile}  className="changenewbuttons">Save Changes</button>
    <button onClick={() => setIsEditing(false)}  className="changenewbuttons">Cancel</button>
  </div>
) : (
  <>
    <p><strong>Name:</strong> {profile.personDetails.name}</p>
    <p><strong>Age:</strong> {profile.personDetails.age}</p>
    <p><strong>Quarters number:</strong> {profile.personDetails.quartersNumber}</p>
    <p><strong>Department:</strong> {profile.personDetails.department}</p>
    <p><strong>Quarters check in date:</strong> {profile.personDetails.quartersCheckInDate}</p>
    <p><strong>DOB:</strong> {profile.personDetails.dob}</p>
    <p><strong>Mobile no:</strong> {profile.personDetails.mobileNo}</p>
    <p><strong>Mail id:</strong> {profile.personDetails.mailId}</p>
    <p><strong>Blood group:</strong> {profile.personDetails.bloodGroup}</p>
    <p><strong>Aadhar number:</strong> {profile.personDetails.aadharNumber}</p>
    <p><strong>Pan number:</strong> {profile.personDetails.panNumber}</p>
    <p><strong>Permanent Address:</strong> {profile.personDetails.permanentAddress}</p>
  </>
)}

            <div className="actions">
              {!isEditing ? (
                <>
                  <button onClick={() => setIsEditing(true)} className="newbuttons">Edit Profile</button>
                  <button onClick={handleDeleteProfile} className="newbuttons">Delete Profile</button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Adminprofile;
