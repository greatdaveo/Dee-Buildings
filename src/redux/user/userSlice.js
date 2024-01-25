import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    updateProfileStart: (state) => {
      state.loading = true;
    },

    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteProfileStart: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    deleteProfileSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },

    deleteProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    logoutUserStart: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    logoutUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },

    logoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer