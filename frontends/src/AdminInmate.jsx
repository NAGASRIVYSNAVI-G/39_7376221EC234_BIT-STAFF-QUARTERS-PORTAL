import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminInmate.css';
import picture3 from './assets/Houselogo.png';

function AdminInmate() {
  const navigate = useNavigate();
  const [quarterNumber, setQuartersNumber] = useState('');
  const [inmateDetails, setInmateDetails] = useState([]);
  const [error, setError] = useState('');

  const goTologin = () => {
    navigate('/');
  };

  const fetchInmateDetails = async () => {
    try {
      console.log("Fetching for Quarter Number:", quarterNumber);

      const response = await fetch(
        `http://localhost:5001/api/inmatecheckouts/filter?quarterNumber=${encodeURIComponent(String(quarterNumber))}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error('No inmate details found!');
      }

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (Array.isArray(data)) {
        setInmateDetails(data);
        setError('');
      } else if (data.inmates && Array.isArray(data.inmates)) {
        setInmateDetails(data.inmates);
        setError('');
      } else {
        setError('No inmate details found for this Quarters Number.');
        setInmateDetails([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setInmateDetails([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (quarterNumber.trim() === '') {
      setError('Please enter a valid Quarters Number.');
      return;
    }
    fetchInmateDetails();
  };

  return (
    <div className="adminprofile-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={goTologin}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/adminprofile')}>Quarters details</li>
          <li className="menu-item" onClick={() => navigate('/addDetails')}>Add Details</li>
          <li className="menu-item" onClick={() => navigate('/Admincomplaint')}>Complain registration</li>
          <li className="menu-item" onClick={() => navigate('/AdminGuest')}>Guest check-in details</li>
          <li className="menu-item active" onClick={() => navigate('/AdminInmate')}>Inmates checkout details</li>
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
            value={quarterNumber}
            onChange={(e) => setQuartersNumber(e.target.value)}
          />
          <br /><br />
          <button className="adselect-member-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="inmate-details">
          {inmateDetails.length > 0 && (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Quarters Number</th>
                  <th>Check-In Date</th>
                  <th>Check-Out Date</th>
                </tr>
              </thead>
              <tbody>
                {inmateDetails.map((inmate) => (
                  <tr key={inmate._id}>
                    <td>{inmate.quarterNumber}</td>
                    <td>{new Date(inmate.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(inmate.checkOutDate).toLocaleDateString()}</td>
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

export default AdminInmate;
