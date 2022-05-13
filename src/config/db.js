const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb+srv://kickstarter:kickstarter123@cluster0.xlx03.mongodb.net/kickstarter").then(() => console.log("MongoDb is connected.")).catch((err) => console.log(err))
};

module.exports = connect;
