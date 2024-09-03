import "./Node.css";
import { NodePropType } from "../../types";

export default function Node({ row, col, isStart, isEnd, isVisited, isWall, handleMouseDown, handleMouseOver, isInFinalPath }: NodePropType) {

    const extraClassName = isStart ? "Node-Start" : isEnd ? "Node-End" : isVisited ? "Node-Visited" : isWall ? "Node-Wall" : isInFinalPath ? "Node-Final-Path" : "";

    return (
        <div
            className={`Node ${extraClassName}`}
            onMouseDown={(e) => handleMouseDown(row, col, e)}
            onMouseOver={() => handleMouseOver(row, col)}
        ></div>
    );
}
