const mongoose = require("mongoose");

const db = "mongodb+srv://freaking_wish:kiit@cluster0.mw8a7.mongodb.net/kisap?retryWrites=true&w=majority";


const connectDB = async () => {
    try {
        // mongoose.set('strictQuery', false),
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("DataBase Connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;