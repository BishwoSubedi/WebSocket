const mongoose = require("mongoose");

async function connectDb() {
  await mongoose.connect(
    "mongodb+srv://bishwosubedu:4uOmEKTrptLvUvzX@cluster0.btjuc48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connected")

}

module.exports=connectDb