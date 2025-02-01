require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
connectDB();
 
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/guests', require('./routes/guests'));
app.use('/api/inmatecheckouts', require('./routes/inmates'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/add', require('./routes/addDetails'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/admins', require('./routes/admins'));
 
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
