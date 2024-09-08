import { AlgorithmReturnType, MazeAlgoReturnType, NodeType } from "../types";
import { AStarSearch } from "./AStarSearch";
import { BreadthFirstSearch } from "./BreadthFirstSearch";
import { DepthFirstSearch } from "./DepthFirstSearch";
import { Dijkstra } from "./Dijkstra";
import { GreedyBestFirstSearch } from "./GreedyBestFirstSearch";
import { Kruskal } from "./MazesAndPatterns/Kruskal";
import { RecursiveBacktracker } from "./MazesAndPatterns/RecursiveBacktracker";
import { RecursiveDivision } from "./MazesAndPatterns/RecursiveDivision";
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

export function visualizeRecursiveDivision(grid: NodeType[][]): MazeAlgoReturnType {
    const walledNodes = RecursiveDivision(grid);
    return { walledNodes, carvedPath: undefined };
}

export function visualizeRecursiveBackTracker(grid: NodeType[][]): MazeAlgoReturnType {
    return RecursiveBacktracker(grid);
}

export function visualizeKruskal(grid: NodeType[][]): MazeAlgoReturnType {
    const { walledNodes, carvedPath } = Kruskal(grid);
    return { walledNodes, carvedPath };
}