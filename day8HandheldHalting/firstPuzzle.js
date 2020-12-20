const inputReader = require('./inputReader.js');

let instructions = inputReader.readInstructions();

console.log('first puzzle solution:');
console.log(executeInstructions(instructions).acc);

exports.executeInstructions = executeInstructions;
exports.instructions = instructions;

function executeInstructions(instructions) {
    let acc = 0;
    let programPointer = 0;
    let instructionIdsExecuted = new Set();
    while (true) {

        if (programPointer >= instructions.length) {
            return {
                acc: acc,
                reason: 'program terminated normally'
            };
        }
        let instructionRead = instructions[programPointer];

        if (instructionIdsExecuted.has(instructionRead.instructionId)) {
            return {
                acc: acc,
                reason: 'infinite loop detected'
            };
        }

        instructionIdsExecuted.add(instructionRead.instructionId);

        switch (instructionRead.instruction) {
            case 'nop':
                programPointer += 1;
                break;
            case 'acc':
                if (instructionRead.sign === '+') {
                    acc += parseInt(instructionRead.number);
                } else {
                    acc -= parseInt(instructionRead.number);
                }
                programPointer += 1;
                break;
            case 'jmp':
                if (instructionRead.sign === '+') {
                    programPointer += parseInt(instructionRead.number);
                } else {
                    programPointer -= parseInt(instructionRead.number);
                }
                break;
        }
    }
}