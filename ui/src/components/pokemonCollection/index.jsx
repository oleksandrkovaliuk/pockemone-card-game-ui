import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { store } from "../../store";
import {
  getPokemonsByRequest,
  useGetPokemonsByRequestQuery,
} from "../../store/api/endpoints/pockemons/getPokemonsByRequest";
import { setUserPokemonSelection } from "../../store/slices/userGameEnvirment/userPokemonSelection";

import { CloseIcon } from "../../svgs/CloseIcon";
import { SearchIcon } from "../../svgs/SearchIcon";
import loader from "../../assets/loader.gif";

import { PokemonCard } from "../pokemonCard";

import { useDebounce } from "../../hooks/useDebounce";
import { ObservationHandler } from "../../helpers/ObservationHandler";
import { isIncludeSpecialCharacters } from "../../helpers/validationOnSpecialCharacters";

import styles from "./pokemonCollection.module.scss";

export const PokemonCollection = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(10);
  const [searchedName, setSearchedName] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const { data: fetchedPokemons, isFetching } = useGetPokemonsByRequestQuery({
    limit: pokemonLimit,
  });

  const handleFetchPokemonsBySearchReq = async () => {
    try {
      if (!searchedName.length) return;

      if (isIncludeSpecialCharacters(searchedName)) {
        setSearchedName("");
        throw new Error("The search field must not include special characters");
      } else {
        setError(null);
        const { data: res, error } = await store.dispatch(
          getPokemonsByRequest.initiate({
            limit: pokemonLimit,
            searched_name: searchedName,
          })
        );
        if (error || !res.length) throw new Error(error.message);

        setPokemonList(res);
      }
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  const handleSelectPokemoneByUser = (pokemon) => {
    if (!pokemon) return;

    setSelectedPokemon((prev) => {
      if (prev?.id === pokemon.id) {
        return prev;
      }
      return pokemon;
    });
    dispatch(setUserPokemonSelection(pokemon));
  };

  const debauncedSearch = useDebounce(handleFetchPokemonsBySearchReq, 200);

  const handleUploadMorePokemons = useCallback(() => {
    setPokemonLimit((prev) => prev + 10);
  }, []);

  useEffect(() => {
    if (isFetching || searchedName.length) return;

    if (fetchedPokemons?.length) {
      setPokemonList((prevList) => {
        const existingIds = new Set(prevList.map((p) => p.id));
        return [
          ...prevList,
          ...fetchedPokemons.filter((pokemon) => !existingIds.has(pokemon.id)),
        ];
      });
    }
  }, [fetchedPokemons, isFetching, searchedName]);

  return (
    <div className={styles.pokemon_collection}>
      <div className={styles.search_bar_container}>
        <div className={styles.search_bar_input_wrap}>
          <input
            type="text"
            placeholder=""
            id="search_pokemons_input"
            name="search_pokemons_input"
            disabled={!pokemonList.length}
            value={searchedName}
            onChange={(e) => {
              setSearchedName(e.target.value);
              debauncedSearch();
            }}
            className={styles.search_input}
          />
          <label
            htmlFor="search_pokemons_input"
            className={styles.search_label}
          >
            <SearchIcon className={styles.search_icon} />
            Search by name...
          </label>
          {!!searchedName.length && (
            <button
              onClick={() => setSearchedName("")}
              className={styles.clear_search_selection_btn}
            >
              <CloseIcon className={styles.clear_search_selection_icon} />
            </button>
          )}
        </div>
        <p className={styles.search_notes} data-is-error={!!error}>
          {!!error
            ? error
            : "Search your favorite pokemon here and begin your fight!"}
        </p>
      </div>
      {!pokemonList.length ? (
        <div className={styles.loader_wrap}>
          <img src={loader} alt="loader" className={styles.loader} />
        </div>
      ) : (
        <ul className={styles.list_of_pokemons}>
          {pokemonList.map((pokemon) => (
            <li
              title={pokemon.species}
              aria-label={pokemon.species}
              key={`${pokemon.id}-${pokemon.species}`}
              className={styles.pokemon_card_wrap}
              data-is-selected={selectedPokemon?.id === pokemon.id}
            >
              <input
                type="checkbox"
                id={`pokemon_card_${pokemon.id}`}
                aria-label={pokemon.species}
                className={styles.hidden_checkbox}
                onChange={() => handleSelectPokemoneByUser(pokemon)}
              />
              <PokemonCard
                id={pokemon.id}
                img={pokemon.img}
                name={pokemon.name}
                type={pokemon.type}
                base={pokemon.base}
                species={pokemon.species}
                description={pokemon.description}
                isPokemonSelected={selectedPokemon?.id === pokemon.id}
              />
            </li>
          ))}
          <li className={styles.end_of_list}>
            <ObservationHandler
              onObserv={handleUploadMorePokemons}
              delay={300}
            />
          </li>
        </ul>
      )}
    </div>
  );
};
