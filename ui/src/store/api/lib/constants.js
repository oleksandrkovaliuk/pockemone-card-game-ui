export const ApiUrlsPockemons = {
  getAllPockemons: "/pokemons/get",
};

export const ApiUrlsAuth = {
  getNonce: "/auth/get/nonce",
  verifyAndGetUser: "/auth/get/user",
  authenticateUser: "/auth/authenticate/user",
};

export const ApiUrlsGameEnvirment = {
  getCurrentFight: "/game/get/current/fight",
  attackAction: "/game/process/atack",
  generateUserOponent: "/game/generate/user/opponent",
};
export const ApiTagsTypes = ["POCKEMONS_LIST", "USER", "USER_FIGHT"];
