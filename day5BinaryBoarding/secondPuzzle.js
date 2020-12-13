const firstPuzzle = require('./firstPuzzle.js');

let sortedSeatIds = firstPuzzle.seatIds.sort((a, b) => a - b);

let mySeatId;
for (let index = 0; index < sortedSeatIds.length; index++) {
    if (sortedSeatIds[index] + 1 !== sortedSeatIds[index + 1]) {
        mySeatId = sortedSeatIds[index] + 1;
        break;
    }
}

console.log('second part solution');
console.log(mySeatId);