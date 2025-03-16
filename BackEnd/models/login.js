const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy user data
const users = [
    {
        id: 1,
        username: 'user1',
        password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4zF4zF4zF4zF4zF4zF4' // hashed password for 'password123'
    }
];

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});