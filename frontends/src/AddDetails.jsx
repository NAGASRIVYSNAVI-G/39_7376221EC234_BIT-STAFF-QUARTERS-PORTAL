import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDetails.css';
import picture3 from './assets/Houselogo.png';

function AddDetails() {
  const navigate = useNavigate();

  const [personDetails, setPersonDetails] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    quartersNumber: '',
    department: '',
    quartersCheckInDate: '',
    dob: '',
    mobileNo: '',
    mailId: '',
    bloodGroup: '',
    aadharNumber: '',
    panNumber: '',
    permanentAddress: '',
    twoWheelerNumber: '',
    fourWheelerNumber: '',
    facultyId: ''
  });

  const [familyMembers, setFamilyMembers] = useState([
    { name: '', relation: '', age: '', bloodGroup: '', aadharNumber: '', working: '', employment: '' }
  ]);

  const [showFamilyForm, setShowFamilyForm] = useState(false);

  const handlePersonDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamilyMembers = [...familyMembers];
    updatedFamilyMembers[index][name] = value;
    setFamilyMembers(updatedFamilyMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { name: '', relation: '', age: '', bloodGroup: '', aadharNumber: '', working: '', employment: '' }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personDetails, familyMembers }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Details added successfully!');
        setPersonDetails({
          email: '',
          password: '',
          name: '',
          age: '',
          quartersNumber: '',
          department: '',
          quartersCheckInDate: '',
          dob: '',
          mobileNo: '',
          mailId: '',
          bloodGroup: '',
          aadharNumber: '',
          panNumber: '',
          permanentAddress: '',
          twoWheelerNumber: '',
          fourWheelerNumber: '',
          facultyId: '',
        });
        setFamilyMembers([{ name: '', relation: '', age: '', bloodGroup: '', aadharNumber: '', working: '', employment: '' }]);
      } else {
        alert(result.error || 'Failed to add details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form!');
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className="user-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={goToLogin}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => navigate('/adminprofile')}>Quarters details</li>
          <li className="menu-item active">Add Details</li>
          <li className="menu-item" onClick={() => navigate('/Admincomplaint')}>Complain registration</li>
          <li className="menu-item" onClick={() => navigate('/AdminGuest')}>Guest check in details</li>
          <li className="menu-item" onClick={() => navigate('/AdminInmate')}>Inmates checkout details</li>
          <li className="menu-item" onClick={() => navigate('/AdminAnnouncements')}>Announcements</li>
          <li className="menu-item" onClick={() => navigate("/admindetails")}>Add admin</li>
          <br />
          <br />
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>

      <div className="userform-container">
        <form onSubmit={handleSubmit} className="useradd-details-form">
          <h2>Add Person Details</h2>
          <div className="userform-section">
            <h3>Personal Details</h3>
            {Object.keys(personDetails).map((key) => (
              <div key={key} className="userform-group">
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={personDetails[key]}
                  onChange={handlePersonDetailsChange}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowFamilyForm(!showFamilyForm)}  
            className="useradd-family-member-button"
          >
            {showFamilyForm ? 'Hide Family Member Form' : 'Add Family Member'}
          </button>

          {showFamilyForm && (
            <div className="userform-section">
              <h3>Family Members</h3>
              {familyMembers.map((familyMember, index) => (
                <div key={index} className="family-member">
                  <h4>Family Member {index + 1}</h4>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={familyMember.name}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                  <div className="userform-group">
                    <label>Relation</label>
                    <input
                      type="text"
                      name="relation"
                      value={familyMember.relation}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                  <div className="userform-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={familyMember.age}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                  <div className="userform-group">
                    <label>Blood Group</label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={familyMember.bloodGroup}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                  <div className="userform-group">
                    <label>Aadhar Number</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={familyMember.aadharNumber}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                  <div className="userform-group">
                    <label>Working</label>
                    <input
                      type="text"
                      name="working"
                      value={familyMember.working}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                  <div className="userform-group">
                    <label>Employment</label>
                    <input
                      type="text"
                      name="employment"
                      value={familyMember.employment}
                      onChange={(e) => handleFamilyMemberChange(index, e)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addFamilyMember}>
                Add Another Family Member
              </button>
            </div>
          )}

          <button type="submit" className="usersubmit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDetails;
