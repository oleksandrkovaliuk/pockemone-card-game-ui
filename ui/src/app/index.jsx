import React from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "../layouts/header";

import { HomePage } from "../pages/home";
import { FightPage } from "../pages/fightSession";
import { PrepareUserGame } from "../pages/prepareUserGame";
import { SelectPokemonPage } from "../pages/selectPokemon";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-pokemon" element={<SelectPokemonPage />} />
        <Route path="/prepare-user-game" element={<PrepareUserGame />} />
        <Route path="/fight-session" element={<FightPage />} />
      </Routes>
    </>
  );
};
