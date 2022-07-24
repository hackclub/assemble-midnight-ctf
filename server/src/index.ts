import { Server } from "socket.io";
import { FLAGS, FLAG_PREFIX, GAME_DURATION_MINS } from "./config";
import redis from "./redis";

const INITIAL_STATE = {
  stage: "intro",
};

const getState = async () =>
  JSON.parse((await redis.GET("gamestate")) || "null");
const setState = async (state: any) =>
  redis.SET(
    "gamestate",
    JSON.stringify(Object.assign((await getState()) || {}, state))
  );

const io = new Server(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  emitState();

  const s = await getState();
  if (!s || s === "intro") {
    setTimeout(() => beginGame(), 3000);
  }

  let playerId: string | null = null;
  let playerName: string | null = null;

  socket.on("join", async ({ name, id }: { name: string; id: string }) => {
    playerId = id;
    playerName =
      (await redis.HGET(`playernames`, id)) || name?.trim().slice(0, 15);
    console.log(`✋ ${playerName} (${id}) joined as client ${socket.id}`);
    redis.HSET(`playernames`, id, playerName || "<Unknown>");
    socket.emit("hello");
  });

  socket.on("flag", async (flag) => {
    if (!playerId) return;
    if (FLAGS.includes(flag) || flag.includes(FLAG_PREFIX + flag)) {
      await redis.SADD(`flags`, flag);
      const flagsFound = await redis.SCARD(`flags`);
      console.log(
        `✅🛬  [${flagsFound}/${FLAGS.length}] ${playerName} submitted "${flag}" 🎉`
      );
    } else {
      console.log(`❌ ${playerName} submitted invalid flag "${flag}"`);
    }
  });
});

const beginGame = async () => {
  const endTime = Date.now() + GAME_DURATION_MINS * 60 * 1000;
  await setState({
    stage: "game",
    endTime: endTime,
  });
  emitState();
};

const emitState = async () => {
  const s = (await getState()) || INITIAL_STATE;
  io.emit("update", {
    ...s,
    time: Date.now(),
  });
};
