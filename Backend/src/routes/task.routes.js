const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getSingleTask,
} = require("../controllers/task.controller");

const authMiddleware = require("../middleware/auth.middleware");


const { taskValidation } = require("../middleware/validator");


router.post("/", authMiddleware, taskValidation, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getSingleTask);
router.patch("/:id", authMiddleware, taskValidation, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;