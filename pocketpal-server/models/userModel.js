const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Username must be at least 3 characters long"],
  },
  phone: {
    type: Number,
    required: true,
    minLength: [10, "Contact no. must be at least 10 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [13, "Emali must be at least 13 characters"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [6, "Password must be at least 6 characters long"],
  },
  currency: { type: String, default: "₹" },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
