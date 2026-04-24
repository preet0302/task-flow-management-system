

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");

// 🔥 Get all users (admin only)
router.get("/", authMiddleware, getUsers);

// 🔥 Delete user (admin only)
router.delete("/:id", authMiddleware, deleteUser);

// 🔥 Update user (admin only)
router.patch("/:id", authMiddleware, updateUser);

module.exports = router;