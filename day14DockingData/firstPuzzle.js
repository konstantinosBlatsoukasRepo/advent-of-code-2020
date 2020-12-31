const inputReader = require('./inputReader.js');

let maskAndMemoryValuesBlocks = inputReader.maskAndMemoryValuesBlocks;

exports.maskAndMemoryValuesBlocks = maskAndMemoryValuesBlocks;
exports.decimalToBinary = decimalToBinary;
exports.binaryToDecimal = binaryToDecimal;

console.log('first puzzle solution:');
console.log(getProgramsMemoryAfterInitialization(maskAndMemoryValuesBlocks));

function decimalToBinary(decimalNumber) {
    let stack = [];

    while (decimalNumber) {
        stack.push(decimalNumber % 2);
        decimalNumber = Math.floor(decimalNumber / 2);
    }

    let binary = '';
    while (stack.length) {
        binary += stack.pop();
    }

    return binary;
}

function binaryToDecimal(binaryNumber) {
    let binariesReversed = binaryNumber.split('').reverse();
    let decimalValue = 0;
    for (let index = 0; index < binariesReversed.length; index++) {
        if (binariesReversed[index] === '1') {
            decimalValue += 2 ** index;
        }
    }
    return decimalValue;
}

function applyMask(mask, binaryNumber) {
    let maskSplitted = mask.split('');
    let binaryNumberSplitted = binaryNumber.split('');
    for (let index = 0; index < maskSplitted.length; index++) {
        if (maskSplitted[index] !== 'X') {
            binaryNumberSplitted[index] = maskSplitted[index];
        }
    }
    return binaryNumberSplitted.join('');
}

function getProgramsMemoryAfterInitialization(maskAndMemoryValuesBlocks) {
    let memory = new Map();
    for (let maskAndMemoryValuesBlock of maskAndMemoryValuesBlocks) {
        let mask = maskAndMemoryValuesBlock['mask']
        let memoryValues = maskAndMemoryValuesBlock['memoryValues'];

        for (const memoryAddress of memoryValues.keys()) {
            let values = memoryValues.get(memoryAddress);

            let value = values[values.length - 1];
            let binValue = decimalToBinary(value).padStart(36, '0');
            let maskedBin = applyMask(mask, binValue);

            memory.set(memoryAddress, binaryToDecimal(maskedBin));
        }
    }

    let sum = 0;
    for (const memValue of memory.values()) {
        sum += memValue;
    }
    return sum;
}

// unit tests
console.assert(binaryToDecimal(decimalToBinary(8)) === 8);
console.assert(binaryToDecimal(decimalToBinary(257)) === 257);

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
let binaryNumber = '000000000000000000000000000000001011';
let expectedBinary = '000000000000000000000000000001001001';
console.assert(applyMask(mask, binaryNumber) === expectedBinary);

mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
binaryNumber = '000000000000000000000000000001100101';
expectedBinary = '000000000000000000000000000001100101';
console.assert(applyMask(mask, binaryNumber) === expectedBinary);

mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';
binaryNumber = '000000000000000000000000000000000000';
expectedBinary = '000000000000000000000000000001000000';
console.assert(applyMask(mask, binaryNumber) === expectedBinary);

