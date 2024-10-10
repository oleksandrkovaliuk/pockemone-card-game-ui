import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { store } from "../../store";
import { generateUserOponent } from "../../store/api/endpoints/userGameEnvirment/generateUserOponent";

import loader from "../../assets/loader.gif";

import { PokemonCard } from "../../components/pokemonCard";

import { socket } from "../../helpers/socketSetUp";

import { sessionStorageKeys } from "../../lib/sessionStorageKeys";

import styles from "./prepareUserGame.module.scss";

export const PrepareUserGame = () => {
  const navigate = useNavigate();

  const selectedPokemon = sessionStorage.getItem(
    sessionStorageKeys.SELECTED_USER_POKEMON
  );

  const parsedUserSelection = selectedPokemon
    ? JSON.parse(selectedPokemon)
    : null;

  const [userOponent, setUserOponent] = useState(() => {
    const selectedUserOponent = sessionStorage.getItem(
      sessionStorageKeys.SELECTED_USER_OPONENT
    );
    return selectedUserOponent ? JSON.parse(selectedUserOponent) : null;
  });

  const [error, setError] = useState(null);

  const handleChoseOponentForUser = useCallback(async () => {
    try {
      if (!parsedUserSelection) {
        throw new Error("No user pokemon selected");
      }

      const { data: res, error } = await store.dispatch(
        generateUserOponent.initiate({
          userSelection: parsedUserSelection,
        })
      );

      if (error || !res)
        throw new Error(
          error?.message ||
            "Failed to fetch. Please refresh the page. Or try again later"
        );

      if (!res.base.HP) {
        return handleChoseOponentForUser();
      }

      sessionStorage.setItem(
        sessionStorageKeys.SELECTED_USER_OPONENT,
        JSON.stringify(res)
      );
      setUserOponent(res);
    } catch (error) {
      setError(error.message);
    }
  }, [parsedUserSelection]);

  const handleSetUpAndStartUserFight = async () => {
    try {
      if (!userOponent || !parsedUserSelection) {
        throw new Error("No user pokemon selected");
      }
      socket.emit("request_create_new_fight", {
        socket_id: socket.id,
        fightInfo: {
          userPokemon: parsedUserSelection,
          generatedPokemon: userOponent,
        },
      });

      socket.on("approved", (id) => {
        navigate(`/fight-session?fight_id=${id}`);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!userOponent) {
      handleChoseOponentForUser();
    }
  }, [handleChoseOponentForUser, userOponent]);

  return (
    <div className={styles.preparing_user_oponent_container}>
      <div className={styles.preview_wrap}>
        {!userOponent ? (
          <div className={styles.user_oponent_loading}>
            <img
              src={loader}
              alt="loader_user_oponent"
              className={styles.loader}
            />
            <p className={styles.description}>
              {error ? error : "Preparing your oponent.."}
            </p>
          </div>
        ) : (
          <div className={styles.card_wrap}>
            <div className={styles.oponent_card_header}>
              <h1 className={styles.title}>Your oponent</h1>
              <button
                className={styles.regenerate_button}
                onClick={handleChoseOponentForUser}
              >
                Regenerate
              </button>
            </div>
            <PokemonCard
              img={userOponent.img}
              name={userOponent.name}
              type={userOponent.type}
              base={userOponent.base}
              description={userOponent.description}
            />
          </div>
        )}

        <h3 className={`${styles.title} ${styles.vs}`}>VS</h3>
        {parsedUserSelection && (
          <div className={styles.card_wrap}>
            <h2 className={styles.title}>Your selection</h2>
            <PokemonCard
              img={parsedUserSelection.img}
              name={parsedUserSelection.name}
              type={parsedUserSelection.type}
              base={parsedUserSelection.base}
              description={parsedUserSelection.description}
            />
          </div>
        )}
      </div>
      {userOponent && parsedUserSelection && (
        <div className={styles.ready_button_container}>
          <button
            className={styles.user_ready_button}
            onClick={handleSetUpAndStartUserFight}
          >
            Ready
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
};
