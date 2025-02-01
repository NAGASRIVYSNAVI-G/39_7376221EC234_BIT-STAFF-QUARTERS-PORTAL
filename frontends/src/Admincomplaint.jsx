import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admincomplaint.css';
import picture3 from './assets/Houselogo.png';

function Admincomplaint() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/complaints') 
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error('Error fetching complaints:', error));
  }, []);  

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:5001/api/complaints/${id}`, { 
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update complaint status');
        }
        return response.json();
      })
      .then((updatedComplaint) => {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === id ? { ...complaint, status: newStatus } : complaint
          )
        );
      })
      .catch((error) => console.error('Error updating complaint status:', error));
  };
  
  return (
    <div className="admincomplaint-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={() => navigate('/')}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/adminprofile')}>
            Quarters details
          </li>
          <li className="menu-item" onClick={() => navigate('/addDetails')}>Add Details</li>
          <li className="menu-item active" onClick={() => navigate('/admincomplaint')}>
            Complain registration
          </li>
          <li className="menu-item" onClick={() => navigate('/adminGuest')}>
            Guest check in details
          </li>
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details')}>
            Inmates checkout details
          </li>
          <li className="menu-item" onClick={() => navigate('/adminAnnouncements')}>
            Announcements
          </li>
          <li className="menu-item" onClick={() => navigate("/admindetails")}>Add admin</li>
          <br />
          <br />
          <li className="logout" onClick={() => navigate('/')}>
            Log out
          </li>
        </ul>
      </aside>
      <div className="content">
  <h2>Complaint registration:</h2>
  <br />
  <p className="wordings">Number of complaints registered: {complaints.length}</p>
  <br />
  <p className="wordings">
    Number of complaints completed:{' '}
    {complaints.filter((complaint) => complaint.status === 'Completed').length}
  </p>
  <br />
  <p className="wordings">
  Number of complaints in progress:{' '}
  {complaints.filter((complaint) => complaint.status === 'Accepted').length}
</p>
        <br />
        <table className="complaint-table">
          <thead>
            <tr>
              <th>Quarters Number</th>
              <th>Mobile number</th>
              <th>Availability Time</th>
              <th>Complaint</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.quartersNumber
                }</td>
                <td>{complaint.mobileNumber}</td>
                <td>{complaint.availabilityTime}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.description}</td>
                <td>
                  <select
                    className={`status ${complaint.status.toLowerCase()}`}
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                  >
                    <option value="Registered" className="status registered">
                      Registered
                    </option>
                    <option value="Accepted" className="status accepted">
                      Accepted
                    </option>
                    <option value="Completed" className="status completed">
                      Completed
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-profile">
        <span className="profile-initial">A</span>
      </div>
    </div>
  );
}

export default Admincomplaint;
