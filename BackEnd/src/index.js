const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login_page.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});