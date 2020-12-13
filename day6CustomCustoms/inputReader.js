const fs = require('fs')

try {
    exports.readGroups = readGroups;

    function readGroups() {
        const data = fs.readFileSync('input.txt', 'utf8');

        let groups = [];
        let groupLines = [];

        for (const line of data.split('\r\n')) {
            if (line) {
                groupLines.push(line);
            } else {
                groups.push([...groupLines]);
                groupLines = [];
            }
        }
        groups.push([...groupLines]);

        return groups;
    }
} catch(err) {
}