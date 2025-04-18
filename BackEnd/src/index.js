const express = require("express");
const path = require("path");
const app = express();
// const bodyParser = require("body-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
require("./DB/db");

const Login = require("./models/login");  // import login model


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(static_path ));
app.set("view engine", "hbs");
app.set("views", template_path );
hbs.registerPartials(partials_path );
app.use(express.static(path.join(__dirname, 'public')));


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

app.get("/login",(req ,res)=>{

    res.render("login")
});

app.get("/service",(req ,res)=>{

    res.render("service")
});

app.get('/confirmation', (req, res) => {
    res.render('confirmation');
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
app.post("/login",async(req ,res)=>{
    try{

       const password = req.body.password;
       const cpassword = req.body.confirmpassword;
       console.log("Request body:", req.body);
       if(password === cpassword){

           const registerEmployee = new Login({
               text :req.body.text,
               email : req.body.email,
               password :password,
               confirmpassword:cpassword

           })
              
          const registred = await registerEmployee.save();
          res.status(201).render("home_page", { message: "Registration successful!" });
         
       }else{
           res.send("password are not match")
       }
       
    }catch (error) {
       res.status(400).send(error)
    }
    
})

// Create new user (Sign‑up) on a separate route
app.post("/register", async (req, res) => {
    try {
        const { text, email, password, confirmpassword } = req.body;
        if (password === confirmpassword) {
            const registerEmployee = new Login({
                text,
                email,
                password,
                confirmpassword
            });
            await registerEmployee.save();
            // Redirect to login page after registration
            res.redirect("/login");
        } else {
            res.send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
//login check

app.post("/log", async (req, res) => {
   try {
       const email = req.body.email;
       const password = req.body.password;
       console.log("Request body:", req.body);
       const useremail = await Login.findOne({ email: email });
       
       if (useremail.password === password) {
           // Set cookie or session to persist the user session
           res.cookie("userEmail", useremail.email, {
               httpOnly: true
           });
           
           // Pass the user data to the template
           res.status(201).render("home_page", { user: useremail });
       } else {
           res.send("Password is not matching");
       }
   } catch (error) {
       res.status(400).send("Invalid Email");
   }
});


// const bcrypt = require("bcryptjs");

// app.post("/login", async (req, res) => {
//     try {
//         const { text, email, password, confirmpassword } = req.body;
//         console.log("Request body:", req.body);

//         if (password !== confirmpassword) {
//             return res.send("Passwords do not match");
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save to DB
//         const registerEmployee = new Login({
//             text,
//             email,
//             password: hashedPassword,
//             confirmpassword: hashedPassword
//         });

//         await registerEmployee.save();
//         res.status(201).render("home_page", { message: "Registration successful!" });

//     } catch (error) {
//         res.status(400).send("Error during registration: " + error.message);
//     }
// });




// app.post("/log", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // console.log("Request body:", req.body);
//         const user = await Login.findOne({ email });

//         if (user && await bcrypt.compare(password, user.password)) {
//             res.cookie("userEmail", user.email, {
//                 httpOnly: true
//             });

//             res.status(201).render("index", { user });
//         } else {
//             res.send("Invalid email or password");
//         }

//     } catch (error) {
//         res.status(400).send("Login error: " + error.message);
//     }
// });






const jwt = require("jsonwebtoken");

const createToken = async()=> {
   const token = await jwt.sign({_id:"670cbdf306dcf37c0dafba01"},"mygfcvxdszxawertfhyujkiokdswqacvgfdreuyhg");
   console.log(token);

   const userVar = await jwt.verify(token, "mygfcvxdszxawertfhyujkiokdswqacvgfdreuyhg");
   console.log(userVar);
}

createToken();


// const router = express.Router();
// const { WasteItem, UserWasteSelection } = require('./models/service'); // adjust path

// router.post('/api/confirmation', async (req, res) => {
//     try {
//         const { wasteType, wasteAmount, pickupLocation, pickupDate, additionalNotes } = req.body;

//         const wasteItem = await WasteItem.findOne({ name: wasteType });
//         if (!wasteItem) return res.status(404).json({ error: 'Waste type not found' });

//         const userSelection = new UserWasteSelection({
//             wasteItems: [{
//                 wasteItem: wasteItem._id,
//                 quantityInKg: parseFloat(wasteAmount)
//             }],
//             pickupLocation,
//             pickupDate,
//             additionalNotes
//         });

//         await userSelection.calculateTotalPrice();
//         await userSelection.save();

//         res.status(200).json({ message: 'Saved successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;

//same things without route

// const { WasteItem, UserWasteSelection } = require('./models/service'); // already imported above, okay to keep here again

// app.post('/api/submit-confirmation', async (req, res) => {
//     try {
//         const { wasteType, wasteAmount, pickupLocation, pickupDate, additionalNotes, userEmail } = req.body;

//         const wasteItem = await WasteItem.findOne({ name: wasteType });
//         if (!wasteItem) return res.status(404).json({ error: 'Waste type not found' });

//         const userSelection = new UserWasteSelection({
//             wasteItems: [{
//                 wasteItem: wasteItem._id,
//                 quantityInKg: parseFloat(wasteAmount)
//             }],
//             pickupLocation,
//             pickupDate,
//             additionalNotes
//         });

//         await userSelection.calculateTotalPrice();
//         await userSelection.save();

//         res.status(200).json({ message: 'Saved successfully' });
//     } catch (err) {
//         console.error("Error saving to DB:", err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


//Email sending functionality for later work

// const express = require('express');
// const router = express.Router();
// const nodemailer = require("nodemailer");
// const { WasteItem, UserWasteSelection } = require('./models/service'); // Update path as needed

// router.post('/api/submit-confirmation', async (req, res) => {
//     try {
//         const {
//             wasteType,
//             wasteAmount,
//             pickupLocation,
//             pickupDate,
//             additionalNotes,
//             userEmail
//         } = req.body;

//         // 1. Find waste item from DB
//         const wasteItem = await WasteItem.findOne({ name: wasteType });
//         if (!wasteItem) return res.status(404).json({ error: 'Waste type not found' });

//         // 2. Create new user selection
//         const userSelection = new UserWasteSelection({
//             wasteItems: [{
//                 wasteItem: wasteItem._id,
//                 quantityInKg: parseFloat(wasteAmount)
//             }],
//             pickupLocation,
//             pickupDate,
//             additionalNotes
//         });

//         // 3. Calculate total price
//         await userSelection.calculateTotalPrice();
//         await userSelection.save();

//         // 4. Send confirmation email
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'your-email@gmail.com',            // replace with your email
//                 pass: 'your-app-password'                // replace with your app password
//             }
//         });

//         const mailOptions = {
//             from: 'your-email@gmail.com',
//             to: userEmail,
//             subject: 'Waste Pickup Request Confirmed ✅',
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 10px;">
//                     <h2>Hi,</h2>
//                     <p>Your waste pickup request has been confirmed with the following details:</p>
//                     <ul>
//                         <li><strong>Waste Type:</strong> ${wasteType}</li>
//                         <li><strong>Amount:</strong> ${wasteAmount} kg</li>
//                         <li><strong>Pickup Location:</strong> ${pickupLocation}</li>
//                         <li><strong>Pickup Date:</strong> ${new Date(pickupDate).toDateString()}</li>
//                         <li><strong>Additional Notes:</strong> ${additionalNotes || 'None'}</li>
//                         <li><strong>Total Estimated Price:</strong> ₹${userSelection.totalPrice.toFixed(2)}</li>
//                     </ul>
//                     <p>Thank you for using our waste management service! 🌱</p>
//                 </div>
//             `
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Saved and email sent' });

//     } catch (err) {
//         console.error("Error in submit-confirmation:", err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;


const { WasteItem, UserWasteSelection } = require('./models/service'); // adjust path as needed

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'hbs');

// POST - Form submission
app.post('/submit-service', async (req, res) => {
    const { wasteType, wasteAmount, pickupLocation, pickupDate, additionalNotes } = req.body;

    const wasteItem = await WasteItem.findOne({ name: wasteType });
    if (!wasteItem) {
        return res.status(400).send("Invalid waste type");
    }

    const newService = new UserWasteSelection({
        wasteItems: [
            {
                wasteItem: wasteItem._id,
                quantityInKg: Number(wasteAmount)
            }
        ],
        pickupLocation,
        pickupDate,
        additionalNotes
    });

    await newService.calculateTotalPrice();
    await newService.save();

    res.render('confirmation', {
        wasteType,
        wasteAmount,
        pickupLocation,
        pickupDate,
        additionalNotes,
        totalPrice: newService.totalPrice
    });
});


//confirmation page 

// app.post('/submit-service', (req, res) => {
//     const data = req.body;  // ✅ this should work after body-parser
//     console.log(data);
//     res.status(200).json({ message: "Received!" });
// });

// Endpoint to handle POST request from confirmation page
app.post('/confirmation', async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const { wasteType, wasteAmount, pickupLocation, pickupDate, additionalNotes } = req.body;

        const wasteItem = await WasteItem.findOne({ name: wasteType });
        if (!wasteItem) return res.status(404).json({ error: 'Waste type not found' });

        const newRequest = new UserWasteSelection({
            wasteItems: [{
                wasteItem: wasteItem._id,
                quantityInKg: parseFloat(wasteAmount)
            }],
            pickupLocation,
            pickupDate,
            additionalNotes,
            createdAt: new Date()
        });

        await newRequest.calculateTotalPrice();
        await newRequest.save();

        res.status(200).json({ message: 'Request saved successfully' });
    } 
    // catch (error) {
    //     console.error('Error saving confirmation:', error);
    //     res.status(500).json({ error: 'Failed to save request' });
    // }
    catch (error) {
        console.error("Error saving confirmation:", error); 
        res.status(500).json({ error: error.message || 'Failed to save request' });
    }
});
