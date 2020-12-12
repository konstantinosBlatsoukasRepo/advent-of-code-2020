const firstPuzzle = require('./firstPuzzle.js');

// validation rules
let fourDigitsPresent = testInput => /[0-9]{4}/.test(testInput);
let numberBetween = (testInput, min, max) => parseInt(testInput) >= min && parseInt(testInput) <= max;

let isBirthYearValid = birthYear => fourDigitsPresent(birthYear) && numberBetween(birthYear, 1920, 2002);
let isIssueYearValid = issueYear => fourDigitsPresent(issueYear) && numberBetween(issueYear, 2010, 2020);
let isExpirationYearValid = expirationYear => fourDigitsPresent(expirationYear) && numberBetween(expirationYear, 2020, 2030);
let isFormatOfHeightValid = testInput => /[0-9]+(cm|in)/.test(testInput);
let isHeightValid = height => {
    if (isFormatOfHeightValid(height)) {
        let cmOrIn = height.substring(height.length - 2);
        let value = height.substring(0, height.length - 2);
        if (cmOrIn && cmOrIn === 'cm' && numberBetween(value, 150, 193)) {
            return true
        } else if (cmOrIn && cmOrIn === 'in' && numberBetween(value, 59, 76)) {
            return true
        }
    }
    return false;
}
let isHairColorValid = testInput => /#[0-9a-f]{6}/.test(testInput);
let isEyeColorValid = testInput => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(testInput);
let isPassportIdValid = testInput => /[0-9]{9}/.test(testInput);

let rulesFieldAssociation = {
    byr: isBirthYearValid,
    iyr: isIssueYearValid,
    eyr: isExpirationYearValid,
    hgt: isHeightValid,
    hcl: isHairColorValid,
    ecl: isEyeColorValid,
    pid: isPassportIdValid
};

function isDocumentValid(document)  {
    return Object.keys(rulesFieldAssociation).every(field => rulesFieldAssociation[field](document[field]));
}

let documents = firstPuzzle.documents;
let totalValidDocs = documents.filter(doc => firstPuzzle.allMandatoryFieldsPresent(doc) && isDocumentValid(doc)).length - 1;

console.log('second puzzle solution');
console.log(totalValidDocs); 