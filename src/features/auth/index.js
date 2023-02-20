import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  msg: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};

export const signupUser = createAsyncThunk(
  "users/signUpUser",
  async (body, thunkAPI) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/registerUser`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);
    if (res.data.success === "success") return res.data;
    else return thunkAPI.rejectWithValue(res.data);

    // const res = await fetch("http://localhost:9000/user/registerUser", {
    //     method: "post",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(body)
    // })
    // let data = await res.json();

    // if (data.success === "Success") return data;
    // else return thunkAPI.rejectWithValue(data);
    // return res.data
  }
);

export const signinUser = createAsyncThunk(
  "users/signInUser",
  async (body, thunkAPI) => {
    // const res = await axios.post("http://localhost:9000/user/registerUser", {body: JSON.stringify(body)});

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/userLogin`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();

    if (data.status === "Success") return data;
    else return thunkAPI.rejectWithValue(data);
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (body, thunkAPI) => {
    // const res = await axios.post("http://localhost:9000/user/registerUser", {body: JSON.stringify(body)});

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/send-rest-password-email`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();

    if (data.status === "Success") return data;
    else return thunkAPI.rejectWithValue(data);
  }
);



export const changePasswordForVarifiedUser = createAsyncThunk(
  "users/resetPassword",
  async (body, thunkAPI) => {
    // const res = await axios.post("http://localhost:9000/user/registerUser", {body: JSON.stringify(body)});

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/rest-password/${body.id}/${body.token}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();

    if (data.status === "Success") return data;
    else return thunkAPI.rejectWithValue(data);
  }
);

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    signup: (state, action) => {},
    signin: (state, action) => {},
    clearState: (state, action) => {
      state.msg = "";
      state.error = "";
    },
  },

  extraReducers: {
    [signupUser.pending]: (state, { payload }) => {
      state.loading = true;
    },

    [signupUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.msg = "";
      } else {
        state.msg = payload.message;
        state.error = "";
      }
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.loading = false;
      // state.error = payload.error;
      state.msg = "";
    },

    /*          ________________________________________          */
    
    [signinUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    
    [signinUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.msg = "";
      } else {
        state.msg = payload.message;
        state.token = payload.token;
        state.user = payload.userData;
        state.error = "";
        localStorage.setItem("user", JSON.stringify(payload.userData));
        localStorage.setItem("token", payload.token);
      }
    },
    [signinUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.msg = "";
    },
    
    
    
    
    /*          ________________________________________          */
    
    [resetPassword.pending]: (state, { payload }) => {
      state.loading = true;
    },
    
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.msg = "";
      } else {
          console.log(payload)
          state.msg = payload.message
          state.token = payload.token
      }
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.msg = "";
    },
    
    
    
    
    
    
    /*          ________________________________________          */
    
    [changePasswordForVarifiedUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    
    [changePasswordForVarifiedUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.msg = "";
      } else {
          console.log(payload)
          state.msg = payload.massage
          state.token = payload.token
      }
    },
    [changePasswordForVarifiedUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.msg = "";
    },










  },
});

export const { signin, signup, clearState } = authSlice.actions;
export default authSlice.reducer;
