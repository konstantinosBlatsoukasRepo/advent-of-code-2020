const firstPuzzle = require('./firstPuzzle.js');

let allBags = firstPuzzle.allBags;

console.log('Second puzzle solution:');
console.log(getBagValue(allBags["shiny#gold"]));

function getBagValue(bag) {
    let bags = [...bag];

    let totalBags = 0;
    while (bags.length) {
        let totalNewBags = bags.map(subBag => Object.values(subBag)[0])
            .reduce((x, y) => x + y);

        totalBags += totalNewBags;
        bags = explode(bags);
    }
    return totalBags;
}

function explode(bagContents) {
    let explosionResult = [];
    for (const subBag of bagContents) {
        let explosiveBag = Object.keys(subBag)[0];
        if (explosiveBag !== 'other#') {
            let explosiveBagQuantities = subBag[explosiveBag];
            for (let index = 0; index < explosiveBagQuantities; index++) {
                explosionResult.push(...allBags[explosiveBag]);
            }
        }
    }
    return explosionResult.filter(bag => Object.keys(bag)[0] !== 'other#');
}