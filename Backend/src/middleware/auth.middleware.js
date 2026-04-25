const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const AppError = require("../utils/AppError");

async function authMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new AppError("Unauthorized, please login", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    req.user = user;
    next();

  } catch (err) {
    return next(new AppError("Invalid token, please login again", 401));
  }
}

module.exports = authMiddleware;