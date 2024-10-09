import { api } from "../../api";
import { ApiUrlsAuth } from "../../lib/constants";

const authenticateUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authenticateUser: builder.mutation({
      query: ({ walletAddress, signature }) => ({
        url: ApiUrlsAuth.authenticateUser,
        method: "POST",
        body: { walletAddress, signature },
      }),
    }),
  }),
});

export const { useAuthenticateUserMutation } = authenticateUserApi;
export const { authenticateUser } = authenticateUserApi.endpoints;
export default authenticateUserApi;
