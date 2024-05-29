import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  edgesType: "",
};

export const mapSlice = createSlice({
  name: "mapSlice",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setEdgesType: (state, action) => {
      state.edgesType = action.payload;
    },
  },
});
