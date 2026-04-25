import { NavLink, useNavigate } from "react-router-dom";
import { logoutAsync } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FiHome,
  FiClipboard,
  FiCheckCircle,
  FiPlusSquare,
  FiUsers,
  FiUser,
} from "react-icons/fi";

const SideBar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Loading state
  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  // 🔥 Logout
  // 🔥 Logout
  const handleLogout = async () => {
    const res = await dispatch(logoutAsync());

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Logout successfully 👋");
      navigate("/login");
    } else {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <div
      className="w-72 h-full flex flex-col justify-between 
    bg-gradient-to-b from-[#0f172a] to-[#020617] 
    border-r border-white/10 text-white px-4 py-6"
    >
      {/* TOP */}
      <div className="flex-1">
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-12 px-4 mt-1">
          <FiClipboard className="text-purple-400 text-xl" />
          <h1 className="text-lg font-semibold text-purple-400">
            Task Manager
          </h1>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-4 text-sm">
          {/* COMMON LINKS */}
          {[
            { name: "Dashboard", path: "/", icon: <FiHome /> },
            { name: "My Tasks", path: "/my-task", icon: <FiCheckCircle /> },
            {
              name: "Create Task",
              path: "/create-task",
              icon: <FiPlusSquare />,
            },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-md ${
                  isActive
                    ? "bg-purple-500/20 ring-1 ring-purple-400/40"
                    : "text-gray-300 hover:bg-white/5"
                }`
              }
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
            </NavLink>
          ))}

          {/* 🔥 ADMIN ONLY */}
          {user && user.role === "admin" && (
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-md ${
                  isActive
                    ? "bg-purple-500/20 ring-1 ring-purple-400/40"
                    : "text-gray-300 hover:bg-white/5"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FiUsers />
                <span>
                  Users <span className="text-red-400 ml-1">Admin</span>
                </span>
              </div>
            </NavLink>
          )}

          {/* PROFILE */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-md ${
                isActive
                  ? "bg-purple-500/20 ring-1 ring-purple-400/40"
                  : "text-gray-300 hover:bg-white/5"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <FiUser />
              <span>Profile</span>
            </div>
          </NavLink>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-4 ml-2 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-sm w-fit"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* BOTTOM USER */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
        <NavLink to="/profile" className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{user?.name || "Guest"}</p>
            <p className="text-xs text-gray-400">
              {user?.role === "admin" ? "Admin" : "User"}
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
