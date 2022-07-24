import clsx from "clsx";
import { useEffect, useState } from "react";
import { formatTime } from "../lib/util";

const Clock = ({ end }: { end: number }) => {
  const [time, setTime] = useState(1000 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.max(0, end - Date.now()));
    }, 200);

    return () => clearInterval(interval);
  }, [end]);

  const danger = time < 1000 * 60 * 5;

  return (
    <div className={clsx("text-9xl", danger && "text-red-600")}>
      {formatTime(time)}
    </div>
  );
};

export default Clock;
