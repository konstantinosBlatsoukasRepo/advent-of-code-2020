const fs = require('fs')

try {
    exports.readInstructions = readInstructions;
    function readInstructions() {
        const data = fs.readFileSync('input.txt', 'utf8');

        let instructions = [];
        let instructionIndex = 0;
        for (const instructionLine of data.split('\r\n')) {

            let [instruction, argument] = instructionLine.split(' ');
            let sign = argument.substr(0, 1);
            let number = argument.substr(1);

            instruction = {
                instructionId: instructionIndex,
                instruction: instruction,
                sign: sign,
                number: number,
            };

            instructions.push(instruction);

            instructionIndex++;
        }
        return instructions;
    }
} catch (err) {
}