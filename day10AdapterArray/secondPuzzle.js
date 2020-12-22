const firstPuzzle = require('./firstPuzzle.js');

let joltageRatings = firstPuzzle.joltageRatings;

console.log('second puzzle solution:');
console.log(countPaths(joltageRatings));

// Dynamic programming!
function countPaths(joltageRatings) {
    let deviceJoltageRating = Math.max(...joltageRatings) + 3;
    joltageRatings.push(0, deviceJoltageRating);

    let numWays = [];
    for (let index = 0; index <= deviceJoltageRating; index++) {
        numWays.push(0);
    }

    numWays[0] = 1;
    if (joltageRatings.includes(1)) {
        numWays[1] = 1;
    }

    if (joltageRatings.includes(1) && joltageRatings.includes(2)) {
        numWays[2] = 2;
    } else if (joltageRatings.includes(2)) {
        numWays[2] = 1
    }

    for (let number = 3; number <= deviceJoltageRating; number++) {
        if (joltageRatings.includes(number)) {
            numWays[number] = numWays[number - 1] + numWays[number - 2] + numWays[number - 3];
        }
    }

    return numWays[deviceJoltageRating];
}

// didn't worked! to many ways to generate
// let paths = generateAllPaths(adjacentMap, 0, destination);
// function generateAllPaths(adjacentMap, source, destination) {
//     let queue = [[source]];
//     let result = [];
//     while (queue.length) {
//         let path = queue.shift();
//         let lastPathElement = path[path.length -1];
//         if (lastPathElement === destination) {
//             result.push(path);
//         } else {
//             for (const adjacentNode of adjacentMap.get(lastPathElement)) {
//                 let newPath = [...path];
//                 newPath.push(adjacentNode);
//                 queue.push(newPath);
//             }
//         }
//     }
//     return result;
// }

// function buildAdjacentMap(validMappedJoltages, maxJoltage) {
//     let adjacentMap = new Map();
//     for (const nodeWithConnections of validMappedJoltages.entries()) {
//         let nodeId = nodeWithConnections[0];
//         if (nodeId >= 0) {
//             let connections = nodeWithConnections[1].map(obj => obj.rating);
//             adjacentMap.set(nodeId, connections);
//         }
//     }

//     let connectionsNotInMap = [];
//     for (const connection of adjacentMap.values()) {
//         connectionsNotInMap.push(...connection.filter(value => !adjacentMap.has(value)));
//     }

//     for (const connectionNotInMap of new Set(connectionsNotInMap)) {
//         adjacentMap.set(connectionNotInMap, [maxJoltage]);
//     }

//     return adjacentMap;
// }