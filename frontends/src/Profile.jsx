import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profile.css';
import picture3 from './assets/Houselogo.png';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5001/api/profiles/email/${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setProfile(data.data);
          } else {
            alert('Profile not found!');
          }
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          alert('Failed to fetch profile data');
        });
    } else {
      alert('No email provided');
    }
  }, [email]);
  

  const goTologin = () => {
    navigate('/');
  };

  return (
    <div className="profile-container">
      <aside className="sidebarprofile">
        <button className="profileback-button" onClick={goTologin}>
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
    className="menu-item" 
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
      <main className="profile-details">
        <header className="profile-header">
          <div className="profile-icon">{profile ? profile.personDetails.name[0] : '?'}</div>
        </header>
        <section className="profile-info">
          <h2>Profile:</h2>
          {profile ? (
            <>
              <p><strong>Name:</strong> {profile.personDetails.name}</p>
              <p><strong>Age:</strong> {profile.personDetails.age}</p>
              <p><strong>Quarters number:</strong> {profile.personDetails.quartersNumber}</p>
              <p><strong>Department:</strong> {profile.personDetails.department}</p>
              <p><strong>Quarters check in date:</strong> {profile.personDetails.quartersCheckInDate}</p>
              <p><strong>DOB:</strong> {profile.personDetails.dob}</p>
              <p><strong>Mobile no:</strong> {profile.personDetails.mobileNo}</p>
              <p><strong>Mail id:</strong> {profile.personDetails.mailId}</p>
              <p><strong>Blood group:</strong> {profile.personDetails.bloodGroup}</p>
              <p><strong>Aadhar number:</strong> {profile.personDetails.aadharNumber}</p>
              <p><strong>Pan number:</strong> {profile.personDetails.panNumber}</p>
              <p><strong>Permanent Address:</strong> {profile.personDetails.permanentAddress}</p>
              <p><strong>Two wheeler number:</strong> {profile.personDetails.twoWheelerNumber}</p>
              <p><strong>Four wheeler number:</strong> {profile.personDetails.fourWheelerNumber}</p>
              <br></br>
              <h3>Family Details:</h3><br></br>
              {profile.familyMembers && profile.familyMembers.length > 0 ? (
                <ul>
                  {profile.familyMembers.map((family, index) => (
                    <li key={index}>
                     <p> <strong>Name:</strong> {family.name} </p>
                     <p> <strong>Relation:</strong> {family.relation} </p>
                     <p><strong>Age:</strong> {family.age}</p>
                     <p> <strong>Blood Group:</strong> {family.bloodGroup} </p>
                     <p><strong>Aadhar Number:</strong> {family.aadharNumber} </p>
                     <p><strong>Working:</strong> {family.working}</p>
                     <p><strong>Employment:</strong> {family.employment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No family details available.</p>
              )}
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
