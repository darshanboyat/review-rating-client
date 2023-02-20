import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  toggle: false,
  cmsg: "",
  company_data: "",
  loading: false,
  error: "",
};

export const createCompany = createAsyncThunk(
  "create/company",
  async (body, thunkAPI) => {
    console.log("Body:- ", `${process.env.REACT_APP_BASE_URL}/company/create`, body)
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/company/create`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Res:- ", res);
    // const res = await fetch("http://localhost:9000/company/create", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });
    // // debugger
    // const data = await res.json();

    // console.log(await data);

    // if (data.success === "success") return data;
    // else return thunkAPI.rejectWithValue(data);
  }
);
export const CompanyList = createAsyncThunk(
  "find/company",
  async (body, thunkAPI) => {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/company/company_list`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // debugger
    const data = await res.json();

    if (data.status === "Success") return data;
    else return thunkAPI.rejectWithValue(data);
  }
);

export const CompanyDetail = createAsyncThunk(
  "find/company",
  async (body, thunkAPI) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/company/reviews/${body.cid}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // debugger
    const data = await res.json();

    if (data.status === "Success") return data;
    else return thunkAPI.rejectWithValue(data);
  }
);

export const companySlice = createSlice({
  name: "Company",
  initialState,

  reducers: {
    toggleUpdate: (state, { payload }) => {
      state.toggle = payload;
    },
  },

  extraReducers: {
    [createCompany.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cmsg = payload.massage;
      state.error = "";
    },
    [createCompany.rejected]: (state, { payload }) => {
      console.log("test-> ", payload);
      state.cmsg = "";
      state.error = payload.error;
      state.loading = false;
    },

    [CompanyList.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [CompanyList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cmsg = payload.massage;
      state.company_data = payload.data;
      state.error = "";
    },
    [CompanyList.rejected]: (state, { payload }) => {
      console.log("test-> ", payload);
      state.cmsg = "";
      state.error = payload.error;
      state.loading = false;
    },
  },
});

export const { toggleUpdate } = companySlice.actions;
export default companySlice.reducer;
