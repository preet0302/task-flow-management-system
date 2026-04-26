const express = require("express");
const taskRoutes = require("../src/routes/task.routes");
const authRoutes = require("../src/routes/auth.routes");
const usersRoutes = require("../src/routes/users.routes");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("../src/middleware/error.middleware");
const cors = require("cors");

const app = express();


app.use(
  cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", usersRoutes);

// ERROR HANDLER
app.use(errorMiddleware);

module.exports = app;