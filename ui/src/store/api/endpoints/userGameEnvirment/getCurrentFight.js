import { api } from "../../api";
import { ApiUrlsGameEnvirment } from "../../lib/constants";

const getCurrentFightApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentFight: builder.query({
      query: ({ fightId }) => ({
        url: `${ApiUrlsGameEnvirment.getCurrentFight}?fightId=${fightId}`,
      }),
    }),
  }),
});

export const { useGetCurrentFightQuery } = getCurrentFightApi;
export const { getCurrentFight } = getCurrentFightApi.endpoints;
