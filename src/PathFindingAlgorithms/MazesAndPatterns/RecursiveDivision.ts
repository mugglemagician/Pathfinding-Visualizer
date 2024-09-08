import { NodeType } from "../../types";
import { addBoundaryWalls } from "../Utils";


enum Orientation {
    HORIZONTAL,
    VERTICAL,
}

export function RecursiveDivision(grid: NodeType[][]): Set<NodeType> {
    const walledNodes = new Set<NodeType>();
    let startNode: NodeType | null = null;
    let endNode: NodeType | null = null;

    for (let row of grid) {
        for (let node of row) {
            if (node.isStart) {
                startNode = node;
            }
            else if (node.isEnd) {
                endNode = node;
            }
        }
    }

    addBoundaryWalls(grid, walledNodes);
    divide(grid, 2, grid.length - 3, 2, grid[0].length - 3, chooseOrientation(grid[0].length, grid.length), walledNodes, startNode, endNode);
    return walledNodes;
}


function divide(
    grid: NodeType[][],
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    orientation: Orientation,
    walledNodes: Set<NodeType>,
    startNode: NodeType | null,
    endNode: NodeType | null
) {
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
    }

    if (orientation === Orientation.HORIZONTAL) {
        // Generate possible rows and columns
        const possibleRows = [];
        for (let r = rowStart; r <= rowEnd; r += 2) possibleRows.push(r);

        const possibleCols = [];
        for (let c = colStart - 1; c <= colEnd + 1; c += 2) possibleCols.push(c);

        // Randomly choose a row and a passage column
        const randRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
        let randPassageCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];


        // Add horizontal walls
        for (let col = colStart - 1; col <= colEnd + 1; col++) {
            if (col !== randPassageCol) {
                walledNodes.add(grid[randRow][col]);
            }
        }

        // Recursively divide above and below the wall
        divide(
            grid, rowStart, randRow - 2, colStart, colEnd,
            chooseOrientation(colEnd - colStart, randRow - 2 - rowStart),
            walledNodes,
            startNode,
            endNode
        );

        divide(
            grid, randRow + 2, rowEnd, colStart, colEnd,
            chooseOrientation(colEnd - colStart, rowEnd - (randRow + 2)),
            walledNodes,
            startNode,
            endNode
        );

    } else {
        // Generate possible columns and rows
        const possibleCols = [];
        for (let c = colStart; c <= colEnd; c += 2) possibleCols.push(c);

        const possibleRows = [];
        for (let r = rowStart - 1; r <= rowEnd + 1; r += 2) possibleRows.push(r);

        // Randomly choose a column and a passage row
        const randCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];
        let randPassageRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];


        // Add vertical walls
        for (let row = rowStart - 1; row <= rowEnd + 1; row++) {
            if (row !== randPassageRow) {
                walledNodes.add(grid[row][randCol]);
            }
        }

        // Recursively divide left and right of the wall
        divide(
            grid, rowStart, rowEnd, colStart, randCol - 2,
            chooseOrientation(randCol - 2 - colStart, rowEnd - rowStart),
            walledNodes,
            startNode,
            endNode
        );

        divide(
            grid, rowStart, rowEnd, randCol + 2, colEnd,
            chooseOrientation(colEnd - (randCol + 2), rowEnd - rowStart),
            walledNodes,
            startNode,
            endNode
        );
    }
}



function chooseOrientation(width: number, height: number): Orientation {
    if (width < height) {
        return Orientation.HORIZONTAL;
    } else if (height < width) {
        return Orientation.VERTICAL;
    } else {
        return Math.random() < 0.5 ? Orientation.HORIZONTAL : Orientation.VERTICAL;
    }
}

