import React, { useState } from "react";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";
import { visualizeAStar, visualizeBfs, visualizeDfs, visualizeDijkstra, visualizeGbfs } from "../../PathFindingAlgorithms/visualizeAlgorithms";
import { AlgorithmInputType, isVisualizingType } from "../../types";
import "./PathFinderVisualizer.css";
import PathFinderVisualizerInfo from "../PathFinderVisualizerInfo/PathFinderVisualizerInfo";

const algorithms = [
    { id: 0, name: "dijkstra", fn: visualizeDijkstra, info: "Dijkstra's algorithm is weighted and guarantees the shortest path!" },
    { id: 1, name: "dfs", fn: visualizeDfs, info: "Depth-first Search is unweighted and does not guarantees the shortest path" },
    { id: 2, name: "bfs", fn: visualizeBfs, info: "Breadth-first Search is weighted and guarantees the shortest path" },
    { id: 3, name: "A*", fn: visualizeAStar, info: "A* Search is weighted and guarantees the shortest path!" },
    { id: 4, name: "Gbfs", fn: visualizeGbfs, info: "Greedy Best-first Search is weighted and does not guarantees the shortest path!" }
];

let algorithm: AlgorithmInputType | null = null;

const rows = (window.innerHeight - 100) / 30;
const cols = (window.innerWidth - 100) / 25;

export default React.memo(function PathFinderVisualizer() {

    const [isVisualizing, setIsVisualizing] = useState<isVisualizingType>({ innerText: "Visualize", state: false });

    const startPathFinding = (): void => {
        if (!algorithm) return;
        setIsVisualizing({ innerText: "Visualizing " + algorithm.name, state: true });
    }

    const resetVisualizing = (): void => {
        setIsVisualizing({ innerText: "Visualize " + algorithm?.name, state: false });
    }

    const selectAlgorithm = (id: number) => {
        if (isVisualizing.state) return;
        algorithm = algorithms[id];
        setIsVisualizing({ innerText: "Visualize " + algorithm.name, state: false });
    }

    return (
        <div className="pathFinder">
            <Navbar isVisualizing={isVisualizing}
                startPathFinding={startPathFinding}
                selectAlgorithm={selectAlgorithm}
            />

            <PathFinderVisualizerInfo algoInfo={algorithm ? algorithm.info : "Pick an algorithm to visualize!"} />

            <Grid rows={rows} cols={cols} isVisualizing={isVisualizing.state} algorithm={algorithm} resetVisualizing={resetVisualizing} />
        </div>

    );
});
