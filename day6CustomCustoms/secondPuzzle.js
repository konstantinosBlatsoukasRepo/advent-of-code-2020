const firstPuzzle = require('./firstPuzzle');

let groups = firstPuzzle.groups;

let secondPuzzleSolution = groups.map(group => countAnswersThatEveryoneAnsweredYes(group))
    .reduce((x, y) => x + y);

console.log('second puzzle solution');
console.log(secondPuzzleSolution);

function countAnswersThatEveryoneAnsweredYes(group) {
    group = firstPuzzle.computeUniqueAnswersAndTotalPersons(group);
    let commonYesAnswers = new Set();
    for (const personAnswers of group.personsAnswers) {
        for (const personAnswer of personAnswers) {
            if (group.personsAnswers.every(pAnswrs => pAnswrs.includes(personAnswer))) {
                commonYesAnswers.add(personAnswer);
            }
        }
    }
    return commonYesAnswers.size;
}
