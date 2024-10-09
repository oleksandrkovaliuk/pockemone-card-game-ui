import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useGetCurrentFightQuery } from "../../store/api/endpoints/userGameEnvirment/getCurrentFight";

import { PokemonCard } from "../../components/pokemonCard";

import { socket } from "../../helpers/socketSetUp";
import { sessionStorageKeys } from "../../lib/sessionStorageKeys";

import styles from "./fightSession.module.scss";

export const FightPage = () => {
  const navigate = useNavigate();

  const [param] = useSearchParams();

  const fightId = param.get("fight_id");

  const {
    data: fightInfo,
    isLoading,
    refetch,
  } = useGetCurrentFightQuery({
    fightId,
  });

  const [turn, setTurn] = useState(null);
  const [error, setError] = useState(null);
  const [isMissed, setIsMissed] = useState({
    userPokemon: false,
    generatedPokemon: false,
  });

  const redirectParams = fightInfo?.winner
    ? `/select-pokemon?winner=${
        fightInfo?.winner === "userPokemon" ? "you" : "robot"
      }&fight_id=${fightId}`
    : "/select-pokemon";

  const handleAttackAction = useCallback(async () => {
    try {
      if (!fightId || !turn) throw new Error("Something went wrong");

      socket.emit("attacked", {
        attacker: turn,
        attacked: turn === "userPokemon" ? "generatedPokemon" : "userPokemon",
        fightId,
      });

      setTurn((prev) =>
        prev === "userPokemon" ? "generatedPokemon" : "userPokemon"
      );
    } catch (error) {
      setError(error.message);
    }
  }, [fightId, turn]);

  useEffect(() => {
    if (fightInfo && fightInfo.whosTurn && !turn) {
      setTurn(fightInfo.whosTurn);
    }
  }, [fightInfo, turn]);

  useEffect(() => {
    const handleAttackApproved = () => {
      refetch();
    };

    socket.on("attack_approved", (data) => {
      if (data.miss) {
        setIsMissed((prev) => ({
          ...prev,
          [data.attacked]: true,
        }));
      } else {
        setIsMissed((prev) => ({
          ...prev,
          [data.attacked]: false,
        }));
      }
      handleAttackApproved();
    });

    return () => {
      navigate(redirectParams, { replace: true });
      socket.off("attack_approved", handleAttackApproved);
      sessionStorage.removeItem(sessionStorageKeys.SELECTED_USER_POKEMON);
      sessionStorage.removeItem(sessionStorageKeys.SELECTED_USER_OPONENT);
    };
  }, [fightId, fightInfo?.winner, navigate, redirectParams, refetch]);

  useEffect(() => {
    if (turn === "generatedPokemon") {
      const timeout = setTimeout(handleAttackAction, 1000);
      return () => clearTimeout(timeout);
    }
  }, [handleAttackAction, turn]);

  if (isLoading) {
    return <div>Preparing your fight...</div>;
  }

  return (
    <>
      {fightInfo.winner && (
        <div>
          <h1>Winner: {fightInfo.winner}</h1>
        </div>
      )}
      <div className={styles.fight_container}>
        {fightInfo?.actions && (
          <ul className={styles.actions_container}>
            {fightInfo?.actions.map((action, i) => (
              <li
                key={`${action}-${i}`}
                className={styles.attacked_message}
                title={action.time}
              >
                {action.fromPokemon} {action.type} {action.toPokemon} on{" "}
                {action.damage}HP
              </li>
            ))}
            <li className={styles.error}>{error}</li>
          </ul>
        )}
        <div className={styles.players_card_container}>
          <div className={styles.players_container}>
            <PokemonCard
              img={fightInfo.generatedPokemon.img}
              name={fightInfo.generatedPokemon.name}
              type={fightInfo.generatedPokemon.type}
              base={fightInfo.generatedPokemon.base}
              description={fightInfo.generatedPokemon.description}
            />

            <div
              className={styles.miss_message}
              data-is-miss={isMissed.generatedPokemon}
            >
              Missed
            </div>
          </div>
          <div className={styles.players_container}>
            <PokemonCard
              img={fightInfo.userPokemon.img}
              name={fightInfo.userPokemon.name}
              type={fightInfo.userPokemon.type}
              base={fightInfo.userPokemon.base}
              description={fightInfo.userPokemon.description}
            />

            <div
              className={styles.miss_message}
              data-is-miss={isMissed.userPokemon}
            >
              Missed
            </div>
          </div>
        </div>
        <div className={styles.atack_container}>
          <button
            disabled={turn !== "userPokemon" || fightInfo.winner}
            onClick={handleAttackAction}
            className={styles.attack_button}
          >
            Attack your oponent
          </button>
        </div>
      </div>
    </>
  );
};
