import { useEffect, useState } from "react";
import Treebeard from "./components";

function App() {
  const [data, setData] = useState({});
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const callback = async () => {
      const res = await (await fetch("/api/tree")).json();
      setData(res);
    };
    callback();
  }, []);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
  };

  return <Treebeard data={data} onToggle={onToggle} />;
}

export default App;
