import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSearchParams } from "react-router-dom";

import { useGetCurrentFightQuery } from "../../store/api/endpoints/userGameEnvirment/getCurrentFight";
import styles from "./winnerModal.module.scss";

export const WinnerModal = () => {
  const [params, setParams] = useSearchParams();

  const fightId = params.get("fight_id");
  const winner = params.get("winner");

  const { data: fightInfo } = useGetCurrentFightQuery(
    fightId ? { fightId } : skipToken
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (winner) {
      setIsModalOpen(true);
    }
  }, [winner]);

  const handleCloseModal = () => {
    setIsModalOpen(false);

    params.delete("winner");
    params.delete("fight_id");
    setParams(params);
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div
            className={styles.opaque_background}
            onClick={handleCloseModal}
          />
          <div className={styles.modal_container}>
            <span className={styles.fightStatus}>
              {winner === "you" ? "YOU WIN" : "YOU LOSE"}
            </span>

            <p className={styles.result_of_the_fight}>
              Your Pokémon {fightInfo?.userPokemon.name} lost to{" "}
              {fightInfo?.generatedPokemon.name}
            </p>
          </div>
        </>
      )}
    </>
  );
};
