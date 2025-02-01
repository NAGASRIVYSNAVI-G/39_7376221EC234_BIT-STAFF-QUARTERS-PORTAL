import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './Newguest.css';
import picture3 from './assets/Houselogo.png';
import axios from 'axios';

function Newguest() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const email = location.state?.email || '';  
  const [quartersNumber, setQuartersNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [place, setPlace] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
 
    const handleQuartersNumberChange = (e) => {
      setQuartersNumber(e.target.value);
    };
  
    const handleNumberOfGuestsChange = (e) => {
      setNumberOfGuests(e.target.value);
    };
  
    const handlePlaceChange = (e) => {
      setPlace(e.target.value);
    };
  
    const handleCheckInChange = (e) => {
      setCheckInDate(e.target.value);
    };
  
    const handleCheckOutChange = (e) => {
      setCheckOutDate(e.target.value);
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/guests', {
      quartersNumber,
      numGuests: numberOfGuests,
      fromPlace: place,
      checkInDate,
      checkOutDate,
    })
      .then(response => {
        alert('Guest details submitted successfully!');
        navigate('/guest-check-in-details', { state: { refetch: true } ,state: { email }});
      })
      .catch(error => {
        alert('There was an error submitting the guest details!', error);
      });
  };

  return (
    <div className="newguest-container">
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
      <main className="newguest-details">
        <header className="profile-header">
          <div className="profile-icon">R</div>
        </header>
        <section className="newguest-info">
          <h2>Guest check in details:</h2>
          <form onSubmit={handleSubmit}> 
            <div className="detail-item">
              <span>Quarters Number:</span>
              <input
                type="text"
                value={quartersNumber}
                onChange={handleQuartersNumberChange}
                required
              />
            </div>
            <div className="detail-item">
              <span>Number of guests:</span>
              <input 
                type="number" 
                value={numberOfGuests}
                onChange={handleNumberOfGuestsChange}
                required
              />
            </div>
            <div className="detail-item">
              <span>From (Place):</span>
              <input 
                type="text" 
                value={place}
                onChange={handlePlaceChange}
                required
              />
            </div>
            <div className="detail-item">
              <span>Check in:</span>
              <input className='dateinput'
                type="date"
                id="checkInDate"
                value={checkInDate}
                onChange={handleCheckInChange}
                required
              />
            </div>
            <div className="detail-item">
              <span>Check out:</span>
              <input className='dateinput'
                type="date"
                id="checkOutDate"
                value={checkOutDate}
                onChange={handleCheckOutChange}
                required
              />
            </div>
            <button className="newg" type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Newguest;
