const express = require("express");
const dbConnection = require("./config/databaseConfig");
const userModel = require("./models/userModel");
const userRouter = require("./routes/userRouter");
const transactionRouter = require("./routes/transactionRouter");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/pocketpal", userRouter);
app.use("/api/pocketpal", transactionRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server Started at port 3000");
});
