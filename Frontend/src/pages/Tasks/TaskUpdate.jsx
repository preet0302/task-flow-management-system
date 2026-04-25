import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/slices/taskSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const TaskUpdate = ({ task, onClose }) => {
  const { loading } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    date: task.dueDate?.slice(0, 10) || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const finalData = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.date,
    };

    const res = await dispatch(updateTask({ id: task._id, data: finalData }));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Task updated successfully ✅");
      onClose();
    } else {
      toast.error(res.payload || "Update failed ❌");
    }
  };

  // const handleDelete = () => {
  //   dispatch(deleteTask(task._id));
  //   toast.error("Task deleted successfully 🗑️");
  //   onClose();
  // };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-xl w-[400px] border border-white/10">
        <h2 className="text-white text-lg mb-4">Edit Task</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 bg-[#020617] text-white rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 bg-[#020617] text-white rounded"
          />

          <select
            className="w-full p-2 bg-[#020617] text-white rounded border border-white/10 outline-none"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            className="w-full p-2 bg-[#020617] text-white rounded border border-white/10 outline-none"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600/20 text-gray-300 hover:bg-gray-600/30 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskUpdate;
