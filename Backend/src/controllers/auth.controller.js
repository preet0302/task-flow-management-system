const authmodel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExist = await authmodel.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        message: "Email already exists, Please Login first",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authmodel.create({
      // ✅ fix
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(201).json({
      message: "User Create Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await authmodel.findOne({ email }); // ✅ fix

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 👈 IMPORTANT
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
}
async function getCurrentUser(req, res) {
  const user = await authmodel.findById(req.user.id).select("-password");
  res.json({ user });
}
async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
}
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await authmodel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;

    await user.save();

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = {
  registerController,
  loginController,
  getCurrentUser,
  logoutUser,
  updateProfile,
};
