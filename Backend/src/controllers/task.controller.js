const Task = require("../models/task.model");
const AppError = require("../utils/AppError");

// CREATE
async function createTask(req, res, next) {
  try {
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

    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("Not allowed", 403));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }
    );

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

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};


// async function createTask(req, res) {
//   const task = await Task.create({
//     ...req.body,
//     user: req.user?.id || "123", 
//   });
//   res.json(task);
// }

// async function getTasks(req, res) {
//   let tasks;

//   if (req.user?.role === "admin") {
//     tasks = await Task.find();
//   } else {
//     tasks = await Task.find({ user: req.user?.id || "123" });
//   }

//   res.json(tasks);
// }

// async function updateTask(req, res) {
//   const task = await Task.findById(req.params.id);

//   if (!task) {
//     return res.status(404).json({ message: "Not found" });
//   }

//   if (
//     req.user?.role !== "admin" &&
//     task.user.toString() !== (req.user?.id || "123")
//   ) {
//     return res.status(403).json({ message: "Not allowed" });
//   }

//   const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.json(updated);
// }

// async function deleteTask(req, res) {
//   const task = await Task.findById(req.params.id);

//   if (!task) return res.status(404).json({ message: "Not found" });

//   if (
//     req.user?.role !== "admin" &&
//     task.user.toString() !== (req.user?.id || "123")
//   ) {
//     return res.status(403).json({ message: "Not allowed" });
//   }

//   await Task.findByIdAndDelete(req.params.id);

//   res.json({ message: "Deleted" });
// }