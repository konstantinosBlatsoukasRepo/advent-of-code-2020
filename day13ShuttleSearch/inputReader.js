const fs = require('fs');

try {
    const data = fs.readFileSync('input.txt', 'utf8').split('\r\n');
    exports.estimate = parseInt(data[0]);
    exports.busIds = data[1].split(',');
} catch (err) {
}