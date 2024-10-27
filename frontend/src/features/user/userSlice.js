import { createSlice } from "@reduxjs/toolkit";
import extraReducers from "./extraReducers";
const userData = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userData || null,
  token: localStorage.getItem("token") || null,
  categories: [],
  currentPage: 1,
  totalPages: 0,
  interests: userData ? userData.interests || [] : [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setSelectedInterests: (state, action) => {
      state.interests = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.interests = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
    },
  },
  extraReducers,
});

export const { setCurrentPage, resetState, setSelectedInterests, logout } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
