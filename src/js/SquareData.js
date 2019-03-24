export default class SquareData {
	/**
	 * State of the square in terms of 'clear' or 'filled', represented by 0 or 1.
	 * 0 = 'clear'
	 * 1 = 'filled'
	 * @type {number}
	 */
	state = 0;

	isOpen() {
		return this.state === 0;
	}

	clear() {
		this.state = 0;
	}

	fill() {
		this.state = 1;
	}

	copy(otherSquare) {
		this.state = otherSquare.state;
	}
}