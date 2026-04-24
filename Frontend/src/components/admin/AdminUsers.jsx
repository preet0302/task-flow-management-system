import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/usersSlice";
import UserUpdate from "./UserUpdate";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/authSlice";

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
    <div className="p-6 text-white bg-[#020617] min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-gray-400">Manage all registered users.</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 p-4 text-gray-400 text-sm border-b border-white/10">
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
            className="grid grid-cols-6 p-4 items-center border-b border-white/10"
          >
            <span>{user.name}</span>
            <span>{user.email}</span>

            <span
              className={`px-2 py-1 text-xs rounded w-fit ${
                user.role === "admin"
                  ? "bg-pink-500/20 text-pink-400"
                  : "bg-gray-500/20 text-gray-300"
              }`}
            >
              {user.role}
            </span>

            <span className="text-green-400">Active</span>

            <span>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "--"}
            </span>

            <div className="flex gap-3">
              {/* Edit */}
              <button onClick={() => setSelectedUser(user)}>✏️</button>

              {/* Delete */}
              <button
                onClick={async () => {
                  if (window.confirm("Delete user?")) {
                    await dispatch(deleteUser(user._id));
                    dispatch(fetchUsers());

                    // 👇 agar admin ne khud ko delete kiya
                    if (currentUser && user._id === currentUser._id) {
                      dispatch(setUser(null));
                      navigate("/login");
                    }
                  }
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Edit Modal */}
      {selectedUser && (
        <UserUpdate user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AdminUsers;
