import { api } from "../../api";
import { ApiUrlsAuth } from "../../lib/constants";

export const verifyAndGetUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    verifyAndGetUser: builder.query({
      query: () => ({
        url: ApiUrlsAuth.verifyAndGetUser,
      }),
    }),
  }),
});

export const { useVerifyAndGetUserQuery } = verifyAndGetUserApi;
export const { verifyAndGetUser } = verifyAndGetUserApi.endpoints;
export default verifyAndGetUserApi;
