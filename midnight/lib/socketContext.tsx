import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ctx = createContext<[socket: Socket | undefined, connected: boolean]>([
  undefined,
  false,
]);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, _setSocket] = useState<Socket>();
  const [connected, _setConnected] = useState(false);

  useEffect(() => {
    const s = io("http://localhost:4000");
    _setSocket(s);
    s.on("connect", () => {
      _setConnected(true);
    });
    s.on("disconnect", () => {
      _setConnected(false);
      s.connect();
    });
  }, []);

  return <ctx.Provider value={[socket, connected]}>{children}</ctx.Provider>;
}

export const useSocket = () => useContext(ctx);
