require('dotenv').config();
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const DB_URL = process.env.ATLASDB_URL;
const M_URL = process.env.M_URL; 


// Remove standalone main() call at top level

async function main() {
  await mongoose.connect(DB_URL || "mongodb://127.0.0.1:27017/TripTales");
}




const initDB = async()=>{
    try {
        await Listing.deleteMany({});
        initdata.data = initdata.data.map((obj) => ({ ...obj, owner:'69a9bf75b2b534ed2e36d92c'}));
        await Listing.insertMany(initdata.data);
        console.log("data was initialized");
    } catch (err) {
        console.log("Error initializing data:", err);
    }
};

main()
  .then(async () => {
    console.log("Connected to DB");
    await initDB();
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });