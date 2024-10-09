import { createSelector } from "@reduxjs/toolkit";

const isAuthModalOpen = (state) => state.openAuthModal;

export const isAuthModalOpenSelector = createSelector(
  [isAuthModalOpen],
  (isModalOpen) => isModalOpen
);
