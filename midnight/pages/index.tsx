import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Intro from "../components/scenes/Intro";
import Join from "../components/scenes/Join";
import { useSocket } from "../lib/socketContext";
import { CgLoadbar } from "react-icons/cg";
import Game from "../components/scenes/Game";
import { nanoid } from "nanoid";
import PostGame from "../components/scenes/Postgame";
import Head from "next/head";
import PreEvent from "components/scenes/PreEvent";
import clsx from "clsx";
import Endgame from "components/scenes/Endgame";

const Home: NextPage = () => {
  const [socket, connected, state] = useSocket();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    console.log(`Hi there`);
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

  const pageTitle =
    {
      intro: "🔴 Welcome to Midnight 🔴",
      game: "3897",
      postgame: "??",
    }[state?.stage as string] || "⠀";

  return (
    <div
      className={clsx(
        "h-screen flex items-center justify-center p-8",
        !state?.eventStarted && "bg-white text-black"
      )}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>

      {!connected && (
        <div className="text-sm flex flex-col items-center gap-2 font-sans">
          <CgLoadbar size={30} className="animate-spin" />
          reload if this takes too long
        </div>
      )}
      {connected && !state?.eventStarted && <PreEvent />}
      {connected && !joined && state?.eventStarted && <Join onSetName={join} />}
      {joined && connected && (
        <>
          {state.stage === "intro" && <Intro />}
          {state.stage === "game" && <Game />}
          {state.stage === "postgame" && <PostGame />}
          {state.stage === "endgame" && <Endgame />}
        </>
      )}
    </div>
  );
};

export default Home;
