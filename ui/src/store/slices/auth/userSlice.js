import { createSlice } from "@reduxjs/toolkit";

import { checkSession } from "../../thunks/checkSession";

import { sessionStorageKeys } from "../../../lib/sessionStorageKeys";

const initialState = {
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authorizeUser: (state, action) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = initialState.user;
      sessionStorage.removeItem(sessionStorageKeys.AUTH_TOKEN);
      sessionStorage.removeItem(sessionStorageKeys.SELECTED_USER_POKEMON);
      sessionStorage.removeItem(sessionStorageKeys.SELECTED_USER_OPONENT);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(checkSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { authorizeUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
