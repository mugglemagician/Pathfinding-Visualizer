import { AlgorithmReturnType, NodeType } from "../types";
import { BreadthFirstSearch } from "./BreadthFirstSearch";
import { DepthFirstSearch } from "./DepthFirstSearch";
import { Dijkstra } from "./Dijkstra";
import { getShortestPath } from "./Utils";

export function visualizeDijkstra(grid: NodeType[][], startNode: NodeType, endNode: NodeType): AlgorithmReturnType {
    const visitedNodesInOrder = Dijkstra(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);
    return { visitedNodesInOrder, finalPath: shortestPath };
}

export function visualizeDfs(grid: NodeType[][], startNode: NodeType, endNode: NodeType): AlgorithmReturnType {
    const visitedNodesInOrder = DepthFirstSearch(grid, startNode, endNode);
    return { visitedNodesInOrder, finalPath: visitedNodesInOrder };
}

export function visualizeBfs(grid: NodeType[][], startNode: NodeType, endNode: NodeType): AlgorithmReturnType {
    const visitedNodesInOrder = BreadthFirstSearch(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);
    return { visitedNodesInOrder, finalPath: shortestPath };
}