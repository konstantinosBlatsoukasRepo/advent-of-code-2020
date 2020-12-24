const fs = require('fs');

try {
    const rowsAndColumns = fs.readFileSync('input.txt', 'utf8')
                         .split('\r\n')
                         .map(row => row.split(''));

    exports.rowsAndColumns = rowsAndColumns;
} catch (err) {
}