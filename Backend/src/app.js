const express = require("express");
const taskRoutes = require("../src/routes/task.routes");
const authRoutes = require("../src/routes/auth.routes");
const usersRoutes = require("../src/routes/users.routes");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("../src/middleware/error.middleware");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://task-flow-management-system-preet0302s-projects.vercel.app",
  "https://task-flow-management-system-3obqba3o6-preet0302s-projects.vercel.app",
  "https://task-flow-management-system-9koiz1r2z-preet0302s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", usersRoutes);

// ERROR HANDLER
app.use(errorMiddleware);

module.exports = app;
