import { Server } from "socket.io";
import Game from "./game";

const io = new Server(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const game = new Game(io);
