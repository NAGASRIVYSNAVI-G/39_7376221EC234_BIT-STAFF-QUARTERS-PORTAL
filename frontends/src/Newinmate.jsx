import React, { useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import './Newinmate.css';
import picture3 from './assets/Houselogo.png';

function Newinmate() {
  const navigate = useNavigate();
  const [quarterNumber, setQuarterNumber] = useState('');   
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const location = useLocation();
  const email = location.state?.email || '';
  const handleQuarterNumberChange = (event) => {
    setQuarterNumber(event.target.value);  
  };

  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inmateData = { quarterNumber, checkInDate, checkOutDate };

    try {
      const response = await fetch('http://localhost:5001/api/inmatecheckouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inmateData),
      });

      if (response.ok) {
        const savedData = await response.json();
        console.log('Data saved successfully:', savedData);
        navigate('/inmates-checkout-details', { state: { email } });
      } else {
        console.error('Error saving data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="newcheckout-container">
      <aside className="sidebar">
        <button className="profileback-button" onClick={() => navigate('/profile', { state: { email } })}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/profile', { state: { email } })}>Profile</li>
          <li className="menu-item" onClick={() => navigate('/complaint-registration', { state: { email } })}>Complaint registration</li>
          <li className="menu-item" onClick={() => navigate('/guest-check-in-details', { state: { email } })}>Guest check in details</li>
          <br />
          <li className="menu-item active">Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate('/announcements', { state: { email } })}>Announcements</li>
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
      <main className="newcheckout-details">
        <header className="profile-header">
          <div className="profile-icon">R</div>
        </header>
        <section className="checkout-info">
          <h2>Inmates Checkout Details:</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="quarterNumber">Quarter Number:</label>
              <input
                type="text"
                id="quarterNumber"
                value={quarterNumber}
                onChange={handleQuarterNumberChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkInDate">Check-in Date:</label>
              <input
                type="date"
                id="checkInDate"
                value={checkInDate}
                onChange={handleCheckInChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkOutDate">Check-out Date:</label>
              <input
                type="date"
                id="checkOutDate"
                value={checkOutDate}
                onChange={handleCheckOutChange}
                required
              />
            </div>
            <button type="submit" className="new">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Newinmate;
