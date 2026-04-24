import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import RightPanel from "../../components/user/RightPanel";

const UserStats = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔥 Dynamic counts
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="p-6 text-white space-y-6 bg-[#020617] min-h-screen">

      {/* Welcome */}
      <div>
        <h1 className="text-xl font-semibold">Welcome back, {user?.name || "User"} 👋</h1>
        <p className="text-sm text-gray-400">
          Here's what's happening with your tasks today.
        </p>
      </div>
{/* 
      Loading / Error
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>} */}

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: "Total Tasks", value: total },
          { title: "Pending", value: pending },
          { title: "In Progress", value: inProgress },
          { title: "Completed", value: completed },
        ].map((item, ind) => (
          <div key={ind} className="bg-[#0f172a] p-4 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-4">

        {/* Recent Tasks */}
        <div className="col-span-2 bg-[#0f172a] p-4 rounded-xl border border-white/10">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Recent Tasks</h2>
            <span className="text-blue-400 text-sm">View All</span>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-gray-400">No tasks found</p>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div key={task._id} className="flex justify-between">
                  <p>{task.title}</p>
                  <span
                    className={`text-sm ${
                      task.status === "Completed"
                        ? "text-green-400"
                        : task.status === "In Progress"
                        ? "text-blue-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel */}
        <RightPanel />

      </div>
    </div>
  );
};

export default UserStats;