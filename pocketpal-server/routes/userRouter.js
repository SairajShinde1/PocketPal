const express = require("express");
const { body, validationResult } = require("express-validator");
const { registerUser, userLogin } = require("../controllers/authController");
const userRouter = express.Router();
const authenticate = require("../middlewares/authenticate");
const {
  getUser,
  updateUser,
  updateCurrency,
  setGoal,
  getGoal,
} = require("../controllers/userController");
const {
  setBudget,
  getBudget,
  deleteBudget,
} = require("../controllers/budgetController");

userRouter.post(
  "/register",

  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),

    body("phone")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be 10 digits long.")
      .isNumeric()
      .withMessage("Phone number must contain only numbers."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email.")
      .isLength({ min: 13 })
      .withMessage("Email must be at least 13 characters long."),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await registerUser(req, res);
  }
);

userRouter.post("/login", userLogin);

userRouter.get("/get-user", authenticate, getUser);
userRouter.patch("/user-update", authenticate, updateUser);
userRouter.patch("/update-currency", authenticate, updateCurrency);
userRouter.post("/set-goal", authenticate, setGoal);
userRouter.get("/get-goal", authenticate, getGoal);
userRouter.post("/set-budget", authenticate, setBudget);
userRouter.get("/get-budgets", authenticate, getBudget);
userRouter.delete("/delete-budgets", authenticate, deleteBudget);

module.exports = userRouter;
