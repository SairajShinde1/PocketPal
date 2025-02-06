const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
