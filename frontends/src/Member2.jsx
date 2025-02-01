import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import picture3 from './assets/Houselogo.png';

function Member2() {
  const navigate = useNavigate();

  const goToInmates = () => {
    navigate('/inmates-details');
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <button className="back-button" onClick={goToInmates}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/profile')}>Profile</li>
          <li className="menu-item active" onClick={() => navigate('/inmates-details')}>
            Inmates details
          </li>
          <li className="menu-item" onClick={() => navigate('/complaint-registration')}>
            Complain registration
          </li>
          <li className="menu-item" onClick={() => navigate('/guest-check-in-details')}>
            Guest check in details
          </li>
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details')}>
            Inmates checkout details
          </li>
          <li className="menu-item" onClick={() => navigate('/announcements')}>
            Announcements
          </li>
          <li className="menu-item" onClick={() => navigate('/utility-fee')}>
            Utility fee
          </li>
          <br></br>
          <br></br>
          <li className="logout" onClick={() => navigate('/')}>
            Log out
          </li>
        </ul>
      </aside>
      <main className="inmates-details">
        <header className="profile-header">
          <div className="profile-icon">R</div>
        </header>
        <section className="inmates-info">
          <h2>Member 2:</h2>
          <p><strong>Member 2:</strong></p>
          <p><strong>Name:</strong> Ramya</p>
          <p><strong>Relation:</strong> Mother</p>
          <p><strong>Age:</strong> 65</p>
          <p><strong>Blood Group:</strong> B+</p>
          <p><strong>Aadhar number:</strong> 1234-1234-1234</p>
          <p><strong>Working:</strong> No</p>
        </section>
      </main>
    </div>
  );
}

export default Member2;