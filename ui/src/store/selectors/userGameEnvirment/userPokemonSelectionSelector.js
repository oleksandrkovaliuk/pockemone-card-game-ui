import { createSelector } from "@reduxjs/toolkit";

const userPokemonSelection = (state) => state.userPokemonSelection;

export const userPokemonSelectionSelector = createSelector(
  [userPokemonSelection],
  (selectedPokemon) => selectedPokemon
);
