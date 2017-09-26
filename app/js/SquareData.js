export default class SquareData {
	// could do more with different states,
	// but for now just do 'clear' or 'filled'
	// > represented by 0 or 1
	state = 0
	constructor() {

	}
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