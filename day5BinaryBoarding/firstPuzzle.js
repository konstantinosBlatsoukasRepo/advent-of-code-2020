const inputReader = require('./inputReader.js');

let boardingPasses = inputReader.boardingPasses;

let seatIds = boardingPasses.map(pass => computeSeatId(pass));
exports.seatIds = seatIds;
let partOneSolution = Math.max(...seatIds);

// puzzle one solution
console.log('first part solution');
console.log(partOneSolution);

function computeSeatId(boardingPass) {
    let decodedRow = decode(boardingPass.encodedRow, 127, 0);
    let decodedColumn = decode(boardingPass.encodedSeat, 7, 0);
    return (decodedRow * 8) + decodedColumn; 
}

function decode(encodedRowOrColumn, highBound, lowBound) {
    let low = lowBound;
    let high = highBound;

    let encodedRowOrColumnElements = encodedRowOrColumn.split('');
    while (true) {
        let encodedRowOrColumnElement = encodedRowOrColumnElements.shift();
        if (encodedRowOrColumnElements.length === 0) {
            if (['B', 'R'].includes(encodedRowOrColumnElement)) {
                return Math.max(low, high);
            }
            return Math.min(low, high);
        }

        if (['F', 'L'].includes(encodedRowOrColumnElement)) {
            high = Math.floor((high + low)/2);
        } else {
            low = Math.ceil((high + low)/2);
        }
    }
}