import ReactMarkdown from "react-markdown";
import Countdown from "../Countdown";
import Letter from "../Letter";
import { useServerState } from "lib/socketContext";

const Intro = () => {
  const s = useServerState();

  return (
    <Letter>
      <div className="opacity-60">
        You have <Countdown inline /> to read this letter.
      </div>
      <ReactMarkdown>{s.content}</ReactMarkdown>
    </Letter>
  );
};

export default Intro;
