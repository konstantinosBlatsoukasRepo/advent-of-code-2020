const fs = require('fs');

try {
    const navigationInstructions = fs.readFileSync('input.txt', 'utf8')
        .split('\r\n')
        .map(row => ({
            action: row.substring(0, 1),
            value: parseInt(row.substring(1))
        }));

    exports.navigationInstructions = navigationInstructions;
} catch (err) {
}