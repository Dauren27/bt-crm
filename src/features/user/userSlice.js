import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, registerUser, userLogin, getUserDetail, updateToken } from "./userActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  error: null,
  userInfo: null,
  success: false,
  isAuth: localStorage.getItem("isAuth") ? true : false,
  userToken,
  registerLoading: false,
  registerError: null,
  registerSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("isAuth");
      state.isAuth=false;
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuth=false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userToken = payload.userToken;
      state.isAuth=true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuth=false;
    },
    [updateToken.fulfilled]: (state, { payload }) => {
      state.userToken = payload;
    },
    [registerUser.pending]: (state) => {
      state.registerLoading = true;
      state.registerError = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.registerLoading = false;
      state.registerSuccess = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.registerLoading = false;
      state.registerError = payload;
      state.registerSuccess = false;
    },
    [getUserDetail.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUserDetail.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
