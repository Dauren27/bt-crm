import { createSlice } from "@reduxjs/toolkit";
import {
  deleteConversation,
  fetchConversations,
  getConversation,
  getConversations,
  patchConversation,
} from "./conversationsActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  conversationInfo: null,
  getLoading: false,
  getError: null,
  getSuccess: false,
  conversations: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  conversationDel: null,
};

const conversationsSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchConversations.pending]: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [fetchConversations.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [fetchConversations.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [getConversations.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getConversations.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.conversations = payload;
    },
    [getConversations.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [getConversation.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getConversation.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.conversationInfo = payload;
    },
    [getConversation.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [patchConversation.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchConversation.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchConversation.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [deleteConversation.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [deleteConversation.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.conversationDel = payload;
      state.deleteSuccess = true;
    },
    [deleteConversation.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default conversationsSlice.reducer;
