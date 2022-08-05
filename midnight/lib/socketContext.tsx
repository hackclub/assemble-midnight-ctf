import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ctx = createContext<
  [socket: Socket | undefined, connected: boolean, state: any]
>([undefined, false, null]);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket>();
  const [state, setState] = useState<any>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000");
    setSocket(s);
    s.on("connect", () => {
      setConnected(true);
    });
    s.on("disconnect", () => {
      setConnected(false);
      s.connect();
    });
    s.on("update", (s) => {
      // Need to adjust times if server is behind/ahead of client
      const serverOffset = Date.now() - s.time;
      setState({
        ...s,
        endTime: s.endTime && s.endTime + serverOffset,
      });
    });

    return () => {
      s.disconnect();
      s.removeAllListeners();
    };
  }, []);

  return (
    <ctx.Provider value={[socket, connected, state]}>{children}</ctx.Provider>
  );
}

export const useSocket = () => useContext(ctx);
export const useServerState = () => useContext(ctx)[2];
