import React, { useRef, useState } from "react";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";
import { PathAlgoType, isVisualizingType, MazeAlgoType } from "../../types";
import "./PathFinderVisualizer.css";
import PathFinderVisualizerInfo from "../PathFinderVisualizerInfo/PathFinderVisualizerInfo";
import { pathAlgos, mazeAlgos } from "../Utilities/Utils";

const speeds = [40, 30, 20];
let rows = Math.floor((window.innerHeight - 250) / 25);
if (rows % 2 === 0) rows++;
let cols = Math.floor((window.innerWidth) / 25);
if (cols % 2 === 0) cols--;

function PathFinderVisualizer() {

    const [visualizePath, setVisualizePath] = useState<isVisualizingType>({ innerText: "Visualize", state: false });
    const [pathAlgo, setPathAlgo] = useState<PathAlgoType | null>(null);
    const [visualizeMaze, setVisualizeMaze] = useState<boolean>(false);
    const [mazeAlgo, setMazeAlgo] = useState<MazeAlgoType | null>(null);
    const [clearBoard, setClearBoard] = useState<boolean>(false);
    const [clearPath, setClearPath] = useState<boolean>(false);
    const [clearWalls, setClearWalls] = useState<boolean>(false);
    const speed = useRef<number>(40);

    // the things are set up so that if i am visualizing any algorithm i will not be able to do anything else (be it be maze or path finding algorithm)

    const startPathFinding = (): void => {
        if (visualizeMaze) return;
        if (!pathAlgo) {
            if (visualizePath.innerText === "Pick Algorithm!") return;
            setVisualizePath({ innerText: "Pick Algorithm!", state: false });
            return;
        }
        setVisualizePath({ innerText: "Visualizing " + pathAlgo.name, state: true });
    }

    const resetPathVisualizing = (): void => {
        setVisualizePath({ innerText: "Visualize " + pathAlgo?.name, state: false });
    }

    const resetMazeVisualizing = (): void => {
        setMazeAlgo(null);
        setVisualizeMaze(false);
    }

    const selectAlgorithm = (id: number) => {
        if (visualizePath.state || visualizeMaze) return;
        setPathAlgo(pathAlgos[id]);
        setVisualizePath({ innerText: "Visualize " + pathAlgos[id].name, state: false });
    }

    const selectMazeAlgo = (id: number) => {
        if (visualizePath.state || visualizeMaze) return;
        setMazeAlgo(mazeAlgos[id]);
        setVisualizeMaze(true);
    }

    const selectSpeed = (id: number) => {
        if (visualizePath.state || visualizeMaze) return;
        speed.current = speeds[id];
    }

    const toggleClearBoard = () => {
        if (visualizePath.state || visualizeMaze) return;
        setClearBoard(prev => !prev);
    }

    const toggleClearPath = () => {
        if (visualizePath.state || visualizeMaze) return;
        setClearPath(prev => !prev);
    }

    const toggleClearWalls = () => {
        if (visualizePath.state || visualizeMaze) return;
        setClearWalls(prev => !prev);
    }

    return (
        <div className="pathFinder">
            <Navbar isVisualizing={visualizePath}
                startPathFinding={startPathFinding}
                selectAlgorithm={selectAlgorithm}
                selectSpeed={selectSpeed}
                toggleClearBoard={toggleClearBoard}
                toggleClearPath={toggleClearPath}
                toggleClearWalls={toggleClearWalls}
                selectMazeAlgo={selectMazeAlgo}
            />

            <PathFinderVisualizerInfo algoInfo={pathAlgo ? pathAlgo.info : "Pick an algorithm to visualize!"} />

            <Grid rows={rows}
                cols={cols}
                isVisualizingPath={visualizePath.state}
                pathAlgo={pathAlgo}
                resetPathVisualizing={resetPathVisualizing}
                isVisualizingMaze={visualizeMaze}
                mazeAlgo={mazeAlgo}
                resetMazeVisualizing={resetMazeVisualizing}
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