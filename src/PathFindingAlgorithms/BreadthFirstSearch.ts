import { NodeType } from "../types";

const drow = [-1, 0, 1, 0];
const dcol = [0, -1, 0, 1];

export function BreadthFirstSearch(grid: NodeType[][], startNode: NodeType, endNode: NodeType) {
    const queue: NodeType[] = [];
    const visitedNodesInOrder: NodeType[] = [];
    queue.push(startNode);
    const set = new Set<number>();
    set.add(startNode.row * grid[0].length + startNode.col);

    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            visitedNodesInOrder.push(node);
            if (node === endNode) break;
            for (let i = 0; i < 4; i++) {
                const nrow = node.row + drow[i];
                const ncol = node.col + dcol[i];
                if (nrow >= 0 && ncol >= 0 && nrow < grid.length && ncol < grid[0].length) {
                    if (!set.has(nrow * grid[0].length + ncol) && !grid[nrow][ncol].isWall) {
                        grid[nrow][ncol].previousNode = node;
                        set.add(nrow * grid[0].length + ncol);
                        queue.push(grid[nrow][ncol]);
                    }
                }
            }
        }
    }

    return visitedNodesInOrder;

}