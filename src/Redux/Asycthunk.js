import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../Component/Api'


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      return res.data; // contains user + token
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);


export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_,thunkAPI) => {
    try {
    // get token from localStorage
     const res = await api.get("/me",
         {

});

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch content"
      );
    }
  }
);


export const stepOne = createAsyncThunk(
  "stepOne",
  async ({ username, fullName, userType }, thunkAPI) => {
    try {
      const res = await api.patch("/step-one", {
        username,
        fullName,
        userType,
      });

      console.log("API response for step one:", res.data);
      return res.data;

    } catch (error) {
      console.log("FULL ERROR:", error.response?.data || error.message);
      console.log("pure error", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);



export const stepTwo = createAsyncThunk(
  "stepTwo",
  async (formData, thunkAPI) => {
    try {
      const res = await api.patch("/step-two", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const updateCreatorProfile = createAsyncThunk(
  "updateCreatorProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await api.patch("/update-creator-profile", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);