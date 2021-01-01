let startingNumbers = [1,0,16,5,17,4];

console.log('first puzzle solution:');
console.log(playGame(startingNumbers, 2020));

console.log('second puzzle solution:');
console.log(playGame(startingNumbers, 30000000));

function playGame(startingNumbers, finalTurn) {

    let numbersWithLastSpokenTurn = new Map();
    let numbersFrequencies = new Map();
    for (let index = 0; index < startingNumbers.length - 1; index++) {
        let turn = index + 1;
        numbersWithLastSpokenTurn.set(startingNumbers[index], turn);
        numbersFrequencies.set(startingNumbers[index], 1);
    }

    let turnAfterStartingNumbers = startingNumbers.length + 1;
    let lastNumberSpoken = startingNumbers[startingNumbers.length - 1];

    for (let turn = turnAfterStartingNumbers; turn <= finalTurn; turn++) {
        if (!numbersFrequencies.has(lastNumberSpoken)) {
            numbersWithLastSpokenTurn.set(lastNumberSpoken, turn - 1);
            numbersFrequencies.set(lastNumberSpoken, 1);
            lastNumberSpoken = 0;
        } else {
            let lastTurnSeen = numbersWithLastSpokenTurn.get(lastNumberSpoken);
            numbersWithLastSpokenTurn.set(lastNumberSpoken, turn - 1);
            lastNumberSpoken = (turn - 1) - lastTurnSeen;
        }
    }

    return lastNumberSpoken;
}

// unit tests
console.assert(playGame([1,3,2], 2020) === 1);
console.assert(playGame([2,1,3], 2020) === 10);
console.assert(playGame([1,2,3], 2020) === 27);
console.assert(playGame([2,3,1], 2020) === 78);
console.assert(playGame([3,2,1], 2020) === 438);
console.assert(playGame([3,1,2], 2020) === 1836);
console.assert(playGame([0, 3, 6], 2020) === 436);