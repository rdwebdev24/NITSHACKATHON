const mongoose = require("mongoose");
const colors = require("colors");

const MONGO_URL = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
module.exports = (connectDB) => {
  mongoose.connect(process.env.MONGO_URI, function (err) {
    if (err) {
      console.log(`${err} 😫`.red.bold);
    } else {
      console.log("Connected to MongoDB 🔥 ".cyan.bold);
    }
  });
};
