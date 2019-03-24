export default class Gravity {
	static startInterval = 1000	// 1 second
	static endInterval = 333		// roughly 1/3 second
	static maxLevel = 9					// so 10 levels total
	static minLevel = 0

	gameEngine = null
	gravityLevel = 0
	active = false

	stopTrigger = false

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	resetGravity() {
		this.gravityLevel = Gravity.minLevel;
	}

	stopGravity() {
		// stops the clock
		if ( this.active ) {
			this.active = false;
			this.stopTrigger = true;
		}
	}

	startGravity() {
		// starts the clock
		this.active = true;
		setTimeout(this.update.bind(this), this.getInterval());	// TODO change to use js "interval" instead
	}

	update() {
		if ( this.stopTrigger ) {
			this.stopTrigger = false;
			return;
		}

		if ( ! this.active ) {
			return;
		}
		// console.log('it has been 1 seconds');
		this.gameEngine.movePieceDown();
		setTimeout(this.update.bind(this), this.getInterval());	// TODO change to use js "interval" instead
	}

	// calculate time interval in between updates, based on gravityLevel and some sort of math function (linear, exponential, etc)
	// > returns # milliseconds
	getInterval() {

		const slope = (Gravity.endInterval - Gravity.startInterval)/(Gravity.maxLevel - Gravity.minLevel);

		const interval = Math.floor(
			parseFloat(
				slope * this.gravityLevel
			) + Gravity.startInterval
		);

		console.log('current gravity interval: ', interval);

		return interval;

		/*
			y = ax + b
			* but cap at a minimum interval
			a (aka slope) = (endInterval - startInterval)/(# levels)
			b (starting y) = startInterval
			x = current gravityLevel
		*/
	}

	increaseGravity() {
		console.log('Gravity.increaseGravity()', this.gravityLevel);
		this.gravityLevel++;
		if (this.gravityLevel >= Gravity.maxLevel)
			this.gravityLevel = Gravity.maxLevel;

		console.log(`now gravity is ${this.gravityLevel}`);
	}

}