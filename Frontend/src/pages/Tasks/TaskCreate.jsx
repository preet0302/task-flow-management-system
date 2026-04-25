import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TaskCreate = () => {
  const { loading } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...task,
      priority: task.priority || "Low", // 🔥 default fix
      dueDate: task.date,
    };

    delete finalData.date;

    const res = await dispatch(createTask(finalData));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Task created successfully ✅");
      navigate("/my-task");
    } else {
      toast.error(res.payload || "Task creation failed ❌");
    }

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
    <div className="h-full w-full flex justify-center bg-[#020617] text-white p-4 md:p-6">
      <div className="w-full max-w-3xl bg-[#0f172a]/90 backdrop-blur-lg border border-white/10 rounded-2xl p-5 md:p-8 shadow-lg">
        <h1 className="text-xl md:text-2xl font-semibold mb-1">
          Create New Task
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6">
          Add a new task and keep track of progress.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Title */}
          <div>
            <label className="text-xs md:text-sm text-gray-400">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs md:text-sm text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10 h-24 md:h-28"
            />
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div>
              <label className="text-xs md:text-sm text-gray-400">Status</label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="text-xs md:text-sm text-gray-400">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10"
              >
                <option value="">Select priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="text-xs md:text-sm text-gray-400">
                Due Date
              </label>
              <input
                type="date"
                name="date"
                value={task.date}
                onChange={handleChange}
                className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 md:pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-sm"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreate;
