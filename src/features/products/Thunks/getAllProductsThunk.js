import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (productsPerPage, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products", {
        params: {
          page: 1,
          limit: 500,
        },
      });

      return { ...response.data, productsPerPage };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
