export default class RNG {
    /**
	 * Get a random integer within a range
     * @param min Inclusive
     * @param max Exclusive by default.
     * @param maxInclusive Optional. Defaults to false
     * @returns a random integer
     */
    // TODO we probably want to change this to not be static, and accept a seed. ie deterministic randomness
	static getRandomInt(min, max, maxInclusive = false) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min + (maxInclusive ? 1 : 0))) + min;
	}
}