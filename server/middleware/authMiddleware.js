const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/generateToken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      message: "Access denied. No token provided." 
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      message: "Invalid token. Please log in again." 
    });
  }
};

module.exports = authMiddleware;
