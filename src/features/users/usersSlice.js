import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// =================== GET ALL USERS ===================
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://e-commerce-api-3wara.vercel.app/users/all",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
        },
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== ADD USER ===================
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(
        "https://e-commerce-api-3wara.vercel.app/users/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== DELETE USER ===================
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://e-commerce-api-3wara.vercel.app/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== EDIT USER ===================
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://e-commerce-api-3wara.vercel.app/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      console.log(data.message);
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== CHANGE ROLE ===================
export const changeUserRole = createAsyncThunk(
  "users/changeUserRole",
  async (role, thunkAPI) => {
    try {
      const response = await fetch(
        `https://e-commerce-api-3wara.vercel.app/auth/change-role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
          body: JSON.stringify(role),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// =================== INITIAL STATE ===================
const initialState = {
  users: [],
  count: 0,
  loading: false,
  error: null,
  success: false,
};

// =================== SLICE ===================
const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    clearStatus(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========== GET ALL USERS ==========
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload?.count;
        state.users = action.payload?.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== Add ==========
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== DELETE ==========
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== EDIT ==========
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(editUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== CHANGE ROLE ==========
      .addCase(changeUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = usersSlice.actions;

export default usersSlice.reducer;
