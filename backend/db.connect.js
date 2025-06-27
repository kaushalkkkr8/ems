const mongo = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const mongoUri = process.env.MONGO;


const connection = mongo.connect(mongoUri)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(error => {
    console.error("Error connecting to database", error);
  });

module.exports = {connection};