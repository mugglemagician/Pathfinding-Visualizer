import { NodeType } from "../types";

const drow = [-1, 0, 1, 0];
const dcol = [0, -1, 0, 1];

export function DepthFirstSearch(grid: NodeType[][], startNode: NodeType, endNode: NodeType): NodeType[] {
    const visited = [];
    for (let i = 0; i < grid.length; i++) {
        const currRow = [];
        for (let j = 0; j < grid[i].length; j++) {
            currRow.push(false);
        }
        visited.push(currRow);
    }

    const visitedNodesInOrder: NodeType[] = [];
    Dfs(startNode.row, startNode.col, grid, { endNode }, visited, visitedNodesInOrder);
    return visitedNodesInOrder;
}

function Dfs(row: number, col: number, grid: NodeType[][], endNodeHolder: { endNode: NodeType | null }, visited: boolean[][], visitedNodesInOrder: NodeType[]) {
    visitedNodesInOrder.push(grid[row][col]);
    if (grid[row][col] === endNodeHolder.endNode) {
        endNodeHolder.endNode = null;
        return;
    }
    visited[row][col] = true;
    for (let i = 3; i >= 0; i--) {
        const nrow = row + drow[i];
        const ncol = col + dcol[i];
        if (nrow >= 0 && ncol >= 0 && nrow < grid.length && ncol < grid[0].length) {
            if (!visited[nrow][ncol] && !grid[nrow][ncol].isWall) {
                Dfs(nrow, ncol, grid, endNodeHolder, visited, visitedNodesInOrder);
                if (!endNodeHolder.endNode) return;
            }
        }
    }
}