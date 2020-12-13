const fs = require('fs')

try {
    let boardingPasses = [];
    const data = fs.readFileSync('input.txt', 'utf8');
    boardingPasses = data.split('\r\n')
        .map(row => {
            return {
                encodedRow: row.substring(0, 7),
                encodedSeat: row.substring(7)
            };
        });
    exports.boardingPasses = boardingPasses;

} catch (err) {
    console.error(err);
}