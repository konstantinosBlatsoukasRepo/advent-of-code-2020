const firstPuzzle = require('./firstPuzzle.js');

let slopes = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];

let treesFoundPerSlope = slopes.map( ([row, column]) => firstPuzzle.findTrees(row, column));
// second puzzle solution
console.log(treesFoundPerSlope.reduce((accumulator, currentValue) => accumulator * currentValue));