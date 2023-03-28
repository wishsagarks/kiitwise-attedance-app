import { connect } from "mongoose";

const db = "mongodb+srv://freaking_wish:kiit@cluster0.mw8a7.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
