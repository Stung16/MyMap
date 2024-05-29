import { handleGetProfile } from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async () => {
      return await handleGetProfile();
    }
  );