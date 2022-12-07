import { createSlice } from "@reduxjs/toolkit";
import { fetchProperties, getProperties, patchProperty } from "./propertyActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  propertyInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  getLoading: false,
  getError: null,
  getSuccess: false,
  properties: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProperties.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchProperties.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.propertyInfo = payload;
      state.success = true;
    },
    [fetchProperties.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchProperty.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchProperty.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchProperty.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getProperties.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getProperties.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.properties = payload;
    },
    [getProperties.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
  },
});

export default propertiesSlice.reducer;
