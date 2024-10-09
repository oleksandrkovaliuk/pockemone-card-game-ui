import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api/api";

import userReducer from "./slices/auth/userSlice";
import openAuthModalReducer from "./slices/auth/isAuthModalOpen";
import userPokemonSelectionReducer from "./slices/userGameEnvirment/userPokemonSelection";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    openAuthModal: openAuthModalReducer,
    userPokemonSelection: userPokemonSelectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
