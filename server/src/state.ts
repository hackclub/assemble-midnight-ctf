import redis from "./redis";

export const getGameState = async () =>
  JSON.parse((await redis.GET("gamestate")) || "null");
export const setGameState = async (state: any) =>
  redis.SET(
    "gamestate",
    JSON.stringify(Object.assign((await getGameState()) || {}, state))
  );

export const getPlayerName = (id) => redis.HGET(`playernames`, id);
export const setPlayerName = (id, name) => redis.HSET(`playernames`, id, name);

export const getFlags = () => redis.LRANGE(`flags`, 0, -1);
export const pushFlag = async (playerId, flag) => {
  if ((await getFlags()).includes(flag)) return;
  await redis.LPUSH(`flags`, flag);
  await redis.LPUSH(`flags:${playerId}`, flag);
};
