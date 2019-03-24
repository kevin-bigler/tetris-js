import Square from './SquareData.js';
import _ from 'lodash';

export default class GameBoard {
	squares = []
	squaresWide = 0
	squaresHigh = 0
	app = null

	constructor(app) {
		this.app = app;
	}

	initialize({squaresWide, squaresHigh}) {
		this.squaresWide = squaresWide;
		this.squaresHigh = squaresHigh;

		this.squares = [];
		for (let x = 0; x < squaresWide; x++) {
			let column = [];
			for (let y = 0; y < squaresHigh; y++) {
				column.push(new Square());
			}
			this.squares.push(column);
		}

	}

	fillSquare(x, y) {
		const square = this.getSquare(x, y);
		if (square !== null) {
			console.log('square is not null');
			console.log(`square before: ${JSON.stringify(square)}`);
			square.fill();
			console.log(`square after: ${JSON.stringify(square)}`);
		}

		const verifySquare = this.getSquare(x, y);
		console.log(`square after after: ${JSON.stringify(verifySquare)}`);
	}

	// returns array of the board squares for each point that a piece is filled in
	// and each board square's position
	// {boardSquare, position:x,y}}
	getBoardSquaresForPiece({piece, x, y}) {
		const boardSquaresForPiece = [];
		for (let pieceX = 0; pieceX < piece.width; pieceX++) {
			for (let pieceY = 0; pieceY < piece.height; pieceY++) {
				if ( ! piece.squareIsOpen(pieceX, pieceY) ) {
					const boardX = x + pieceX;
					const boardY = y + pieceY;
					const boardSquare = this.getSquare(boardX, boardY);
					boardSquaresForPiece.push({
						boardSquare,
						position: {x: boardX, y: boardY}
					});
				}
			}
		}
		return boardSquaresForPiece;
	}

	removePiece({piece, x, y}) {
		// set each non-open piece square to open on the game board
		const squaresForPiece = this.getBoardSquaresForPiece({piece, x, y});
		squaresForPiece.forEach((info) => {
			if (info.boardSquare !== null)
				info.boardSquare.clear();
		});
	}

	// returns true if successful (piece fit), returns false if piece could not fit
	addPiece({piece, x, y}) {

		if ( ! this.pieceCanFit({piece, x, y}) ) {
			console.error('piece cannot fit! cannot add piece to board.');
			return false;
		}

		// check piece's squares data (0's and 1's) and set the corresponding squares' data for this.squares
		const squaresForPiece = this.getBoardSquaresForPiece({piece, x, y});
		squaresForPiece.forEach((info) => {
			if (info.boardSquare !== null)
				info.boardSquare.fill();
		});

		return true;
	}

	pieceCanFit({piece, x, y}) {
		// 1. Check if piece's corners fit into the game board
		const pieceCorners = this.getPieceCorners({piece, x, y});

		if ( ! this.isInRange(pieceCorners.topLeft) ) {
			console.log('piece is being set out of range! culprit: topLeft');
			return false;
		}
		if ( ! this.isInRange(pieceCorners.topRight) ) {
			console.log('piece is being set out of range! culprit: topRight');
			return false;
		}
		if ( ! this.isInRange(pieceCorners.bottomLeft) ) {
			console.log('piece is being set out of range! culprit: bottomLeft');
			return false;
		}
		if ( ! this.isInRange(pieceCorners.bottomRight) ) {
			console.log('piece is being set out of range! culprit: bottomRight');
			return false;
		}

		// 2. check each filled in square of the piece against the corresponding square on the board
		// > each spot of the piece filled in
		// > needs to not be filled in on the game board
		let squaresAreAvailable = true;
		const squaresForPiece = this.getBoardSquaresForPiece({piece, x, y});
		squaresForPiece.forEach((info) => {
			if (info.boardSquare === null || ! info.boardSquare.isOpen())
				squaresAreAvailable = false;
		});

		return squaresAreAvailable;
	}

	// return position of each of the 4 corners for the piece
	getPieceCorners({piece, x, y}) {
		const topLeft = {x, y};
		const topRight = {x: x + piece.width - 1, y};
		const bottomLeft = {x, y: y + piece.height - 1};
		const bottomRight = {x: x + piece.width - 1, y: y + piece.height - 1};

		return {topLeft, topRight, bottomLeft, bottomRight};
	}
	isInRange({x, y}) {
		return x >= 0
			&& x < this.squaresWide
			&& y >= 0
			&& y < this.squaresHigh;
	}
	squareIsOpen(x, y) {
		const square = this.getSquare(x, y);
		if ( square === null ) {
			return false;
		}

		return square.isOpen();
	}
	getSquare(x, y) {
		if ( ! this.isInRange({x, y}) ) {
			console.error(`${x}, ${y} is out of bounds!`);
			return null;
		}
		return this.squares[x][y];
	}

	getRow(y) {
		if (y < 0 || y >= this.squaresHigh) {
			console.error(`getRow() - y (${y}) is out of bounds!`);
			return;
		}

		const squares = [];
		for (let x = 0; x < this.squaresWide; x++) {
			const square = this.getSquare(x, y);
			if (square !== null)
				squares.push(square);
		}

		return squares;
	}

	clear() {
		for (let x = 0; x < this.squaresWide; x++) {
			for (let y = 0; y < this.squaresHigh; y++) {
				const square = this.getSquare(x, y);
				if (square !== null)
					square.clear();
			}
		}
	}

	detectCompletions() {
		const completions = this.getCompletedRows();

		// make sure the completions are in descending order
		// > to be able to process rows from bottom to top
		const completionsDescending = _.orderBy(completions, ['desc']);

		completionsDescending.forEach((rowIndex) => {
			this.clearRow(rowIndex);
			this.dropRowsAbove(rowIndex);
		});
	}

	getCompletedRows() {
		// array of row indexes that have completions
		let completions = [];

		for (let y = 0; y < this.squaresHigh; y++) {
			if (this.rowIsComplete(y)) {
				completions.push(y);
			}
		}

		return completions;
	}

	rowIsComplete(y) {
		for (let x = 0; x < this.squaresWide; x++) {
			const square = this.getSquare(x, y);
			if (square === null || square.isOpen())
				return false;
		}

		return true;
	}

	clearRow(y) {
		for (let x = 0; x < this.squaresWide; x++) {
			const square = this.getSquare(x, y);
			if (square !== null)
				square.clear();
		}
	}

	// slides all rows above y down 1 row
	dropRowsAbove(y) {
		// shift the rows above row y
		if (y < 0 || y >= this.squaresHigh) {
			console.error(`dropRowsAbove() - y (${y}) is out of bounds!`);
			return;
		}

		// go from bottom to top
		for (let i = y; i > 0; i--) {
			let thisRow = this.getRow(i);
			let rowAbove = this.getRow(i - 1);

			thisRow.forEach((square, j) => {
				square.copy(rowAbove[j]);
			});
		}

		// top row just needs to be cleared (since there is no row above it to copy)
		this.clearRow(0);
	}
}