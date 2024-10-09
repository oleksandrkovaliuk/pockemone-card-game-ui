import { api } from "../../api";
import { ApiUrlsPockemons } from "../../lib/constants";

const getPokemonsByRequestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonsByRequest: builder.query({
      query: ({ limit, searched_name }) => ({
        url: `${
          ApiUrlsPockemons.getAllPockemons
        }?limit=${limit}&searched_name=${searched_name || ""}`,
      }),
      providesTags: ["POCKEMONS_LIST"],
    }),
  }),
});

export const { useGetPokemonsByRequestQuery } = getPokemonsByRequestApi;
export const { getPokemonsByRequest } = getPokemonsByRequestApi.endpoints;
