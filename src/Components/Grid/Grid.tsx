import { useEffect, useState } from "react";
import { GridPropType, NodeType } from "../../types";
import Node from "../Node/Node";
import "./Grid.css";
import React from "react";
import { CreateNode, GenerateGrid, getNewGridWithWallToggled, ClearBoard, ClearPath, ClearWalls } from "../Utilities/Utils";


export default React.memo(function Grid({ rows, cols, isVisualizing, algorithm, resetVisualizing, speed, clearBoard, clearPath, clearWalls, toggleClearBoard, toggleClearPath, toggleClearWalls }: GridPropType) {

    const [grid, setGrid] = useState<NodeType[][]>(() => GenerateGrid(rows, cols));
    const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
    const [isChangingStartNode, setIsChangingStartNode] = useState<boolean>(false);
    const [isChangingEndNode, setIsChangingEndNode] = useState<boolean>(false);
    const [startPathFinding, setStartPathFinding] = useState<boolean>(false);
    const [startNodePosition, setStartNodePosition] = useState<{ row: number, col: number }>({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) - 10 });
    const [endNodePosition, setEndNodePosition] = useState<{ row: number, col: number }>({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) + 10 });


    useEffect(() => {
        if (isVisualizing && algorithm && !startPathFinding) {
            setStartPathFinding(true);
            setGrid(prevGrid => {
                return prevGrid.map(row => row.map(node => {
                    const newNode = CreateNode(node.row, node.col, startNodePosition.row, startNodePosition.col, endNodePosition.row, endNodePosition.col);
                    newNode.isWall = node.isWall;
                    return newNode;
                }));
            })
        }

        if (startPathFinding) {
            visualizePathFindingAlgorithm();
        }

        if (clearBoard) {
            setGrid(prevGrid => ClearBoard(prevGrid, startNodePosition.row, startNodePosition.col, endNodePosition.row, endNodePosition.col));
            toggleClearBoard();
        }
        else if (clearPath) {
            setGrid(prevGrid => ClearPath(prevGrid, startNodePosition.row, startNodePosition.col, endNodePosition.row, endNodePosition.col));
            toggleClearPath();
        }
        else if (clearWalls) {
            setGrid(prevGrid => ClearWalls(prevGrid));
            toggleClearWalls();
        }

    }, [isVisualizing, startPathFinding, clearBoard, clearPath, clearWalls]);

    const handleMouseDown = (row: number, col: number): void => {
        if (row === startNodePosition.row && col === startNodePosition.col) {
            setIsChangingStartNode(true);
            setIsMousePressed(true);
            return;
        } else if (row === endNodePosition.row && col === endNodePosition.col) {
            setIsChangingEndNode(true);
            setIsMousePressed(true);
            return;
        }

        // Toggle wall state if not on start or end node
        setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
        setIsMousePressed(true);
    }


    const handleMouseOver = (row: number, col: number): void => {
        if (!isMousePressed) return;
        if (!isChangingStartNode && !isChangingEndNode) setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
        else if (isChangingStartNode) {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map(row => row.map(node => { return { ...node, isStart: false } }));
                newGrid[row][col].isStart = true;
                newGrid[row][col].isWall = false;
                return newGrid;
            });
            setStartNodePosition({ row, col });
        }
        else {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map(row => row.map(node => { return { ...node, isEnd: false } }));
                newGrid[row][col].isEnd = true;
                newGrid[row][col].isWall = false;
                return newGrid;
            });
            setEndNodePosition({ row, col });
        }
    }

    const handleMouseUp = (): void => {
        setIsMousePressed(false);
        setIsChangingStartNode(false);
        setIsChangingEndNode(false);
    }


    const animatePath = (visitedInOrder: NodeType[], finalPath: NodeType[]) => {
        visitedInOrder.forEach((oldNode, i) => {
            setTimeout(() => {
                setGrid(prevGrid => {
                    const newGrid = prevGrid.map(row => row.map(node => { return { ...node } }));
                    const newNode = { ...oldNode, isVisited: true };
                    newGrid[newNode.row][newNode.col] = newNode;
                    return newGrid;
                })

            }, speed * i);
        });

        setTimeout(() => {
            finalPath.forEach((node, i) => {
                setTimeout(() => {
                    setGrid(prevGrid => {
                        const newGrid = prevGrid.map(row => row.map(node => { return { ...node } }));
                        const newNode = { ...node, isInFinalPath: true };
                        newGrid[newNode.row][newNode.col] = newNode;
                        return newGrid;
                    })
                }, speed * i);
            })
        }, (speed + 1) * visitedInOrder.length);

        setTimeout(() => {
            setStartPathFinding(false);
            resetVisualizing();
        }, visitedInOrder.length * speed + finalPath.length * speed + speed);

    }

    const visualizePathFindingAlgorithm = (): void => {
        if (algorithm) {
            const startNode = grid[startNodePosition.row][startNodePosition.col];
            const endNode = grid[endNodePosition.row][endNodePosition.col];
            const { visitedNodesInOrder, finalPath } = algorithm.fn(grid, startNode, endNode);
            animatePath(visitedNodesInOrder, finalPath);
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
                                    />
                                );
                            })
                        }
                    </div>
                })
            }

        </div>


    );
});
