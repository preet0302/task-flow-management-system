import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../redux/slices/taskSlice";
import TaskUpdate from "./TaskUpdate";
import { FaEdit, FaTrash, FaTasks } from "react-icons/fa";

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

      await dispatch(deleteTask(id));
      dispatch(fetchTasks());

      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 text-white bg-[#020617] min-h-screen space-y-6 w-full">
      
      {/* 🔥 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <FaTasks /> My Tasks
          </h1>
          <p className="text-sm text-gray-400">
            Manage and track your tasks.
          </p>
        </div>
      </div>

      {/* 🔥 Table */}
      <div className="bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden">

        {/* Header Row */}
        <div className="grid grid-cols-5 p-4 text-gray-400 text-sm border-b border-white/10">
          <span>Title</span>
          <span>Status</span>
          <span>Due Date</span>
          <span>Priority</span>
          <span>Actions</span>
        </div>

        {/* 🔥 Empty State */}
        {tasks.length === 0 && (
          <p className="p-4 text-gray-400">No tasks found</p>
        )}

        {/* Rows */}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="grid grid-cols-5 p-4 items-center border-b border-white/10 hover:bg-white/5 transition"
          >
            <span className="font-medium">{task.title}</span>

            <span
              className={`px-2 py-1 rounded text-xs w-fit ${getStatusColor(task.status)}`}
            >
              {task.status}
            </span>

            <span>
              {task.dueDate?.slice(0, 10)}
            </span>

            <span
              className={`px-2 py-1 rounded text-xs w-fit ${getPriorityColor(task.priority)}`}
            >
              {task.priority}
            </span>

            {/* 🔥 Actions */}
            <div className="flex gap-4 text-lg">
              
              {/* Edit */}
              <button
                onClick={() => setSelectedTask(task)}
                className="text-blue-400 hover:scale-110 transition"
              >
                <FaEdit />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-400 hover:scale-110 transition"
              >
                {deletingId === task._id ? "..." : <FaTrash />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Modal */}
      {selectedTask && (
        <TaskUpdate
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;