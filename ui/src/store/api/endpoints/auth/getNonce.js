import { api } from "../../api";
import { ApiUrlsAuth } from "../../lib/constants";

const getNonceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNonce: builder.query({
      query: ({ walletAddress }) => ({
        url: `${ApiUrlsAuth.getNonce}?walletAddress=${walletAddress}`,
      }),
    }),
  }),
});

export const { useGetNonceQuery } = getNonceApi;
export const { getNonce } = getNonceApi.endpoints;

export default getNonceApi;
