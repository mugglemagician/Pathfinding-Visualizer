import "./Node.css";
import { NodePropType } from "../../types";
import React from "react";


function Node({ row, col, isStart, isEnd, isVisited, isWall, handleMouseDown, handleMouseOver, isInFinalPath }: NodePropType) {

    const extraClassName = isStart ? "Node-Start" : isEnd ? "Node-End" : isVisited ? "Node-Visited" : isWall ? "Node-Wall" : isInFinalPath ? "Node-Final-Path" : "";

    return (
        <div
            className={`Node ${extraClassName}`}
            onMouseDown={(e) => handleMouseDown(row, col, e)}
            onMouseOver={() => handleMouseOver(row, col)}
        >

            {isStart && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>}

            {isEnd && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
            </svg>}

        </div >
    );
}

export default React.memo(Node);