import React, { useRef, useState } from "react";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";
import { AlgorithmInputType, isVisualizingType } from "../../types";
import "./PathFinderVisualizer.css";
import PathFinderVisualizerInfo from "../PathFinderVisualizerInfo/PathFinderVisualizerInfo";
import { algorithms } from "../Utilities/Utils";

const speeds = [40, 30, 20];
const rows = (window.innerHeight - 100) / 30;
const cols = (window.innerWidth - 100) / 25;

function PathFinderVisualizer() {

    const [isVisualizing, setIsVisualizing] = useState<isVisualizingType>({ innerText: "Visualize", state: false });
    const [clearBoard, setClearBoard] = useState<boolean>(false);
    const [clearPath, setClearPath] = useState<boolean>(false);
    const [clearWalls, setClearWalls] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<AlgorithmInputType | null>(null);
    const speed = useRef<number>(40);

    const startPathFinding = (): void => {
        if (!algorithm) return;
        setIsVisualizing({ innerText: "Visualizing " + algorithm.name, state: true });
    }

    const resetVisualizing = (): void => {
        setIsVisualizing({ innerText: "Visualize " + algorithm?.name, state: false });
    }

    const selectAlgorithm = (id: number) => {
        if (isVisualizing.state) return;
        setAlgorithm(algorithms[id]);
        setIsVisualizing({ innerText: "Visualize " + algorithms[id].name, state: false });
    }

    const selectSpeed = (id: number) => {
        if (isVisualizing.state) return;
        speed.current = speeds[id];
    }

    const toggleClearBoard = () => {
        if (isVisualizing.state) return;
        setClearBoard(prev => !prev);
    }

    const toggleClearPath = () => {
        if (isVisualizing.state) return;
        setClearPath(prev => !prev);
    }

    const toggleClearWalls = () => {
        if (isVisualizing.state) return;
        setClearWalls(prev => !prev);
    }

    return (
        <div className="pathFinder">
            <Navbar isVisualizing={isVisualizing}
                startPathFinding={startPathFinding}
                selectAlgorithm={selectAlgorithm}
                selectSpeed={selectSpeed}
                toggleClearBoard={toggleClearBoard}
                toggleClearPath={toggleClearPath}
                toggleClearWalls={toggleClearWalls}
            />

            <PathFinderVisualizerInfo algoInfo={algorithm ? algorithm.info : "Pick an algorithm to visualize!"} />

            <Grid rows={rows}
                cols={cols}
                isVisualizing={isVisualizing.state}
                algorithm={algorithm}
                resetVisualizing={resetVisualizing}
                speed={speed}
                clearBoard={clearBoard}
                clearPath={clearPath}
                clearWalls={clearWalls}
                toggleClearBoard={toggleClearBoard}
                toggleClearPath={toggleClearPath}
                toggleClearWalls={toggleClearWalls} />
        </div>

    );
}

export default React.memo(PathFinderVisualizer);