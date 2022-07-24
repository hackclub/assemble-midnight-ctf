import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import Join from "../components/Join";
import { useServerState, useSocket } from "../lib/socketContext";
import { CgLoadbar } from "react-icons/cg";
import Game from "../components/Game";

const Home: NextPage = () => {
  const [socket, connected, state] = useSocket();
  const [joined, setJoined] = useState(false);

  const join = (name: string) => {
    socket?.emit("join", name);
  };

  useEffect(() => {
    const onHello = () => setJoined(true);

    if (connected) {
      console.log("Connected to server");
      socket?.on("hello", onHello);
    }

    return () => {
      socket?.off("hello", onHello);
    };
  }, [connected, socket]);

  return (
    <div className="h-screen flex items-center justify-center p-8">
      {!connected && <CgLoadbar size={30} className="animate-spin" />}
      {connected && !joined && <Join onSetName={join} />}
      {joined && connected && (
        <>
          {state.stage === "intro" && <Intro />}
          {state.stage === "game" && <Game />}
        </>
      )}
    </div>
  );
};

export default Home;
