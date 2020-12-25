const firstPuzzle = require('./firstPuzzle');

// modify forward
let shipState = {
    north: 0,
    south: 1,
    east: 0,
    direction: 'N'
};

firstPuzzle.modifyForward(shipState, 1);
console.assert(shipState.south === 0);

shipState.south = 10;
firstPuzzle.modifyForward(shipState, 7);
console.assert(shipState.south === 3);

shipState.south = 4;
shipState.north = 0;
firstPuzzle.modifyForward(shipState, 7);
console.assert(shipState.south === 0);
console.assert(shipState.north === 3);

// modifyRightDirection
shipState.direction = 'N';
firstPuzzle.modifyRightDirection(shipState, 90);
console.assert(shipState.direction === 'E');

shipState.direction = 'N';
firstPuzzle.modifyRightDirection(shipState, 180);
console.assert(shipState.direction === 'S');

shipState.direction = 'N';
firstPuzzle.modifyRightDirection(shipState, 270);
console.assert(shipState.direction === 'W');

shipState.direction = 'E';
firstPuzzle.modifyRightDirection(shipState, 90);
console.assert(shipState.direction === 'S');

shipState.direction = 'E';
firstPuzzle.modifyRightDirection(shipState, 180);
console.assert(shipState.direction === 'W');

shipState.direction = 'E';
firstPuzzle.modifyRightDirection(shipState, 270);
console.assert(shipState.direction === 'N');

shipState.direction = 'W';
firstPuzzle.modifyRightDirection(shipState, 90);
console.assert(shipState.direction === 'N');

shipState.direction = 'W';
firstPuzzle.modifyRightDirection(shipState, 180);
console.assert(shipState.direction === 'E');

shipState.direction = 'W';
firstPuzzle.modifyRightDirection(shipState, 270);
console.assert(shipState.direction === 'S');

shipState.direction = 'S';
firstPuzzle.modifyRightDirection(shipState, 90);
console.assert(shipState.direction === 'W');

shipState.direction = 'S';
firstPuzzle.modifyRightDirection(shipState, 180);
console.assert(shipState.direction === 'N');

shipState.direction = 'S';
firstPuzzle.modifyRightDirection(shipState, 270);
console.assert(shipState.direction === 'E');


// modifyLeftDirection
shipState.direction = 'N';
firstPuzzle.modifyLeftDirection(shipState, 90);
console.assert(shipState.direction === 'W');

shipState.direction = 'N';
firstPuzzle.modifyLeftDirection(shipState, 180);
console.assert(shipState.direction === 'S');

shipState.direction = 'N';
firstPuzzle.modifyLeftDirection(shipState, 270);
console.assert(shipState.direction === 'E');

shipState.direction = 'E';
firstPuzzle.modifyLeftDirection(shipState, 90);
console.assert(shipState.direction === 'N');

shipState.direction = 'E';
firstPuzzle.modifyLeftDirection(shipState, 180);
console.assert(shipState.direction === 'W');

shipState.direction = 'E';
firstPuzzle.modifyLeftDirection(shipState, 270);
console.assert(shipState.direction === 'S');

shipState.direction = 'W';
firstPuzzle.modifyLeftDirection(shipState, 90);
console.assert(shipState.direction === 'S');

shipState.direction = 'W';
firstPuzzle.modifyLeftDirection(shipState, 180);
console.assert(shipState.direction === 'E');

shipState.direction = 'W';
firstPuzzle.modifyLeftDirection(shipState, 270);
console.assert(shipState.direction === 'N');

shipState.direction = 'S';
firstPuzzle.modifyLeftDirection(shipState, 90);
console.assert(shipState.direction === 'E');

shipState.direction = 'S';
firstPuzzle.modifyLeftDirection(shipState, 180);
console.assert(shipState.direction === 'N');

shipState.direction = 'S';
firstPuzzle.modifyLeftDirection(shipState, 270);
console.assert(shipState.direction === 'W');