import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPokemon: null,
};

export const userPokemonSelectionSlice = createSlice({
  name: "userPokemonSelection",
  initialState,
  reducers: {
    setUserPokemonSelection: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    setClearUserPokemonSelection: (state) => {
      state.selectedPokemon = null;
    },
  },
});

export const { setUserPokemonSelection, setClearUserPokemonSelection } =
  userPokemonSelectionSlice.actions;
export default userPokemonSelectionSlice.reducer;
