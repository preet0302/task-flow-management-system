const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/users.controller");


const { userUpdateValidation } = require("../middleware/validator");


router.get("/", authMiddleware, getUsers);


router.delete("/:id", authMiddleware, deleteUser);


router.patch("/:id", authMiddleware, updateUser);

module.exports = router;