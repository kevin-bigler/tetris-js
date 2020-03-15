import clone from 'clone';

export default class Matrix {
    _array2D;

    /**
     * Creates a Matrix n wide and y high. Size is immutable.
     *
     * @param {number} n length of x axis. Must be > 0
     * @param {number} m height of y axis. Must be > 0
     * @param {*} [initVal] Optional. Value given to each element of the matrix upon initialization
     */
    constructor(n, m, initVal) {
        if (n < 1 || m < 1) {
            throw new Error(`width and height should both be > 0, received: width=${n}, height=${m}`);
        }

        this._array2D =
            Array(n).fill(initVal)
                    .map(() => Array(m).fill(initVal));
    }

    get(x, y) {
        return this.has(x, y)
            ? this._array2D[x][y]
            : undefined;
    }

    set(x, y, val) {
        if (this.has(x, y)) {
            this._array2D[x][y] = val;
        }
    }

    /**
     * Checks if (x, y) lies in bounds of the matrix
     * @param x
     * @param y
     * @returns {*|boolean}
     */
    has(x, y) {
        return x >= 0 && x < this._array2D.length
            && y >= 0 && y < this._array2D[x].length;
    }

    get width() {
        return this._array2D.length;
    }

    get height() {
        return this._array2D[0].length;
    }

    toArray() {
        return clone(this._array2D);
    }
}
