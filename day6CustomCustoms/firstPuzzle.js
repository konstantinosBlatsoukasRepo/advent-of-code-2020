const inputReader = require('./inputReader.js');

let groups = inputReader.readGroups();

exports.computeUniqueAnswersAndTotalPersons = computeUniqueAnswersAndTotalPersons;
exports.groups = groups;

let totalYesAnswers = groups.map(group => computeUniqueAnswersAndTotalPersons(group).groupUniqueAnswers.size)
                            .reduce((x, y) => x + y);

console.log('first puzzle solution');
console.log(totalYesAnswers);

function computeUniqueAnswersAndTotalPersons(groupAnswers) {
    let totalPersons = groupAnswers.length;

    let groupUniqueAnswers = new Set();
    let personsAnswers = [];
    for (const personAnswers of groupAnswers) {
        personsAnswers.push([...personAnswers]);
        for (const answer of personAnswers.split('')) {
            groupUniqueAnswers.add(answer);
        }
    }

    return {
        personsAnswers: personsAnswers, 
        totalPersons: totalPersons,
        groupUniqueAnswers: groupUniqueAnswers
    };
}
