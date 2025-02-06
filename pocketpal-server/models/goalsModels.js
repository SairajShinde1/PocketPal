const mongoose = require("mongoose");

const savingsGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const goalsModel = mongoose.model("savingsGoals", savingsGoalSchema);

module.exports = goalsModel;
