import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProperties = createAsyncThunk(
  "properties",
  async ({ type, address, filesArray, imagesArray }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("type", type);
      formData.append("address", address);
      for (let i = 0; i < imagesArray.length; i++) {
        formData.append("images", imagesArray[i]);
      }
      for (let i = 0; i < filesArray.length; i++) {
        formData.append("files", filesArray[i]);
      }
      const { data } = await axios.post(
        `https://bt-back-demo.herokuapp.com/crm/api/property/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const patchProperty = createAsyncThunk(
  "property/patch",
  async ({ obj, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("type", obj.type);
      formData.append("address", obj.address);
      formData.append("images", obj.imagesArray);
      formData.append("files", obj.filesArray);
      // for (let i = 0; i < obj.imagesArray.length; i++) {
      //   formData.append("images", obj.imagesArray[i]);
      // }
      // for (let i = 0; i < obj.filesArray.length; i++) {
      //   formData.append("files", obj.filesArray[i]);
      // }
      const { data } = await axios.patch(
        `https://bt-back-demo.herokuapp.com/crm/api/property/${id}/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getProperty = createAsyncThunk(
  "property/get",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/property/${id}/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getProperties = createAsyncThunk(
  "getProperties",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/property/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteProperty = createAsyncThunk(
  "deleteProperty",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `https://bt-back-demo.herokuapp.com/crm/api/property/${id}/`,
        {
          id,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
