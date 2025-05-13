// import mongoose from "mongoose";
const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
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
