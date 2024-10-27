// src/features/user/thunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const register = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post(`/user/register`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await api.post("/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post(`/user/login`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "user/getCategories",
  async ({ page, limit }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/categories?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const saveInterests = createAsyncThunk(
  "user/interests",
  async (interests, thunkAPI) => {
    try {
      const response = await api.post(`/user/interests`, interests);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
