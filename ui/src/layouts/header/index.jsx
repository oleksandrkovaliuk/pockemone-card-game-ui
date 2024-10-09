import React from "react";

import { Auth } from "../../components/auth";

import pokemon_logo from "../../assets/pokemon_logo.webp";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header_container}>
      <nav className={styles.nav_container}>
        <a href="/" className={styles.pokemon_logo_link} title="back to home">
          <img
            src={pokemon_logo}
            alt="pokemon logo"
            className={styles.pokemon_logo}
          />
        </a>
        <Auth />
      </nav>
    </header>
  );
};
