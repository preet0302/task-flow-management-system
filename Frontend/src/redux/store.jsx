import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import taskReducer from "../redux/slices/taskSlice";
import usersReducer from "../redux/slices/usersSlice";


const store = configureStore({
  reducer: {
    auth: authReducer, // 🔥 add this
    task: taskReducer,
    users: usersReducer
  },
});

export default store;
