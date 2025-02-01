import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GuestCheckInDetails.css';
import picture3 from './assets/Houselogo.png';
import axios from 'axios';

function GuestCheckInDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; 
  const [guests, setGuests] = useState([]);  

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/guests/${email}`); 
      if (Array.isArray(response.data.guests)) {
        setGuests(response.data.guests);
      } else {
        setGuests([]);  
      }
  
    } catch (error) {
      alert('There was an error fetching guest details!');
      setGuests([]);  
    }
  };
  
  return (
    <div className="previousguest-container">
      <aside className="sidebarprofile">
        <button className="profileback-button" onClick={() => navigate('/profile', { state: { email } })}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/profile', { state: { email } })}>Profile</li>
          <li className="menu-item" onClick={() => navigate('/complaint-registration', { state: { email } })}>Complaint registration</li>
          <li className="menu-item active">Guest check in details</li>
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details', { state: { email } })}>Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate('/announcements', { state: { email } })}>Announcements</li>
          <br />
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
      <header className="profile-header">
        <div className="profile-icon">R</div>
      </header>
      <div className="previousguest-details">
        <button className="new" onClick={() => navigate('/newguest', { state: { email } })}>New guest arrival</button><br />
        <h2>Guest check in details:</h2>
        <table>
          <thead>
            <tr>
              <th>Quarters number</th>
              <th>Number of guests</th>
              <th>From (Place)</th>
              <th>Check in</th>
              <th>Check out</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
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
      </div>
    </div>
  );
}

export default GuestCheckInDetails;
