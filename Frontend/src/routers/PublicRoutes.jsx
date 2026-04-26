import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const PublicRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (loading) return <Loader />;

  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/users" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;