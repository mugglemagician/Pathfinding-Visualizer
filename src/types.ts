export type GridPropType = {
    rows: number,
    cols: number,
    isVisualizing: boolean,
    algorithm: AlgorithmInputType | null,
    resetVisualizing: () => void,
    speed: number,
    clearBoard: boolean,
    clearPath: boolean,
    clearWalls: boolean,
    toggleClearBoard: () => void,
    toggleClearPath: () => void,
    toggleClearWalls: () => void
};

export type isVisualizingType = {
    innerText: string,
    state: boolean
}

export type NodeType = {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    distance: number,
    gCost: number,
    hCost: number,
    getFCost: () => number,
    heapIdx: number,
    isVisited: boolean,
    isWall: boolean,
    isInFinalPath: boolean,
    previousNode: NodeType | null
};

export type NodePropType = {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    isVisited: boolean,
    isWall: boolean,
    isInFinalPath: boolean,
    handleMouseDown: (row: number, col: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    handleMouseOver: (row: number, col: number) => void
}

export type NavbarPropType = {
    isVisualizing: isVisualizingType,
    startPathFinding: () => void,
    selectAlgorithm: (id: number) => void,
    selectSpeed: (id: number) => void,
    toggleClearBoard: () => void,
    toggleClearPath: () => void,
    toggleClearWalls: () => void
}

export type DropDownPropType = {
    dropDownLabel: string,
    dropDownWidth: string,
    elements: string[],
    selectItem: ((id: number) => void) | undefined
}

export type DropDownElementPropType = {
    element: string
}

export type AlgorithmReturnType = {
    visitedNodesInOrder: NodeType[],
    finalPath: NodeType[]
}

export type AlgorithmInputType = {
    id: number,
    name: string,
    info: string,
    fn: (grid: NodeType[][], startNode: NodeType, endNode: NodeType) => AlgorithmReturnType
}