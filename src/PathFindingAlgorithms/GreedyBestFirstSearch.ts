import { NodeType } from "../types";
import PriorityQueue from "./DataStructures/PriorityQueue";
import { getDistance as H } from "./Utils";

//H -> heuristic function which will give the distance from the node N to endNode.(manhattan distance)

const drow = [-1, 0, 1, 0];
const dcol = [0, -1, 0, 1];

export function GreedyBestFirstSearch(grid: NodeType[][], startNode: NodeType, endNode: NodeType): NodeType[] {

    const pq = new PriorityQueue<NodeType>((node1, node2) => {
        return H(node1, endNode) <= H(node2, endNode);
    });

    pq.Push(startNode);
    const visitedNodesInOrder: NodeType[] = [];
    const set = new Set<number>();
    set.add(startNode.row * grid[0].length + startNode.col);

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
                    if (!pq.Contains(neighbour) && !set.has(nrow * grid[0].length + ncol)) {
                        set.add(nrow * grid[0].length + ncol);
                        neighbour.previousNode = node;
                        pq.Push(neighbour);
                    }
                }
            }
        }
    }

    return visitedNodesInOrder;

}