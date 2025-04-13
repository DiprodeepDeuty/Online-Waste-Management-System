const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/OWMS", {
    useNewUrlParser: true,        
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection successful");  
}).catch((e) => {
    console.log("No connection");         
    console.error(e);                     
});