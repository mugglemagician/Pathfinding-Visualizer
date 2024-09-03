import { NavbarPropType } from "../../types";
import "./Navbar.css";
import DropDown from "../DropDown/DropDown";
import { useState } from "react";

export default function Navbar({ isVisualizing, startPathFinding, selectAlgorithm }: NavbarPropType) {
    const [isViewingAlgorithms, setIsViewingAlgorithms] = useState<boolean>(false);
    const [isViewingSpeed, setIsViewingSpeed] = useState<boolean>(false);

    const toggleViewAlgorithms = (): void => {
        setIsViewingAlgorithms(prev => !prev);
    }

    const toggleViewSpeed = (): void => {
        setIsViewingSpeed(prev => !prev);
    }
    return (
        <nav>
            <ul className="navbar">
                <li className="branding navbar-item">
                    <h1>Path Finder</h1>
                </li>

                <DropDown dropDownLabel="Algorithms"
                    toggleDropDownList={toggleViewAlgorithms}
                    isShowing={isViewingAlgorithms}
                    elements={["Dijkstra", "Depth First Search", "Breadth First Search", "A* Search", "Greedy Best First Search"]}
                    dropDownWidth="250px"
                    selectItem={selectAlgorithm} />

                <li className="visualize navbar-item">
                    <button onClick={startPathFinding} className="button">
                        {isVisualizing.innerText}
                    </button>
                </li>

                <DropDown dropDownLabel="Speed"
                    toggleDropDownList={toggleViewSpeed}
                    isShowing={isViewingSpeed}
                    elements={["Slow", "Medium", "Fast"]}
                    dropDownWidth="100px"
                    selectItem={undefined} />

            </ul >
        </nav >
    );
}
