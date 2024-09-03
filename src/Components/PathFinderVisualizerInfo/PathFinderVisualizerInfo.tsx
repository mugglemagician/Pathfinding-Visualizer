import "./PathFinderVisualizerInfo.css";

export default function PathFinderVisualizerInfo({ algoInfo }: { algoInfo: string }) {
    return (
        <div className="pathFinderVisualizerInfo">
            <ul className="pathFinderInfo">
                <li>
                    <div className="nodeShowCase startShowCase"></div>
                    Start Node
                </li>
                <li>
                    <div className="nodeShowCase targetShowCase"></div>
                    Target Node
                </li>
                <li>
                    <div className="nodeShowCase unvisitedShowCase"></div>
                    Unvisited Node
                </li>
                <li>
                    <div className="nodeShowCase visited-one"></div>
                    <div className="nodeShowCase visited-two"></div>
                    Visited Nodes
                </li>
                <li>
                    <div className="nodeShowCase finalShowCase"></div>
                    Final Path Node
                </li>
                <li>
                    <div className="nodeShowCase wallShowCase"></div>
                    Wall Node
                </li>
            </ul>

            <h2>{algoInfo}</h2>
        </div>
    );
}
