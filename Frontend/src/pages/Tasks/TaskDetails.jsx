import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
} from "react-icons/fa";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const shortDesc = (text, words = 20, chars = 120) => {
    if (!text) return "";

    const wordArr = text.split(" ");

    if (wordArr.length > 1) {
      return (
        wordArr.slice(0, words).join(" ") +
        (wordArr.length > words ? " ..." : "")
      );
    }

    return text.slice(0, chars) + (text.length > chars ? " ..." : "");
  };

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data.task || res.data);
      } catch (err) {
        toast.error("Failed to load task ❌");
      }
    };

    getTask();
  }, [id]);

  if (!task) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-[#020617] text-white min-h-screen w-full p-4 md:p-8">

      <div className="w-full max-w-6xl mx-auto">

        {/*  Back button */}
        <button
          onClick={() => navigate("/my-task")}
          className="flex items-center gap-2 
          px-4 py-2 
          bg-[#0f172a] 
          border border-white/10 
          rounded-lg 
          text-gray-300 
          hover:bg-[#1e293b] 
          hover:text-white 
          transition-all duration-200 
          hover:scale-105 
          active:scale-95 
          shadow-sm 
          mb-6"
        >
          <FaArrowLeft /> Back to My Tasks
        </button>

        {/*  HEADER */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] p-6 rounded-2xl border border-white/10 shadow-lg">
          
          <h1 className="text-2xl md:text-3xl font-semibold">
            {task.title}
          </h1>

          <p className="mt-3 text-gray-400 break-words">
            {shortDesc(task.description)}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">

            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
              <FaCheckCircle /> {task.status}
            </span>

            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
              <FaFlag /> {task.priority}
            </span>

            <span className="flex items-center gap-2 text-gray-400 text-sm">
              <FaCalendarAlt /> {task.dueDate?.slice(0, 10)}
            </span>

          </div>
        </div>

        {/* GRID */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* LEFT */}
          <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/10 shadow-md">
            <h2 className="text-gray-400 text-sm mb-3">Task Description</h2>

            <p className="text-gray-300 leading-relaxed break-words whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/10 shadow-md space-y-4">

            <h2 className="text-gray-400 text-sm mb-2">Task Details</h2>

            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-green-400">{task.status}</span>
            </div>

            <div className="flex justify-between">
              <span>Priority</span>
              <span className="text-red-400">{task.priority}</span>
            </div>

            <div className="flex justify-between">
              <span>Due Date</span>
              <span>{task.dueDate?.slice(0,10)}</span>
            </div>

            <div className="flex justify-between">
              <span>Created</span>
              <span>{task.createdAt?.slice(0,10)}</span>
            </div>

            <div className="flex justify-between">
              <span>Updated</span>
              <span>{task.updatedAt?.slice(0,10)}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TaskDetails;
















