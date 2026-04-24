import User from "../pages/Dashboard/User";
import { Routes, Route } from "react-router-dom";
import TaskList from "../pages/Tasks/TaskList";
import DashBoardLayout from "../Layout/DashBoardLayout";
import TaskCreate from "../pages/Tasks/TaskCreate";
import Profile from "../pages/Profile";
// import Admin from "../pages/Dashboard/Admin";
import Unauthorized from "../pages/Unauthorized";
import PageNotFound from "../pages/PageNotFoud";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import TaskUpdate from "../pages/Tasks/TaskUpdate";
import AdminUsers from "../components/admin/AdminUsers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute>
      <User />
    </ProtectedRoute>} />

      <Route
        path="/my-task"
        element={
          <ProtectedRoute>
            <DashBoardLayout>
              <TaskList />
            </DashBoardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-task"
        element={
          <ProtectedRoute>
            <DashBoardLayout>
              <TaskCreate />
            </DashBoardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashBoardLayout>
              <Profile />
            </DashBoardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <DashBoardLayout>
              <AdminUsers />
            </DashBoardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/update-task/:id" element={<ProtectedRoute>
      <DashBoardLayout>
        <TaskUpdate />
      </DashBoardLayout>
    </ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
