import { NodeType } from "../types";

export function getShortestPath(node: NodeType): NodeType[] {
    const shortestPath: NodeType[] = [];
    while (node.previousNode) {
        shortestPath.push(node);
        node = node.previousNode;
    }

    return shortestPath.reverse();
}

export function getDistance(node1: NodeType, node2: NodeType): number {
    return (Math.abs(node1.row - node2.row) + Math.abs(node1.col - node2.col));
}