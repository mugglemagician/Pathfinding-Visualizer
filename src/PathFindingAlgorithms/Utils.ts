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