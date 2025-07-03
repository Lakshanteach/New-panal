const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by id
app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Add user
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
