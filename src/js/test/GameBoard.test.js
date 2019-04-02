import GameBoard from '../main/GameBoard';

describe('GameBoard', () => {
    it.skip('#init() creates 2D `squares` array', () => {
        const board = new GameBoard();
        board.init({squaresWide: 5, squaresHigh: 10});
        expect(board.getSquare(4, 9)).toEqual(expect.any(Square));
    });
});