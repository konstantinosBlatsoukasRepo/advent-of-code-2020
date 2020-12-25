const inputReader = require('./inputReader.js');

let navigationInstructions = inputReader.navigationInstructions;

exports.modifyForward = modifyForward;
exports.modifyRightDirection = modifyRightDirection;
exports.modifyLeftDirection = modifyLeftDirection;
exports.modifyStateWestAction = modifyStateWestAction;
exports.modifyStateEastAction = modifyStateEastAction;
exports.modifyStateSouthAction = modifyStateSouthAction;
exports.modifyStateNorthAction = modifyStateNorthAction;

console.log('first puzzle solution:');
console.log(applyInstructions(navigationInstructions));

function applyInstructions(navigationInstructions) {
    let shipState = {
        north: 0,
        south: 0,
        east: 0,
        west: 0,
        direction: 'E'
    };

    for (const navigationInstruction of navigationInstructions) {
        switch (navigationInstruction.action) {
            case 'N':
                modifyStateNorthAction(shipState, navigationInstruction.value);
                break;
            case 'S':
                modifyStateSouthAction(shipState, navigationInstruction.value);
                break;
            case 'E':
                modifyStateEastAction(shipState, navigationInstruction.value);
                break;
            case 'W':
                modifyStateWestAction(shipState, navigationInstruction.value);
                break;
            case 'L':
                modifyDirection(shipState, 'L', navigationInstruction.value);
                break;
            case 'R':
                modifyDirection(shipState, 'R', navigationInstruction.value);
                break;
            case 'F':
                modifyForward(shipState, navigationInstruction.value);
                break;
        }
    }
    let isNonZeroDirection = key => ['north', 'south', 'east', 'west'].includes(key) && shipState[key] > 0;
    return Object.keys(shipState).filter(key => isNonZeroDirection(key)).reduce((x, y) => shipState[x] + shipState[y]);
}

function modifyStateNorthAction(shipState, value) {
    let southDiff = shipState.south - value;
    if (shipState.south !== 0 && southDiff >= 0) {
        shipState.south -= value;
    } else if (shipState.south !== 0 && southDiff < 0) {
        shipState.north = Math.abs(southDiff);
        shipState.south = 0;
    } else {
        shipState.north += value;
    }
}

function modifyStateSouthAction(shipState, value) {
    let northDiff = shipState.north - value;
    if (shipState.north !== 0 && northDiff >= 0) {
        shipState.north -= value;
    } else if (shipState.north !== 0 && northDiff < 0) {
        shipState.south = Math.abs(northDiff);
        shipState.north = 0;
    } else {
        shipState.south += value;
    }
}

function modifyStateEastAction(shipState, value) {
    let westDiff = shipState.west - value;
    if (shipState.west !== 0 && westDiff >= 0) {
        shipState.west -= value;
    } else if (shipState.west !== 0 && westDiff < 0) {
        shipState.east = Math.abs(westDiff);
        shipState.west = 0;
    } else {
        shipState.east += value;
    }
}

function modifyStateWestAction(shipState, value) {
    let eastDiff = shipState.east - value;
    if (shipState.east !== 0 && eastDiff >= 0) {
        shipState.east -= value;
    } else if (shipState.east !== 0 && eastDiff < 0) {
        shipState.west = Math.abs(eastDiff);
        shipState.east = 0;
    } else {
        shipState.west += value;
    }
}

function modifyDirection(shipState, action, value) {
    switch (action) {
        case 'L':
            modifyLeftDirection(shipState, value);
            break;
        case 'R':
            modifyRightDirection(shipState, value);
            break;
    }
}

function modifyLeftDirection(shipState, value) {
    let direction = shipState.direction;
    if (direction === 'N' && value === 90) {
        shipState.direction = 'W';
    } else if (direction === 'N' && value === 180) {
        shipState.direction = 'S';
    } else if (direction === 'N' && value === 270) {
        shipState.direction = 'E';
    } else if (direction === 'S' && value === 90) {
        shipState.direction = 'E';
    } else if (direction === 'S' && value === 180) {
        shipState.direction = 'N';
    } else if (direction === 'S' && value === 270) {
        shipState.direction = 'W';
    } else if (direction === 'E' && value === 90) {
        shipState.direction = 'N';
    } else if (direction === 'E' && value === 180) {
        shipState.direction = 'W';
    } else if (direction === 'E' && value === 270) {
        shipState.direction = 'S';
    } else if (direction === 'W' && value === 90) {
        shipState.direction = 'S';
    } else if (direction === 'W' && value === 180) {
        shipState.direction = 'E';
    } else if (direction === 'W' && value === 270) {
        shipState.direction = 'N';
    }
}

function modifyRightDirection(shipState, value) {
    let direction = shipState.direction;
    if (direction === 'N' && value === 90) {
        shipState.direction = 'E';
    } else if (direction === 'N' && value === 180) {
        shipState.direction = 'S';
    } else if (direction === 'N' && value === 270) {
        shipState.direction = 'W';
    } else if (direction === 'S' && value === 90) {
        shipState.direction = 'W';
    } else if (direction === 'S' && value === 180) {
        shipState.direction = 'N';
    } else if (direction === 'S' && value === 270) {
        shipState.direction = 'E';
    } else if (direction === 'E' && value === 90) {
        shipState.direction = 'S';
    } else if (direction === 'E' && value === 180) {
        shipState.direction = 'W';
    } else if (direction === 'E' && value === 270) {
        shipState.direction = 'N';
    } else if (direction === 'W' && value === 90) {
        shipState.direction = 'N';
    } else if (direction === 'W' && value === 180) {
        shipState.direction = 'E';
    } else if (direction === 'W' && value === 270) {
        shipState.direction = 'S';
    }
}

function modifyForward(state, value) {
    switch (state.direction) {
        case 'N':
            if (state.south - value >= 0) {
                state.south -= value;
            } else {
                state.north += Math.abs(state.south - value);
                state.south = 0;
            }
            break;
        case 'E':
            if (state.west - value >= 0) {
                state.west -= value;
            } else {
                state.east += Math.abs(state.west - value);
                state.west = 0;
            }
            break;
        case 'W':
            if (state.east - value >= 0) {
                state.east -= value;
            } else {
                state.west += Math.abs(state.east - value);
                state.east = 0;
            }
            break;
        case 'S':
            if (state.north - value >= 0) {
                state.north -= value;
            } else {
                state.south += Math.abs(state.north - value);
                state.north = 0;
            }
            break;
    }
}