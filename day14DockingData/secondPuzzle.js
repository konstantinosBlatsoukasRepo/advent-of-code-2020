const firstPuzzle = require('./firstPuzzle.js');

let maskAndMemoryValuesBlocks = firstPuzzle.maskAndMemoryValuesBlocks;

console.log('second puzzle solution:');
console.log(getProgramsMemoryAfterInitialization(maskAndMemoryValuesBlocks));

function getProgramsMemoryAfterInitialization(maskAndMemoryValuesBlocks) {
    let memory = new Map();
    for (let maskAndMemoryValuesBlock of maskAndMemoryValuesBlocks) {
        let mask = maskAndMemoryValuesBlock['mask']
        let memoryValues = maskAndMemoryValuesBlock['memoryValues'];

        for (const memoryAddress of memoryValues.keys()) {
            let binaryAddress = firstPuzzle.decimalToBinary(memoryAddress).padStart(36, '0');
            let maskedAddress = applyMaskToAddress(mask, binaryAddress);

            let values = memoryValues.get(memoryAddress);
            let value = values[values.length - 1];

            let allPossibleAddresses = generateAllPossibleAddresses(maskedAddress);
            for (const possibleAddress of allPossibleAddresses) {
                memory.set(possibleAddress, value);
            }
        }
    }

    let sum = 0;
    for (const memValue of memory.values()) {
        sum += memValue;
    }
    return sum;
}

function generateAllPossibleBinaries(totalFloatingPoints) {
    let maxNum = 2 ** totalFloatingPoints - 1;
    let totalBits = firstPuzzle.decimalToBinary(maxNum).length;
    let generatedValues = [];
    for (let generatedValue = 0; generatedValue <= maxNum; generatedValue++) {
        generatedValues.push(firstPuzzle.decimalToBinary(generatedValue).padStart(totalBits, '0'));
    }
    return generatedValues;
}

function generateAllPossibleAddresses(maskedAddress) {
    let maskSplitted = maskedAddress.split('');
    let indexes = [];
    for (let index = 0; index < maskSplitted.length; index++) {
        if (maskSplitted[index] === 'X') {
            indexes.push(index);
        }
    }

    let possibleBinaries = generateAllPossibleBinaries(indexes.length);

    let generatedAddresses = [];
    for (const binary of possibleBinaries) {
        let splittedBinary = binary.split('');
        for (let index = 0; index < splittedBinary.length; index++) {
            maskSplitted[indexes[index]] = splittedBinary[index]; 
        } 
        generatedAddresses.push(maskSplitted.join(''));
    }

    return generatedAddresses;
}

function applyMaskToAddress(mask, binaryAddress) {
    let maskSplitted = mask.split('');
    let binaryAddressSplitted = binaryAddress.split('');
    for (let index = 0; index < maskSplitted.length; index++) {
        if (maskSplitted[index] === '1') {
            binaryAddressSplitted[index] = maskSplitted[index];
        }

        if (maskSplitted[index] === 'X') {
            binaryAddressSplitted[index] = maskSplitted[index];
        }
    }
    return binaryAddressSplitted.join('');
}

// unit tests
let binaryAddress = '000000000000000000000000000000101010';
let mask = '000000000000000000000000000000X1001X';
let expectedBinary = '000000000000000000000000000000X1101X';
console.assert(applyMaskToAddress(mask, binaryAddress) === expectedBinary);