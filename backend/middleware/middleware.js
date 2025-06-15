
const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Authorization token is missing",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal authentication error",
    });
  }
};


module.exports = { middleware };