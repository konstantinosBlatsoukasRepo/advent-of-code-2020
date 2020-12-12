const inputReader = require('./inputReader.js');

let documents = inputReader.readDocuments();

exports.allMandatoryFieldsPresent = allMandatoryFieldsPresent;
exports.documents = documents;

let totalValidDocuments = documents.filter(doc => allMandatoryFieldsPresent(doc)).length;

// let totalValidDocuments = 0;
// for (const document of documents) {
//     if (allMandatoryFieldsPresent(document)) {
//         totalValidDocuments++;
//     }
// }

console.log('first puzzle solution');
console.log(totalValidDocuments);
console.log();

function allMandatoryFieldsPresent(document) {
    // cid is not included
    let mandatoryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let documentFields = new Set(Object.keys(document));
    let isRequiredFieldPresent = mandatoryField => documentFields.has(mandatoryField);
    let allRequiredFieldsPresent = mandatoryFields.every(isRequiredFieldPresent);
    return allRequiredFieldsPresent;
} 