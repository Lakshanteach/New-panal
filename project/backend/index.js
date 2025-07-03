const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve frontend static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Mock database
let users = [
  {
    id: 1,
    username: 'user1',
    password: 'pass123',
    botLink: 'https://bot-user1.example.com',
    qrCode: 'mock_qr_code_1',
    status: 'online',
  },
];

// API to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// API to get user by id
app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// API to add new user
app.post('/api/user/add', (req, res) => {
  const { username, password, botLink } = req.body;
  if (!username || !password || !botLink) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  const newUser = {
    id: users.length + 1,
    username,
    password,
    botLink,
    qrCode: 'mock_qr_code_' + (users.length + 1),
    status: 'offline',
  };
  users.push(newUser);
  res.json({ message: 'User added', user: newUser });
});

// For any other route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
