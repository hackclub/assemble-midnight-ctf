import { Server } from "socket.io";
import Game from "./game";

const io = new Server(parseInt(process.env.PORT, 10) || 4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const game = new Game(io);

if (process.env.NODE_ENV === "production") {
  console.log("🚀 PROD");
}
