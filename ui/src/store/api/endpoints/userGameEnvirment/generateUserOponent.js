import { api } from "../../api";
import { ApiUrlsGameEnvirment } from "../../lib/constants";

const generateUserOponentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateUserOponent: builder.mutation({
      query: ({ userSelection }) => ({
        url: ApiUrlsGameEnvirment.generateUserOponent,
        method: "POST",
        body: { userSelection },
      }),
    }),
  }),
});

export const { useGenerateUserOponentMutation } = generateUserOponentApi;
export const { generateUserOponent } = generateUserOponentApi.endpoints;
