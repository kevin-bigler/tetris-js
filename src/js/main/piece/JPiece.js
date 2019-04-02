import Piece from './Piece.js';

export default class JPiece extends Piece {
	dataByRotation =
		[
			{	// 0
				width: 2,
				height: 3,
				squares: [
					[0,1],
					[0,1],
					[1,1]
				]
			},
			{	// 1
				width: 3,
				height: 2,
				squares: [
					[1,0,0],
					[1,1,1]
				]
			},
			{	// 2
				width: 2,
				height: 3,
				squares: [
					[1,1],
					[1,0],
					[1,0]
				]
			},
			{	// 3
				width: 3,
				height: 2,
				squares: [
					[1,1,1],
					[0,0,1]
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