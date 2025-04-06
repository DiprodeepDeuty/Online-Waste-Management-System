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

app.get("/home_page" , (req , res) => {
    res.render("home_page")
});

app.get("/index" , (req , res) => {
    res.render("index")
});

app.get("/home_page" , (req , res) => {
    res.render("home_page")
});

app.get("/login_page",(req ,res)=>{

    res.render("login_page")
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Middleware to check user login session and make it available for all views
app.use(async (req, res, next) => {
    try {
        if (req.cookies.userEmail) {
            const user = await Login.findOne({ email: req.cookies.userEmail });
            if (user) {
                res.locals.user = user; // Make user data available in all views
            } else {
                res.locals.user = null;
            }
        } else {
            res.locals.user = null; // If no cookie, set user to null
        }
    } catch (error) {
        res.locals.user = null; // On error, also set to null
    }
    next();
});

//creatte a new user in database
app.post("/login_page",async(req ,res)=>{
    try{

       const password = req.body.password;
       const cpassword = req.body.confirmpassword;

       if(password === cpassword){

           const registerEmployee = new Login({
               text :req.body.text,
               email : req.body.email,
               password :password,
               confirmpassword:cpassword

           })
              
          const registred = await registerEmployee.save();
          res.status(201).render("index");
         
          


       }else{
           res.send("password are not match")
       }
       
    }catch (error) {
       res.status(400).send(error)
    }
    
})
//login check

app.post("/log", async (req, res) => {
   try {
       const email = req.body.email;
       const password = req.body.password;

       const useremail = await Login.findOne({ email: email });
       
       if (useremail.password === password) {
           // Set cookie or session to persist the user session
           res.cookie("userEmail", useremail.email, {
               httpOnly: true
           });
           
           // Pass the user data to the template
           res.status(201).render("index", { user: useremail });
       } else {
           res.send("Password is not matching");
       }
   } catch (error) {
       res.status(400).send("Invalid Email");
   }
});



const jwt = require("jsonwebtoken");

const createToken = async()=> {
   const token = await jwt.sign({_id:"670cbdf306dcf37c0dafba01"},"mygfcvxdszxawertfhyujkiokdswqacvgfdreuyhg");
   console.log(token);

   const userVar = await jwt.verify(token, "mygfcvxdszxawertfhyujkiokdswqacvgfdreuyhg");
   console.log(userVar);
}

createToken();

