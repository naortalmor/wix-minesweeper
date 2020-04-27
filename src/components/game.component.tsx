import React from 'react';
import { BoardComponent } from './board.component';
import GameMgmtComponent from './game-mgmt.component';
import { AppState } from '../interfaces/app-state.interface';
import { Dispatch } from 'redux';
import { Board } from '../interfaces/board.interface';
import { initBoard, toggleSuperman } from '../store/store';
import { connect } from 'react-redux';

interface GameComponentProps {
    board: Board;
    isSupermanMode:boolean;
    initBoard: (board:Board) => void;
    toggleSuperman: (newMode:boolean) => void;
}

class GameComponent extends React.Component<GameComponentProps> {
    constructor(props:GameComponentProps) {
        super(props);

        this.buildNewGame = this.buildNewGame.bind(this);
    }

    render() {
        return (
            <div className="ctr">
                <GameMgmtComponent board={this.props.board} 
                                   isSuperman={this.props.isSupermanMode}
                                   newGame={this.buildNewGame} 
                                   toggleSuperman={this.props.toggleSuperman}>
                </GameMgmtComponent>
                <BoardComponent board={this.props.board} 
                                isSuperman={this.props.isSupermanMode}>
                </BoardComponent>
            </div>
        )
    }

    buildNewGame(height:number, width:number, mines:number):void {
        this.props.initBoard({
            height,
            width,
            mines
        })
    }
}

const mapStateToProps = (state:AppState) => ({
    board: state.board,
    isSupermanMode: state.supermanMode
})

const mapDispatchToProps = (dispatch:Dispatch) => ({
    initBoard: (newBoard:Board) => dispatch(initBoard(newBoard)),
    toggleSuperman: (newMode:boolean) => dispatch(toggleSuperman(newMode))
})

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);