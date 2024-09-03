export type GridPropType = {
    rows: number,
    cols: number,
    isVisualizing: boolean
};

export type NodeType = {
    row: number,
    col: number,
    isStart: boolean,
    isEnd: boolean,
    distance: number,
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
    toggleViewSpeed: () => void
}

export type DropDownPropType = {
    dropDownLabel: string,
    dropDownWidth: string,
    elements: string[],
    isShowing: boolean,
    toggleDropDownList: () => void
}