const inputReader = require('./inputReader.js');

// first puzzle solution
console.log(findTrees(1, 3));

exports.findTrees = findTrees;

function findTrees(row, column) {
    let rowsAndColumns = inputReader.readRowsAndColumns();

    const totalRows = rowsAndColumns.length;
    let totalColumns = rowsAndColumns[0].length;

    const treeSymbol = '#';

    // starting point on the map
    let currentRow = row;
    let currentColumn = column;

    let isValidRow = (currentRow) => currentRow <= totalRows - 1;
    let isNotValidColumn = (currentColumn) => !(currentColumn <= totalColumns - 1);

    let totalTreesFound = 0;
    while (isValidRow(currentRow)) {

        if (isNotValidColumn(currentColumn)) {
            appendMap();
            totalColumns = rowsAndColumns[0].length;
        }

        if (rowsAndColumns[currentRow][currentColumn] === treeSymbol) {
            totalTreesFound++;
        }
        currentRow += row;
        currentColumn += column;
    }

    function appendMap() {
        for (let index = 0; index < rowsAndColumns.length; index++) {
            rowsAndColumns[index] = rowsAndColumns[index].concat(rowsAndColumns[index]);
        }
    }

    return totalTreesFound;
}