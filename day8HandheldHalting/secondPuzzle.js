const firstPuzzle = require('./firstPuzzle.js');

let instructions = firstPuzzle.instructions;

let nopOrJmpProgramPointers = [];
for (let index = 0; index < instructions.length; index++) {
    if (['nop', 'jmp'].includes(instructions[index].instruction)) {
        nopOrJmpProgramPointers.push(index);
    }
}


let result;
for (let index = 0; index < nopOrJmpProgramPointers.length; index++) {
    let nopOrJmpProgramPointer = nopOrJmpProgramPointers[index];
    if (instructions[nopOrJmpProgramPointer].instruction === 'jmp') {
        instructions[nopOrJmpProgramPointer].instruction = 'nop';

        result = firstPuzzle.executeInstructions(instructions);
        if (result.reason === 'program terminated normally') {
            break;
        }

        instructions[nopOrJmpProgramPointer].instruction = 'jmp';
    } else {
        instructions[nopOrJmpProgramPointer].instruction = 'jmp';

        result = firstPuzzle.executeInstructions(instructions);
        if (result.reason === 'program terminated normally') {
            break;
        }

        instructions[nopOrJmpProgramPointer].instruction = 'nop';
    }
}

console.log('second puzzle solution:');
console.log(result.acc);
