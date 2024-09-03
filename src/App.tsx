import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import PathFinderVisualizer from "./Components/PathFinderVisualizer/PathFinderVisualizer";

function App() {

  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);

  const startPathFinding = (): void => {
    setIsVisualizing(true);
  }

  return (
    <>
      <Navbar isVisualizing={isVisualizing} startPathFinding={startPathFinding} />
      <PathFinderVisualizer isVisualizing={isVisualizing} />
    </>
  );
}

export default App;
