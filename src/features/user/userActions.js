import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `https://bt-back-demo.herokuapp.com/login/`,
        { email, password },
        config
      );
      localStorage.setItem("userToken", JSON.stringify(data));
      localStorage.setItem("isAuth", JSON.stringify(true));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateToken = createAsyncThunk(
  "refresh",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const refresh = JSON.parse(
        localStorage.getItem("userToken")
      ).refresh;
      const { data } = await axios.post(
        `https://bt-back-demo.herokuapp.com/token/refresh/`,
        { refresh },
        config
      );
      localStorage.setItem("userToken", JSON.stringify(data));
      console.log("refreshToken", data);
      return data;
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "users",
  async (
    {
      email,
      password,
      password_confirm,
      phone_number,
      full_name,
      occupation,
      spec,
      admin,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `https://bt-back-demo.herokuapp.com/register/spec/`,
        {
          email,
          password,
          password_confirm,
          phone_number,
          full_name,
          occupation,
          spec,
          admin,
        },
        config
      );
    } catch (error) {
      console.log(error);
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerClient = createAsyncThunk(
  "users",
  async (
    { email, password, password_confirm, phone_number, full_name, address },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `https://bt-back-demo.herokuapp.com/register/client/`,
        { email, password, password_confirm, phone_number, full_name, address },
        config
      );
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer${user.userToken}`,
        },
      };

      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/client/`,
        config
      );
      return data;
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 400) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
