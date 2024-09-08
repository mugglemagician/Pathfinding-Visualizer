import { useCallback, useEffect, useRef, useState } from "react";
import { GridPropType, NodeType } from "../../types";
import Node from "../Node/Node";
import "./Grid.css";
import React from "react";
import { CreateNode, GenerateGrid, getNewGridWithWallToggled, ClearBoard, ClearPath, ClearWalls } from "../Utilities/Utils";

const drow = [-1, 0, 1, 0];
const dcol = [0, -1, 0, 1];


function Grid({ rows, cols, isVisualizingPath, pathAlgo, resetPathVisualizing, isVisualizingMaze, mazeAlgo, resetMazeVisualizing, speed, clearBoard, clearPath, clearWalls, toggleClearBoard, toggleClearPath, toggleClearWalls }: GridPropType) {

    const [grid, setGrid] = useState<NodeType[][]>(() => GenerateGrid(rows, cols));
    const startPathFinding = useRef<boolean>(false);
    const startMazeGeneration = useRef<boolean>(false);
    const isMousePressed = useRef<boolean>(false);
    const isChangingStartNode = useRef<boolean>(false);
    const isChangingEndNode = useRef<boolean>(false);
    const startNodePosition = useRef<{ row: number, col: number }>({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) - 10 });
    const endNodePosition = useRef<{ row: number, col: number }>({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) + 10 });

    // use useRefs when want some value to be updated (or persist) in place without causing unneccessary re renders 
    // basically this hook internally maintains same reference accross re renders which helps in maintaining closures
    // should only be used if we have some state like data which does not need any rendering of the ui.

    useEffect(() => {

        if (startPathFinding.current) {
            visualizePathFindingAlgorithm();
        }
        else if (startMazeGeneration.current) {
            visualizeMazeGenerationAlgorithm();
        }

        if (isVisualizingPath && pathAlgo && !startPathFinding.current) {
            startPathFinding.current = true;
            setGrid(prevGrid => {
                return prevGrid.map(row => row.map(node => {
                    const newNode = CreateNode(node.row, node.col, startNodePosition.current.row, startNodePosition.current.col, endNodePosition.current.row, endNodePosition.current.col);
                    newNode.isWall = node.isWall;
                    return newNode;
                }));
            });
        }
        else if (isVisualizingMaze && mazeAlgo && !startMazeGeneration.current) {
            startMazeGeneration.current = true;
            setGrid(prevGrid => {
                return prevGrid.map(row => row.map(node => {
                    const newNode = CreateNode(node.row, node.col, startNodePosition.current.row, startNodePosition.current.col, endNodePosition.current.row, endNodePosition.current.col);
                    return newNode;
                }));
            });
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

    }, [isVisualizingPath, isVisualizingMaze, startMazeGeneration.current, startPathFinding.current, clearBoard, clearPath, clearWalls]);

    const handleMouseDown = useCallback((row: number, col: number): void => {
        if (startMazeGeneration.current || startPathFinding.current) return;
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
        if (startMazeGeneration.current || startPathFinding.current) return;
        if (!isMousePressed.current) return;
        const startRow = startNodePosition.current.row;
        const startCol = startNodePosition.current.col;
        const endRow = endNodePosition.current.row;
        const endCol = endNodePosition.current.col;
        if ((row === startRow && col === startCol) || (row === endRow && col === endCol)) return;
        if (!isChangingStartNode.current && !isChangingEndNode.current) setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
        else if (isChangingStartNode.current) {
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
        if (startMazeGeneration.current || startPathFinding.current) return;
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
                    const newNode = { ...oldNode, isVisitedFront: true };
                    if (i === visitedInOrder.length - 1) { newNode.isVisited = true; }
                    if (i > 0) {
                        const prevFront = { ...visitedInOrder[i - 1], isVisited: true, isVisitedFront: false };
                        newGrid[prevFront.row][prevFront.col] = prevFront;
                    }
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
                        const newNode = { ...node, isFinalFront: true, isVisitedFront: true };
                        if (i > 0) {
                            const prevNode = { ...finalPath[i - 1], isFinalFront: false, isInFinalPath: true, isVisitedFront: false };
                            newGrid[prevNode.row][prevNode.col] = prevNode;
                        }
                        newGrid[newNode.row][newNode.col] = newNode;
                        return newGrid;
                    })
                }, 50 * i);
            })
        }, (speed.current) * visitedInOrder.length);

        setTimeout(() => {
            startPathFinding.current = false;
            resetPathVisualizing();
        }, visitedInOrder.length * speed.current + finalPath.length * speed.current + speed.current + 200);

    }, [resetPathVisualizing]);

    const visualizePathFindingAlgorithm = (): void => {
        if (pathAlgo) {
            const startNode = grid[startNodePosition.current.row][startNodePosition.current.col];
            const endNode = grid[endNodePosition.current.row][endNodePosition.current.col];
            const { visitedNodesInOrder, finalPath } = pathAlgo.fn(grid, startNode, endNode);
            animatePath(visitedNodesInOrder, finalPath);
        }
    };

    const animateWalls = (walledNodes: Set<NodeType>, carvedPath: (NodeType[] | undefined)): void => {
        let idx = 0;
        walledNodes.forEach((node) => {
            setTimeout(() => {
                setGrid(prevGrid => {
                    const newGrid = [...prevGrid];
                    newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isWall: true };
                    return newGrid;
                });

            }, 2 * idx++);
        });

        if (carvedPath) {
            carvedPath.forEach((node, i) => {
                setTimeout(() => {
                    setGrid(prevGrid => {
                        const newGrid = [...prevGrid];
                        newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isWall: false };
                        return newGrid;
                    });
                }, 2 * walledNodes.size + 100 + 20 * i);
            });

        }

        setTimeout(() => {
            startMazeGeneration.current = false;
            resetMazeVisualizing();
        }, 2 * walledNodes.size + (carvedPath ? 20 * carvedPath.length : 0) + 200);

    }

    const visualizeMazeGenerationAlgorithm = (): void => {
        if (mazeAlgo) {
            const { walledNodes, carvedPath } = mazeAlgo.fn(grid);
            const startRow = startNodePosition.current.row;
            const startCol = startNodePosition.current.col;
            const endRow = endNodePosition.current.row;
            const endCol = endNodePosition.current.col;

            if (walledNodes.has(grid[startRow][startCol])) {
                walledNodes.delete(grid[startRow][startCol]);
                for (let i = 0; i < 4; i++) {
                    let nrow = startRow + drow[i];
                    let ncol = startCol + dcol[i];
                    if (nrow >= 0 && ncol >= 0 && nrow < grid.length && ncol < grid[0].length) {
                        if (walledNodes.has(grid[nrow][ncol])) {
                            walledNodes.delete(grid[nrow][ncol]);
                            break;
                        }
                    }
                }
            }

            if (walledNodes.has(grid[endRow][endCol])) {
                walledNodes.delete(grid[endRow][endCol]);
                for (let i = 0; i < 4; i++) {
                    let nrow = endRow + drow[i];
                    let ncol = endCol + dcol[i];
                    if (nrow >= 0 && ncol >= 0 && nrow < grid.length && ncol < grid[0].length) {
                        if (walledNodes.has(grid[nrow][ncol])) {
                            walledNodes.delete(grid[nrow][ncol]);
                            break;
                        }
                    }
                }
            }
            animateWalls(walledNodes, carvedPath);
        }
    }


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
                                        isFront={node.isVisitedFront}
                                        isFinalFront={node.isFinalFront}
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
