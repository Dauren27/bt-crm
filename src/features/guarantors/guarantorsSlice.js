import { createSlice } from "@reduxjs/toolkit";
import {
  deleteGuarantor,
  fetchGuarantors,
  getGuarantor,
  getGuarantors,
  patchGuarantor,
} from "./guarantorsActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  recipientInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  getLoading: false,
  getError: null,
  getSuccess: false,
  guarantors: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  guarantorDel: null,
};

const guarantorsSlice = createSlice({
  name: "guarantors",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGuarantors.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchGuarantors.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [fetchGuarantors.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [patchGuarantor.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchGuarantor.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchGuarantor.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getGuarantor.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getGuarantor.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.recipientInfo = payload;
      state.getLoading = false;
    },
    [getGuarantor.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
      state.getLoading = false;

    },
    [getGuarantors.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getGuarantors.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.guarantors = payload;
    },
    [getGuarantors.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteGuarantor.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteGuarantor.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.guarantorDel = payload;
      state.deleteSuccess = true;
    },
    [deleteGuarantor.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export const { setGuarantorsInformation } = guarantorsSlice.actions;

export default guarantorsSlice.reducer;
