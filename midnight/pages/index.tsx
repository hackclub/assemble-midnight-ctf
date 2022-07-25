import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Intro from "../components/scenes/Intro";
import Join from "../components/scenes/Join";
import { useSocket } from "../lib/socketContext";
import { CgLoadbar } from "react-icons/cg";
import Game from "../components/scenes/Game";
import { nanoid } from "nanoid";
import PostGame from "../components/scenes/Postgame";

const Home: NextPage = () => {
  const [socket, connected, state] = useSocket();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    console.log(`There are no clues here. Don't waste your time. (probably)`);
  }, []);

  const join = (name?: string, existingId?: string) => {
    const id = existingId || nanoid();
    localStorage.setItem("p_id", id);
    socket?.emit("join", {
      name,
      id,
    });
  };

  useEffect(() => {
    const onHello = () => setJoined(true);

    if (connected) {
      const pId = localStorage.getItem("p_id");
      if (pId) join(undefined, pId);

      console.log("Connected to server");
      socket?.on("hello", onHello);
      socket?.on("client-reset", () => {
        // Need to clear local storage and state
        localStorage.removeItem("p_id");
        setJoined(false);
      });
    }

    return () => {
      socket?.off("hello", onHello);
    };
  }, [connected, socket]);

  return (
    <div className="h-screen flex items-center justify-center p-8">
      {!connected && (
        <div className="text-sm flex flex-col items-center gap-2">
          <CgLoadbar size={30} className="animate-spin" />
          reload if this takes too long
        </div>
      )}
      {connected && !joined && <Join onSetName={join} />}
      {joined && connected && (
        <>
          {state.stage === "intro" && <Intro />}
          {state.stage === "game" && <Game />}
          {state.stage === "postgame" && <PostGame />}
        </>
      )}
    </div>
  );
};

export default Home;
