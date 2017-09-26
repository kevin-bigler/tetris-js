import MatrixManipulator from '../Service/MatrixManipulator.js'

export default class Piece {
    name = 'Piece'
	// these values change based on orientation
	width = 0
	height = 0
	squares = []    // coordinates are referenced via squares[y][x]

	orientation = 0	// 0, 1, 2, 3
    orientations = null

	constructor({name, initialSquares}) {
        this.name = name;
	    this.initializeOrientations({initialSquares});
	}

	initializeOrientations({initialSquares}) {
        const matrixManipulator = new MatrixManipulator();

        // intialize all 4 orientations
        this.orientations = [];
        let squares = initialSquares;
        [...Array(4).keys()].forEach(it => {
            this.orientations.push({
                width: matrixManipulator.matrixWidth(squares),
                height: matrixManipulator.matrixHeight(squares),
                squares
            });
            squares = matrixManipulator.rotate90clockwise(squares);
        });
        this.updatePieceData();
    }

	rotate() {
		this.orientation++;
		if (this.orientation > 3)
			this.orientation = 0;
		this.updatePieceData();
	}

	unrotate() {
		this.orientation--;
		if (this.orientation < 0)
			this.orientation = 3;
		this.updatePieceData();
	}

    /**
     * Update Piece width, height, and squares according to the Piece's current orientation
     */
	updatePieceData() {
		({width:this.width, height:this.height, squares:this.squares} = this.orientations[this.orientation]);
	}

	getSquare(x, y) {
		return this.squares[y][x];
	}

	squareIsOpen(x, y) {
		return this.getSquare(x, y) === 0;
	}
}