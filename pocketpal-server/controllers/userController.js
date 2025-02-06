const userModel = require("../models/userModel");
const goalsModel = require("../models/goalsModels");

const getUser = async (req, res) => {
  try {
    const userId = req.users.userId;

    const user = await userModel.findOne({ _id: userId });

    if (user) {
      console.log(user);
      return res.json({ success: true, user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.users.userId;

    const { newUsername, newPhone } = req.body;
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { username: newUsername, phone: newPhone } },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found!" });
    }
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error or User Update failed" });
  }
};

const updateCurrency = async (req, res) => {
  try {
    const userId = req.users.userId;
    const { newCurrency } = req.body;
    const updatedCurrency = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { currency: String(newCurrency) } },
      { new: true }
    );

    if (!updatedCurrency) {
      return res.json({ success: false, message: "User not found!" });
    }
    res.json({ success: true, message: "Currency updated successfully" });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error or Currency Update failed",
    });
  }
};

const setGoal = async (req, res) => {
  const { month, goal } = req.body;

  const userId = req.users.userId;

  try {
    const existingGoal = await goalsModel.findOne({ userId, month });

    if (existingGoal) {
      existingGoal.goal = goal;
      await existingGoal.save();
      return res.json({ success: true, message: "Goal Updated!" });
    } else {
      const newGoal = await goalsModel.create({ userId, month, goal });
      return res.json({ success: true, message: "Goal Added!" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getGoal = async (req, res) => {
  const userId = req.users.userId;
  try {
    const goals = await goalsModel.find({ userId: userId });

    if (goals) {
      return res.json({ success: true, goals });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "goals not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { getUser, updateUser, updateCurrency, setGoal, getGoal };
