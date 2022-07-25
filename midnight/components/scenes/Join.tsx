import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { FaHandPointRight } from "react-icons/fa";

const Join = ({ onSetName }: { onSetName: (name: string) => void }) => {
  const [name, setName] = useState("");

  // useEffect(() => {
  //   ref.current?.focus();
  // }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.length >= 2) onSetName(name);
        }}
        className="flex gap-3 items-center"
      >
        <h3 className="text-5xl">WELCOME,</h3>

        <input
          // ref={ref}
          autoFocus
          className="inline-block min-w-[3rem] max-w-[25rem] p-3 text-3xl bg-transparent focus:bg-white focus:bg-opacity-10 outline-none border-b-2 text-center"
          maxLength={15}
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
        >
          <FaHandPointRight size={30} />
        </button>
      </form>

      <p
        className={clsx(
          "text-center text-red-800 mt-6 transition-all duration-500",
          name ? "opacity-100" : "opacity-0"
        )}
      >
        {`You CANNOT change your chosen name later.`}
      </p>
    </div>
  );
};

export default Join;
