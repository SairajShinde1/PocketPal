const budgetModel = require("../models/budgetModel");

const setBudget = async (req, res) => {
  const { category, budgetAmount } = req.body;

  const userId = req.users.userId;

  try {
    const newBudget = await budgetModel.create({
      userId,
      category,
      budgetAmount,
    });
    return res.json({ success: true, message: "Budget Added!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getBudget = async (req, res) => {
  const userId = req.users.userId;
  try {
    const budgets = await budgetModel.find({ userId: userId });

    if (budgets) {
      return res.json({ success: true, budgets });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "budgets not found for you" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteBudget = async (req, res) => {
  const userId = req.users.userId;
  const { category, id } = req.query;
  console.log(req.query);
  try {
    const budget = await budgetModel.findOneAndDelete({
      _id: id,
      category,
    });

    if (!budget) {
      return res.json({ success: false, message: "Budget not found" });
    }
    return res.json({ success: true, message: "Budget deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { setBudget, getBudget, deleteBudget };
