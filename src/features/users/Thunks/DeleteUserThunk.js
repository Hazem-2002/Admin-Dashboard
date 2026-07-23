import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, _id: id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
