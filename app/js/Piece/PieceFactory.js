import CsvParser from '../Service/CsvParser.js';
import MatrixManipulator from '../Service/MatrixManipulator.js';
import Piece from './Piece.js';
import Pieces from '../Constants/Pieces.js';
import ResourceLoader from '../Service/ResourceLoader.js';
import RNG from '../Common/RNG.js';

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