import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCompany,
  fetchCompany,
  getCompanies,
  getCompany,
  patchCompany,
} from "./companyActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  company: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  companies: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deletedInfo: null,
  companyInfo: null,
};

const companiesSlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCompany.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.company = payload;
      state.success = true;
      state.error = null;
    },
    [fetchCompany.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchCompany.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchCompany.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchCompany.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getCompanies.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getCompanies.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.companies = payload;
    },
    [getCompanies.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getCompany.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getCompany.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.companyInfo = payload;
    },
    [getCompany.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteCompany.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = null;
    },
    [deleteCompany.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      state.deleteError = null;
    },
    [deleteCompany.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});
export default companiesSlice.reducer;
