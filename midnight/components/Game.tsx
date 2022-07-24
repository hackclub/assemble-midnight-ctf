import { useSocket } from "../lib/socketContext";
import { formatTime } from "../lib/util";
import Clock from "./Clock";

const Game = () => {
  const [socket, _, state] = useSocket();

  return (
    <div>
      <Clock end={state.endTime} />
    </div>
  );
};

export default Game;
