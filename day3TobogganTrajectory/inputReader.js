const fs = require('fs')

try {
  exports.readRowsAndColumns = readRowsAndColumns;
  function readRowsAndColumns() {
    const data = fs.readFileSync('input.txt', 'utf8');
    let rowsAndColumns = [];
    for (const row of data.split('\r\n')) {
      let newRow = [];
      for (const columnElement of row.split('')) {
        newRow.push(columnElement);
      }
      rowsAndColumns.push(newRow);
    }
    return rowsAndColumns;
  }
} catch (err) {
  console.error(err);
}