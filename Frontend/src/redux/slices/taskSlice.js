import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTaskAPI,
  getTasksAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "../../services/taskService";

// 🔹 GET
export const fetchTasks = createAsyncThunk("task/get", async (_, thunkAPI) => {
  try {
    return await getTasksAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 🔹 CREATE
export const createTask = createAsyncThunk(
  "task/create",
  async (data, thunkAPI) => {
    try {
      return await createTaskAPI(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// 🔹 UPDATE
export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateTaskAPI({ id, data });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// 🔹 DELETE
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id, thunkAPI) => {
    try {
      await deleteTaskAPI(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ pehle addCase
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload?.tasks || [];
        state.loading = false;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.task);
        state.loading = false;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        if (!action.payload?.task) return;

        const index = state.tasks.findIndex(
          (t) => t._id === action.payload.task._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }

        state.loading = false;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })

      // ✅ baad me matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("task/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("task/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export default taskSlice.reducer;
