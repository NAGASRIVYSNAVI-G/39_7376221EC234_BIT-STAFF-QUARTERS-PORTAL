import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Announcement.css';
import picture3 from './assets/Houselogo.png';

function Announcement() {
  const [announcements, setAnnouncements] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  const email = location.state?.email || ''; 

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/announcements');
        setAnnouncements(response.data); 
      } catch (err) {
        setError(err.message || 'Failed to fetch announcements');
        console.error('Fetch announcements error:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
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
          <li className="menu-item" onClick={() => navigate('/guest-check-in-details', { state: { email } })}>Guest check in details</li>
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details', { state: { email } })}>Inmates checkout details</li>
          <li className="menu-item active">Announcements</li>
          <br />
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
      <main className="announcements-container">
        <h2>Announcements</h2>
        <div className="announcements-list">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-item">
                <p>{announcement.message}</p>
                <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p>No announcements available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Announcement;
