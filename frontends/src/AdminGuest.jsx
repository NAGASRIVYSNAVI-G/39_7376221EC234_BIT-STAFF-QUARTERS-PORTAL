import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminGuest.css';
import picture3 from './assets/Houselogo.png';

function AdminGuest() {
  const navigate = useNavigate();
  const [quartersNumber, setQuartersNumber] = useState('');
  const [guestDetails, setGuestDetails] = useState([]);
  const [error, setError] = useState('');

  const goTologin = () => {
    navigate('/');
  };

  const fetchGuestDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/guests/filter?quartersNumber=${quartersNumber}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error fetching guest details!');
      }

      if (data.guests.length === 0) {
        setError('No guest details found for this Quarters Number.');
        setGuestDetails([]);
      } else {
        setGuestDetails(data.guests);
        setError('');
      }
    } catch (err) {
      setError(err.message);
      setGuestDetails([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (quartersNumber.trim() === '') {
      setError('Please enter a valid Quarters Number.');
      return;
    }
    fetchGuestDetails();
  };

  return (
    <div className="adminprofile-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={goTologin}>&#8592;</button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/adminprofile')}>Quarters details</li>
          <li className="menu-item" onClick={() => navigate('/addDetails')}>Add Details</li>
          <li className="menu-item" onClick={() => navigate('/Admincomplaint')}>Complain registration</li>
          <li className="menu-item active" onClick={() => navigate('/AdminGuest')}>Guest check-in details</li>
          <li className="menu-item" onClick={() => navigate('/AdminInmate')}>Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate('/AdminAnnouncements')}>Announcements</li>
          <li className="menu-item" onClick={() => navigate("/admindetails")}>Add admin</li>
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
      <div className="content">
        <div className="adsearch-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter Quarters Number..."
            value={quartersNumber}
            onChange={(e) => setQuartersNumber(e.target.value)}
          /><br></br><br></br>
          <button className="adselect-member-button" onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="guest-details">
          {guestDetails.length > 0 && (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Quarters Number</th>
                  <th>Number of Guests</th>
                  <th>From Place</th>
                  <th>Check-In Date</th>
                  <th>Check-Out Date</th>
                </tr>
              </thead>
              <tbody>
                {guestDetails.map((guest) => (
                  <tr key={guest._id}>
                    <td>{guest.quartersNumber}</td>
                    <td>{guest.numGuests}</td>
                    <td>{guest.fromPlace}</td>
                    <td>{new Date(guest.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(guest.checkOutDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminGuest;
