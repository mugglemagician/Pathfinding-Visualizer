import PriorityQueue from "./DataStructures/PriorityQueue";
import { NodeType } from "../types";

export function Dijkstra(grid: NodeType[][], startNode: NodeType, endNode: NodeType) {
    const pq = new PriorityQueue<NodeType>((data1, data2) => {
        if (data1.distance <= data2.distance) return true;
        return false;
    });

    startNode.distance = 0;
    pq.Push(startNode);
    const drow = [-1, 0, 1, 0];
    const dcol = [0, -1, 0, 1];
    const visitedInOrder: NodeType[] = [];

    while (!pq.IsEmpty()) {
        const node = pq.Pop();
        if (node) {
            visitedInOrder.push(node);
            if (node.row === endNode.row && node.col === endNode.col) return visitedInOrder;
            for (let i = 0; i < 4; i++) {
                let nrow = node.row + drow[i];
                let ncol = node.col + dcol[i];
                if (nrow >= 0 && ncol >= 0 && nrow < grid.length && ncol < grid[0].length) {
                    const adjNode = grid[nrow][ncol];
                    if (adjNode.isWall) continue;
                    if (node.distance + 1 < adjNode.distance) {
                        adjNode.previousNode = node;
                        adjNode.distance = node.distance + 1;
                        pq.Push(adjNode);
                    }
                }
            }
        }

    }

    return visitedInOrder;
}