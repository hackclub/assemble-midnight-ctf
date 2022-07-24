import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FaHandPointRight } from "react-icons/fa";

const Join = ({ onSetName }: { onSetName: (name: string) => void }) => {
  const [name, setName] = useState("");

  // useEffect(() => {
  //   ref.current?.focus();
  // }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSetName(name);
      }}
      className="flex gap-3 items-center"
    >
      <h3 className="text-5xl">WELCOME,</h3>

      <input
        // ref={ref}
        className="inline-block min-w-[3rem] max-w-[25rem] p-3 text-3xl bg-white bg-opacity-10 outline-none border-b-2 text-center"
        onChange={(e) => setName(e.target.value)}
      >
        {/* name */}
      </input>
      <button
        type="submit"
        className={clsx(
          "opacity-50 hover:opacity-80 text-white font-bold mx-2",
          !name && "invisible"
        )}
        onClick={() => onSetName(name)}
      >
        <FaHandPointRight size={30} />
      </button>
    </form>
  );
};

export default Join;
