import { NavbarPropType } from "../../types";
import "./Navbar.css";
import DropDown from "../DropDown/DropDown";

export default function Navbar({ isVisualizing, startPathFinding, isViewingAlgorithms, toggleViewAlgorithms, isViewingSpeed, toggleViewSpeed }: NavbarPropType) {

    return (
        <nav>
            <ul className="navbar">
                <li className="branding navbar-item">
                    <h1>Path Finder</h1>
                </li>

                <DropDown dropDownLabel="Algorithms"
                    toggleDropDownList={toggleViewAlgorithms}
                    isShowing={isViewingAlgorithms}
                    elements={["Dijkstra", "Breadth First Search", "Depth First Search"]}
                    dropDownWidth="250px" />

                <DropDown dropDownLabel="Speed"
                    toggleDropDownList={toggleViewSpeed}
                    isShowing={isViewingSpeed}
                    elements={["Slow", "Medium", "Fast"]}
                    dropDownWidth="100px" />

                <li className="visualize navbar-item">
                    <button onClick={startPathFinding} className="button">
                        {isVisualizing ? "Stop!" : "Visualize!"}
                    </button>
                </li>
            </ul >
        </nav >
    );
}
