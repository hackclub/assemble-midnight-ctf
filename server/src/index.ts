import { Server } from "socket.io";
import Game from "./game";
import redis from "./redis";

const io = new Server(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const game = new Game(io);
