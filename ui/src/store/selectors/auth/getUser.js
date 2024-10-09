import { createSelector } from "@reduxjs/toolkit";

const getUser = (state) => state.user;

export const getUserSelector = createSelector([getUser], (user) => user);
