import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../../store/selectors/auth/getUser";
import { openModal } from "../../../../store/slices/auth/isAuthModalOpen";

import pikachu from "../../../../assets/pikachu.webp";

import styles from "./hero.module.scss";

export const Hero = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);

  return (
    <div className={styles.hero_container}>
      <div className={styles.main_screen_logo}>
        <img
          src={pikachu}
          alt="pikachu logo"
          className={styles.pokemone_logo}
        />

        {!user ? (
          <button
            onClick={() => dispatch(openModal(true))}
            className={styles.start_game_button}
          >
            Start
          </button>
        ) : (
          <a href="/select-pokemon" className={styles.start_game_button}>
            Start
          </a>
        )}

        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/oleksandrkovaliuk"
          className={styles.creator_link}
        >
          @{process.env.REACT_APP_CREATOR}
        </a>
      </div>
    </div>
  );
};
