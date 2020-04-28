import { Cell } from '../interfaces/cell.interface';
import React from 'react';
import { CellComponent } from '../components/cell.component';
import {render, fireEvent} from '@testing-library/react';

describe('CellComponent', () => {
    let emptyCell:Cell;

    beforeEach(() => {
        emptyCell = {
            rowIndex: 0,
            colIndex: 0,
            isFlagged: false,
            isMine: false,
            isRevealed: false,
            minesArroundCount: 0
        }
    })

    describe('renderCell', () => {
        describe('superman - false', () => {
            it('should return flagged cell when cell is flagged', () => {
                emptyCell.isFlagged = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={false} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('flag');
                expect(element).toBeTruthy();
            })

            it('should return null cell when cell is mine and not revealved', () => {
                emptyCell.isMine = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={false} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('cell-container');
                expect(element.firstChild).toBeNull();
            })

            it('should return mine cell when cell is mine and revealved', () => {
                emptyCell.isRevealed = true;
                emptyCell.isMine = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={false} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('mine');
                expect(element).toBeTruthy();
            })

            it('should return null when cell is revealved, not mined, not flagged and 0 minesArroundCount', () => {
                emptyCell.isRevealed = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={false} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('cell-container');
                expect(element.firstChild).toBeNull();
            })

            it('should return 2 when cell is revealved, not mined, not flagged and 2 minesArroundCount', () => {
                emptyCell.isRevealed = true;
                emptyCell.minesArroundCount = 2;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={false} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('minesarround-count');
                expect(element).toHaveTextContent('2');
            })
        })

        describe('superman - true', () => {
            it('should return flagged cell when cell is flagged', () => {
                emptyCell.isFlagged = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('flag');
                expect(element).toBeTruthy();
            })
    
            it('should return mine cell when cell is mine and not revealved', () => {
                emptyCell.isMine = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('mine');
                expect(element).toBeTruthy();
            })
    
            it('should return mine cell when cell is mine and revealved', () => {
                emptyCell.isRevealed = true;
                emptyCell.isMine = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('mine');
                expect(element).toBeTruthy();
            })
    
            it('should return null when cell is revealved, not mined, not flagged and 0 minesArroundCount', () => {
                emptyCell.isRevealed = true;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('cell-container');
                expect(element.firstChild).toBeNull();
            })

            it('should return null when cell is not revealved, not mined, not flagged and 0 minesArroundCount', () => {
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('cell-container');
                expect(element.firstChild).toBeNull();
            })
    
            it('should return 2 when cell is revealved, not mined, not flagged and 2 minesArroundCount', () => {
                emptyCell.isRevealed = true;
                emptyCell.minesArroundCount = 2;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('minesarround-count');
                expect(element).toHaveTextContent('2');
            })

            it('should return 2 when cell is not revealved, not mined, not flagged and 2 minesArroundCount', () => {
                emptyCell.minesArroundCount = 2;
                const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={true} cellClicked={()=>{}} markFlag={()=>{}}></CellComponent>);
                const element = getByTestId('minesarround-count');
                expect(element).toHaveTextContent('2');
            })
        })
    })

    describe('click', () => {
        it('should call cellClicked when clicking on cell without shift key', () => {
            const markFlag = jest.fn();
            const cellClicked = jest.fn();

            const { getByTestId } = render(<CellComponent cell={emptyCell} isSuperman={false} cellClicked={cellClicked} markFlag={markFlag}></CellComponent>);
            fireEvent.click(getByTestId('cell-container'));

            expect(cellClicked).toHaveBeenCalled();
            expect(markFlag).not.toHaveBeenCalled();
        })
    })
})
