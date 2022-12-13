import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEntities = createAsyncThunk(
  "entities",
  async (
    {
      id_credit_spec,
      client_company,
      full_name_director,
      inn,
      credit_type,
      status,
      repaid_by_redemption,
      court_documents,
      credit_sum,
      phone,
      address,
      client_actual_address,
      average_salary,
      own_contribution,
      assets,
      current_loan,
      id_company,
      id_property,
      id_num_parley,
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
      if (client_actual_address == "") client_actual_address = address;
      const { data } = await axios.post(
        `https://bt-back-demo.herokuapp.com/crm/api/entity/`,
        {
          id_credit_spec,
          client_company,
          full_name_director,
          inn,
          credit_type,
          status,
          repaid_by_redemption,
          court_documents,
          credit_sum,
          phone,
          address,
          client_actual_address,
          average_salary,
          own_contribution,
          assets,
          current_loan,
          id_company,
          id_property,
          id_num_parley,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const patchEntity = createAsyncThunk(
  "entity/patch",
  async ({ obj, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.patch(
        `https://bt-back-demo.herokuapp.com/crm/api/entity/${id}/`,
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

export const getEntity = createAsyncThunk(
  "entityGet",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("heloo");
      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/entity/${id}/`,
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
export const getEntities = createAsyncThunk(
  "getEntities",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://bt-back-demo.herokuapp.com/crm/api/entity/`,
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

export const deleteEntity = createAsyncThunk(
  "deleteEntity",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `https://bt-back-demo.herokuapp.com/crm/api/entity/${id}/`,
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
