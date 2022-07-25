import ReactMarkdown from "react-markdown";

const Letter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 border-2 text-2xl max-w-2xl content">{children}</div>
  );
};

export default Letter;
