import { NavLink, useNavigate } from "react-router-dom";
import { logoutAsync } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) return null;

  const handleLogout = async () => {
    const res = await dispatch(logoutAsync());

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] border-r border-white/10 text-white p-4">
      <div>
        {/* {Logo of Dash} */}
        <h1 className="text-xl font-bold text-purple-500 mb-8">Task Manager</h1>
        {/* {Menu section} */}
        <nav className="flex flex-col gap-3 text-sm">
          <NavLink
            to="/"
            className="hover:text-purple-400 px-3 py-2 rounded-lg"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/my-task"
            className="hover:text-purple-400 px-3 py-2 rounded-lg"
          >
            My Tasks
          </NavLink>

          <NavLink
            to="/create-task"
            className="hover:text-purple-400 px-3 py-2 rounded-lg"
          >
            Create Task
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/admin/users"
              className="hover:text-purple-400 px-3 py-2 rounded-lg"
            >
              Users <span className="text-red-500">Admin</span>
            </NavLink>
          )}

          <NavLink
            to="/profile"
            className="hover:text-purple-400 px-3 py-2 rounded-lg"
          >
            Profile
          </NavLink>

          <NavLink className="hover:text-purple-400 px-3 py-2 rounded-lg">
            <button
              onClick={handleLogout}
              className="hover:text-purple-400 bg-red-500 px-3 py-2 rounded-lg text-left"
            >
              Logout
            </button>
          </NavLink>
        </nav>
      </div>
      {/* {Bottom User pic} */}
      <div className="flex items-center gap-3">
        <NavLink to='/profile'>
        <img
           src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`}
          alt="user"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        </NavLink>
        <div>
          <p className="text-sm font-semibold">{user?.name || "Guest"}</p>

          <p className="text-xs text-gray-400">
            {user?.role === "admin" ? "Admin" : "User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
