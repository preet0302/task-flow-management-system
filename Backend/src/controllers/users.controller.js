const User = require("../models/users.model");
const AppError = require("../utils/AppError");

// GET USERS
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

// DELETE USER
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

// UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(new AppError("Not allowed", 403));
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
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
