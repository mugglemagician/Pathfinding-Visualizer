import { NodeType } from "../types";

export function getShortestPath(node: NodeType): NodeType[] {
    const shortestPath: NodeType[] = [];
    while (node.previousNode) {
        shortestPath.push(node);
        node = node.previousNode;
    }

    shortestPath.push(node);

    return shortestPath.reverse();
}

export function getDistance(node1: NodeType, node2: NodeType): number {
    return (Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col));
}

export function addBoundaryWalls(grid: NodeType[][], walledNodes: Set<NodeType>) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[0].length - 1) {
                const node = grid[i][j];
                if (!node.isStart && !node.isEnd) {
                    walledNodes.add(node);
                }
            }
        }
    }
}

export const addNodeBoundaryWalls = (grid: NodeType[][], walledNodes: Set<NodeType>): void => {
    for (let row = 2; row < grid.length - 2; row += 2) {
        for (let col = 1; col < grid[0].length - 1; col++) {
            walledNodes.add(grid[row][col]);
        }
    }

    for (let col = 2; col < grid[0].length - 2; col += 2) {
        for (let row = 1; row < grid.length; row++) {
            walledNodes.add(grid[row][col]);
        }
    }
};

export function carvePath(grid: NodeType[][], row: number, col: number, nrow: number, ncol: number, carvedPath: NodeType[]) {
    if (row === nrow) {
        if (col < ncol) {
            carvedPath.push(grid[2 * row + 1][2 * col + 2]);
        }
        else {
            carvedPath.push(grid[2 * row + 1][2 * ncol + 2]);
        }
    }
    else {
        if (row < nrow) {
            carvedPath.push(grid[2 * row + 2][2 * col + 1]);
        }
        else {
            carvedPath.push(grid[2 * nrow + 2][2 * col + 1]);
        }
    }
}

export function shuffeArray(array: number[][]): number[][] {
    return array
        .map(value => ({ value, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ value }) => value);
}
