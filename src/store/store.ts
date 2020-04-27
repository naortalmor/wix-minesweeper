import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { Board } from '../interfaces/board.interface';
import { AppAction } from '../interfaces/app-action.interface';

const INIT_BOARD = 'INIT_BOARD';
const TOGGLE_SUPERMAN = 'TOGGLE_SUPERMAN';

const boardInitialState:Board = {
    height: 8,
    width: 8,
    mines: 8
}

const boardReducer = (state:Board = boardInitialState, action:AppAction):Board => {
    switch(action.type) {
        case INIT_BOARD:
            return action.payload;
        default:
            return state
    }
}

const supermanModeReducer = (state:boolean = false, action:AppAction):boolean => {
    switch(action.type) {
        case TOGGLE_SUPERMAN:
            return action.payload;
        default:
            return state
    }
}

const reducer = combineReducers({
    board: boardReducer,
    supermanMode: supermanModeReducer
})

const store = createStore(reducer);

export const initBoard = (board:Board):AppAction => {
    return {
        type: INIT_BOARD,
        payload: board
    }
}

export const toggleSuperman = (newMode:boolean):AppAction => {
    return {
        type: TOGGLE_SUPERMAN,
        payload: newMode
    }
}

export default store;