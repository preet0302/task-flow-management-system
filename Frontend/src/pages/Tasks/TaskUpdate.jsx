import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../redux/slices/taskSlice";

const TaskUpdate = ({ task, onClose }) => {
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

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateTask({
        id: task._id,
        data: {
          ...form,
          dueDate: form.date,
        },
      })
    );

    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      
      <div className="bg-[#0f172a] p-6 rounded-xl w-[400px] border border-white/10">
        
        <h2 className="text-white text-lg mb-4">Edit Task</h2>

        <form onSubmit={handleUpdate} className="space-y-3">

          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 bg-[#020617] text-white rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 bg-[#020617] text-white rounded" />

          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input type="date" name="date" value={form.date} onChange={handleChange} />

          <div className="flex justify-between mt-4">
            
            {/* 🔴 Delete */}
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>

            <div className="flex gap-3">
              <button type="button" onClick={onClose}>
                Cancel
              </button>

              <button type="submit" className="bg-purple-600 px-4 py-1 rounded">
                Update
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskUpdate;