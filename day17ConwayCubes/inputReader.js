const fs = require('fs');

try {
    const data = fs.readFileSync('input.txt', 'utf8').split('\r\n');
    exports.data = data;
} catch (err) {
    console.log()
}