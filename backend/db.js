// import mongoose from "mongoose";
const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sumanguptait:1234@cluster0.kmqrwym.mongodb.net/DivinDineInMern?retryWrites=true&w=majority";
//   "mongodb://sumanguptait:1234@ac-uvuvdan-shard-00-00.kmqrwym.mongodb.net:27017,ac-uvuvdan-shard-00-01.kmqrwym.mongodb.net:27017,ac-uvuvdan-shard-00-02.kmqrwym.mongodb.net:27017/DivinDineInMern?ssl=true&replicaSet=atlas-ocrn7l-shard-0&authSource=admin&retryWrites=true&w=majority"

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Mongo connected");

    const foodItems = mongoose.connection.db.collection("food_items");
    const data = await foodItems.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("food_Categories");
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;
    // console.log(global.food_items);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = mongoDB;
