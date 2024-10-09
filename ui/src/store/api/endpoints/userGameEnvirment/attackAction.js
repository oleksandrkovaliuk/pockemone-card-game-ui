import { api } from "../../api";
import { ApiUrlsGameEnvirment } from "../../lib/constants";

const attackActionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    attackAction: builder.mutation({
      query: ({ attacker, atacked, fightId }) => ({
        url: ApiUrlsGameEnvirment.attackAction,
        method: "POST",
        body: { attacker, atacked, fightId },
      }),
    }),
  }),
});

export const { useAttackActionMutation } = attackActionApi;
export const { attackAction } = attackActionApi.endpoints;
