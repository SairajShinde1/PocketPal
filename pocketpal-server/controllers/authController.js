const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
var nodemailer = require("nodemailer");

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  await userModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({
        success: false,
        message: "User with this email id does not exist",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "Reset Password Link",
      text: `${process.env.FRONTEND_UI}/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
      return res.json({
        success: true,
        message: "Password Reset Email Sent",
      });
    });
  });
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.json({ success: false, message: "Error with token" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel
        .findByIdAndUpdate({ _id: id }, { password: hashedPassword })
        .then((response) => {
          res.json({ success: true, message: "Password Changed" });
        })
        .catch((error) => {
          console.log(error);
          res.json({ success: false, message: error.message });
        });
    }
  });
};

module.exports = { registerUser, userLogin, forgotPassword, resetPassword };
