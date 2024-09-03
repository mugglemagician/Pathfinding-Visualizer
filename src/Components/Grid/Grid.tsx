import { useEffect, useState } from "react";
import { GridPropType, NodeType } from "../../types";
import Node from "../Node/Node";
import "./Grid.css";
import { Dijkstra } from "../../PathFindingAlgorithms/Dijkstra";
import { getShortestPath } from "../../PathFindingAlgorithms/Utils";

const START_ROW = 5;
const START_COL = 5;
const END_ROW = 10;
const END_COL = 10;

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
        previousNode: null
    };
}

const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number): NodeType[][] => {
    const newGrid = grid.map(row => row.map(node => { return { ...node } }));
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    return newGrid;
}


export default function Grid({ rows, cols, isVisualizing }: GridPropType) {

    const [grid, setGrid] = useState<NodeType[][]>(() => GenerateGrid(rows, cols));
    const [isMousePressed, setIsMousePressed] = useState<boolean>(false);

    useEffect(() => {
        if (isVisualizing)
            visualizeDijkstra();
    }, [isVisualizing]);

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

    }

    const visualizeDijkstra = (): void => {
        const startNode = grid[START_ROW][START_COL];
        const endNode = grid[END_ROW][END_COL];
        const visitedNodeInOrder = Dijkstra(grid, startNode, endNode);
        const shortestPath = getShortestPath(endNode);
        animatePath(visitedNodeInOrder, shortestPath);

    }

    return (

        <div className="Grid" onMouseUp={handleMouseUp}>

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
}
