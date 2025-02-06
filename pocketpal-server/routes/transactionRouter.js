const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");
const authenticate = require("../middlewares/authenticate");

const transactionRouter = express.Router();

transactionRouter.post("/add-transaction", authenticate, addTransaction);
transactionRouter.get("/get-transactions", authenticate, getTransactions);
transactionRouter.delete(
  "/delete-transaction",
  authenticate,
  deleteTransaction
);
transactionRouter.put(
  "/transaction-update/:id",
  authenticate,
  updateTransaction
);

module.exports = transactionRouter;
