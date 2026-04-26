const Task = require("../models/task.model");
const AppError = require("../utils/AppError");

// CREATE
async function createTask(req, res, next) {
  try {
    
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new AppError("Title and description are required", 400));
    }

    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    next(err);
  }
}

// GET
async function getTasks(req, res, next) {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "name email");
    } else {
      tasks = await Task.find({ user: req.user._id });
    }

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    next(err);
  }
}

// UPDATE
async function updateTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

   
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new AppError("No data provided to update", 400));
    }

    
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Not allowed", 403));
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Not allowed", 403));
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

// GET SINGLE
async function getSingleTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new AppError("Task not found", 404));
    }

    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Not allowed", 403));
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getSingleTask,
};
