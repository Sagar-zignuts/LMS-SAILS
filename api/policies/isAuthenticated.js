const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  AuthMiddleware: async function (req, res, proceed) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token is not valid" });
    }

    try {
      const decoder = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoder;
      return proceed();
    } catch (error) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid token", error });
    }
  },

  isAdmin : async function(req, res, proceed){
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Required admin login" });
    }
    proceed();
  } 
};