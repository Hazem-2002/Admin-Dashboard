import { createSlice } from "@reduxjs/toolkit";
import { getAllOrdersThunk } from "./Thunks/GetAllOrdersThunk";
import { updateOrderStatusThunk } from "./Thunks/UpdateOrderStatusThunk";

const initialState = {
  orders: [],
  filteredOrders: [],
  filters: {
    method: "All Methods",
    payment: "All Payments",
    status: "All Statuses",
    input: "",
  },
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

    setFiltersOrders(state, action) {
      state.filters = action.payload;
      console.log(action.payload);

      const { input, status, payment, method } = action.payload;

      state.filteredOrders = state.orders.filter((order) => {
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
          order.user?.username
            ?.toLowerCase()
            .includes(input.trim().toLowerCase());

        return methodMatch && paymentMatch && statusMatch && inputMatch;
      });
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

        const { method, payment, status, input } = state.filters;

        state.filteredOrders = state.orders.filter((order) => {
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
            order.user?.username
              ?.toLowerCase()
              .includes(input.trim().toLowerCase());

          return methodMatch && paymentMatch && statusMatch && inputMatch;
        });

        state.count = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
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
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatus, setFiltersOrders, resetFilteredOrders } =
  ordersSlice.actions;

export default ordersSlice.reducer;
