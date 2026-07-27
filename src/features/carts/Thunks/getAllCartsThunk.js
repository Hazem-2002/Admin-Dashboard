import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCartsThunk = createAsyncThunk(
  "carts/getAllCarts",
  async (cartsPerPage, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.get("/api/orders/admin/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 500,
        },
      });

      console.log(response.data);

      return { ...response.data, cartsPerPage };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
