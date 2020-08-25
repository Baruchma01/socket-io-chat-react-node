const mongoose = require("mongoose");
const db = process.env.MONGOURL;

const connectDB = async () => {
  try {
    await mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
