const express = require("express");
const taskRoutes = require("../src/routes/task.routes");
const authRoutes = require("../src/routes/auth.routes");
const usersRoutes = require("../src/routes/users.routes");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("../src/middleware/error.middleware");
const cors = require("cors");

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-flow-management-system.vercel.app"
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", usersRoutes);

app.use(errorMiddleware);

module.exports = app;