import { NavbarPropType } from "../../types";
import "./Navbar.css";
import DropDown from "../DropDown/DropDown";
import React from "react";

function Navbar({ isVisualizing, startPathFinding, selectAlgorithm, selectMazeAlgo, selectSpeed, toggleClearBoard, toggleClearPath, toggleClearWalls }: NavbarPropType) {

    return (
        <nav>
            <ul className="navbar">
                <li className="branding navbar-item">
                    <h1>Path Finderrrrrrr</h1>
                </li>

                <DropDown dropDownLabel="Algorithms"
                    elements={["Dijkstra", "Depth First Search", "Breadth First Search", "A* Search", "Greedy Best First Search"]}
                    dropDownWidth="250px"
                    selectItem={selectAlgorithm} />

                <DropDown dropDownLabel="Mazes & Patterns"
                    elements={["Recursive Division", "Simple Stair Pattern", "Basic Random Maze", "Basic Weight Maze"]}
                    dropDownWidth="250px"
                    selectItem={selectMazeAlgo} />

                <li className="visualize navbar-item">
                    <button onClick={startPathFinding} className="button">
                        {isVisualizing.innerText}
                    </button>
                </li>

                <li className="navbar-item clear-option" onClick={toggleClearBoard}>
                    <h2>Clear Board</h2>
                </li>

                <li className="navbar-item clear-option" onClick={toggleClearWalls}>
                    <h2>Clear Walls</h2>
                </li>

                <li className="navbar-item clear-option" onClick={toggleClearPath}>
                    <h2>Clear Path</h2>
                </li>

                <DropDown dropDownLabel="Speed"
                    elements={["Slow", "Medium", "Fast"]}
                    dropDownWidth="100px"
                    selectItem={selectSpeed} />

            </ul >
        </nav >
    );
}

export default React.memo(Navbar);