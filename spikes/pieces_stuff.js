const _ = require('lodash');

const rotate90clockwise = (matrix) => {
    // transpose
    let result = _.zip(...matrix);
    // reverse the arrays
    return result.map(it => it.reverse());
};

const matrix = [
    [1,1,1],
    [2,2,2],
    [3,3,3]
];

let result = matrix;

console.log('original:', result);

const repetitions = 4;
[...Array(repetitions).keys()].forEach(it => {
    result = rotate90clockwise(result);
    console.log('rotated: ', result);
});