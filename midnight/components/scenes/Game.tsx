import { useSocket } from "../../lib/socketContext";
import Countdown from "../Countdown";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import party from "party-js";
import { selectRandom } from "../../lib/util";

const Game = () => {
  const [socket, _, state] = useSocket();
  const flagInput = useRef<HTMLInputElement>(null);
  const [flagError, setFlagError] = useState("");

  useEffect(() => {
    socket?.on("flag-received", (result) => {
      if (result === "valid") {
        party.confetti(flagInput.current!);
      } else {
        setFlagError(
          selectRandom([
            "Idk where you found this flag 🤔 but it's wrong",
            "do better smh",
            "no.",
            "you missed that flag harder than your ex's red ones",
            "gonna have to FLAG that as incorrect",
            "🥲 if this was your math test you'd be failing rn",
            "You must be one of those anti-pineapple-on-pizza kinda people because you're wrong",
            "it's ok we all make mistakes",
            "I think you're wrong. Unless maybe I'm wrong? Could I be wrong? What even am I? Why am I here?",
            "That one is wrong, but try counting the number of characters in this sentence", // 77
          ])
        );
      }
    });
  }, [socket]);

  return (
    <div className="h-full">
      <div className="bg-black fixed top-5 w-full left-0 flex justify-center">
        <Countdown />
      </div>

      <form
        className="bg-slate-800 p-5 flex flex-col gap-3 mt-32 w-[30rem]"
        onSubmit={(e) => {
          e.preventDefault();
          setFlagError("");
          const flag = flagInput.current?.value;
          if (!flag!.length) return;
          socket?.emit("flag", flag);
          flagInput.current!.value = "";
          flagInput.current!.focus();
        }}
      >
        <h4 className="font-primary text-xl">Submit Flag</h4>
        <div className="flex gap-3">
          <input
            className="font-secondary rounded-sm bg-slate-900 outline-none text-lg p-2 w-full"
            ref={flagInput}
          />
          <button
            type="submit"
            className="font-secondary rounded-sm bg-slate-900 outline-none text-lg p-2"
          >
            <FiArrowRight size={24} />
          </button>
        </div>
        <p className="text-red-500">{flagError}</p>
      </form>

      <ul className="flex flex-col gap-4 my-3 items-center">
        {state.flagsFound?.reverse().map((flag: string) => (
          <li className="opacity-70 text-xl" key={flag}>
            a::{flag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
