import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Newcomplaint.css';
import picture3 from './assets/Houselogo.png';

function Newcomplaint() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [complaintDetails, setComplaintDetails] = useState({
    quartersNumber: '',
    mobileNumber: '',
    availabilityTime: '',
    complaintType: '',
    description: '',
  });
 
  const [formError, setFormError] = useState('');
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintDetails({ ...complaintDetails, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const { quartersNumber, mobileNumber, availabilityTime, complaintType, description } = complaintDetails;

    if (!quartersNumber || !mobileNumber || !availabilityTime || !complaintType || !description) {
      setFormError('All fields are required. Please fill out the form completely.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/complaints', complaintDetails);
      alert('Complaint submitted successfully!'); 
      navigate('/complaint-registration', {
        state: { refetch: true, newComplaint: response.data },
       state: { email } });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('There was an error submitting the complaint. Please try again later.');
    }
  };
  
  return (
    <div className="newcomplaint-container"> 
      <aside className="sidebarprofile">
        <button className="profileback-button" onClick={() => navigate('/complaint-registration', { state: { email } })}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        
        <ul className="menu">
  <li 
    className="menu-item" 
    onClick={() => navigate('/profile', { state: { email } })}
    
  >
    Profile
  </li>
  <li 
    className="menu-item active" 
    onClick={() => navigate('/complaint-registration', { state: { email } })}
  >
    Complaint registration
  </li>
  <li 
    className="menu-item" 
    onClick={() => navigate('/guest-check-in-details', { state: { email } })}
  >
    Guest check in details
  </li>
  <li 
    className="menu-item" 
    onClick={() => navigate('/inmates-checkout-details', { state: { email } })}
  >
    Inmates checkout details
  </li>
  <li 
    className="menu-item" 
    onClick={() => navigate('/announcements', { state: { email } })}
  >
    Announcements
  </li>
  <br />
  <li className="logout" onClick={() => navigate('/')}>
    Log out
  </li>
</ul>

      </aside>
 
      <main className="newcomplaint-details">
        <section className="newcomplaint-info">
          <h2>Complaint Registration</h2>
          <form onSubmit={handleSubmit}> 
            <div className="newform-group">
              <label>Quarters Number:</label>
              <input
                type="text"
                name="quartersNumber"
                value={complaintDetails.quartersNumber}
                onChange={handleChange}
                placeholder="Enter quarters number"
              />
            </div>
            <div className="newform-group">
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={complaintDetails.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>
            <div className="newform-group">
              <label>Availability Time:</label>
              <select
                name="availabilityTime"
                value={complaintDetails.availabilityTime}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select availability time
                </option>
                <option value="9-12">9:00 AM - 12:00 PM</option>
                <option value="12-6">12:00 PM - 6:00 PM</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>
            <div className="newform-group">
              <label>Complaint Type:</label>
              <select
                name="complaintType"
                value={complaintDetails.complaintType}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select complaint type
                </option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Gardening">Gardening</option>
                <option value="Carpentering">Carpentering</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="newform-group">
              <label>Complaint (Description):</label>
              <textarea
                name="description"
                value={complaintDetails.description}
                onChange={handleChange}
                placeholder="Describe your issue"
              ></textarea>
            </div>
 
            {formError && <p className="error-message">{formError}</p>}

            <button className="new" type="submit">
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Newcomplaint;
