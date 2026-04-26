import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    // FETCH TASKS
    fetchTasks: (state, action) => {
      state.tasks = action.payload || [];
      state.loading = false;
    },

    // CREATE TASK
    createTask: (state, action) => {
      if (action.payload) {
        state.tasks.push(action.payload);
      }
      state.loading = false;
    },

    // UPDATE TASK
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);

      if (index !== -1) {
        state.tasks[index] = action.payload;
      }

      state.loading = false;
    },

    // DELETE TASK
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
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
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;
