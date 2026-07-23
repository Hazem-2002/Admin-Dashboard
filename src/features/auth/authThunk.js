import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    console.log(loginData);

    try {
      const res = await axios.post("/api/auth/login", loginData);

      const { user, token } = res.data;

      localStorage.setItem("token", token);

      return {
        user,
        token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);
