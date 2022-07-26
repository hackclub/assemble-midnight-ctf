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
            "That one is wrong, but try counting the number of characters in this sentence", // 77
            "The Organization is disappointed in your efforts.",
            "do better smh",
            "no.",
            "you missed that flag harder than your ex's red ones",
            "gonna have to FLAG that as incorrect",
            "🥲 if this was your math test you'd be failing rn",
            "You must be one of those anti-pineapple-on-pizza kinda people because you're wrong",
            "it's ok we all make mistakes",
            "I think you're wrong. Unless maybe I'm wrong? Could I be wrong? What even am I? Why am I here?",
            "Maybe try ASSEMBLing a better flag 🙄",
          ])
        );
      }
    });
  }, [socket]);

  return (
    <div className="h-full">
      <div className="bg-black z-30 fixed top-5 w-full left-0 flex flex-col items-center">
        <Countdown />

        <form
          className="bg-slate-800 p-5 flex flex-col gap-3 mt-8 w-[30rem]"
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
      </div>

      <ul className="mt-64 flex flex-col gap-4 my-3 items-left">
        {state.flagsFound
          ?.reverse()
          .map((f: { flag: string; name: string; finder: string }) => (
            <li className="text-xl" key={f.flag}>
              <span className="opacity-80">a::{f.flag}</span>{" "}
              <span className="opacity-60">{f.name}</span>{" "}
              <span className="opacity-50 text-sm italic">{f.finder}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Game;
