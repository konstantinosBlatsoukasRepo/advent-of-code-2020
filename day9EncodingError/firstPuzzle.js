const inputReader = require('./inputReader.js');

let allNumbers = inputReader.allNumbers;

let firstPuzzleSolution = getWantedNumber(25, allNumbers);

exports.firstPuzzleSolution = firstPuzzleSolution;
exports.allNumbers = allNumbers;

console.log('first puzzle solution:');
console.log(firstPuzzleSolution);

function getWantedNumber(preambleSize, allNumbers) {
    let startNumberIndex = preambleSize + 1;

    let firstPuzzleSolution;
    for (let index = startNumberIndex; index < allNumbers.length; index++) {
        let currentPossibleSums = getAllPossibleSums(allNumbers, index, preambleSize);
        if (!currentPossibleSums.has(allNumbers[index])) {
            firstPuzzleSolution = allNumbers[index];
            break;
        }
    }
    return firstPuzzleSolution;
}

function getAllPossibleSums(allNumbers, currentIndex, preambleLength) {
    const upperBoundPreamble = currentIndex;
    const preamble = allNumbers.slice(upperBoundPreamble - preambleLength, upperBoundPreamble);

    let allPossibleSums = new Set();
    for (const num of preamble) {
        for (const otherNum of preamble) {
            if (num !== otherNum) {
                allPossibleSums.add(num + otherNum);
            }
        }
    }
    return allPossibleSums;
}