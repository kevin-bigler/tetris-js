import IPiece from './IPiece.js';
import SquarePiece from './SquarePiece.js';
import EPiece from './EPiece.js';
import LPiece from './LPiece.js';
import JPiece from './JPiece.js';
import SPiece from './SPiece.js';
import ZPiece from './ZPiece.js';

import RNG from '../Common/RNG.js';


export default class PieceFactory {
	pieceHistory = []

	constructor() {

	}

	createRandomPiece() {
		const classes = [
			IPiece,
			SquarePiece,
			EPiece,
			LPiece,
			JPiece,
			SPiece,
			ZPiece
		];
		const classIndex = RNG.getRandomInt(0, classes.length);
		const rotation = RNG.getRandomIntInclusive(0, 3);
		// console.log(`createRandomPiece(), classIndex: ${classIndex}, rotation: ${rotation}`);

		let clazz = classes[classIndex];
		let piece = new clazz();

		for (let i = 0; i < rotation; i++) {
			piece.rotate();
		}

		// console.log('piece created:', piece);

		this.pieceHistory.push({
			clazz,
			rotation
		});

		return piece;
	}

	reset() {
		this.pieceHistory = [];
	}

}