import { Routes, Route } from "react-router-dom";

import User from "../pages/Dashboard/User";
import TaskList from "../pages/Tasks/TaskList";
import TaskCreate from "../pages/Tasks/TaskCreate";
import TaskUpdate from "../pages/Tasks/TaskUpdate";
import TaskDetails from "../pages/Tasks/TaskDetails";
import Profile from "../pages/Profile";

import DashBoardLayout from "../Layout/DashBoardLayout";
import AdminUsers from "../components/admin/AdminUsers";

import Unauthorized from "../pages/Unauthorized";
import PageNotFound from "../pages/PageNotFoud";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      {/* Tasks */}
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
        path="/update-task/:id"
        element={
          <ProtectedRoute>
            <DashBoardLayout>
              <TaskUpdate />
            </DashBoardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <DashBoardLayout>
              <TaskDetails />
            </DashBoardLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile */}
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

      {/* Admin */}
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

      {/* Auth */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      {/* Auth */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Others */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
