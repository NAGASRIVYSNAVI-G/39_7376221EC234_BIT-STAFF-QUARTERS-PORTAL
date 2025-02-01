import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './InmatesCheckoutDetails.css';
import picture3 from './assets/Houselogo.png';

function InmatesCheckoutDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;  
  const [checkoutDetails, setCheckoutDetails] = useState([]);

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/inmatecheckouts/${email}`);
        const data = await response.json();

        console.log("API Response:", data);  

        if (Array.isArray(data)) {
          setCheckoutDetails(data);
        } else {
          console.error("Expected an array but got:", data);
          setCheckoutDetails([]);  
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCheckoutDetails([]);  
      }
    };

    if (email) {
      fetchCheckoutDetails();
    }
  }, [email]);  

  return (
    <div className="inmates-checkout-container">
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
          <li className="menu-item" onClick={() => navigate('/guest-check-in-details', { state: { email } })}>Guest check-in details</li>
          <li className="menu-item active">Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate('/announcements', { state: { email } })}>Announcements</li>
          <br />
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
      <div className="inmates-checkout-details">
        <header className="profile-header">
          <div className="profile-icon">R</div>
        </header>
        <button className="new" onClick={() => navigate('/Newinamte', { state: { email } })}>Check-out</button><br />
        <h2>Inmates Checkout History:</h2>
        <table>
          <thead>
            <tr>
              <th>Quarter Number</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(checkoutDetails) && checkoutDetails.length > 0 ? (
              checkoutDetails.map((detail) => (
                <tr key={detail._id}>
                  <td>{detail.quarterNumber}</td>
                  <td>{new Date(detail.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(detail.checkOutDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InmatesCheckoutDetails;
