import { Cell } from '../interfaces/cell.interface';

export class GameBuilder {
    static buildBoard(height:number, width:number, mines:number):Cell[][] {
        let board:Cell[][] = GameBuilder.initBoard(height, width);
        GameBuilder.insertMines(board, height, width, mines);
        GameBuilder.countMinesNeighbors(board);
        return board;
    }

    static getNeighbors(row:number, col:number, board:Cell[][]):Cell[] {
        const boardHeight:number = board.length;
        const boardWidth:number = board[0].length;
        let neighbors:Cell[] = [];

        if (row > 0) neighbors.push(board[row - 1][col]);
        if (col < boardWidth - 1) neighbors.push(board[row][col + 1]);
        if (row < boardHeight - 1) neighbors.push(board[row + 1][col]);
        if (col > 0) neighbors.push(board[row][col - 1]);

        if (row > 0 && col > 0) neighbors.push(board[row - 1][col - 1]);
        if (row > 0 && col < boardWidth - 1) neighbors.push(board[row - 1][col + 1]);
        if (row < boardHeight - 1 && col < boardWidth - 1) neighbors.push(board[row + 1][col + 1]);
        if (row < boardHeight - 1 && col > 0) neighbors.push(board[row + 1][col - 1]);

        return neighbors;
    }

    static initBoard(height:number, width:number):Cell[][] {
        let emptyBoard:Cell[][] = [];

        for (let i = 0; i < height; i++) {
            emptyBoard.push([]);
            for (let j = 0; j < width; j++) {
                emptyBoard[i][j] = {
                    rowIndex: i,
                    colIndex: j,
                    isMine: false,
                    isFlagged: false,
                    isRevealed: false,
                    minesArroundCount: 0
                }
            }
        }

        return emptyBoard;
    }

    private static insertMines(emptyBoard:Cell[][], height:number, width:number, mines:number):void {
        while(mines > 0) {
            let randomHeight = Math.floor(Math.random() * height);
            let randomWidth = Math.floor(Math.random() * width);
            if(!emptyBoard[randomHeight][randomWidth].isMine) {
                emptyBoard[randomHeight][randomWidth].isMine = true;
                mines--;
            }
        }
    }

    private static countMinesNeighbors(board:Cell[][]):void {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                const cell:Cell = board[i][j];
                if (!cell.isMine) {
                    const neighbors:Cell[] = GameBuilder.getNeighbors(i, j, board);
                    board[i][j].minesArroundCount = neighbors.filter((neighbor:Cell) => neighbor.isMine).length;
                }
            }
        }
    }
}