import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // FETCH USERS
    fetchUsers: (state, action) => {
      state.users = action.payload || [];
      state.loading = false;
    },

    // DELETE USER
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
      state.loading = false;
    },

    // UPDATE USER
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (u) => u._id === action.payload._id
      );

      if (index !== -1) {
        state.users[index] = action.payload;
      }

      state.loading = false;
    },

    // LOADING
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // ERROR
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchUsers,
  deleteUser,
  updateUser,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;

