const transactionModel = require("../models/transactionModel");

const addTransaction = async (req, res) => {
  const { category, amount, date, description, transactionType } = req.body;

  const userId = req.users.userId;

  try {
    const newTransaction = await transactionModel.create({
      userId,
      category,
      amount,
      date,
      description,
      transactionType,
    });

    return res.json({ success: true, message: "Transaction Added!" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.users.userId;

    const transactions = await transactionModel.find({ userId: userId });

    if (transactions) {
      return res.json({ success: true, transactions });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No transactions found" });
    }
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.query;

  try {
    const transaction = await transactionModel.findOneAndDelete({ _id: id });

    if (!transaction) {
      return res.json({ success: false, message: "Transaction not found" });
    }
    res.json({ success: true, message: "Transaction Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body, id);
    const updatedData = req.body;

    const updatedTransaction = await transactionModel.findOneAndUpdate(
      { _id: id },
      { ...updatedData },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.json({ success: false, messsage: "Transaction not found" });
    }
    res.json({ success: true, message: "Transaction Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
