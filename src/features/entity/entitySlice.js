import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEntity,
  getEntities,
  getEntity,
  patchEntity,
} from "./entityActions";
import { fetchEntities } from "./entityActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  entityInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  getLoading: false,
  getError: null,
  getSuccess: false,
  entities: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  entityDel: null,
};

const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEntities.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchEntities.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [fetchEntities.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchEntity.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchEntity.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchEntity.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getEntities.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getEntities.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.entities = payload;
    },
    [getEntities.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getEntity.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getEntity.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.entityInfo = payload;
      state.getError = null;
    },
    [getEntity.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteEntity.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteEntity.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
    },
    [deleteEntity.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default entitySlice.reducer;
