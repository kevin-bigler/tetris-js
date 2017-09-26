export default class Piece {
	// these values change based on rotation
	width = 0
	height = 0
	squares = []	// coordinates are referenced via squares[y][x]

	rotation = 0	// 0, 1, 2, 3

	constructor() {
		// this.setPieceDataByRotation();
	}

	rotate() {
		this.rotation++;
		if (this.rotation > 3)
			this.rotation = 0;
		this.setPieceDataByRotation();
	}

	unrotate() {
		this.rotation--;
		if (this.rotation < 0)
			this.rotation = 3;
		this.setPieceDataByRotation();
	}

	// use current rotation to set values (width, height, squares)
	setPieceDataByRotation() {
		let width, height, squares;
		// ({this.width, this.height, this.squares}) = this.getDataByRotation(this.rotation);
		({width, height, squares} = this.getDataByRotation(this.rotation));
		this.width = width;
		this.height = height;
		this.squares = squares;
	}

	// returns an object with width, height, squares (array)
	getDataByRotation(rotation) {
		console.log('Piece getDataByRotation(); no functionality');
	}

	getSquare(x, y) {
		// TODO safety check on range (both dimensions)
		return this.squares[y][x];
	}

	squareIsOpen(x, y) {
		const square = this.getSquare(x, y);
		if (square === null)
			return false;

		return square === 0;
	}
}