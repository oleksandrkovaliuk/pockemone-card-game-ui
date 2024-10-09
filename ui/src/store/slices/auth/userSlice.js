import { createSlice } from "@reduxjs/toolkit";

import { sessionStorageKeys } from "../../../lib/sessionStorageKeys";

const initialState = {
  user: null,
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
});

export const { authorizeUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
