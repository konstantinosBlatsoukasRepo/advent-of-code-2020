const inputReader = require('./inputReader.js');

let notes = inputReader.notes;

exports.generateValidationRules = generateValidationRules;
exports.isValidForAnyRule = isValidForAnyRule;

console.log('first puzzle solution:');
console.log(computeTicketScanningErrorRate(notes));

function computeTicketScanningErrorRate(notes) {
    let rules = generateValidationRules(notes);

    let invalidNearbyTickets = [];
    for (const nearbyTicket of notes['nearbyTickets']) {
        if (!isValidForAnyRule(nearbyTicket, rules)) {
            invalidNearbyTickets.push(nearbyTicket);
        }
    }

    let reducer = (x, y) => x + y;
    return invalidNearbyTickets.reduce(reducer, 0);
}

function isValidForAnyRule(nearbyTicket, rules) {
    for (const rule of rules) {
        if (rule(nearbyTicket)) {
            return true;
        }
    }
    return false;
}

function generateValidationRules(notes) {
    let rules = [];
    for (const key in notes) {
        if (!['nearbyTickets', 'yourTicket'].includes(key)) {
            let [min1, max1, min2, max2] = notes[key];
            let rule1 = (number) => min1 <= number && number <= max1;
            let rule2 = (number) => min2 <= number && number <= max2;
            rules.push(rule1, rule2);
        }
    }
    return rules;
}