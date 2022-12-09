import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchClients = createAsyncThunk(
  "clients",
  async (
    {
      id_credit_spec,
      full_name,
      credit_type,
      status,
      repaid_by_redemption,
      court_documents,
      credit_sum,
      marital_status,
      credit_history,
      phone,
      address,
      client_actual_address,
      income_statement,
      contracts,
      report,
      monitoring_report,
      guarantor,
      id_property,
      meet_conversation,
    },
    { rejectWithValue }
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));
      const config = {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `https://bt-back-demo.herokuapp.com/crm/api/client/`,
        {
          id_credit_spec,
          full_name,
          credit_type,
          status,
          repaid_by_redemption,
          court_documents,
          credit_sum,
          marital_status,
          credit_history,
          phone,
          address,
          client_actual_address,
          income_statement,
          contracts,
          report,
          monitoring_report,
          guarantor,
          id_property,
          meet_conversation,
        },
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
export const patchClient = createAsyncThunk(
  "client/patch",
  async ({ obj, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.patch(
        `https://bt-back-demo.herokuapp.com/crm/api/client/${id}/`,
        obj,
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
export const getClient = createAsyncThunk(
  "client/get",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/client/${id}/`,
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
export const getClients = createAsyncThunk(
  "getClients",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/client/`,
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
export const deleteClient = createAsyncThunk(
  "deleteClient",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `https://bt-back-demo.herokuapp.com/crm/api/client/${id}/`,
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
