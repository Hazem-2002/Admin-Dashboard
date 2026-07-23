import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDashboardDataThunk = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.get("/api/orders/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
