import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewAdmin.css';
import picture3 from './assets/Houselogo.png';

function NewAdmin() {
  const navigate = useNavigate();
   
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
   
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const adminData = { name, age, role, adminID, password };
  
    try {
      const response = await fetch('http://localhost:5001/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert('Admin added successfully!');
        setName('');
        setAge('');
        setRole('');
        setAdminID('');
        setPassword('');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add admin');
    }
  };
  

  return (
    <div className="admincomplaint-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={() => navigate('/')}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/adminprofile')}>Quarters details</li>
          <li className="menu-item" onClick={() => navigate('/addDetails')}>Add Details</li>
          <li className="menu-item" onClick={() => navigate('/admincomplaint')}>Complain registration</li>
          <li className="menu-item" onClick={() => navigate('/adminGuest')}>Guest check in details</li>
          <li className="menu-item" onClick={() => navigate('/inmates-checkout-details')}>Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate('/adminAnnouncements')}>Announcements</li>
          <li className="menu-item active" onClick={() => navigate("/admindetails")}>Add admin</li>
          <br />
          <br />
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
 
      <div className="admin-form-container">
        <h2>Add New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input 
              type="number" 
              id="age" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input 
              type="text" 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adminID">Admin ID:</label>
            <input 
              type="text" 
              id="adminID" 
              value={adminID} 
              onChange={(e) => setAdminID(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" onClick={() => navigate("/admindetails")} className="submit-button">Add Admin</button>
        </form>
      </div>
    </div>
  );
}

export default NewAdmin;
