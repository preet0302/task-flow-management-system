import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setLoading } from "../../redux/slices/taskSlice";
import RightPanel from "../../components/user/RightPanel";
import { useNavigate } from "react-router-dom";
import {
  FiClipboard,
  FiClock,
  FiActivity,
  FiCheckCircle,
} from "react-icons/fi";
import api from "../../api/axios";
import { toast } from "react-toastify";

const UserStats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch(setLoading(true));

        const res = await api.get("/tasks");

        dispatch(fetchTasks(res.data.tasks));

      } catch (err) {
        toast.error("Failed to load dashboard data ❌");
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTasks();
  }, [dispatch]);

  // counts
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="p-4 md:p-6 text-white space-y-6 bg-[#020617] h-full">
      
      <div>
        <h1 className="text-lg md:text-xl font-semibold">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="text-sm text-gray-400">
          Here's what's happening with your tasks today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Tasks", value: total, icon: <FiClipboard />, color: "purple" },
          { title: "Pending", value: pending, icon: <FiClock />, color: "yellow" },
          { title: "In Progress", value: inProgress, icon: <FiActivity />, color: "blue" },
          { title: "Completed", value: completed, icon: <FiCheckCircle />, color: "green" },
        ].map((item, ind) => (
          <div
            key={ind}
            className="bg-[#0f172a] p-4 rounded-xl border border-white/10 flex justify-between items-start"
          >
            <div>
              <p className="text-sm text-gray-400">{item.title}</p>
              <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
            </div>

            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                item.color === "purple"
                  ? "bg-purple-500/20 text-purple-400"
                  : item.color === "yellow"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : item.color === "blue"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        <div className="w-full lg:w-2/3 bg-[#0f172a] p-4 rounded-xl border border-white/10">
          <div className="flex justify-between mb-4">
            <h2 className="text-base md:text-lg font-medium text-gray-200 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-purple-500 rounded-full"></span>
              Recent Tasks
            </h2>

            <span
              onClick={() => navigate("/my-task")}
              className="text-purple-400 text-sm cursor-pointer hover:text-purple-300 transition hover:underline"
            >
              View All
            </span>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-gray-400">No tasks found</p>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div
                  key={task._id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        task.status === "Completed"
                          ? "bg-green-400"
                          : task.status === "In Progress"
                          ? "bg-blue-400"
                          : "bg-yellow-400"
                      }`}
                    ></span>

                    <p className="text-sm text-gray-200">{task.title}</p>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      task.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : task.status === "In Progress"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default UserStats;


