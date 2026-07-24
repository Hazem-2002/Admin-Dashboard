import { createSlice } from "@reduxjs/toolkit";
import { getAllOrdersThunk } from "./Thunks/GetAllOrdersThunk";
import { updateOrderStatusThunk } from "./Thunks/UpdateOrderStatusThunk";

const initialState = {
  orders: [],
  filteredOrders: [],
  paginationOrders: [],
  filters: {
    method: "All Methods",
    payment: "All Payments",
    status: "All Statuses",
    input: "",
  },
  limit: 10,
  count: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  success: false,
  error: null,
};

const filterOrders = (orders = [], filters) => {
  const { input, status, payment, method } = filters;

  const filteredOrders = orders.filter((order) => {
    const methodMatch =
      method === "All Methods" ||
      order.paymentMethod.toLowerCase() === method.toLowerCase();

    const paymentMatch =
      payment === "All Payments" ||
      order.paymentStatus.toLowerCase() === payment.toLowerCase();

    const statusMatch =
      status === "All Statuses" ||
      order.status.toLowerCase() === status.toLowerCase();

    const inputMatch =
      !input ||
      order.user?.username?.toLowerCase().includes(input.trim().toLowerCase());

    return methodMatch && paymentMatch && statusMatch && inputMatch;
  });

  return filteredOrders;
};

const ordersPaginationCalc = (orders, page, limit = 10) => {
  const paginationOrders = [];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  for (let i = startIndex; i < endIndex && i < orders.length; i++) {
    paginationOrders.push(orders[i]);
  }

  return paginationOrders;
};

const pagesCount = (count, limit = 10) => {
  return Math.ceil(count / limit);
};

// =================== SLICE ===================
const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    clearStatus(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    setFiltersOrders(state, action) {
      state.filters = action.payload;
      state.filteredOrders = filterOrders(state.orders, state.filters);
      state.paginationOrders = ordersPaginationCalc(
        state.filteredOrders,
        1,
        state.limit,
      );
      state.currentPage = 1;
      state.totalPages = pagesCount(state.filteredOrders.length, state.limit);
    },

    setPage(state, action) {
      state.currentPage = action.payload;
      state.paginationOrders = ordersPaginationCalc(
        state.filteredOrders,
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
        state.filteredOrders = filterOrders(state.orders, state.filters);
        state.paginationOrders = ordersPaginationCalc(
          state.filteredOrders,
          state.currentPage,
          state.limit,
        );
        state.count = action.payload.total;
        state.limit = action.payload.ordersPerPage;
        state.totalPages = pagesCount(state.filteredOrders.length, state.limit);
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ========== CHANGE ORDER STATUS ==========
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        const updatedOrder = action.payload.order;

        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }

        state.filteredOrders = filterOrders(state.orders, state.filters);
        state.paginationOrders = ordersPaginationCalc(
          state.filteredOrders,
          state.currentPage,
          state.limit,
        );
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus, setFiltersOrders, setPage, resetFilteredOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;
