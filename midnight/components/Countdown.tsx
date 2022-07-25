import clsx from "clsx";
import { useEffect, useState } from "react";
import { useServerState } from "../lib/socketContext";
import { formatTime } from "../lib/util";

const Countdown = ({
  end: explicitEnd,
  inline,
}: {
  end?: number;
  inline?: boolean;
}) => {
  const { endTime } = useServerState();
  const end = explicitEnd || endTime;

  const [clockTime, setClockTime] = useState<number | null>(null);

  useEffect(() => {
    const setTime = () => {
      setClockTime(Math.max(0, end - Date.now()));
    };
    const interval = setInterval(setTime, 200);
    setTime();
    return () => clearInterval(interval);
  }, [end]);

  const danger =
    clockTime !== null && clockTime < 1000 * 60 * (inline ? 0.25 : 5);

  return (
    <span
      className={clsx(
        danger && "text-red-600",
        inline ? "" : "text-7xl font-heading"
      )}
    >
      {clockTime === null ? "--:--" : formatTime(clockTime, inline)}
    </span>
  );
};

export default Countdown;
