import { createSlice } from "@reduxjs/toolkit";
import { loginUser,getCurrentUser,stepOne ,stepTwo} from "./Asycthunk";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },


  extraReducers: (builder) => {
    builder
    // login user 
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

// current user 
       .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

// step one
      .addCase(stepOne.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stepOne.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(stepOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // step two
      .addCase(stepTwo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stepTwo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(stepTwo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




    // Handle async thunks here if needed
  }
});

export const {
  setLoading,
  loginSuccess,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;