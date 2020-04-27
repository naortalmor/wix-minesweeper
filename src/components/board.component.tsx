import React, { ReactNode } from 'react';
import { Cell } from '../interfaces/cell.interface';
import { GameBuilder } from '../services/game-builder.service';
import { CellComponent } from './cell.component';
import { Board } from '../interfaces/board.interface';
import Alert from '@material-ui/lab/Alert';

interface BoardComponentInputs {
    board:Board;
    isSuperman:boolean;
}

interface BoardComponentState {
    board:Cell[][];
    minesLeft:number;
    flagsError:boolean;
    win:boolean;
}

export class BoardComponent extends React.Component<BoardComponentInputs, BoardComponentState> {

    constructor(props:BoardComponentInputs) {
        super(props);

        this.state = {
            board: GameBuilder.buildBoard(this.props.board.height, this.props.board.width, this.props.board.mines),
            minesLeft: this.props.board.mines,
            flagsError: false,
            win: false
        }
    }

    componentDidUpdate(prevProps:BoardComponentInputs) {
        if (prevProps.board !== this.props.board) {
                this.setState({
                    board: GameBuilder.buildBoard(this.props.board.height, this.props.board.width, this.props.board.mines),
                    minesLeft: this.props.board.mines
                })
            }
    }

    render() {
        return (
            <div>
                { this.state.flagsError &&
                    <Alert severity="error" onClose={() => {this.setState({flagsError:false})}}>No flegs left ...</Alert>
                }
                Flegs left - {this.state.minesLeft}
                {this.renderBoard(this.state.board)}
            </div>
        )
    }

    renderBoard(board:Cell[][]):ReactNode {
        return board.map((row:Cell[]) => {
            return (
                <div className="row" key={row[0].rowIndex}>
                    {row.map((cell:Cell) => (
                        <CellComponent key={`${cell.rowIndex},${cell.colIndex}`}
                                       cell={cell} 
                                       cellClicked={() => this.onCellClicked(cell)} 
                                       markFlag={() => this.toggleFlag(cell)} 
                                       isSuperman={this.props.isSuperman}>
                        </CellComponent>
                    ))}
                </div>
            )
        })
    }

    toggleFlag(cell:Cell) {
        if (!this.state.board[cell.rowIndex][cell.colIndex].isRevealed) {
            let isFlagError:boolean = false;

            let newBoard:Cell[][] = this.state.board;
            let minesLeft:number = this.state.minesLeft;

            if (newBoard[cell.rowIndex][cell.colIndex].isFlagged) {
                newBoard[cell.rowIndex][cell.colIndex].isFlagged = false;
                minesLeft++;
            } else if (this.state.minesLeft > 0) {
                newBoard[cell.rowIndex][cell.colIndex].isFlagged = true;
                minesLeft--;
            } else {
                isFlagError = true;
            }

            if (!isFlagError)  {
                this.setState({
                    board: newBoard,
                    minesLeft,
                    flagsError: false
                });
            } else {
                this.setState(({
                    flagsError: true
                }))
            }

            if (this.getFlaggedMines(newBoard).length === this.props.board.mines) {
                this.displayBoard();
                alert("Congrats!! You win :)");
            }
        }
        
    }

    onCellClicked(cell:Cell) {
        if (!this.state.board[cell.rowIndex][cell.colIndex].isRevealed && !this.state.board[cell.rowIndex][cell.colIndex].isFlagged) {
            if (this.state.board[cell.rowIndex][cell.colIndex].isMine) {
                alert("Mine selected .. :( You lost");
                this.displayBoard();
            } else {
                let newBoard:Cell[][] = this.state.board;

                if (this.state.board[cell.rowIndex][cell.colIndex].minesArroundCount === 0) {
                    newBoard = this.revealveAllEmptyNeighbors(cell.rowIndex, cell.colIndex, newBoard);
                } else {
                    newBoard[cell.rowIndex][cell.colIndex].isRevealed = true;
                }

                this.setState({
                    board: newBoard
                }) 
            }
        }
    }

    displayBoard():void {
        let revealvedBoad:Cell[][] = this.state.board.map((row:Cell[]) => row.map((cell:Cell) => ({...cell, isRevealed: true})));
        this.setState({board: revealvedBoad})
    }

    revealveAllEmptyNeighbors(row:number, col:number, newBoard:Cell[][]):Cell[][] {
        let arr:Cell[] = [newBoard[row][col]];
        let alreadyRevealved:{[id:string]:boolean} = {};

        while (arr.length) {
            let curr:Cell = arr.shift() || newBoard[row][col];
            alreadyRevealved[`${curr.rowIndex}_${curr.colIndex}`] = true;
            if (!curr.isRevealed && !curr.isFlagged && (!curr.isMine || curr.minesArroundCount === 0)) {
                curr.isRevealed = true;
                if (curr.minesArroundCount === 0) {
                    let neighbors:Cell[] = GameBuilder.getNeighbors(curr.rowIndex, curr.colIndex, newBoard)
                    .filter((neighbor:Cell) => !alreadyRevealved[`${neighbor.rowIndex}_${neighbor.colIndex}`]);
                    arr.push(...neighbors);
                }
            }
        }

        return newBoard;
    }

    private getFlaggedMines(newBoard:Cell[][]):Cell[] {
        let result:Cell[] = [];
        newBoard.forEach((row:Cell[]) => 
            row.forEach((col:Cell) => (col.isFlagged && col.isMine) ? result.push(col) : ''));
        return result;
    }
}