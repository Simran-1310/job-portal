const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected successfully");
  } catch (error) {
    console.log("DB ERROR:", error);
    process.exit(1);  // important
  }
};

module.exports = connectDb;