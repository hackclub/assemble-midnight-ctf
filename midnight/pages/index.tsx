import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Intro from "../components/Intro";
import { useSocket } from "../lib/socketContext";

const Home: NextPage = () => {
  const [socket, connected] = useSocket();
  const [gameState, setGameState] = useState<any>();

  useEffect(() => {
    if (connected && socket) {
      console.log("Connected to server");
      socket.on("update", setGameState);
    }
  }, [connected, socket]);

  return (
    <div className="flex items-center justify-center p-8">
      {gameState && <>{gameState.stage === "intro" && <Intro />}</>}
    </div>
  );
};

export default Home;
