const Task = require("../models/task.model");

// CREATE
async function createTask(req, res) {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET (ROLE BASED)
async function getTasks(req, res) {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ user: req.user._id });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE
async function updateTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 ownership check
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 🔄 update
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // 🔥 important
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE
async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 ownership check
    if (
      req.user.role !== "admin" &&
      task.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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