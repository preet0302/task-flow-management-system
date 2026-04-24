import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../redux/slices/usersSlice";

const UserUpdate = ({ user, onClose }) => {
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
  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: user._id,
        data: form,
      })
    );

    onClose();
  };

  // 🔥 DELETE
  const handleDelete = () => {
    dispatch(deleteUser(user._id));
    onClose();
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
          <div className="flex justify-between mt-4">

            {/* Delete */}
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>

            <div className="flex gap-3">
              <button type="button" onClick={onClose}>
                Cancel
              </button>

              <button
                type="submit"
                className="bg-purple-600 px-4 py-1 rounded"
              >
                Update
              </button>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UserUpdate;