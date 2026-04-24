// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children, role }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   // 🔐 login check
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🔐 role check (only if role passed)
//   if (role && user?.role !== role) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;


