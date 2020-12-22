const inputReader = require('./inputReader.js');

let joltageRatings = inputReader.allNumbers;
let firstPuzzleSolution = getFirstPuzzleSolution(joltageRatings);

console.log('first puzzle solution:');
console.log(firstPuzzleSolution);

// exports
exports.joltageRatings = joltageRatings;
exports.produceValidMapJoltages = produceValidMapJoltages;

function getFirstPuzzleSolution(joltageRatings) {
    let validMapJoltages = produceValidMapJoltages(joltageRatings);

    let startingJoltage = 0;
    let validJoltages = [startingJoltage];
    let savedValidJolatges = [];
    let seenValidRatings = new Set();
    while (validJoltages.length) {
        let validJoltage = validJoltages.shift();
        let validAdapters = validMapJoltages.get(validJoltage);


        if (validAdapters) {
            savedValidJolatges.push(...validAdapters);
            for (const validAdapter of validAdapters) {
                if (!seenValidRatings.has(validAdapter.rating)) {
                    seenValidRatings.add(validAdapter.rating);
                    validJoltages.push(validAdapter.rating);
                }
            }
        }
    }

    let voltagesDiffOne = savedValidJolatges.filter(savedValidJolatge => savedValidJolatge.diff === 1)
        .map(savedValidJolatge => savedValidJolatge.rating);

    let voltagesDiffThree = savedValidJolatges.filter(savedValidJolatge => savedValidJolatge.diff === 3 && !voltagesDiffOne.includes(savedValidJolatge.rating))
        .map(savedValidJolatge => savedValidJolatge.rating);

    let firstPuzzleSolution = voltagesDiffOne.length * (voltagesDiffThree.length + 1);

    return firstPuzzleSolution;
}

function produceValidMapJoltages(joltageRatings) {
    const validMapJoltages = new Map();
    for (const joltageRating of joltageRatings) {
        for (const diff of [1, 2, 3]) {
            const value = {
                diff: diff,
                rating: joltageRating
            };

            let validJoltage = validMapJoltages.get(joltageRating - diff);
            if (validJoltage) {
                validJoltage.push(value);
            } else {
                validMapJoltages.set(joltageRating - diff, [value]);
            }
        }
    }
    return validMapJoltages;
}