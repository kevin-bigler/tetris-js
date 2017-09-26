const _ = require('lodash');

/**
 * Rotates a matrix (2d array)
 */
export default class MatrixManipulator {
    constructor() {

    }

    /**
     * Rotates a 2d array (matrix) 90 degrees clockwise
     * @param matrix
     */
    rotate90clockwise = (matrix) => {
        // transpose, then reverse the arrays
        return _.zip(...matrix).map(it => it.reverse());
    }

    /**
     * Gets the "width" of a 2d array (matrix)
     * @param matrix
     */
    matrixWidth = (matrix) => {
        return matrix[0].length;
    }

    /**
     * Gets the "height" of a 2d array (matrix)
     * @param matrix
     */
    matrixHeight = (matrix) => {
        return matrix.length;
    }

    matrixCopy = (matrix) => {
        // TODO
    }
}