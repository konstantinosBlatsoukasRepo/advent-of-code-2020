const inputReader = require('./inputReader.js');
const firstPuzzle = require('./firstPuzzle.js');

const FIELDS_IN_ORDER = ['departureLocation', 'departureStation', 'departurePlatform', 'departureTrack', 'departureDate', 'departureTime', 'arrivalLocation', 'arrivalStation', 'arrivalPlatform', 'arrivalTrack', 'class', 'duration', 'price', 'route', 'row', 'seat', 'train', 'type', 'wagon', 'zone'];

let notes = inputReader.notes;

console.log('second puzzle solution:')
console.log(classifyFields(notes));

function classifyFields(notes) {
    let nearbyTicketsSplitted = splitInSeparateTickets(notes);
    let validTickets = getValidTickets(nearbyTicketsSplitted);
    let validationRulesPerField = generateValidationRulesPerField(notes);
    let classifiedIndexes = classify(validTickets, validationRulesPerField);

    let wantedIndexes = [];
    for (let index = 0; index < classifiedIndexes.length; index++) {
        if (classifiedIndexes[index].includes('departure')) {
            wantedIndexes.push(index);
        }
    }

    let res = 1;
    for (const index of wantedIndexes) {
        res *= notes['yourTicket'][index];
    }

    return res;
}

function classify(validTickets, validationRulesPerField) {
    let classifiedIndexes = [];
    for (let index = 0; index < FIELDS_IN_ORDER.length; index++) {
        classifiedIndexes.push(-1);
    }

    let possibleFieldsPerIndex = getPossibleFieldsPerIndex(validTickets, validationRulesPerField);
    for (let index = 0; index < FIELDS_IN_ORDER.length; index++) {
        let foundIndex = possibleFieldsPerIndex.findIndex(arr => arr.length === 1);
        classifiedIndexes[foundIndex] = possibleFieldsPerIndex[foundIndex][0];

        for (let index = 0; index < possibleFieldsPerIndex.length; index++) {
            possibleFieldsPerIndex[index] = possibleFieldsPerIndex[index].filter(possibleField => possibleField !== classifiedIndexes[foundIndex]);
        }
    }

    return classifiedIndexes;
}

function getPossibleFieldsPerIndex(validTickets, validationRulesPerField) {
    let possibleFieldsPerIndex = [];
    for (let index = 0; index < FIELDS_IN_ORDER.length; index++) {
        // let possibleFields = new Set();
        let numbersWithSpecifiedIndex = getNumbersForSpecifiedIndex(validTickets, index);
        let possibleFields = getPossibleFields(numbersWithSpecifiedIndex, validationRulesPerField);
        possibleFieldsPerIndex.push(possibleFields);
    }
    return possibleFieldsPerIndex;
}

function getValidTickets(nearbyTicketsSplitted) {
    let rules = firstPuzzle.generateValidationRules(notes);
    let validTickets = [];
    for (const currentTicket of nearbyTicketsSplitted) {
        let isFieldValid = field => firstPuzzle.isValidForAnyRule(field, rules);
        if([...currentTicket].every(field => isFieldValid(field))) {
            validTickets.push(currentTicket);
        }
    }
    return validTickets;
}

function getNumbersForSpecifiedIndex(validTickets, index) {
    return validTickets.map(ticket => ticket[index]);
}

function getPossibleFields(numbersWithSpecifiedIndex, validationRulesPerField) {
    let frequencyRecorder = new Map();
    for (const currentNumber of numbersWithSpecifiedIndex) {
        for (const entry of validationRulesPerField.entries()) {
            let [key, [rule1, rule2]] = entry;
            if (rule1(currentNumber) || rule2(currentNumber)) {
                if (frequencyRecorder.has(key)) {
                    frequencyRecorder.set(key, frequencyRecorder.get(key) + 1);
                } else {
                    frequencyRecorder.set(key, 1);
                }
            }
        }
    }

    let maxFrequency = Math.max(...frequencyRecorder.values());

    let fieldsWithMaxFrequency = [];
    for (const entry of frequencyRecorder.entries()) {
        let [field, frequency] = entry;
        if (frequency === maxFrequency) {
            fieldsWithMaxFrequency.push(field);
        }
    }

    return fieldsWithMaxFrequency;
}

function splitInSeparateTickets(notes) {
    let nearbyTickets = [...notes['nearbyTickets']];
    let splittedTickets = [];
    while (nearbyTickets.length) {
        let newTicket = [];
        for (let index = 0; index < FIELDS_IN_ORDER.length; index++) {
            newTicket.push(nearbyTickets.shift());
        }
        splittedTickets.push(newTicket);
    }
    return splittedTickets;
}

function generateValidationRulesPerField(notes) {
    let rulesPerFiled = new Map();
    for (const key in notes) {
        if (!['nearbyTickets', 'yourTicket'].includes(key)) {
            let [min1, max1, min2, max2] = notes[key];
            let rule1 = (number) => min1 <= number && number <= max1;
            let rule2 = (number) => min2 <= number && number <= max2;
            rulesPerFiled.set(key, [rule1, rule2]);
        }
    }
    return rulesPerFiled;
}