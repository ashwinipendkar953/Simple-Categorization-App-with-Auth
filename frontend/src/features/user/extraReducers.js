import {
  getCategories,
  register,
  login,
  saveInterests,
  verifyOtp,
} from "./thunks";

// Handle the async actions in extraReducers
const extraReducers = (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(verifyOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    })
    .addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.interests = action.payload.user.interests;
      state.token = action.payload.token;
      state.message = action.payload.message;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload.categories;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
    .addCase(saveInterests.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(saveInterests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.user;
      state.interests = action.payload.user.interests;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      console.log(state.interests);
    })
    .addCase(saveInterests.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
};

export default extraReducers;
