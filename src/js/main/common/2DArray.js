import clone from 'clone';

export default class TwoDArray {
    matrix;

    constructor({n, m, initVal = 0}) {
        this.matrix = Array(n).fill(initVal).map(() => Array(m).fill(initVal));
    }

    get(x, y) {
        return this.has(x, y)
            ? this.matrix[x][y]
            : undefined;
    }

    set(x, y, val) {
        if (this.has(x, y)) {
            this.matrix[x][y] = val;
        }
    }

    has(x, y) {
        return this.matrix[x] !== undefined
            && this.matrix[x][y] !== undefined;
    }

    get length() {
        return this.matrix.length;
    }

    get height() {
        return this.matrix[0].length;
    }

    toArray() {
        return clone(this.matrix);
    }
}

/**
 * Creates a 2D Array object given a length and height
 *
 * @param {number} n length of x axis
 * @param {number} m height of y axis
 */
export const create2DArray = ({n, m}) => {};