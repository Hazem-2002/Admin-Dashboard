import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersThunk = createAsyncThunk(
  "orders/getAllOrders",
  async (ordersPerPage, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.get("/api/orders/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 500,
        },
      });

      return { ...response.data, ordersPerPage };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
