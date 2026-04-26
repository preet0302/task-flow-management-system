const User = require("../models/users.model");
const AppError = require("../utils/AppError");


const getUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(new AppError("Not allowed", 403));
    }

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(new AppError("Not allowed", 403));
    }

    if (req.user._id.toString() === req.params.id) {
      return next(new AppError("You cannot delete yourself", 400));
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};


const updateUser = async (req, res, next) => {
  
  try {
    
    if (req.user.role !== "admin") {
      return next(new AppError("Not allowed", 403));
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new AppError("No data provided to update", 400));
    }

    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;

    
    if (req.body.role === "user" || req.body.role === "admin") {
      updateData.role = req.body.role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
};
