const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    date: "20 May 2024",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    date: "19 May 2024",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    role: "User",
    status: "Active",
    date: "18 May 2024",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    date: "15 May 2024",
  },
];

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white pl-10 pr-8 py-8 w-full ">
      
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-gray-400 text-sm">
            Manage all registered users.
          </p>
        </div>

        <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90">
          + Add User
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-[#0f172a]/90 border border-white/10 rounded-2xl p-6 shadow-lg h-[90%]">
        
        {/* Table Header */}
        <div className="grid grid-cols-6 text-gray-400 text-sm mb-4 px-3">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Joined On</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {users.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-6 items-center py-4 px-3 border-t border-white/5 hover:bg-white/5 rounded-lg transition"
          >
            
            {/* Name */}
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/40?img=${index + 1}`}
                alt="user"
                className="w-9 h-9 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
            </div>

            {/* Email */}
            <span className="text-gray-400">{user.email}</span>

            {/* Role */}
            <span
              className={`px-3 py-1 text-xs rounded-full w-fit ${
                user.role === "Admin"
                  ? "bg-pink-500/20 text-pink-400"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              {user.role}
            </span>

            {/* Status */}
            <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 w-fit">
              {user.status}
            </span>

            {/* Date */}
            <span className="text-gray-400">{user.date}</span>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                ✏️
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20">
                🗑️
              </button>
            </div>

          </div>
        ))}

        {/* Footer */}
        <div className="flex justify-between items-center mt-5 text-sm text-gray-400">
          <span>Showing 1 to 4 of 4 users</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10">{`<`}</button>
            <button className="px-3 py-1 rounded bg-purple-600">1</button>
            <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10">{`>`}</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin