import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUtility.css';
import picture3 from './assets/Houselogo.png';

function AdminUtility() {
  const navigate = useNavigate();
  const [FacultyID, setFacultyID] = useState('');
  const [utilityFee, setUtilityFee] = useState(null);

  const fetchUtilityFee = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/utilities/${FacultyID}`);
      if (response.ok) {
        const data = await response.json();
        setUtilityFee(data);
      } else {
        setUtilityFee(null);
        alert('UtilityFee not found!');
      }
    } catch (error) {
      console.error('Error fetching UtilityFee:', error);
    } 
    }
  ;

  return (
    <div className="adminprofile-container">
      <aside className="sidebar">
        <button className="back-button" onClick={() => navigate('/')}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/adminprofile')}>
            Quarters details
          </li>
          <li className="menu-item" onClick={() => navigate('/addDetails')}>Add Details</li>
          <li className="menu-item" onClick={() => navigate('/Admincomplaint')}>
            Complain registration
          </li>
          <li className="menu-item" onClick={() => navigate('/AdminGuest')}>
            Guest check-in details
          </li>
          <li className="menu-item" onClick={() => navigate('/AdminInmate')}>
            Inmates checkout details
          </li>
          <li className="menu-item active" onClick={() => navigate('/AdminUtility')}>
            Utility fee
          </li>
          <li className="menu-item" onClick={() => navigate('/AdminAnnouncements')}>
            Announcements
          </li>
          <li className="logout" onClick={() => navigate('/')}>
            Log out
          </li>
        </ul>
      </aside>
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search member by FacultyID..."
            value={FacultyID}
            onChange={(e) => setFacultyID(e.target.value)}
          />
          <button className="select-member-button" onClick={fetchUtilityFee}>
            Search
          </button>
        </div>
        {utilityFee && (
          <table className="utility-fee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Electricity Bill</th>
                <th>Water Bill</th>
                <th>Maintenance Charge</th>
                <th>Total Utility Fee</th>
                <th>Total Salary</th>
                <th>Credited Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{utilityFee.name}</td>
                <td>{utilityFee.ElectricityBill}</td>
                <td>{utilityFee.WaterBill}</td>
                <td>{utilityFee.MaintenanceCharge}</td>
                <td>{utilityFee.TotalUtilityFee}</td>
                <td>{utilityFee.TotalSalary}</td>
                <td>{utilityFee.CreditedSalary}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminUtility;
