import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersThunk = createAsyncThunk(
  "orders/getAllOrders",
  async (params = {}, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/orders/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: params.page || 1,
            limit: params.limit || 5,
            status: params.status,
            paymentStatus: params.paymentStatus,
            from: params.from,
            to: params.to,
            sortBy: params.sortBy || "createdAt",
            sortDir: params.sortDir || "desc",
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
