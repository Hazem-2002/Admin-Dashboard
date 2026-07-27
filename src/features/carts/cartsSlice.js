import { createSlice } from "@reduxjs/toolkit";
import { getAllCartsThunk } from "./Thunks/getAllCartsThunk";

const initialState = {
  carts: [],
  paginationCarts: [],
  limit: 5,
  count: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  success: false,
  error: null,
};

const cartsPaginationCalc = (carts, page, limit = 10) => {
  const paginationCarts = [];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  for (let i = startIndex; i < endIndex && i < carts.length; i++) {
    paginationCarts.push(carts[i]);
  }

  return paginationCarts;
};

const pagesCount = (count, limit = 10) => {
  return Math.ceil(count / limit);
};

// =================== SLICE ===================
const ordersSlice = createSlice({
  name: "carts",
  initialState,

  reducers: {
    clearStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    setPage(state, action) {
      state.currentPage = action.payload;
      state.paginationCarts = cartsPaginationCalc(
        state.carts,
        state.currentPage,
        state.limit,
      );
    },
  },

  resetFilteredOrders(state) {
    state.filteredOrders = state.orders;
  },

  extraReducers: (builder) => {
    builder
      // ========== GET ALL ORDERS ==========
      .addCase(getAllCartsThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllCartsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.carts = action.payload.carts;
        state.paginationCarts = cartsPaginationCalc(
          state.carts,
          state.currentPage,
          state.limit,
        );
        state.count = action.payload.total;
        state.limit = action.payload.cartsPerPage;
        state.totalPages = pagesCount(state.carts.length, state.limit);
      })
      .addCase(getAllCartsThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus, setPage, resetFilteredOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;
