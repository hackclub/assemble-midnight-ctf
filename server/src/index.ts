import { Server } from "socket.io";
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

  socket.on("join", (name) => {
    console.log(`${name} ${socket.id} joined`);
    redis.HSET(`players`, socket.id, name);
    socket.emit("hello");
  });
});

const GAME_DURATION_MINS = 5.5;
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
