const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🔥 IMPORT VALIDATION
const { taskValidation } = require("../middleware/validator");

// 🔥 APPLY VALIDATION
router.post("/", authMiddleware, taskValidation, createTask);
router.get("/", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, taskValidation, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;