const mongoose = require("mongoose");

const connectToDB = async (url) =>{
    return mongoose
        .connect(url)
        .then(() => console.log("connected to database"));
}  

module.exports = connectToDB;