import '@testing-library/jest-dom/extend-expect';
import { GameBuilder } from '../services/game-builder.service';
import { Cell } from '../interfaces/cell.interface';

describe('GameBuilder', () => {
    describe('getNeighbors', () => {
        let emptyMatrix:Cell[][];

        beforeEach(() => {
            emptyMatrix = GameBuilder.initBoard(3, 3);
        })

        it('should return 8 neighbors aroung mid cell', () => {
            let neighbors:Cell[] = GameBuilder.getNeighbors(1, 1, emptyMatrix);
            expect(neighbors.length).toBe(8);
        })

        it('should return only 3 neighbors when the mid point is on the left top corner', () => {
            let neighbors:Cell[] = GameBuilder.getNeighbors(0, 0, emptyMatrix);
            expect(neighbors.length).toBe(3);
        })

        it('should return only 3 neighbors when the mid point is on the right top corner', () => {
            let neighbors:Cell[] = GameBuilder.getNeighbors(0, 2, emptyMatrix);
            expect(neighbors.length).toBe(3);
        })

        it('should return only 3 neighbors when the mid point is on the right bot corner', () => {
            let neighbors:Cell[] = GameBuilder.getNeighbors(2, 2, emptyMatrix);
            expect(neighbors.length).toBe(3);
        })

        it('should return only 3 neighbors when the mid point is on the left bot corner', () => {
            let neighbors:Cell[] = GameBuilder.getNeighbors(2, 0, emptyMatrix);
            expect(neighbors.length).toBe(3);
        })
    })

    describe('buildBoard', () => {
        it('should build a 3x3 matrix with 2 mines', () => {
            let matrix:Cell[][] = GameBuilder.buildBoard(3, 3, 2);
            let minesCounter = 0;

            for (let row of matrix) {
                for (let col of row) {
                    minesCounter = col.isMine ? minesCounter + 1 : minesCounter;
                }
            }
            
            expect(matrix.length).toBe(3);
            expect(matrix[0].length).toBe(3);
            expect(minesCounter).toBe(2)
        })

        it('should build a 3x3 matrix with 0 mines', () => {
            let matrix:Cell[][] = GameBuilder.buildBoard(3, 3, 0);
            let minesCounter = 0;

            for (let row of matrix) {
                for (let col of row) {
                    minesCounter = col.isMine ? minesCounter + 1 : minesCounter;
                }
            }
            
            expect(matrix.length).toBe(3);
            expect(matrix[0].length).toBe(3);
            expect(minesCounter).toBe(0)
        })

        it('should build a 3x3 matrix with 9 mines', () => {
            let matrix:Cell[][] = GameBuilder.buildBoard(3, 3, 9);
            let minesCounter = 0;

            for (let row of matrix) {
                for (let col of row) {
                    minesCounter = col.isMine ? minesCounter + 1 : minesCounter;
                }
            }
            
            expect(matrix.length).toBe(3);
            expect(matrix[0].length).toBe(3);
            expect(minesCounter).toBe(9)
        })

        it('should build a 2x2 matrix with 1 mine so all other cells should have 1 minesArroundCount', () => {
            let matrix:Cell[][] = GameBuilder.buildBoard(2, 2, 1);
            let cellsWith1MinesAround = 0;

            for (let row of matrix) {
                for (let col of row) {
                    cellsWith1MinesAround = col.minesArroundCount === 1 ? cellsWith1MinesAround + 1 : cellsWith1MinesAround;
                }
            }
            
            expect(matrix.length).toBe(2);
            expect(matrix[0].length).toBe(2);
            expect(cellsWith1MinesAround).toBe(3)
        })

        it('should build a 2x2 matrix with 2 mines so all other cells should have 2 minesArroundCount', () => {
            let matrix:Cell[][] = GameBuilder.buildBoard(2, 2, 2);
            let cellsWith2MinesAround = 0;

            for (let row of matrix) {
                for (let col of row) {
                    cellsWith2MinesAround = col.minesArroundCount === 2 ? cellsWith2MinesAround + 1 : cellsWith2MinesAround;
                }
            }
            
            expect(matrix.length).toBe(2);
            expect(matrix[0].length).toBe(2);
            expect(cellsWith2MinesAround).toBe(2)
        })
    })
})