const fs = require('fs')

try {
    exports.readAllBags = readAllBags;
    function readAllBags() {
        const data = fs.readFileSync('input.txt', 'utf8');
        let allBags = {};
        for (const line of data.split('\r\n')) {
            let [primaryBag, ...subBags] = line.replace(/bags|bag|\./gi, '').split(/contain|,/gi);
            primaryBag = primaryBag.trim().split(' ').join('#');
            addAnySubBags(allBags, primaryBag, subBags);
        }
        return allBags;
    }

} catch (err) {
}

function addAnySubBags(allBags, primaryBag, subBags) {
    allBags[primaryBag] = [];
    for (const subBag of subBags) {
        let [quantity, type, colorBag] = subBag.trim().split(' ');

        let subBagKey = [type, colorBag].join('#');
        let subBagQuantity = parseInt(quantity);

        let newSubBag = {};
        newSubBag[subBagKey] = subBagQuantity;
        allBags[primaryBag].push(newSubBag);
    }
}