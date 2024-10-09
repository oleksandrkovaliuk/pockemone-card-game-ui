import React from "react";

import { Hero } from "./sections/hero";

import styles from "./home.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.home_container}>
      <Hero />
    </div>
  );
};
