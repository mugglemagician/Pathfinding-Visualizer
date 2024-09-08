import { NodeType } from "../../types";
import { UnionFind } from "../DataStructures/UnionFind";
import { addBoundaryWalls, addNodeBoundaryWalls, carvePath } from "../Utils";

function shuffeArray(array: number[][]): number[][] {
    return array
        .map(value => ({ value, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ value }) => value);
}

export function Kruskal(grid: NodeType[][]): { walledNodes: Set<NodeType>, carvedPath: NodeType[] } {
    const walledNodes = new Set<NodeType>();
    const carvedPath: NodeType[] = [];

    const mappedWidth = (grid[0].length - 3) / 2 + 1;
    const mappedHeight = (grid.length - 3) / 2 + 1;

    const LEFT = 0;
    const RIGHT = mappedWidth - 1;
    const TOP = 0;
    const BOTTOM = mappedHeight - 1;

    addBoundaryWalls(grid, walledNodes);
    addNodeBoundaryWalls(grid, walledNodes);

    const n = mappedWidth * mappedHeight;
    let edges: number[][] = [];

    for (let row = TOP; row <= BOTTOM; row++) {
        for (let col = LEFT; col <= RIGHT; col++) {
            if (col < RIGHT) {
                edges.push([row * (mappedWidth) + col, row * (mappedWidth) + col + 1]);
            }
            if (row < BOTTOM) {
                edges.push([row * mappedWidth + col, (row + 1) * mappedWidth + col]);
            }
        }
    }

    edges = shuffeArray(edges);

    const unionFind = new UnionFind(n);

    while (edges.length > 0) {
        const [u, v] = edges.shift() as number[];
        const rootU = unionFind.Find(u);
        const rootV = unionFind.Find(v);
        if (rootU !== rootV) {
            const uCol = u % mappedWidth;
            const uRow = (u - uCol) / mappedWidth;
            const vCol = v % mappedWidth;
            const vRow = (v - vCol) / mappedWidth;
            carvePath(grid, uRow, uCol, vRow, vCol, carvedPath);
            unionFind.Union(rootU, rootV);
        }
    }

    return { walledNodes, carvedPath };
}