export type GridPropType = {
    rows: number,
    cols: number,
    isVisualizing: boolean,
    algorithm: AlgorithmInputType | null
};

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
    isVisualizing: boolean,
    startPathFinding: () => void,
    isViewingAlgorithms: boolean,
    toggleViewAlgorithms: () => void,
    isViewingSpeed: boolean,
    toggleViewSpeed: () => void,
    selectAlgorithm: (id: number) => void
}

export type DropDownPropType = {
    dropDownLabel: string,
    dropDownWidth: string,
    elements: string[],
    isShowing: boolean,
    toggleDropDownList: () => void,
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
    fn: (grid: NodeType[][], startNode: NodeType, endNode: NodeType) => AlgorithmReturnType
}