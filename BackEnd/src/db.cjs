// filepath: c:\Users\Abhrajyoti Patra\OneDrive\Desktop\online waste management system\Online-Waste-Management-System\BackEnd\src\db.cjs
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/onlineWasteManagementSystem",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection successful");
}).catch((e) =>{
    console.log("No connection", e);
})