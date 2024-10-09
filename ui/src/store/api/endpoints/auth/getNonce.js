import { api } from "../../api";
import { ApiUrlsAuth } from "../../lib/constants";

const getNonceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNonce: builder.mutation({
      query: ({ walletAddress }) => ({
        url: ApiUrlsAuth.getNonce,
        method: "POST",
        body: { walletAddress },
      }),
    }),
  }),
});

export const { useGetNonceQuery } = getNonceApi;
export const { getNonce } = getNonceApi.endpoints;

export default getNonceApi;
