import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/usersSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserUpdate = ({ user, onClose }) => {
  const { loading } = useSelector((state) => state.users || {});
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      updateUser({
        id: user._id,
        data: form,
      }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("User updated successfully ✅");
      onClose();
    } else {
      toast.error(res.payload || "Update failed ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-xl w-[400px] border border-white/10 text-white">
        <h2 className="text-lg mb-4">Edit User</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#020617]"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#020617]"
          />

          {/* Role */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#020617]"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600/20 text-gray-300 hover:bg-gray-600/30 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
