import ReactMarkdown from "react-markdown";
import { useServerState } from "lib/socketContext";
import Letter from "../Letter";
import Countdown from "components/Countdown";

const PostGame = () => {
  const s = useServerState();

  const won = s.game_won;

  return (
    <Letter>
      <ReactMarkdown>{s.content}</ReactMarkdown>
      <div>
        Continuing in <Countdown inline />
      </div>
    </Letter>
  );
};

export default PostGame;
