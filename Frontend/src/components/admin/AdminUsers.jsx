import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/usersSlice";
import UserUpdate from "./UserUpdate";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-4 md:p-6 text-white bg-[#020617] h-full w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-semibold">Users</h1>
        <p className="text-xs md:text-sm text-gray-400">
          Manage all registered users.
        </p>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden">
        {/* Header (desktop only) */}
        <div className="hidden md:grid grid-cols-6 p-4 text-gray-400 text-sm border-b border-white/10">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Joined</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col gap-1.5 md:grid md:grid-cols-6 p-3 md:p-4 text-[11px] md:text-sm border-b border-white/10"
          >
            {/* Name */}
            <div className="flex justify-between items-center md:block py-0.5">
              <span className="text-gray-500 md:hidden">Name</span>
              <span className="truncate">{user.name}</span>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center md:block py-0.5">
              <span className="text-gray-500 md:hidden">Email</span>
              <span className="truncate">{user.email}</span>
            </div>

            {/* Role */}
            <div className="flex justify-between items-center md:block py-0.5">
              <span className="text-gray-500 md:hidden">Role</span>
              <span
                className={`px-2 py-1 text-xs rounded w-fit ${
                  user.role === "admin"
                    ? "bg-pink-500/20 text-pink-400"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {user.role}
              </span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center md:block py-0.5">
              <span className="text-gray-500 md:hidden">Status</span>
              <span className="text-green-400">Active</span>
            </div>

            {/* Date */}
            <div className="flex justify-between items-center md:block py-0.5">
              <span className="text-gray-500 md:hidden">Joined</span>
              <span>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "--"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center md:flex md:gap-2 mt-0.5 md:mt-0">
              <span className="text-gray-500 md:hidden">Actions</span>

              <div className="flex gap-2 text-sm">
                <button onClick={() => setSelectedUser(user)}>✏️</button>

                <button
                  onClick={async () => {
                    if (window.confirm("Delete user?")) {
                      const res = await dispatch(deleteUser(user._id));

                      if (res.meta.requestStatus === "fulfilled") {
                        toast.success("User deleted successfully 🗑️");

                        // ❌ fetchUsers hata diya (Redux already update kar raha)

                        if (currentUser && user._id === currentUser._id) {
                          dispatch(setUser(null));
                          navigate("/login");
                        }
                      } else {
                        toast.error(res.payload || "Delete failed ❌");
                      }
                    }
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <UserUpdate user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AdminUsers;
