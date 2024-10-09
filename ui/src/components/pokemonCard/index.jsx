import React from "react";

import { AtackStatsIcon } from "../../svgs/AtackStatsIcon";
import { DefenseStatsIcon } from "../../svgs/DefenseStatsIcon";
import { SpeedStatsIcon } from "../../svgs/SpeedStatsIcon";

import styles from "./pokemonCard.module.scss";

export const PokemonCard = ({ img, name, type, base, description }) => {
  return (
    <button className={styles.pokemon_card}>
      <div className={styles.pokemon_card_header}>
        <span className={styles.pokemon_card_name}>{name}</span>
        <div className={styles.pokemon_card_health}>
          <span className={styles.pokemon_card_health_label}>HP</span>
          <span className={styles.pokemon_card_health_value}>{base.HP}</span>
        </div>
      </div>
      <div
        className={styles.pokemon_img}
        style={{ backgroundImage: `url(${img})` }}
      />

      <div className={styles.abilities}>
        <div className={styles.pokemon_species_label}>Ability</div>
        <span className={styles.pokemon_species_value}>
          {type.main_type}
          {type.sub_type && `, ${type.sub_type}`}
        </span>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.pokemon_card_footer}>
        <div className={styles.stats_blocks}>
          <div className={styles.stats_block} aria-label="Attack stats">
            <AtackStatsIcon className={styles.stats_icon} />
            <span className={styles.stats_value}>{base.Attack}</span>
          </div>
          <div className={styles.stats_block} aria-label="Defense stats">
            <DefenseStatsIcon className={styles.stats_icon} />
            <span className={styles.stats_value}>{base.Defense}</span>
          </div>
          <div className={styles.stats_block} aria-label="Speed stats">
            <SpeedStatsIcon className={styles.stats_icon} />
            <span className={styles.stats_value}>{base.Speed}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
