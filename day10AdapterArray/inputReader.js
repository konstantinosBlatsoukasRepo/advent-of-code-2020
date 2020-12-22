const fs = require('fs')

try {
    const allNumbers = fs.readFileSync('input.txt', 'utf8')
                         .split('\r\n')
                         .map(number => parseInt(number));

    exports.allNumbers = allNumbers;
} catch (err) {
}