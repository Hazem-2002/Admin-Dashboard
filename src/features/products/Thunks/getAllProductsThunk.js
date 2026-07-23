import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products", {
        params: {
          page: params.page || 1,
          limit: params.limit || 2,
          category: params.category,
          brand: params.brand,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          search: params.search,
          sort: params.sort,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
