import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import api from "../api/axios"; // path adjust kar
import { setUser } from "../redux/slices/authSlice";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
  console.log("FORM SUBMITTED"); // 👈 ADD THIS

  try {
    const res = await api.put("/auth/update-profile", {
      name: formData.name,
    });

    console.log(res.data); // 👈 ADD
    dispatch(setUser(res.data.user));
  } catch (err) {
    console.log(err);
  }
};

  // 🔥 SAME AVATAR AS SIDEBAR
  const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.email}`;

  return (
    <div className=" bg-[#020617] text-white pr-8 p-8 w-full pl-10 ">
      <h1 className="text-xl font-semibold mb-1">Profile</h1>
      <p className="text-gray-400 mb-6">Manage your personal information.</p>

      <div className="w-full bg-[#0f172a]/90 border border-white/10 rounded-2xl p-6 flex gap-8 mb-6 h-[90%]">
        {/* LEFT */}
        <div className="w-1/3 bg-[#020617] border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center">
          <img
            src={avatar}
            className="w-28 h-28 rounded-full border-4 border-purple-500"
          />

          {/* ❌ Change photo removed */}

          <h2 className="mt-4 text-lg font-semibold">{formData.name}</h2>
          <p className="text-gray-400 text-sm">{formData.email}</p>

          <span className="mt-2 px-3 py-1 text-xs bg-white/10 rounded-full">
            {formData.role === "admin" ? "Admin" : "User"}
          </span>
        </div>

        {/* RIGHT */}
         <form
          onSubmit={handleSubmit}
          className="w-2/3 bg-[#020617] border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

          <div className="mb-4">
            <label className="text-sm text-gray-400">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={formData.email}
              readOnly
              className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400">Role</label>
            <input
              value={formData.role === "admin" ? "Admin" : "User"}
              readOnly
              className="w-full mt-2 p-3 rounded-lg bg-[#020617] border border-white/10"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
          >
            Update Profile
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Profile;
