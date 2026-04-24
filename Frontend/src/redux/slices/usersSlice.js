// redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsersAPI,
  deleteUserAPI,
  updateUserAPI,
} from "../../services/usersService";

export const fetchUsers = createAsyncThunk("user/get", async () => {
  return await getUsersAPI();
});

export const deleteUser = createAsyncThunk("user/delete", async (id) => {
  await deleteUserAPI(id);
  return id;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, data }) => {
    return await updateUserAPI({ id, data });
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
