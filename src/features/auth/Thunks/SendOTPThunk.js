import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOTPThunk = createAsyncThunk(
  "auth/forgot-password/send-otp",
  async (email, thunkAPI) => {
    try {
      const res = await axios.post("/api/auth/forgot-password/send-otp", email);

      return { result: res.data, email: email.email };
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
