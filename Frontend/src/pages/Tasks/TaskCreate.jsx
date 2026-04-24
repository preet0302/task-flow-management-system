import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slices/taskSlice";

const TaskCreate = () => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "",
    date: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
  ...task,
  priority: task.priority || "Low", // 🔥 default fix
  dueDate: task.date,
};

    delete finalData.date;

    dispatch(createTask(finalData));

    // 🔄 reset form
    setTask({
      title: "",
      description: "",
      status: "Pending",
      priority: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-b from-[#020617] to-[#020617] text-white p-6">
      
      <div className="w-full bg-[#0f172a]/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg">
        
        <h1 className="text-2xl font-semibold mb-1">Create New Task</h1>
        <p className="text-sm text-gray-400 mb-6">
          Add a new task and keep track of progress.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10 h-28"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            
            <div>
              <label className="text-sm text-gray-400">Status</label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
              >
                <option value="">Select priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Due Date</label>
              <input
                type="date"
                name="date"
                value={task.date}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500"
            >
              Create Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskCreate;