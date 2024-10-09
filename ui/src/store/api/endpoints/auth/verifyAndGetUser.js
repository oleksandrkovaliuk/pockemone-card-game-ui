import { api } from "../../api";
import { ApiUrlsAuth } from "../../lib/constants";

export const verifyAndGetUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    verifyAndGetUser: builder.mutation({
      query: ({ token }) => ({
        url: ApiUrlsAuth.verifyAndGetUser,
        method: "POST",
        body: token,
      }),
    }),
  }),
});

export const { useVerifyAndGetUserMutation } = verifyAndGetUserApi;
export const { verifyAndGetUser } = verifyAndGetUserApi.endpoints;
export default verifyAndGetUserApi;
