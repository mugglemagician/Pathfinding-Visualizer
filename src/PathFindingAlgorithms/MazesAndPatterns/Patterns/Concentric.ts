import { NodeType } from "../../../types";

export function Concentric(grid: NodeType[][]): Set<NodeType> {

    const walledNodes = new Set<NodeType>();

    let LEFT = 0;
    let RIGHT = grid[0].length - 1;
    let TOP = 0;
    let BOTTOM = grid.length - 1;

    while (TOP <= BOTTOM && LEFT <= RIGHT) {

        const gapInRow = Math.random() < 0.5 ? true : false;
        let randRow = -1;
        let randCol = -1;
        if (gapInRow) {
            randRow = Math.random() < 0.5 ? TOP : BOTTOM;
            randCol = LEFT + Math.floor(Math.random() * (RIGHT - LEFT));
        }
        else {
            randCol = Math.random() < 0.5 ? LEFT : RIGHT;
            randRow = TOP + Math.floor(Math.random() * (BOTTOM - TOP));
        }

        for (let row = TOP; row <= BOTTOM; row++) {
            if (!grid[row][LEFT].isStart && !grid[row][LEFT].isEnd) {
                if (gapInRow || randCol === RIGHT || randRow !== row)
                    walledNodes.add(grid[row][LEFT]);
            }
            if (!grid[row][RIGHT].isStart && !grid[row][RIGHT].isEnd) {
                if (gapInRow || randCol === LEFT || randRow !== row)
                    walledNodes.add(grid[row][RIGHT]);
            }
        }

        for (let col = LEFT; col <= RIGHT; col++) {
            if (!grid[TOP][col].isStart && !grid[TOP][col].isEnd) {
                if (!gapInRow || randRow === BOTTOM || randCol !== col)
                    walledNodes.add(grid[TOP][col]);
            }
            if (!grid[BOTTOM][col].isStart && !grid[BOTTOM][col].isEnd) {
                if (!gapInRow || randRow === TOP || randCol !== col)
                    walledNodes.add(grid[BOTTOM][col]);
            }
        }

        TOP += 2;
        BOTTOM -= 2;
        LEFT += 2;
        RIGHT -= 2;
    }

    return walledNodes;

}