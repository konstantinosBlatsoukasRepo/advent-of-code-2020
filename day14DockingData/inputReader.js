const fs = require('fs');

try {
    const data = fs.readFileSync('input.txt', 'utf8').split('\r\n');

    let index = 0;
    let maskAndMemoryValuesBlocks = [];

    while (index !== data.length) {
        if (!data[index].includes('[')) {
            let instructionsBlock = {
                mask: data[index].split('=')[1].trim()
            }

            index++;
            let newMemoryValues = new Map();
            while (data[index] && data[index].includes('[')) {
                let [memory, value] = data[index].match(/\d{1,}/g);
                if (newMemoryValues.has(memory)) {
                    newMemoryValues.get(memory).push(parseInt(value));
                } else {
                    newMemoryValues.set(memory, [parseInt(value)]);
                }
                index++;
            }

            instructionsBlock['memoryValues'] = newMemoryValues;
            maskAndMemoryValuesBlocks.push(instructionsBlock);
        }
    }
    exports.maskAndMemoryValuesBlocks = maskAndMemoryValuesBlocks;

} catch (err) {

    console.log()
}