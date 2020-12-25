const inputReader = require('./inputReader.js');
const firstPuzzle = require('./firstPuzzle.js');

let navigationInstructions = inputReader.navigationInstructions;

console.log(applyInstructions(navigationInstructions));

function applyInstructions(navigationInstructions) {
    let shipState = {
        north: 0,
        south: 0,
        east: 0,
        west: 0
    };

    let wayPointState = {
        north: 1,
        south: 0,
        east: 10,
        west: 0
    };

    for (let index = 0; index < navigationInstructions.length; index++) {
        const navigationInstruction = navigationInstructions[index];
        switch (navigationInstruction.action) {
            case 'N':
                firstPuzzle.modifyStateNorthAction(wayPointState, navigationInstruction.value);
                break;
            case 'S':
                firstPuzzle.modifyStateSouthAction(wayPointState, navigationInstruction.value);
                break;
            case 'E':
                firstPuzzle.modifyStateEastAction(wayPointState, navigationInstruction.value);
                break;
            case 'W':
                firstPuzzle.modifyStateWestAction(wayPointState, navigationInstruction.value);
                break;
            case 'L':
                wayPointState = rotateWayPoint(wayPointState, 'L', navigationInstruction.value);
                break;
            case 'R':
                wayPointState = rotateWayPoint(wayPointState, 'R', navigationInstruction.value);
                break;
            case 'F':
                forwardShip(wayPointState, shipState, navigationInstruction.value);
                break;
        }
    }

    let isNonZeroDirection = key => ['north', 'south', 'east', 'west'].includes(key) && shipState[key] > 0;
    return Object.keys(shipState).filter(key => isNonZeroDirection(key)).reduce((x, y) => shipState[x] + shipState[y]);
}

function forwardShip(wayPointState, shipState, value) {
    let oppositeKeys = {
        north: 'south',
        south: 'north',
        east: 'west ',
        west: 'east'
    };

    let arePositives = (wayKey1, wayKey2, wayPointState) => wayPointState[wayKey1] > 0 && wayPointState[wayKey2] > 0;

    let [wayKey1, wayKey2] = Object.keys(wayPointState).filter(key => wayPointState[key] > 0);

    let multipliedWayKey1 = wayPointState[wayKey1] * value;
    let multipliedWayKey2 = wayPointState[wayKey2] * value;

    let oppositeWayKey1 = oppositeKeys[wayKey1];
    let oppositeWayKey2 = oppositeKeys[wayKey2];

    if (arePositives(wayKey1, wayKey2, wayPointState) &&
        arePositives(wayKey1, wayKey2, shipState)
        || Object.keys(shipState).every(key => shipState[key] === 0)) {

        shipState[wayKey1] = shipState[wayKey1] === 0 ? multipliedWayKey1 : shipState[wayKey1] + multipliedWayKey1;
        shipState[wayKey2] = shipState[wayKey2] === 0 ? multipliedWayKey2 : shipState[wayKey2] + multipliedWayKey2;
    } else if (arePositives(wayKey1, wayKey2, wayPointState) &&
        arePositives(wayKey1, oppositeWayKey2, shipState)) {
        shipState[wayKey1] = shipState[wayKey1] === 0 ? multipliedWayKey1 : shipState[wayKey1] + multipliedWayKey1;

        if (shipState[oppositeWayKey2] - multipliedWayKey2 >= 0) {
            shipState[oppositeWayKey2] -= multipliedWayKey2;
        } else {
            shipState[wayKey2] = multipliedWayKey2 - shipState[oppositeWayKey2];
            shipState[oppositeWayKey2] = 0;
        }
    } else if (arePositives(wayKey1, wayKey2, wayPointState) &&
        arePositives(oppositeWayKey1, wayKey2, shipState)) {
        shipState[wayKey2] = shipState[wayKey2] === 0 ? multipliedWayKey2 : shipState[wayKey2] + multipliedWayKey2;

        if (shipState[oppositeWayKey1] - multipliedWayKey1 >= 0) {
            shipState[oppositeWayKey1] -= multipliedWayKey1;
        } else {
            shipState[wayKey1] = multipliedWayKey1 - shipState[oppositeWayKey1];
            shipState[oppositeWayKey1] = 0;
        }
    } else if (arePositives(wayKey1, wayKey2, wayPointState) &&
        arePositives(oppositeWayKey1, oppositeWayKey2, shipState)) {
        if (shipState[oppositeWayKey2] - multipliedWayKey2 >= 0) {
            shipState[oppositeWayKey2] -= multipliedWayKey2;
        } else {
            shipState[wayKey2] = multipliedWayKey2 - shipState[oppositeWayKey2];
            shipState[oppositeWayKey2] = 0;
        }

        if (shipState[oppositeWayKey1] - multipliedWayKey1 >= 0) {
            shipState[oppositeWayKey1] -= multipliedWayKey1;
        } else {
            shipState[wayKey1] = multipliedWayKey1 - shipState[oppositeWayKey1];
            shipState[oppositeWayKey1] = 0;
        }
    }
}

function rotateWayPoint(wayPointState, rotate, value) {
    if (rotate === 'R' && value === 90) {
        return {
            north: wayPointState['west'],
            east: wayPointState['north'],
            south: wayPointState['east'],
            west: wayPointState['south']
        };
    } else if (rotate === 'R' && value === 180) {
        return {
            north: wayPointState['south'],
            east: wayPointState['west'],
            south: wayPointState['north'],
            west: wayPointState['east']
        };
    } else if (rotate === 'R' && value === 270) {
        return {
            north: wayPointState['east'],
            east: wayPointState['south'],
            south: wayPointState['west'],
            west: wayPointState['north']
        };
    } else if (rotate === 'L' && value === 90) {
        return {
            north: wayPointState['east'],
            east: wayPointState['south'],
            south: wayPointState['west'],
            west: wayPointState['north']
        };
    } else if (rotate === 'L' && value === 180) {
        return {
            north: wayPointState['south'],
            east: wayPointState['west'],
            south: wayPointState['north'],
            west: wayPointState['east']
        };
    } else if (rotate === 'L' && value === 270) {
        return {
            north: wayPointState['west'],
            east: wayPointState['north'],
            south: wayPointState['east'],
            west: wayPointState['south']
        };
    }
}