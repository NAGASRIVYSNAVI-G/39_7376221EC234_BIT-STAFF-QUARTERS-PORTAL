import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAnnouncements.css';
import picture3 from './assets/Houselogo.png';

function AdminAnnouncements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/announcements')
      .then(response => setAnnouncements(response.data))
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  const goToLogin = () => {
    navigate('/');
  };

  const postAnnouncement = () => {
    if (editIndex !== null) {
      axios.patch(`http://localhost:5001/api/announcements/${editId}`, { message: newMessage })
        .then(response => {
          const updatedAnnouncements = announcements.map((announcement, index) => (
            index === editIndex ? response.data : announcement
          ));
          setAnnouncements(updatedAnnouncements);
          setEditIndex(null);
          setEditId(null);
          setNewMessage('');
        })
        .catch(error => console.error('Error updating announcement:', error));
    } else {
      axios.post('http://localhost:5001/api/announcements', { message: newMessage })
        .then(response => {
          setAnnouncements([...announcements, response.data]);
          setNewMessage('');
        })
        .catch(error => console.error('Error posting announcement:', error));
    }
  };

  const handleEdit = (index) => {
    setNewMessage(announcements[index].message);
    setEditIndex(index);
    setEditId(announcements[index]._id);
  };

  const deleteAnnouncement = (id, index) => {
    axios.delete(`http://localhost:5001/api/announcements/${id}`)
      .then(() => {
        setAnnouncements(announcements.filter((_, i) => i !== index));
      })
      .catch(error => console.error('Error deleting announcement:', error));
  };

  const incrementViews = (id, index) => {
    axios.patch(`http://localhost:5001/api/announcements/${id}/views`)
      .then(response => {
        const updatedAnnouncements = announcements.map((announcement, i) => (
          i === index ? response.data : announcement
        ));
        setAnnouncements(updatedAnnouncements);
      })
      .catch(error => console.error('Error incrementing views:', error));
  };

  return (
    <div className="adminprofile-container">
      <aside className="sidebar">
        <button className="adminback-button" onClick={goToLogin}>
          &#8592;
        </button>
        <div className="logo">
          <img src={picture3} alt="Logo" />
        </div>
        <ul className="menu">
          <li className="menu-item">Quarters details</li>
          <li className="menu-item" onClick={() => navigate('/addDetails')}>Add Details</li>
          <li className="menu-item" onClick={() => navigate('/Admincomplaint')}>Complain registration</li>
          <li className="menu-item" onClick={() => navigate('/AdminGuest')}>Guest check in details</li>
          <li className="menu-item" onClick={() => navigate('/AdminInmate')}>Inmates checkout details</li>
          <li className="menu-item active" onClick={() => navigate('/AdminAnnouncements')}>Announcements</li>
          <li className="menu-item" onClick={() => navigate("/admindetails")}>Add admin</li>
          <br />
          <br />
          <li className="logout" onClick={() => navigate('/')}>Log out</li>
        </ul>
      </aside>
      <div className="announcements-container">
        <div className="announcement-input">
          <textarea
            placeholder="Enter your announcement here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={postAnnouncement}>
            {editIndex !== null ? 'Update Announcement' : 'Post Announcement'}
          </button>
        </div>
        <div className="announcement-list">
          {announcements.map((announcement, index) => (
            <div
              key={announcement._id}
              className="announcement-item"
              onClick={() => incrementViews(announcement._id, index)}
            >
              <p>{announcement.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncements;
