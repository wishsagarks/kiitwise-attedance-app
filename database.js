const mongoose = require("mongoose");

const db = "mongodb+srv://freaking_wish:KIIT2024@kiitwise2.vc5s1o4.mongodb.net/kiitwise2?retryWrites=true&w=majority";


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