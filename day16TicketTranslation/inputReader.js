const fs = require('fs');

try {
    const data = fs.readFileSync('input.txt', 'utf8').split('\r\n');
    let notes = {};
    let lastKnownKey = '';
    for (const line of data) {
        if (line === '') {
            continue;
        }
        let splittedLine = line.split(':').filter(x => x !== '');
        if (splittedLine.length === 1 && !splittedLine[0].includes(',')) {
            let secSplitted = splittedLine[0].split(' ').filter(x => x !== '');
            if (secSplitted.length === 2) {
                let newKey = `${secSplitted[0]}${secSplitted[1].substring(0, 1).toUpperCase()}${secSplitted[1].substring(1)}`;
                notes[newKey] = [];
                lastKnownKey = newKey;
            } else {
                notes[secSplitted[0]] = [];
                lastKnownKey = secSplitted[0];
            }
        } else if (splittedLine.length === 2) {
            let key = '';
            let nameSplit = splittedLine[0].split(' ').filter(x => x !== '');
            if (nameSplit.length === 2) {
                key = `${nameSplit[0]}${nameSplit[1].substring(0, 1).toUpperCase()}${nameSplit[1].substring(1)}`;
            } else {
                key = nameSplit[0];
            }
            notes[key] = [...splittedLine[1].match(/\d+/g).map(x => parseInt(x))];
            console.log();

        } else if (splittedLine.length === 1 && splittedLine[0].includes(',')) {
            notes[lastKnownKey].push(...line.split(',').map(x => parseInt(x)));
        }
    }

    exports.notes = notes;

} catch (err) {

    console.log()
}