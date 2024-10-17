const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://coderchats:4abkt7L47mozM9Pb@codercluster.zhgtt.mongodb.net/devTinder");
}

module.exports = connectDB;