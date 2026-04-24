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

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", logoutUser);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
