import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import ComplaintRegistration from './ComplaintRegistration';
import GuestCheckInDetails from './GuestCheckInDetails';
import InmatesCheckoutDetails from './InmatesCheckoutDetails';
import Announcements from './Announcements';
import Newcomplaint from './Newcomplaint';
import Adminprofile from './Adminprofile';
import Admincomplaint from './Admincomplaint';
import AdminInmate from './AdminInmate';
import AdminGuest from './AdminGuest';
import AdminAnnouncements from './AdminAnnouncements';
import Newguest from './Newguest';
import Newinmate from './Newinmate';
import AddDetails from './AddDetails';
import AdminDetails from './AdminDetails';
import NewAdmin from './NewAdmin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complaint-registration" element={<ComplaintRegistration />} />
        <Route path="/guest-check-in-details" element={<GuestCheckInDetails />} />
        <Route path="/inmates-checkout-details" element={<InmatesCheckoutDetails />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/admindetails" element={<AdminDetails />} />
        <Route path="/newcomplaint" element={<Newcomplaint />} />
        <Route path="/addDetails" element={<AddDetails/>} />
        <Route path="/adminprofile" element={<Adminprofile />} />
        <Route path="/admincomplaint" element={<Admincomplaint />} />
        <Route path="/adminInmate" element={<AdminInmate />} />
        <Route path="/adminGuest" element={<AdminGuest />} />
        <Route path="/adminAnnouncements" element={<AdminAnnouncements />} />
        <Route path="/Newguest" element={<Newguest />} />
        <Route path="/Newinamte" element={<Newinmate />} />
        <Route path="/Newadmin" element={<NewAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
