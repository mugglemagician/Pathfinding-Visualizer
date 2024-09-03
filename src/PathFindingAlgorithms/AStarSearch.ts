import { NodeType } from "../types";
import PriorityQueue from "./DataStructures/PriorityQueue";
import { getDistance } from "./Utils";

const drow = [-1, 0, 1, 0];
const dcol = [0, -1, 0, 1];


// gcost -> distance from start node to current node from current path
// hcost -> distance from end node to current node -> heuristic distance
// fcost -> gcost + hcost

export function AStarSearch(grid: NodeType[][], startNode: NodeType, endNode: NodeType) {
    const pq = new PriorityQueue<NodeType>((node1, node2) => {
        if (node1.getFCost() < node2.getFCost()) return true;
        if (node1.hCost < node2.hCost) return true;
        return false;
    });

    pq.Push(startNode);
    startNode.gCost = 0;
    const visitedNodesInOrder: NodeType[] = [];

    while (!pq.IsEmpty()) {
        const node = pq.Pop();
        if (node) {
            visitedNodesInOrder.push(node);
            if (node === endNode) break;
            for (let i = 0; i < 4; i++) {
                const nrow = node.row + drow[i];
                const ncol = node.col + dcol[i];
                if (nrow >= 0 && ncol >= 0 && nrow < grid.length && ncol < grid[0].length) {
                    const neighbour = grid[nrow][ncol];
                    if (neighbour.isWall) continue;
                    const newGCostForNeighbour = node.gCost + getDistance(node, neighbour);
                    if (newGCostForNeighbour < neighbour.gCost) {
                        neighbour.gCost = newGCostForNeighbour;
                        neighbour.hCost = getDistance(endNode, neighbour);
                        neighbour.previousNode = node;
                        pq.Update(neighbour);
                    }
                }
            }
        }

    }

    return visitedNodesInOrder;

}