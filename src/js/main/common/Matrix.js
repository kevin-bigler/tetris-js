import clone from 'clone';

export default class Matrix {
    array2D;

    /**
     * Creates Matrix n wide and y high
     *
     * @param {number} n length of x axis
     * @param {number} m height of y axis
     * @param {*} [initVal] Optional. Value given to each element of the matrix upon initialization
     */
    constructor(n, m, initVal) {
        this.array2D =
            Array(n).fill(initVal)
                    .map(() => Array(m).fill(initVal));
    }

    get(x, y) {
        return this.has(x, y)
            ? this.array2D[x][y]
            : undefined;
    }

    set(x, y, val) {
        if (this.has(x, y)) {
            this.array2D[x][y] = val;
        }
    }

    has(x, y) {
        return Array.isArray(this.array2D)
            && this.array2D[x] !== undefined
            && this.array2D[x][y] !== undefined;
    }

    get length() {// TODO make it safe (and test it)
        return this.array2D.length;
    }

    get height() { // TODO make it safe (and test it)
        return this.array2D[0].length;
    }

    toArray() {
        return clone(this.array2D);
    }
}
