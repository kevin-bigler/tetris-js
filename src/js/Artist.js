import * as PIXI from 'pixi.js';

export default class Artist {

	static appWidth = 800;
	static appHeight = 500;

	lightGreen = 0x1fed04;
	white = 0xffffff;

	fillColor = this.lightGreen;
	clearColor = this.white;
	squareColor = this.clearColor;

	squareSize = 0;	// used for width and height
	squares = [];
	squareTexture = null;

	squaresWide = 0;
	squaresHigh = 0;

	app = null;

	constructor(app) {
		this.app = app;
	}

	initialize({squaresWide, squaresHigh}) {
		this.squaresWide = squaresWide;
		this.squaresHigh = squaresHigh;

		this.squareSize = this.calculateSquareSize({appWidth: Artist.appWidth, appHeight: Artist.appHeight, squaresWide, squaresHigh});
		// console.log(`squareSize calculated: ${this.squareSize}`);

		this.initSquares();

	}

	calculateSquareSize({appWidth, appHeight, squaresWide, squaresHigh}) {
		let fitWidth = Math.floor(appWidth / squaresWide);
		let fitHeight = Math.floor(appHeight / squaresHigh);
		return fitWidth > fitHeight
			? fitHeight
			: fitWidth;
	}

	initSquares() {
		const gridWidth = this.squareSize * this.squaresWide;
		const gridHeight = this.squareSize * this.squaresHigh;

		// console.log(`gridWidth: ${gridWidth}, gridHeight: ${gridHeight}`);

		// center the grid horizontally within our app stage area
		// > so calculate left margin size
		let leftMarginSize = Math.floor((Artist.appWidth - gridWidth) / 2);
		if (leftMarginSize < 0)
			leftMarginSize = 0;

		// place the grid aligned to the bottom of our app stage area
		// > so calculate top margin size
		let topMarginSize = Math.floor(Artist.appHeight - gridHeight);
		if (topMarginSize < 0)
			topMarginSize = 0;

		// console.log(`calculated margins. left: ${leftMarginSize}, top: ${topMarginSize}`);

		// TODO change the squares to be of type Square (SquareVisual)
		// also offload some of this logic per square to that class

		const square = this.createSquare(0, 0, this.squareSize, this.squareColor);
		this.squareTexture = square.generateTexture();

		// draw the game board squares
		for (let y = 0; y < this.squaresHigh; y++) {
		  // do a row
		  let row = [];
		  for (let x = 0; x < this.squaresWide; x++) {
		    let squareSprite = this.createSquareSprite(leftMarginSize + x * this.squareSize, topMarginSize + y * this.squareSize, this.squareSize);
		    this.app.stage.addChild(squareSprite);
		    row.push(squareSprite);
		  }
		  this.squares.push(row);
		}
	}

	createSquareSprite(x, y, size) {
		const squareSprite = new PIXI.Sprite(this.squareTexture);

		squareSprite.x = x;
		squareSprite.y = y;
		squareSprite.width = size;
		squareSprite.height = size;

		return squareSprite;
	}

	createSquare(x, y, size, color) {
		const square = new PIXI.Graphics();
		square.lineStyle(2, 'black', 1);
		square.beginFill(color, 1);
		square.drawRect(x, y, size, size);

		return square;
	}

	drawTetrisShape(x, y, shape) {
		if (shape === 'I') {
			this.fillSquare(x, y);
			this.fillSquare(x, y+1);
			this.fillSquare(x, y+2);
			this.fillSquare(x, y+3);
		}
	}

	drawSquares(gameBoard) {
		for (let x = 0; x < this.squaresWide; x++) {
			for (let y = 0; y < this.squaresHigh; y++) {
				// console.log(`iter: ${x}, ${y}`);
				if (gameBoard.squareIsOpen(x, y)) {
					this.clearSquare(x, y);
				} else {
					// console.log(`found a square to be filled: ${x}, ${y}`);
					this.fillSquare(x, y);
				}
			}
		}
	}

	fillSquare(x, y) {
		// console.log('Artist.fillSquare()', `${x}, ${y}`);
		this.tintSquare(x, y, this.fillColor);
	}

	clearSquare(x, y) {
		this.tintSquare(x, y, this.clearColor);
	}

	tintSquare(x, y, color) {
		const square = this.getSquare(x, y);
		square.tint = color;
	}

	getSquare(x, y) {
		// TODO add safety check on this (both dimensions)
		return this.squares[y][x];
	}

}