import { createSlice } from "@reduxjs/toolkit";
import { deleteClient, fetchClients, getClient, getClients, patchClient } from "./clientsActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  clientInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  getLoading: false,
  getError: null,
  getSuccess: false,
  clients: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  clientsDelete: null,
};

const counterpartiesSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchClients.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchClients.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [fetchClients.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchClient.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchClient.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchClient.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getClients.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getClients.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.clients = payload;
    },
    [getClients.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getClient.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getClient.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.clientInfo = payload;
    },
    [getClient.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteClient.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteClient.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.clientsDelete = payload;
      state.deleteSuccess = true;
    },
    [deleteClient.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default counterpartiesSlice.reducer;
