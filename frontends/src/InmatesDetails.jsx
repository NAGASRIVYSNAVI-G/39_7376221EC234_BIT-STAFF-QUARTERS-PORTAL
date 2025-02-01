import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InmatesDetails.css';
import picture3 from './assets/Houselogo.png';

function InmatesDetails() {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate('/profile');
  };
  const Member2 = () => {
    navigate('/Member2');
  };
  return (
    <div className="inmates-container">
      <aside className="sidebarinmate">
      <button className="inmateback-button" onClick={goToProfile}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/profile')}>
            Profile
          </li> 
          <li className="menu-item active">Inmates details</li>
          <li className="menu-item" onClick={() => navigate('/complaint-registration')}>
            Complain registration
          </li> 
          <li className="menu-item" onClick={() => navigate('/guest-check-in-details')}>
            Guest check in details
          </li> 
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details')}>
            Inmates checkout details
          </li> 
          <li className="menu-item" onClick={() => navigate('/utility-fee')}>
            Utility fee
          </li> 
          <li className="menu-item" onClick={() => navigate('/announcements')}>
            Announcements
          </li>
          
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
          <h2>Inmates details:</h2>
          <p><strong>Member 1:</strong></p>
          <p><strong>Name:</strong> Ram</p>
          <p><strong>Relation:</strong> Brother</p>
          <p><strong>Age:</strong> 25</p>
          <p><strong>Blood Group:</strong> B+</p>
          <p><strong>Aadhar number:</strong> 1234-1234-1234</p>
          <p><strong>Working:</strong> Yes</p>
          <p><strong>Employment:</strong> Manager</p>
          <button onClick={() => navigate('/Member2')}className="member-button">Member 2</button>
        </section>
      </main>
    </div>
  );
}

export default InmatesDetails;
