const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

module.exports = {
  AuthMiddleware: function (req, res, proceed) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token is not valid" });
    }

    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoder;
      return proceed();
    } catch (error) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid token", error });
    }
  },

  restrictedToAdmin: function (req, res, proceed) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    return proceed();
  },
};