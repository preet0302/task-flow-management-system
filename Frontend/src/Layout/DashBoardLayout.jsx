import SideBar from "../common/SideBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashBoardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">

      {/* dekstop side bar*/}
      <div className="hidden lg:block">
        <SideBar closeSidebar={() => setOpen(false)} />
      </div>

      {/* mobile side bar  */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlap */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* sidebar toggle */}
        <div
          className={`absolute top-0 left-0 w-76 h-full bg-[#020617] p-4 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="mb-4 text-2xl cursor-pointer"
          >
            ✕
          </button>

          {/* Sidebar with auto close */}
          <SideBar closeSidebar={() => setOpen(false)} />
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 overflow-y-auto h-full">

        {/* mobile navigation bar */}
        <div
          className="sticky top-0 z-40 flex items-center justify-between p-4 lg:hidden 
          bg-[#020617]/90 backdrop-blur-md 
          border-b border-white/20 shadow-md"
        >
          {/* Left */}
          <button onClick={() => setOpen(true)} className="text-2xl cursor-pointer">
            ☰
          </button>

          {/* Center */}
          <h2 className="text-sm font-semibold px-3 py-1 rounded-md 
          bg-purple-500/10 
          border border-purple-400/30 
          text-white">
            Task Manager System
          </h2>

          {/* Right */}
          <div
            onClick={() => {
              navigate("/profile");
              setOpen(false); 
            }}
            className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-1 rounded"
          >
            <div className="text-right leading-tight">
              <p className="text-xs font-semibold">{user?.name || "Guest"}</p>
              <p className="text-[10px] text-gray-400">
                {user?.role === "admin" ? "Admin" : "User"}
              </p>
            </div>

            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 min-h-full">{children}</div>
      </div>
    </div>
  );
};

export default DashBoardLayout;






