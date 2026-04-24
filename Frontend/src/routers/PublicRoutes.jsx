import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// const PublicRoute = ({ children }) => {
//   const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

//   if (loading) return <div>Loading...</div>;

  

// if (isAuthenticated) {
//   return user?.role === "admin"
//     ? <Navigate to="/admin/users" replace />
//     : <Navigate to="/" replace />;
// }

//   return children;
// };

const PublicRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;