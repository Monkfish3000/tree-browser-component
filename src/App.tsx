import { useState } from "react";
import "./App.css";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "joi",
          children: [{ name: "node_modules" }, { name: "package.json" }],
        },
      ],
    },
    {
      name: "package.json",
    },
    {
      name: "vite.config.js",
    },
  ],
};

type TFile = {
  name: string;
  children?: TFile[];
};

function File({ file, depth }: { file: TFile; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {file.children ? (
        <button className="file" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "- " : "+ "}
          {file.name}
        </button>
      ) : (
        <div>{file.name}</div>
      )}

      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {file.children?.map((file) => (
            <File file={file} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="root">
      {files.children.map((file) => (
        <File file={file} depth={1} />
      ))}
    </div>
  );
}

export default App;
