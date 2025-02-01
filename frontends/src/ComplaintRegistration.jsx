import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ComplaintRegistration.css';
import picture3 from './assets/Houselogo.png';

function ComplaintRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousComplaints, setPreviousComplaints] = useState([]);
 
  const email = location.state?.email || '';

  console.log("Location State:", location.state); 
  console.log("Extracted Email:", email); 

  useEffect(() => {
    fetchComplaints();
  }, []); 

  useEffect(() => {
    if (location.state?.refetch) {
      fetchComplaints();
    }

    if (location.state?.newComplaint) {
      setPreviousComplaints(prev => [...prev, location.state.newComplaint]);
    }
  }, [location.state]);  

  const fetchComplaints = () => {
    if (!email) {
      alert('Email is required to fetch complaints.');
      return;
    }

    console.log("Fetching complaints for email:", email); 

    axios.get(`http://localhost:5001/api/complaints/${email}`) 
      .then(response => {
        console.log("API Response:", response.data); 

        if (response.data.success && response.data.complaints) {
          setPreviousComplaints(response.data.complaints);
        } else {
          console.error("Invalid API response format:", response.data);
          alert('Error fetching complaints!');
        }
      })
      .catch(error => {
        console.error('Error fetching complaints:', error);
        alert('Error fetching complaints!');
      });
  };

  useEffect(() => {
    console.log("Updated complaints state:", previousComplaints); 
  }, [previousComplaints]); 

  return (
    <div className="complaint-container">
      <aside className="sidebarprofile">
        <button className="profileback-button" onClick={() => navigate('/profile')}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/profile', { state: { email } })}>
            Profile
          </li>
          <li className="menu-item" onClick={() => navigate('/complaint-registration', { state: { email } })}>
            Complaint registration
          </li>
          <li className="menu-item" onClick={() => navigate('/guest-check-in-details', { state: { email } })}>
            Guest check-in details
          </li>
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details', { state: { email } })}>
            Inmates checkout details
          </li>
          <li className="menu-item" onClick={() => navigate('/announcements', { state: { email } })}>
            Announcements
          </li>
          <br />
          <li className="logout" onClick={() => navigate('/')}>
            Log out
          </li>
        </ul>
      </aside>

      <div className="new-container">
        <button className="new" onClick={() => navigate('/newcomplaint', { state: { email } })}>
          New complaint
        </button>
        <br />
        <div className="previouscomplaint">
          <h2>Complaints:</h2>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Quarters Number</th>
              <th>Mobile Number</th>
              <th>Availability Time</th>
              <th>Complaint Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {previousComplaints.length > 0 ? (
              previousComplaints.map((complaint, index) => (
                <tr key={index}>
                  <td>{complaint.quartersNumber}</td>
                  <td>{complaint.mobileNumber}</td>
                  <td>{complaint.availabilityTime}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No complaints found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintRegistration;
