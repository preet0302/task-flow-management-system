import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../redux/slices/taskSlice";
import TaskUpdate from "./TaskUpdate";
import { FaEdit, FaTrash, FaTasks } from "react-icons/fa";
import { toast } from "react-toastify";

const getStatusColor = (status) => {
  if (status === "Pending") return "bg-yellow-500/20 text-yellow-400";
  if (status === "In Progress") return "bg-blue-500/20 text-blue-400";
  if (status === "Completed") return "bg-green-500/20 text-green-400";
};

const getPriorityColor = (priority) => {
  if (priority === "High") return "bg-red-500/20 text-red-400";
  if (priority === "Medium") return "bg-yellow-500/20 text-yellow-400";
  if (priority === "Low") return "bg-blue-500/20 text-blue-400";
};

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  const [selectedTask, setSelectedTask] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔥 DELETE WITH CONFIRMATION + LOADING
  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      setDeletingId(id);

      const res = await dispatch(deleteTask(id));

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Task deleted successfully 🗑️");
      } else {
        toast.error(res.payload || "Delete failed ❌");
      }

      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 md:p-6 text-white bg-[#020617] h-full space-y-4 md:space-y-6 w-full">
      {/* 🔥 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <FaTasks /> My Tasks
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            Manage and track your tasks.
          </p>
        </div>
      </div>

      {/* 🔥 Table */}
      <div className="mt-2 md:mt-4 bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden">
        {/* Header Row (desktop only) */}
        <div className="hidden md:grid grid-cols-5 p-4 text-gray-400 text-sm border-b border-white/10">
          <span>Title</span>
          <span>Status</span>
          <span>Due Date</span>
          <span>Priority</span>
          <span>Actions</span>
        </div>

        {/* Empty */}
        {tasks.length === 0 && (
          <p className="p-4 text-gray-400">No tasks found</p>
        )}

        {/* Rows */}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col gap-3 md:grid md:grid-cols-5 p-4 text-xs md:text-sm border-b border-white/10"
          >
            {/* Title */}
            <div className="flex justify-between items-center md:block">
              <span className="text-gray-500 md:hidden">Title</span>
              <span className="font-medium truncate">{task.title}</span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center md:block">
              <span className="text-gray-500 md:hidden">Status</span>
              <span
                className={`px-2 py-1 rounded text-xs w-fit ${getStatusColor(task.status)}`}
              >
                {task.status}
              </span>
            </div>

            {/* Date */}
            <div className="flex justify-between items-center md:block">
              <span className="text-gray-500 md:hidden">Date</span>
              <span className="truncate">{task.dueDate?.slice(0, 10)}</span>
            </div>

            {/* Priority */}
            <div className="flex justify-between items-center md:block">
              <span className="text-gray-500 md:hidden">Priority</span>
              <span
                className={`px-2 py-1 rounded text-xs w-fit ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center md:flex md:gap-3 mt-1 md:mt-0">
              <span className="text-gray-500 md:hidden">Actions</span>

              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base md:justify-start">
                <button
                  onClick={() => setSelectedTask(task)}
                  className="px-1.5 py-1 md:px-2 md:py-1 rounded-md text-blue-400 hover:bg-blue-500/10 transition"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-1.5 py-1 md:px-2 md:py-1 rounded-md text-red-400 hover:bg-red-500/10 transition"
                >
                  {deletingId === task._id ? "..." : <FaTrash />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Modal */}
      {selectedTask && (
        <TaskUpdate task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default TaskList;
