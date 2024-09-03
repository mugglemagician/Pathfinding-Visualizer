import { useEffect, useState } from "react";
import { GridPropType, NodeType } from "../../types";
import Node from "../Node/Node";
import "./Grid.css";
import React from "react";

const START_ROW = 5;
const START_COL = 5;
const END_ROW = 5;
const END_COL = 40;

const GenerateGrid = (rows: number, cols: number): NodeType[][] => {
    const grid: NodeType[][] = [];

    for (let row = 0; row < rows; row++) {
        const currentRow: NodeType[] = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(CreateNode(row, col));
        }
        grid.push(currentRow);
    }

    return grid;
}

const CreateNode = (row: number, col: number): NodeType => {
    return {
        row,
        col,
        isStart: START_ROW === row && START_COL === col,
        isEnd: END_ROW === row && END_COL === col,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isInFinalPath: false,
        previousNode: null,
        gCost: Infinity,
        hCost: Infinity,
        heapIdx: -1,
        getFCost() {
            return this.gCost + this.hCost;
        }
    };
}

const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number): NodeType[][] => {
    const newGrid = grid.map(row => row.map(node => { return { ...node } }));
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    return newGrid;
}


export default React.memo(function Grid({ rows, cols, isVisualizing, algorithm, resetVisualizing }: GridPropType) {

    const [grid, setGrid] = useState<NodeType[][]>(() => GenerateGrid(rows, cols));
    const [isMousePressed, setIsMousePressed] = useState<boolean>(false);
    const [startPathFinding, setStartPathFinding] = useState<boolean>(false);

    useEffect(() => {
        if (isVisualizing && algorithm && !startPathFinding) {
            setStartPathFinding(true);
            setGrid(prevGrid => {
                return prevGrid.map(row => row.map(node => {
                    const newNode = CreateNode(node.row, node.col);
                    newNode.isWall = node.isWall;
                    return newNode;
                }));
            })
        }

        if (startPathFinding) {
            visualizePathFindingAlgorithm();
        }

    }, [isVisualizing, startPathFinding]);

    const handleMouseDown = (row: number, col: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
        setIsMousePressed(true);
    }

    const handleMouseOver = (row: number, col: number): void => {
        if (!isMousePressed) return;
        setGrid(prevGrid => getNewGridWithWallToggled(prevGrid, row, col));
    }

    const handleMouseUp = (): void => {
        setIsMousePressed(false);
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

            }, 30 * i);
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
                }, 40 * i);
            })
        }, 30 * visitedInOrder.length);

        setTimeout(() => {
            setStartPathFinding(false);
            resetVisualizing();
        }, visitedInOrder.length * 30 + finalPath.length * 40 + 50);

    }

    const visualizePathFindingAlgorithm = (): void => {
        if (algorithm) {
            const startNode = grid[START_ROW][START_COL];
            const endNode = grid[END_ROW][END_COL];
            const { visitedNodesInOrder, finalPath } = algorithm.fn(grid, startNode, endNode);
            console.log(visitedNodesInOrder);
            console.log(finalPath);
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
