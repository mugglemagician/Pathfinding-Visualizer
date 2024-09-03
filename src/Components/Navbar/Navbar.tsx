import "./Navbar.css";

export default function Navbar({ isVisualizing, startPathFinding }: { isVisualizing: boolean, startPathFinding: () => void }) {
    return (
        <nav className="Navbar">
            <ul>
                <li className="branding">
                    <h1>
                        Path Finder
                    </h1>
                </li>

                <li className="visualize">
                    <button onClick={startPathFinding}>
                        {isVisualizing ? "Stop!" : "Visualize!"}
                    </button>
                </li>
            </ul>
        </nav>
    );
}
