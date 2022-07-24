import ReactMarkdown from "react-markdown";
import IntroMD from "../content/intro.md";

const Intro = () => {
  return (
    <div className="p-4 border-2 text-xl max-w-3xl content">
      <ReactMarkdown>{IntroMD}</ReactMarkdown>
    </div>
  );
};

export default Intro;
