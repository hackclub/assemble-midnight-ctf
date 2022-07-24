import { useSocket } from "../lib/socketContext";
import Clock from "./Clock";
import { FiArrowRight } from "react-icons/fi";
import { useRef, useState } from "react";

const Game = () => {
  const [socket, _, state] = useSocket();
  const flagInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="bg-black fixed top-5 w-full left-0 flex justify-center">
        <Clock end={state.endTime} />
      </div>

      <form
        className="bg-slate-800 p-5 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const flag = flagInput.current?.value;
          socket?.emit("flag", flag);
          flagInput.current!.value = "";
          flagInput.current!.focus();
        }}
      >
        <h4 className="font-primary text-xl">Submit a flag</h4>
        <div className="flex gap-3">
          <input
            className="font-secondary rounded-sm bg-slate-900 outline-none text-lg p-2 w-96"
            ref={flagInput}
          />
          <button
            type="submit"
            className="font-secondary rounded-sm bg-slate-900 outline-none text-lg p-2"
          >
            <FiArrowRight size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Game;
