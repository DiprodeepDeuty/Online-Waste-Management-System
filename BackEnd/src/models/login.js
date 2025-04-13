const mongoose = require("mongoose");
 const employeeSchema = new mongoose.Schema({
    text :{
        type:String   
    },
    email :{
        type:String,
        unique:true    
    },
    password :{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    profileImage: { 
        type: String, 
        default: "css/img/default-profile.jpg" } // Default image path
    
 })

 const Login = new mongoose.model("Users",employeeSchema);
 module.exports = Login;