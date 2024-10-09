import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};
export const openAuthModalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { openModal } = openAuthModalSlice.actions;
export default openAuthModalSlice.reducer;
