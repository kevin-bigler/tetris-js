import MatrixManipulator from '../Service/MatrixManipulator.js'
import Piece from './Piece.js';
import Pieces from '../Constants/Pieces.js';
import ResourceLoader from '../Service/ResourceLoader.js';
import RNG from '../Common/RNG.js';

/**
 * Creates a 2d array representing the squares of a Piece
 * Squares 2d array contains only 0's and 1's, with uniform widths
 * Empty rows are ignored
 * Columns are "trimmed" to the widest column size
 * @param csv String of the CSV content
 * @param matrixManipulator Instance of MatrixManipulator
 */
const loadSquaresFromCsv = (csv, matrixManipulator) => {
    // TODO use a csv loader library to do it, in case csv is in a funky format or whatnot (ie wrapped in "" or w/e)
    // 1. convert to a 2d array of the csv content, as is
    // 2. replace all values
    //      a. 0 -> if cell.trim().length < 1
    //      b. 1 -> if cell.trim().length > 0
    // 3. remove all empty rows on the edges (its array contains ONLY 0s
    // 4. rotate 90 degrees clockwise, repeat step 3
    // 5. rotate 90 degrees counter-clockwise
    // 6. return the resulting 2d array
};

export default class PieceFactory {
    pool = []
    poolDataByName = {}
    matrixManipulator = null

    constructor() {
        this.matrixManipulator = new MatrixManipulator();
        this.initPool();
    }

    initPool() {
        const resourceLoader = new ResourceLoader();
        Pieces.forEach(it => {
            const csv = resourceLoader.loadText(`pieces/${it}.csv`);
            this.pool.push({
                name: it,
                squares: loadSquaresFromCsv(csv)
            });
        });
    }

    createRandomPiece() {
        const poolIndex = RNG.getRandomInt(0, this.pool.length);
        let piece = this.createPiece(pool[poolIndex].name);

        const orientation = RNG.getRandomInt(0, 3, true);
        [...Array(orientation).keys()].forEach(() => piece.rotate());

        return piece;
    }

    createPiece(name) {
        const pieceInfo = this.poolDataByName[name];
        return new Piece({
            name: pieceInfo.name,
            initialSquares: this.matrixManipulator.matrixCopy(pieceInfo.squares)
        });
    }

}