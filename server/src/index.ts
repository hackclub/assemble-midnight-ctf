import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  io.emit("update", {
    stage: "intro",
  });
});
