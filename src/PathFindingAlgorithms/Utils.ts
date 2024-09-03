import { NodeType } from "../types";

export function getShortestPath(node: NodeType): NodeType[] {
    const shortestPath: NodeType[] = [];
    while (node.previousNode) {
        shortestPath.push(node);
        node = node.previousNode;
    }

    return shortestPath.reverse();
}