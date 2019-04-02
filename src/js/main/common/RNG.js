export default class RNG {
	/**
	 * Get random integer value from a given range
	 *
	 * @param {number} min Inclusive
	 * @param {number} max Exclusive
	 * @returns {number} Integer value
	 */
	static getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * min & max inclusive
	 *
	 * @param {number} min inclusive
	 * @param {number} max inclusive
	 * @returns {number}
	 */
	static getRandomIntInclusive(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}