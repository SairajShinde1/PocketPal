const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "No token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.users = decoded;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

module.exports = authenticate;
