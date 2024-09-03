import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import PathFinderVisualizer from "./Components/PathFinderVisualizer/PathFinderVisualizer";

function App() {

  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);
  const [isViewingAlgorithms, setIsViewingAlgorithms] = useState<boolean>(false);
  const [isViewingSpeed, setIsViewingSpeed] = useState<boolean>(false);

  const startPathFinding = (): void => {
    setIsVisualizing(true);
  }

  const toggleViewAlgorithms = (): void => {
    setIsViewingAlgorithms(prev => !prev);
  }

  const toggleViewSpeed = (): void => {
    setIsViewingSpeed(prev => !prev);
  }

  return (
    <div>
      <Navbar isVisualizing={isVisualizing}
        startPathFinding={startPathFinding}
        isViewingAlgorithms={isViewingAlgorithms}
        toggleViewAlgorithms={toggleViewAlgorithms}
        isViewingSpeed={isViewingSpeed}
        toggleViewSpeed={toggleViewSpeed}
      />
      <PathFinderVisualizer isVisualizing={isVisualizing} />
    </div>
  );
}

export default App;
