import { visualizeAStar, visualizeBfs, visualizeDfs, visualizeDijkstra, visualizeGbfs, visualizeRecursiveBackTracker, visualizeRecursiveDivision } from "../../PathFindingAlgorithms/visualizeAlgorithms";
import { NodeType } from "../../types";

export const pathAlgos = [
    { id: 0, name: "dijkstra", fn: visualizeDijkstra, info: "Dijkstra's algorithm is weighted and guarantees the shortest path!" },
    { id: 1, name: "dfs", fn: visualizeDfs, info: "Depth-first Search is unweighted and does not guarantees the shortest path" },
    { id: 2, name: "bfs", fn: visualizeBfs, info: "Breadth-first Search is weighted and guarantees the shortest path" },
    { id: 3, name: "A*", fn: visualizeAStar, info: "A* Search is weighted and guarantees the shortest path!" },
    { id: 4, name: "Gbfs", fn: visualizeGbfs, info: "Greedy Best-first Search is weighted and does not guarantees the shortest path!" }
];

export const mazeAlgos = [
    { fn: visualizeRecursiveDivision },
    { fn: visualizeRecursiveBackTracker }
]


export const CreateNode = (row: number, col: number, startRow: number, startCol: number, endRow: number, endCol: number): NodeType => {
    return {
        row,
        col,
        isStart: startRow === row && startCol === col,
        isEnd: endRow === row && endCol === col,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isVisitedFront: false,
        isFinalFront: false,
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


export const GenerateGrid = (rows: number, cols: number): NodeType[][] => {
    const grid: NodeType[][] = [];

    for (let row = 0; row < rows; row++) {
        const currentRow: NodeType[] = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(CreateNode(row, col, Math.floor(rows / 2), Math.floor(cols / 2) - 10, Math.floor(rows / 2), Math.floor(cols / 2) + 10));
        }
        grid.push(currentRow);
    }

    return grid;
}

export const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number): NodeType[][] => {
    const newGrid = [...grid];
    newGrid[row] = [...grid[row]];
    newGrid[row][col] = { ...newGrid[row][col] };
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    return newGrid;
}

export const ClearBoard = (grid: NodeType[][], startRow: number, startCol: number, endRow: number, endCol: number): NodeType[][] => {
    const newGrid = grid.map(prevRow => prevRow.map(node => CreateNode(node.row, node.col, startRow, startCol, endRow, endCol)));
    return newGrid;
}

export const ClearWalls = (grid: NodeType[][]): NodeType[][] => {
    const newGrid = grid.map(prevRow => prevRow.map(node => { return { ...node, isWall: false } }));
    return newGrid;
}

export const ClearPath = (grid: NodeType[][], startRow: number, startCol: number, endRow: number, endCol: number): NodeType[][] => {
    const newGrid = grid.map(prevRow => prevRow.map(node => {
        const newNode = CreateNode(node.row, node.col, startRow, startCol, endRow, endCol)
        newNode.isWall = node.isWall;
        return newNode;
    }));
    return newGrid;
}
