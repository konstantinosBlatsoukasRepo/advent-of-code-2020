const firstPuzzle = require('./firstPuzzle.js');

let allNumbers = firstPuzzle.allNumbers;

let firstPuzzleSolution = firstPuzzle.firstPuzzleSolution;
let wantedNumbersSet = [];
let currentSum = 0;
let currentTestedIndex = 0;
let index = 0;
while (true) {
    currentSum = currentSum + allNumbers[index];
    if (currentSum === firstPuzzleSolution) {
        wantedNumbersSet.push(allNumbers[index]);
        break;
    } else if (currentSum < firstPuzzleSolution) {
        wantedNumbersSet.push(allNumbers[index]);
        index++;
    } else {
        currentTestedIndex++;
        index = currentTestedIndex;
        currentSum = 0;
        wantedNumbersSet = [];
    }
}

console.log('second puzzle solution:');
console.log(Math.min(...wantedNumbersSet) + Math.max(...wantedNumbersSet));