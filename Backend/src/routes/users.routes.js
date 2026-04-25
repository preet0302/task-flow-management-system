const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");

// 🔥 IMPORT VALIDATION
const { userUpdateValidation } = require("../middleware/validator");

// GET USERS
router.get("/", authMiddleware, getUsers);

// DELETE USER
router.delete("/:id", authMiddleware, deleteUser);

// UPDATE USER (with validation)
router.patch("/:id", authMiddleware, userUpdateValidation, updateUser);

module.exports = router;