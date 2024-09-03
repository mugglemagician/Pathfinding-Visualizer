import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";
import { visualizeAStar, visualizeBfs, visualizeDfs, visualizeDijkstra, visualizeGbfs } from "../../PathFindingAlgorithms/visualizeAlgorithms";
import { AlgorithmInputType } from "../../types";

const algorithms = [
    { id: 0, name: "dijkstra", fn: visualizeDijkstra },
    { id: 1, name: "dfs", fn: visualizeDfs },
    { id: 2, name: "bfs", fn: visualizeBfs },
    { id: 3, name: "A*", fn: visualizeAStar },
    { id: 4, name: "Gbfs", fn: visualizeGbfs }
];

let algorithm: AlgorithmInputType | null = null;

export default React.memo(function PathFinderVisualizer() {

    const [isVisualizing, setIsVisualizing] = useState<{ innerText: string, state: boolean }>({ innerText: "Visualize", state: false });
    const [isViewingAlgorithms, setIsViewingAlgorithms] = useState<boolean>(false);
    const [isViewingSpeed, setIsViewingSpeed] = useState<boolean>(false);

    const startPathFinding = (): void => {
        if (!algorithm) return;
        setIsVisualizing({ innerText: "Visualizing " + algorithm.name, state: true });
    }

    const toggleViewAlgorithms = (): void => {
        setIsViewingAlgorithms(prev => !prev);
    }

    const toggleViewSpeed = (): void => {
        setIsViewingSpeed(prev => !prev);
    }

    const selectAlgorithm = (id: number) => {
        algorithm = algorithms[id];
    }

    return (
        <div className="pathFinder">
            <Navbar isVisualizing={isVisualizing.state}
                startPathFinding={startPathFinding}
                isViewingAlgorithms={isViewingAlgorithms}
                toggleViewAlgorithms={toggleViewAlgorithms}
                isViewingSpeed={isViewingSpeed}
                toggleViewSpeed={toggleViewSpeed}
                selectAlgorithm={selectAlgorithm}
            />

            <Grid rows={25} cols={50} isVisualizing={isVisualizing.state} algorithm={algorithm} />
        </div>

    );
});
