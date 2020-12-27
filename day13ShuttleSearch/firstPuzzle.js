const inputReader = require('./inputReader.js');

let busIds = inputReader.busIds;
let estimate = inputReader.estimate;

let { earliestBusId: earliestBusId,
    estimateTimestamp: estimateTimestamp } = getEarliestBusIdAndTimestamp(busIds, estimate);

console.log((estimateTimestamp - estimate) * earliestBusId);

function getEarliestBusIdAndTimestamp(busIds, estimate) {
    busIds = busIds.filter(busId => busId !== 'x')
        .map(busId => parseInt(busId));

    while (true) {
        let busIndex = busIds.findIndex(busId => estimate % busId === 0);
        if (busIndex !== -1) {
            return {
                earliestBusId: busIds[busIndex],
                estimateTimestamp: estimate
            };
        }
        estimate++;
    }
}