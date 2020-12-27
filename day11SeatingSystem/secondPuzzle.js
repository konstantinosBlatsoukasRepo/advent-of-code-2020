const inputReader = require('./inputReader.js');
const firstPuzzle = require('./firstPuzzle.js');

let currentSeatingState = inputReader.rowsAndColumns;

const MAX_VALID_ROW_VALUE = currentSeatingState.length - 1;
const MAX_VALID_COLUMN_VALUE = currentSeatingState[0].length - 1;

const DIRECTIONS = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];

const EMPTY = 'L';
const OCCUPIED = '#';
const FLOOR = '.';

let isRowColumnValid = (row, column) => row <= MAX_VALID_ROW_VALUE &&
    column <= MAX_VALID_COLUMN_VALUE &&
    row >= 0 &&
    column >= 0;

let getVisibleSeats = (row, column, seatingState) =>
    DIRECTIONS.map(direction => getVisibleSeat(direction, row, column, seatingState))
              .filter(seat => seat !== FLOOR);

console.log('second puzzle solution:');
console.log(firstPuzzle.applyRulesTillStabilization(currentSeatingState, getVisibleSeats, 5));

function getVisibleSeat(direction, row, column, seatingState) {
    let seat = '.';
    [row, column] = move(direction, row, column);
    while (isRowColumnValid(row, column)) {
        if ([EMPTY, OCCUPIED].includes(seatingState[row][column])) {
            seat = seatingState[row][column];
            break;
        }
        [row, column] = move(direction, row, column);
    }
    return seat;
}

function move(direction, row, column) {
    switch (direction) {
        case 'North':
            return [row - 1, column];
        case 'North East':
            return [row - 1, column - 1];
        case 'East':
            return [row, column + 1];
        case 'South East':
            return [row + 1, column + 1];
        case 'South':
            return [row + 1, column];
        case 'South West':
            return [row + 1, column - 1];
        case 'West':
            return [row, column - 1];
        case 'North West':
            return [row - 1, column + 1];
    }
}