const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  getCurrentUser,
  logoutUser,
  updateProfile,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");


const {
  registerValidation,
  loginValidation,
} = require("../middleware/validator");


router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);

router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout",authMiddleware, logoutUser);
router.patch("/update-profile", authMiddleware, updateProfile);

module.exports = router;