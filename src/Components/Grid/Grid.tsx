import { useCallback, useEffect, useRef, useState } from "react";
import { GridPropType, NodeType } from "../../types";
import Node from "../Node/Node";
import "./Grid.css";
import React from "react";
import { CreateNode, GenerateGrid, getNewGridWithWallToggled, ClearBoard, ClearPath, ClearWalls } from "../Utilities/Utils";


function Grid({ rows, cols, isVisualizing, algorithm, resetVisualizing, speed, clearBoard, clearPath, clearWalls, toggleClearBoard, toggleClearPath, toggleClearWalls }: GridPropType) {

    const [grid, setGrid] = useState<NodeType[][]>(() => GenerateGrid(rows, cols));
    const [startPathFinding, setStartPathFinding] = useState<boolean>(false);
    const isMousePressed = useRef<boolean>(false);
    const isChangingStartNode = useRef<boolean>(false);
    const isChangingEndNode = useRef<boolean>(false);
    const startNodePosition = useRef<{ row: number, col: number }>({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) - 10 });
    const endNodePosition = useRef<{ row: number, col: number }>({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) + 10 });

    // use useRefs when want some value to be updated in place without causing unneccessary re renders 
    // basically this hook internally maintains same reference accross re renders which helps in maintaining closures
    // should only be used if we have some state like data which does not need any rendering of the ui.

    useEffect(() => {
        if (isVisualizing && algorithm && !startPathFinding) {
            setStartPathFinding(true);
            setGrid(prevGrid => {
                return prevGrid.map(row => row.map(node => {
                    const newNode = CreateNode(node.row, node.col, startNodePosition.current.row, startNodePosition.current.col, endNodePosition.current.row, endNodePosition.current.col);
                    newNode.isWall = node.isWall;
                    return newNode;
                }));
            })
        }

        if (startPathFinding) {
            visualizePathFindingAlgorithm();
        }

        if (clearBoard) {
            setGrid(prevGrid => ClearBoard(prevGrid, startNodePosition.current.row, startNodePosition.current.col, endNodePosition.current.row, endNodePosition.current.col));
            toggleClearBoard();
        }
        else if (clearPath) {
            setGrid(prevGrid => ClearPath(prevGrid, startNodePosition.current.row, startNodePosition.current.col, endNodePosition.current.row, endNodePosition.current.col));
            toggleClearPath();
        }
        else if (clearWalls) {
            setGrid(prevGrid => ClearWalls(prevGrid));
            toggleClearWalls();
        }

    }, [isVisualizing, startPathFinding, clearBoard, clearPath, clearWalls]);

    const handleMouseDown = useCallback((row: number, col: number): void => {
        if (row === startNodePosition.current.row && col === startNodePosition.current.col) {
            isChangingStartNode.current = true;
            isMousePressed.current = true;
            return;
        } else if (row === endNodePosition.current.row && col === endNodePosition.current.col) {
            isChangingEndNode.current = true;
            isMousePressed.current = true;
            return;
        }

        // Toggle wall state if not on start or end node
        setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
        isMousePressed.current = true;
    }, []);


    const handleMouseOver = useCallback((row: number, col: number): void => {
        if (!isMousePressed.current) return;
        const startRow = startNodePosition.current.row;
        const startCol = startNodePosition.current.col;
        const endRow = endNodePosition.current.row;
        const endCol = endNodePosition.current.col;

        if (!isChangingStartNode.current && !isChangingEndNode.current) setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
        else if (isChangingStartNode.current) {
            if (row === startRow && col === startCol) return;
            setGrid(prevGrid => {
                const newGrid = [...prevGrid];
                newGrid[startRow][startCol] = { ...newGrid[startRow][startCol], isStart: false };
                newGrid[row][col] = { ...newGrid[row][col], isWall: false, isStart: true };
                return newGrid;
            });
            startNodePosition.current.row = row;
            startNodePosition.current.col = col;
        }
        else {
            if (row === endRow && col === endCol) return;
            setGrid(prevGrid => {
                const newGrid = [...prevGrid];
                newGrid[endRow][endCol] = { ...newGrid[endRow][endCol], isEnd: false };
                newGrid[row][col] = { ...newGrid[row][col], isWall: false, isEnd: true };
                return newGrid;
            });
            endNodePosition.current.row = row;
            endNodePosition.current.col = col;
        }
    }, []);

    const handleMouseUp = (): void => {
        isMousePressed.current = false;
        isChangingStartNode.current = false;
        isChangingEndNode.current = false;
    }


    const animatePath = useCallback((visitedInOrder: NodeType[], finalPath: NodeType[]) => {
        visitedInOrder.forEach((oldNode, i) => {
            setTimeout(() => {
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[oldNode.row] = [...newGrid[oldNode.row]];
                    const newNode = { ...oldNode, isVisited: true };
                    newGrid[newNode.row][newNode.col] = newNode;
                    return newGrid;
                })

            }, speed.current * i);
        });

        setTimeout(() => {
            finalPath.forEach((node, i) => {
                setTimeout(() => {
                    setGrid(prevGrid => {
                        const newGrid = [...prevGrid];
                        newGrid[node.row] = [...newGrid[node.row]];
                        const newNode = { ...node, isInFinalPath: true };
                        newGrid[newNode.row][newNode.col] = newNode;
                        return newGrid;
                    })
                }, 30 * i);
            })
        }, (speed.current) * visitedInOrder.length);

        setTimeout(() => {
            setStartPathFinding(false);
            resetVisualizing();
        }, visitedInOrder.length * speed.current + finalPath.length * speed.current + speed.current);

    }, [resetVisualizing]);

    const visualizePathFindingAlgorithm = (): void => {
        if (algorithm) {
            const startNode = grid[startNodePosition.current.row][startNodePosition.current.col];
            const endNode = grid[endNodePosition.current.row][endNodePosition.current.col];
            const { visitedNodesInOrder, finalPath } = algorithm.fn(grid, startNode, endNode);
            console.log(visitedNodesInOrder);
            console.log(finalPath);

            // Ensure animatePath is called with the latest grid state
            animatePath(visitedNodesInOrder, finalPath);
        }
    }; // Ensure grid and animatePath are dependencies


    return (

        <div className="grid" onMouseUp={handleMouseUp}>

            {
                grid.map((row, rowIdx) => {
                    return <div className="gridRow" key={rowIdx}>
                        {
                            row.map((node, nodeIdx) => {
                                const { isStart, isEnd } = node;
                                return (
                                    <Node
                                        key={rowIdx * rows + nodeIdx}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                        isVisited={node.isVisited}
                                        handleMouseDown={handleMouseDown}
                                        handleMouseOver={handleMouseOver}
                                        row={node.row}
                                        col={node.col}
                                        isWall={node.isWall}
                                        isInFinalPath={node.isInFinalPath}
                                    />
                                );
                            })
                        }
                    </div>
                })
            }

        </div>


    );
};

export default React.memo(Grid);
