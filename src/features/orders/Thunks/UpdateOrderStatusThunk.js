import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status, adminNote }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.patch(
        `https://e-commerce-api-3wara.vercel.app/orders/admin/${id}/status`,
        {
          status,
          adminNote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  },
);
