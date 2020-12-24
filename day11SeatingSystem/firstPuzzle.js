const inputReader = require('./inputReader.js');

let currentSeatingState = inputReader.rowsAndColumns;

const MAX_VALID_ROW_VALUE = currentSeatingState.length - 1;
const MAX_VALID_COLUMN_VALUE = currentSeatingState[0].length - 1;

const EMPTY = 'L';
const OCCUPIED = '#';

exports.applyRulesTillStabilization = applyRulesTillStabilization;

console.log('first puzzle solution:');
console.log(applyRulesTillStabilization(currentSeatingState, getAdjacentSeats, 4));

function applyRulesTillStabilization(currentSeatingState, getCandidateSeats, totalOccupiedSeats) {
    while (true) {

        let currentOccupiedSeats = countOccupiedSeats(currentSeatingState);
        let newSeatingState = applyRules(currentSeatingState, getCandidateSeats, totalOccupiedSeats);
        let newOccupiedSeats = countOccupiedSeats(newSeatingState);
        if (currentOccupiedSeats === newOccupiedSeats) {
            return newOccupiedSeats;
        }
        currentSeatingState = newSeatingState;
    }
}

function countOccupiedSeats(seatingState) {
    return seatingState.flatMap(seat => seat)
        .filter(seat => seat === OCCUPIED)
        .length;
}

function applyRules(currentSeatingState, getCandidateSeats, totalOccupiedSeats) {
    let newSeatingState = [];
    for (row = 0; row <= MAX_VALID_ROW_VALUE; row++) {
        let newColumns = [];

        for (column = 0; column <= MAX_VALID_COLUMN_VALUE; column++) {
            let candidateSeats = getCandidateSeats(row, column, currentSeatingState);
            let currentSeat = currentSeatingState[row][column];

            if (currentSeat === EMPTY && candidateSeats.every(seat => seat !== OCCUPIED)) {
                newColumns.push(OCCUPIED);
            } else if (currentSeat === OCCUPIED && candidateSeats.filter(seat => seat === OCCUPIED).length >= totalOccupiedSeats) {
                newColumns.push(EMPTY);
            } else {
                newColumns.push(currentSeat);
            }
        }
        newSeatingState.push(newColumns);
    }
    return newSeatingState;
}

function getAdjacentSeats(row, column, seatingState) {
    let possibleAdjacentSeats = [
        [row - 1, column],
        [row - 1, column + 1],
        [row, column + 1],
        [row + 1, column + 1],
        [row + 1, column],
        [row + 1, column - 1],
        [row, column - 1],
        [row - 1, column - 1]
    ]

    let isRowColumnValid = (row, column) => row <= MAX_VALID_ROW_VALUE &&
        column <= MAX_VALID_COLUMN_VALUE &&
        row >= 0 &&
        column >= 0;

    return possibleAdjacentSeats.filter(([row, column]) => isRowColumnValid(row, column))
        .map(([row, column]) => seatingState[row][column]);
}