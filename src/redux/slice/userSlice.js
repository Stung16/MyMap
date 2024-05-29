import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../middlewares/profileMiddleware";

const initialState = {
  profile: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
