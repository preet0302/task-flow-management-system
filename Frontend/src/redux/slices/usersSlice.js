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
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload?.users || [];
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload?.user) {
          state.loading = false;
          return;
        }

        const index = state.users.findIndex(
          (u) => u._id === action.payload.user._id,
        );

        if (index !== -1) {
          state.users[index] = action.payload.user;
        }

        state.loading = false;
      })

      // 🔥 ADD THIS (IMPORTANT)
      .addMatcher(
        (action) =>
          action.type.startsWith("user/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("user/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export default userSlice.reducer;
