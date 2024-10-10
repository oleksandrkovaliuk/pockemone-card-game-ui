import { createAsyncThunk } from "@reduxjs/toolkit";

import { logOutUser } from "../slices/auth/userSlice";
import { verifyAndGetUser } from "../../store/api/endpoints/auth/verifyAndGetUser";

import { sessionStorageKeys } from "../../lib/sessionStorageKeys";

export const checkSession = createAsyncThunk(
  "user/checkSession",
  async (_, { dispatch, rejectWithValue }) => {
    const token = sessionStorage.getItem(sessionStorageKeys.AUTH_TOKEN);

    if (!token) {
      dispatch(logOutUser());
      return rejectWithValue("No token found");
    }

    try {
      const { data: res, error } = await dispatch(
        verifyAndGetUser.initiate({ token })
      );

      if (error || !res.user) {
        dispatch(logOutUser());
        return rejectWithValue("Invalid token or user not found");
      }

      return res.user;
    } catch (err) {
      dispatch(logOutUser());
      return rejectWithValue("Error during session check");
    }
  }
);
