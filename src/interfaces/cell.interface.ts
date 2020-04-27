export interface Cell {
    rowIndex:number;
    colIndex:number;
    isFlagged: boolean;
    isMine: boolean;
    isRevealed: boolean;
    minesArroundCount: number;
}