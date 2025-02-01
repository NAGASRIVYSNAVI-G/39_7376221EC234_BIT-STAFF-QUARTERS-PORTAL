import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UtilityFee.css';
import picture3 from './assets/Houselogo.png'; 

function UtilityFee() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="utility-fee-container">
      <aside className="sidebar">
        <button className="back-button" onClick={goToProfile}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={goToProfile}>
            Profile
          </li>
          <li className="menu-item" onClick={() => navigate('/inmates-details')}>
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
          <li className="menu-item active">
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
      <main className="utility-fee-details">
        <header className="profile-header">
          <div className="profile-icon">R</div>
        </header>
        <section className="fee-info">
          <h2>Utility fee:</h2><br></br>
          <div className="utilitydata">
            <span>Electricity bill:</span>
            <span>₹500</span>
          </div>
          <div className="utilitydata">
            <span>Water bill:</span>
            <span>₹50</span>
          </div>
          <div className="utilitydata">
            <span>Maintenance charge:</span>
            <span>₹5000</span>
          </div>
          <div className="utilitydata">
            <span>Total utility fee:</span>
            <span>₹5550</span>
          </div>
          <div className="utilitydata">
            <span>Total salary:</span>
            <span>₹70000</span>
          </div>
          <div className="utilitydata">
            <span>Credited salary:</span>
            <span>₹64450</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UtilityFee;
