import * as PIXI from 'pixi.js';
import Artist from './Artist.js';
import GameBoard from './GameBoard.js';
import LPiece from './Piece/LPiece.js';
import SquarePiece from './Piece/SquarePiece.js';
import PieceFactory from './Piece/PieceFactory.js';
import InputManager from './InputManager.js';
import Gravity from './Gravity.js';

export default class GameEngine {
	app = null
	artist = null
	gameBoard = null
	inputManager = null
	gravity = null
	pieceFactory = null

	squaresWide = 8
	squaresHigh = 16

	newPiecePosition = {x:3, y:0}

	currentPiece = null
	currentPosition = {x:0, y:0}

	constructor() {

	}

	initialize({squaresWide = this.squaresWide, squaresHigh = this.squaresHigh} = {}) {
		// console.log('GameEngine init', `squaresWide: ${squaresWide}, squaresHigh: ${squaresHigh}`);

		this.app = new PIXI.Application(Artist.appWidth, Artist.appHeight, {transparent : true});
		document.getElementById('display').appendChild(this.app.view);

		this.gameBoard = new GameBoard(this.app);
		this.gameBoard.initialize({squaresWide, squaresHigh});

		this.artist = new Artist(this.app);
		this.artist.initialize({squaresWide, squaresHigh});

		this.inputManager = new InputManager(this);

		this.gravity = new Gravity(this);

		this.pieceFactory = new PieceFactory();
	}

	newGame() {
		// stop gravity
		this.gravity.stopGravity();
		this.gravity.resetGravity();

		// clear the board, make a new piece
		this.gameBoard.clear();
		this.drawSquares();

		this.newPiece();

		this.inputManager.startListening();

		this.gravity.startGravity();

		// setTimeout(this.update.bind(this), 1000);
	}

	newPiece() {
		this.currentPiece = this.pieceFactory.createRandomPiece();

		const pieceAddedSuccessfully = this.gameBoard.addPiece(
			{
				piece:this.currentPiece,
				x:this.newPiecePosition.x,
				y:this.newPiecePosition.y
			});

		if ( ! pieceAddedSuccessfully ) {
			console.log('GAME OVER!');
			this.gravity.stopGravity();
			this.inputManager.stopListening();
			return;
		}

		this.currentPosition = {
			x:this.newPiecePosition.x,
			y:this.newPiecePosition.y
		};

		this.drawSquares();

	}

	drawSquares() {
		this.artist.drawSquares(this.gameBoard);
	}

	rotatePiece() {
		if ( ! this.canRotatePiece() ) {
			console.log('cannot rotate');
			return;
		}

		this.removePiece();
		this.currentPiece.rotate();
		this.addPiece();
		this.drawSquares();
	}

	movePieceLeft() {
		if ( ! this.canMovePieceLeft() ) {
			console.log('cannot move left');
			return;
		}

		this.removePiece();
		this.currentPosition.x--;
		this.addPiece();
		this.drawSquares();
	}

	movePieceRight() {
		if ( ! this.canMovePieceRight() ) {
			console.log('cannot move right');
			return;
		}

		this.removePiece();
		this.currentPosition.x++;
		this.addPiece();
		this.drawSquares();
	}

	movePieceDown() {
		if ( ! this.canMovePieceDown() ) {
			console.log('cannot move down - new piece');
			this.updateCompletions();
			this.newPiece();
			return;
		}

		this.removePiece();
		this.currentPosition.y++;
		this.addPiece();
		this.drawSquares();
	}

	// normally this will not be allowed
	// > it just seems useful for development
	movePieceUp() {
		if ( ! this.canMovePieceUp() ) {
			console.log('cannot move up');
			return;
		}

		this.removePiece();
		this.currentPosition.y--;
		this.addPiece();
		this.drawSquares();
	}

	canRotatePiece() {
		this.removePiece();	// temporarily remove the piece to simulate it moving
		this.currentPiece.rotate();
		if ( this.gameBoard.pieceCanFit(
			{
				piece: this.currentPiece,
				x: this.currentPosition.x,
				y: this.currentPosition.y
			})
		) {
			this.currentPiece.unrotate();
			this.addPiece();
			return true;
		} else {
			this.currentPiece.unrotate();
			this.addPiece();
			return false;
		}
	}

	canMovePieceLeft() {
		this.removePiece();

		const canFit = this.gameBoard.pieceCanFit(
			{
				piece: this.currentPiece,
				x: this.currentPosition.x - 1,
				y: this.currentPosition.y
			}
		);

		this.addPiece();

		return canFit;
	}

	canMovePieceRight() {
		this.removePiece();

		const canFit = this.gameBoard.pieceCanFit(
			{
				piece: this.currentPiece,
				x: this.currentPosition.x + 1,
				y: this.currentPosition.y
			}
		);

		this.addPiece();

		return canFit;
	}

	canMovePieceDown() {
		this.removePiece();

		const canFit = this.gameBoard.pieceCanFit(
			{
				piece: this.currentPiece,
				x: this.currentPosition.x,
				y: this.currentPosition.y + 1
			}
		);

		this.addPiece();

		return canFit;
	}

	canMovePieceUp() {
		this.removePiece();

		const canFit = this.gameBoard.pieceCanFit(
			{
				piece: this.currentPiece,
				x: this.currentPosition.x,
				y: this.currentPosition.y - 1
			}
		);

		this.addPiece();

		return canFit;
	}

	removePiece() {
		this.gameBoard.removePiece({piece:this.currentPiece, x:this.currentPosition.x, y:this.currentPosition.y});
	}

	addPiece() {
		return this.gameBoard.addPiece({piece:this.currentPiece, x:this.currentPosition.x, y:this.currentPosition.y});
	}

	increaseGravity() {
		this.gravity.increaseGravity();
	}

	updateCompletions() {
		this.gameBoard.detectCompletions();
	}

}
