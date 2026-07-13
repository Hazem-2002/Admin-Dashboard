import { createSlice } from "@reduxjs/toolkit";
import { getAllOrdersThunk } from "./Thunks/GetAllOrdersThunk";

const initialState = {
  orders: [],
  count: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  success: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    clearStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ========== GET ALL ORDERS ==========
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.orders = action.payload.orders;
        state.count = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus } = ordersSlice.actions;

export default ordersSlice.reducer;