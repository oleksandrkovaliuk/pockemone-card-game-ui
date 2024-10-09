import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiTagsTypes } from "./lib/constants";
import { sessionStorageKeys } from "../../lib/sessionStorageKeys";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    prepareHeaders: async (headers) => {
      const token = sessionStorage.getItem(sessionStorageKeys.AUTH_TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  tagTypes: ApiTagsTypes,
  endpoints: () => ({}),
});
