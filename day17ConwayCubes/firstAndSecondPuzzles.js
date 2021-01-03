const inputReader = require('./inputReader.js');

let lines = inputReader.data;

console.log(solve(lines));
function solve(lines) {
    let state = getActiveNodes(lines);
    for (let index = 0; index < 6; index++) {
        state = simulate(state);
    }
    return state.size;
}

function simulate(activeNodes) {
    const newNodes = new Set();

    const activationCounts = {};

    for (const activeNode of activeNodes) {
        let neighbors = getNeighbors(activeNode);
        let activeNeighborsCount = 0;

        for (let neighbor of neighbors) {
            if (activeNodes.has(neighbor)) {
                activeNeighborsCount += 1;
            } else {
                if (!(neighbor in activationCounts))
                    activationCounts[neighbor] = 0;
                activationCounts[neighbor] += 1;
            }
        }

        if (activeNeighborsCount === 2 || activeNeighborsCount === 3) {
            newNodes.add(activeNode);
        }
    }


    for (const potentialNode in activationCounts) {
        if (activationCounts[potentialNode] === 3) {
            newNodes.add(potentialNode);
        }
    }

    return newNodes;
}

function getActiveNodes(lines) {
    const nodes = new Set();
    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[0].length; y++) {
            let char = lines[x][y];
            if (char === '#') {
                const node = getNodeFromArray([x, y, 0, 0]);
                nodes.add(node);
            }
        }
    }
    return nodes;
}

function getNodeFromArray(array) {
    return array.join(',');
}

function getNeighbors(triplet) {
    const [x, y, z, w] = triplet.split(',').map(Number);
    const neighbors = new Set();
    for (let deltaX = -1; deltaX <= 1; deltaX++) {
        for (let deltaY = -1; deltaY <= 1; deltaY++) {
            for (let deltaZ = -1; deltaZ <= 1; deltaZ++) {
                for (let deltaW = -1; deltaW <= 1; deltaW++) {
                    const neighbor = getNodeFromArray([x + deltaX, y + deltaY, z + deltaZ, w + deltaW]);
                    neighbors.add(neighbor);
                }
            }
        }
    }
    neighbors.delete(triplet);
    return neighbors;
}