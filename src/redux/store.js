import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slice/userSlice";
import { mapSlice } from "./slice/mapSlice";

export const store = configureStore({
  reducer: {
    profileData: userSlice.reducer,
    mapData: mapSlice.reducer,
  },
});
