import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import api from "../api/axios"; // path adjust kar
import { setUser } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return toast.error("Name is required ❌");
    }

    if (formData.name.length < 3) {
      return toast.error("Name must be at least 3 characters ❌");
    }

    setUpdating(true);

    try {
      const res = await api.put("/auth/update-profile", {
        name: formData.name,
      });

      dispatch(setUser(res.data.user));
      toast.success("Profile updated successfully ✅");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Update failed ❌");
    } finally {
      setUpdating(false); // 🔥 stop loading
    }
  };

  // 🔥 SAME AVATAR AS SIDEBAR
  const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`;

  return (
    <div className="bg-[#020617] text-white w-full p-4 md:p-6 lg:p-8">
      <h1 className="text-lg md:text-xl font-semibold mb-1">Profile</h1>
      <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">
        Manage your personal information.
      </p>

      <div className="w-full bg-[#0f172a]/90 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* LEFT */}
        <div className="w-full lg:w-1/3 bg-[#020617] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col items-center justify-center text-center">
          <img
            src={avatar}
            className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-purple-500"
          />

          <h2 className="mt-3 md:mt-4 text-base md:text-lg font-semibold">
            {formData.name}
          </h2>

          <p className="text-gray-400 text-xs md:text-sm">{formData.email}</p>

          <span className="mt-2 px-3 py-1 text-xs bg-white/10 rounded-full">
            {formData.role === "admin" ? "Admin" : "User"}
          </span>
        </div>

        {/* RIGHT */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 bg-[#020617] border border-white/10 rounded-xl p-4 md:p-6"
        >
          <h2 className="text-base md:text-lg font-semibold mb-4">
            Profile Information
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="text-xs md:text-sm text-gray-400">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${
                !formData.name ? "border-red-500" : "border-white/10"
              }`}
            />
          </div>

          {/* Email (read only) */}
          <div className="mb-4">
            <label className="text-xs md:text-sm text-gray-400">Email</label>
            <input
              value={formData.email}
              readOnly
              className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10 outline-none"
            />
          </div>

          {/* Role (read only) */}
          <div className="mb-5">
            <label className="text-xs md:text-sm text-gray-400">Role</label>
            <input
              value={formData.role === "admin" ? "Admin" : "User"}
              readOnly
              className="w-full mt-1.5 md:mt-2 p-2.5 md:p-3 text-sm rounded-lg bg-[#020617] border border-white/10 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={updating}
            className="w-full py-2.5 md:py-3 text-sm md:text-base rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 active:scale-99"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
