const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      phone,
      email,
      password: hashPassword,
    });

    res.json({ success: true, message: "User Registered Successfully!" });

    console.log("User Registered!");
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Email is already Registered" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_SECRET
        );
        res.cookie("token", token);
        return res.json({
          success: true,
          message: "Logged In",
          token,
        });
      } else {
        console.log("Invalid Credentials");
        res.json({ success: false, message: "Invalid Credentials" });
      }
    } else {
      console.log("Invalid Credentials");
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, userLogin };
