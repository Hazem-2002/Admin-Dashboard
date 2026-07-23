import { createSlice } from "@reduxjs/toolkit";
import { getDashboardDataThunk } from "./Thunks/getDashboardDataThunk";

const initialState = {
  data: {},
  loading: false,
  error: null,
  success: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  extraReducers: (builder) => {
    builder

      // Get Dashboard Data
      .addCase(getDashboardDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(getDashboardDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      .addCase(getDashboardDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      });
  },
});

export default dashboardSlice.reducer;
