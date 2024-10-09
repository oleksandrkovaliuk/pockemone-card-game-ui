import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { userPokemonSelectionSelector } from "../../store/selectors/userGameEnvirment/userPokemonSelectionSelector";

import { WinnerModal } from "../../components/winnerModal";
import { PokemonCollection } from "../../components/pokemonCollection";

import { sessionStorageKeys } from "../../lib/sessionStorageKeys";

import styles from "./selectPokemon.module.scss";

export const SelectPokemonPage = () => {
  const { selectedPokemon } = useSelector(userPokemonSelectionSelector);

  const handleStartGame = (e) => {
    if (!selectedPokemon) {
      e.preventDefault();
    } else {
      sessionStorage.setItem(
        sessionStorageKeys.SELECTED_USER_POKEMON,
        JSON.stringify(selectedPokemon)
      );
    }
  };

  useEffect(() => {
    const body = document.body;
    body.classList.add("disable-scroll");
    return () => {
      body.classList.remove("disable-scroll");
    };
  }, []);

  return (
    <>
      <WinnerModal />
      <div className={styles.select_pokemon_container}>
        <PokemonCollection />
        {selectedPokemon && (
          <a
            title="Start your game"
            href="/prepare-user-game"
            disabled={!selectedPokemon}
            onClick={handleStartGame}
            className={styles.start_game_button}
          >
            Start
          </a>
        )}
      </div>
    </>
  );
};
