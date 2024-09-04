import { NavbarPropType } from "../../types";
import "./Navbar.css";
import DropDown from "../DropDown/DropDown";

export default function Navbar({ isVisualizing, startPathFinding, selectAlgorithm, selectSpeed, toggleClearBoard, toggleClearPath, toggleClearWalls }: NavbarPropType) {

    return (
        <nav>
            <ul className="navbar">
                <li className="branding navbar-item">
                    <h1>Path Finder</h1>
                </li>

                <DropDown dropDownLabel="Algorithms"
                    elements={["Dijkstra", "Depth First Search", "Breadth First Search", "A* Search", "Greedy Best First Search"]}
                    dropDownWidth="250px"
                    selectItem={selectAlgorithm} />

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
