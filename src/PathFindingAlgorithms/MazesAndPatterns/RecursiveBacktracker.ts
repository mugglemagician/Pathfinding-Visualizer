import { NodeType } from "../../types";
import { addBoundaryWalls, addNodeBoundaryWalls, carvePath } from "../Utils";

const drow = [-1, 0, 1, 0];
const dcol = [0, -1, 0, 1];

// 2 * (R) + 1 = grid.length - 2 => 2 * R = grid.length - 3 => R = (grid.length - 3) / 2

export function RecursiveBacktracker(grid: NodeType[][]): { walledNodes: Set<NodeType>, carvedPath: NodeType[] } {
    const walledNodes = new Set<NodeType>();
    const carvedPath: NodeType[] = [];

    addBoundaryWalls(grid, walledNodes);
    addNodeBoundaryWalls(grid, walledNodes);

    const visited = new Set<NodeType>();
    for (let node of walledNodes) {
        visited.add(node);
    }

    const stack: number[][] = [];
    const LEFT = 0;
    const RIGHT = (grid[0].length - 3) / 2;
    const TOP = 0;
    const BOTTOM = (grid.length - 3) / 2;
    const startRow = TOP + Math.floor(Math.random() * (BOTTOM + 1));
    const startCol = LEFT + Math.floor(Math.random() * (RIGHT + 1));
    stack.push([startRow, startCol]);
    visited.add(grid[2 * startRow + 1][2 * startCol + 1]);

    while (stack.length > 0) {
        const [row, col] = stack.pop() as number[];
        let directions = [0, 1, 2, 3];

        for (let i = 0; i < 4; i++) {
            const randomDirection = Math.floor(Math.random() * directions.length);
            const nrow = row + drow[directions[randomDirection]];
            const ncol = col + dcol[directions[randomDirection]];
            directions.splice(randomDirection, 1);
            if (nrow >= TOP && ncol >= LEFT && nrow <= BOTTOM && ncol <= RIGHT) {
                if (!visited.has(grid[nrow * 2 + 1][ncol * 2 + 1])) {
                    visited.add(grid[nrow * 2 + 1][ncol * 2 + 1]);
                    stack.push([nrow, ncol]);

                    // remove walls or carve path
                    carvePath(grid, row, col, nrow, ncol, carvedPath);

                }
            }
        }
    }

    return { walledNodes, carvedPath };
}


