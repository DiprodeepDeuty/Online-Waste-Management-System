const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'))
app.use(express.json());

app.use(express.static(static_path ));
app.set("view engine", "hbs");
app.set("views", template_path );
hbs.registerPartials(partials_path );
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.get("/" , (req , res) => {
    res.render("index")
});

app.get("/index" , (req , res) => {
    res.render("index")
});

app.get("/login_page",(req ,res)=>{

    res.render("login_page")
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});