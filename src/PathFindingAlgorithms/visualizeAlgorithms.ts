import { AlgorithmReturnType, NodeType } from "../types";
import { AStarSearch } from "./AStarSearch";
import { BreadthFirstSearch } from "./BreadthFirstSearch";
import { DepthFirstSearch } from "./DepthFirstSearch";
import { Dijkstra } from "./Dijkstra";
import { GreedyBestFirstSearch } from "./GreedyBestFirstSearch";
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

export function visualizeAStar(grid: NodeType[][], startNode: NodeType, endNode: NodeType): AlgorithmReturnType {
    const visitedNodesInOrder = AStarSearch(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);
    return { visitedNodesInOrder, finalPath: shortestPath };
}

export function visualizeGbfs(grid: NodeType[][], startNode: NodeType, endNode: NodeType): AlgorithmReturnType {
    const visitedNodesInOrder = GreedyBestFirstSearch(grid, startNode, endNode);
    const finalPath = getShortestPath(endNode);
    return { visitedNodesInOrder, finalPath };
}