import { useSelector } from "react-redux";

const RightPanel = () => {
  const { tasks } = useSelector((state) => state.task);

  const total = tasks.length;

  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  // 🔥 percentage calc
  const getPercent = (value) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  const pendingPercent = getPercent(pending);
  const inProgressPercent = getPercent(inProgress);
  const completedPercent = getPercent(completed);

  return (
    <div className="w-full bg-[#0f172a] p-4 md:p-6 rounded-xl border border-white/10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-lg font-semibold">Task Overview</h2>
        <span className="text-sm text-gray-400">This Week</span>
      </div>

      {/* Donut */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40">

          {/* 🔥 dynamic conic gradient */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(
                #facc15 0% ${pendingPercent}%,
                #3b82f6 ${pendingPercent}% ${pendingPercent + inProgressPercent}%,
                #10b981 ${pendingPercent + inProgressPercent}% 100%
              )`,
            }}
          ></div>

          {/* Inner */}
          <div className="absolute inset-[10px] md:inset-[12px] bg-[#0f172a] rounded-full flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold">{total}</span>
            <span className="text-xs md:text-sm text-gray-400">Total</span>
          </div>

        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 text-xs md:text-sm">
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Pending
          </span>
          <span>
            {pending} ({pendingPercent}%)
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            In Progress
          </span>
          <span>
            {inProgress} ({inProgressPercent}%)
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Completed
          </span>
          <span>
            {completed} ({completedPercent}%)
          </span>
        </div>
      </div>

    </div>
  );
};

export default RightPanel;