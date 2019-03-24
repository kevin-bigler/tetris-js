import Piece from './Piece.js';

export default class IPiece extends Piece {
	dataByRotation =
		[
			{	// 0
				width: 1,
				height: 4,
				squares: [
					[1],
					[1],
					[1],
					[1]
				]
			},
			{	// 1
				width: 4,
				height: 1,
				squares: [
					[1,1,1,1]
				]
			},
			{	// 2
				width: 1,
				height: 4,
				squares: [
					[1],
					[1],
					[1],
					[1]
				]
			},
			{	// 3
				width: 4,
				height: 1,
				squares: [
					[1,1,1,1]
				]
			}
		];

	constructor() {
		super();
		this.setPieceDataByRotation();
	}

	getDataByRotation(rotation) {
		if (rotation > 3 || rotation < 0) {
			console.error('rotation must be 0 through 3!', `${rotation} given`);
			return;
		}

		return this.dataByRotation[rotation];
	}

}