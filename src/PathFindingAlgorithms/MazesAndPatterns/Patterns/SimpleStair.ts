import { NodeType } from "../../../types";

export function SimpleStair(grid: NodeType[][]): Set<NodeType> {

    const walledNodes = new Set<NodeType>();

    let row = grid.length - 1;
    let col = 0;

    let goingUp = true;

    while (col < grid[0].length) {
        walledNodes.add(grid[row][col]);
        if (goingUp) {
            row--;
            if (row === -1) {
                row = 1;
                goingUp = false;
            }
        }
        else {
            row++;
            if (row === grid.length) {
                row = grid.length - 2;
                goingUp = true;
            }
        }
        col++;
    }
    console.log(walledNodes);
    return walledNodes;
}